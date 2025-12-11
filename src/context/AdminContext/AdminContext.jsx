import { createContext, useState, useContext } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [adminTuitions, setAdminTuitions] = useState([]); // Tuitions for admin to approve/manage
  const [stats, setStats] = useState(null);
  const [adminPayments, setAdminPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Users
  const fetchUsers = async () => {
    if (user?.role !== 'Admin') return;
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Update User Role
  const updateUserRole = async (userId, newRole) => {
      try {
          const response = await api.patch(`/users/${userId}/role`, { role: newRole });
          if (response.data.success || response.data.modifiedCount > 0) {
              toast.success('User role updated successfully');
              fetchUsers();
              return { success: true };
          }
          return { success: false };
      } catch (error) {
          console.error('Update role error:', error);
          toast.error('Failed to update user role');
          return { success: false, error };
      }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.data.deletedCount > 0) {
        toast.success('User deleted successfully');
        fetchUsers(); // Refresh list
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Failed to delete user');
      return { success: false, error };
    }
  };

  // Fetch Admin Stats
  const fetchStats = async () => {
    if (user?.role !== 'Admin') return;
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAdminPayments = async () => {
      if (user?.role !== 'Admin') return;
      try {
          const response = await api.get('/admin/payments');
          setAdminPayments(response.data);
      } catch (error) {
          console.error('Error fetching admin payments:', error);
      }
  };

  useEffect(() => {
    if (user && user.role === 'Admin') {
      fetchUsers();
      fetchStats();
      fetchAdminPayments();
      fetchAdminTuitions();
    }
  }, [user]);

  // Fetch All Tuitions (for Admin management)
  // Re-using the public /tuitions endpoint but maybe with different filters or logic?
  // Or likely Admin sees EVERYTHING. The /tuitions endpoint generally filtered on backend.
  // Actually, server code for /tuitions had `let query = { status: 'Approved' };` by default.
  // Admin needs to see Pending ones too.
  const fetchAdminTuitions = async () => {
    if (user?.role !== 'Admin') return;
    setLoading(true);
    try {
      const response = await api.get('/admin/tuitions');
      setAdminTuitions(response.data);
    } catch (error) {
      console.error('Error fetching admin tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update Tuition Status
  const updateTuitionStatus = async (id, status) => {
      try {
          const response = await api.patch(`/tuitions/${id}/status`, { status });
          if (response.data.success || response.data.modifiedCount > 0) {
              toast.success(`Tuition ${status} successfully`);
              fetchAdminTuitions(); // Refresh list
              return { success: true };
          }
          return { success: false };
      } catch (error) {
          console.error('Update status error:', error);
          toast.error('Failed to update status');
          return { success: false, error };
      }
  };

  const value = {
    users,
    stats,
    adminPayments,
    adminTuitions,
    loading,
    fetchUsers,
    deleteUser,
    fetchStats,
    fetchAdminPayments,
    fetchAdminTuitions,
    updateTuitionStatus,
    updateUserRole
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminProvider;
