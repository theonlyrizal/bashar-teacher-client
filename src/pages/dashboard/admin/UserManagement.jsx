import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserEdit, FaTrash, FaUserShield } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AdminContext } from '../../../context/AdminContext/AdminContext';

const UserManagement = () => {
  const { users, loading, fetchUsers, deleteUser, updateUserRole } = useContext(AdminContext);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Change user role to ${newRole}?`)) return;
    await updateUserRole(userId, newRole);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.'))
      return;
    await deleteUser(userId);
  };

  const filteredUsers = filter === 'All' ? users : users.filter((u) => u.role === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Stats */}
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card shadow-xl hover:shadow-2xl transition-all">
          <div className="card-body">
            <h2 className="card-title text-sm text-base-content/70">Total Users</h2>
            <p className="text-3xl font-bold text-primary">{users.length}</p>
          </div>
        </div>
        <div className="card shadow-xl hover:shadow-2xl transition-all">
          <div className="card-body">
            <h2 className="card-title text-sm text-base-content/70">Students</h2>
            <p className="text-3xl font-bold text-info">{users.filter((u) => u.role === 'Student').length}</p>
          </div>
        </div>
        <div className="card shadow-xl hover:shadow-2xl transition-all">
          <div className="card-body">
            <h2 className="card-title text-sm text-base-content/70">Tutors</h2>
            <p className="text-3xl font-bold text-secondary">{users.filter((u) => u.role === 'Tutor').length}</p>
          </div>
        </div>
        <div className="card shadow-xl hover:shadow-2xl transition-all">
          <div className="card-body">
            <h2 className="card-title text-sm text-base-content/70">Admins</h2>
            <p className="text-3xl font-bold text-accent">{users.filter((u) => u.role === 'Admin').length}</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['All', 'Student', 'Tutor', 'Admin'].map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`btn btn-sm ${filter === role ? 'btn-primary' : 'btn-ghost'}`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img
                              src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                              alt={user.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          {user.isVerified && (
                            <div className="badge badge-success badge-sm">Verified</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>
                      <div className="dropdown">
                        <div
                          tabIndex={0}
                          role="button"
                          className={`badge cursor-pointer ${
                            user.role === 'Admin'
                              ? 'badge-error'
                              : user.role === 'Tutor'
                              ? 'badge-secondary'
                              : 'badge-primary'
                          }`}
                        >
                          {user.role}
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-32"
                        >
                          <li>
                            <a onClick={() => handleRoleChange(user._id, 'Student')}>Student</a>
                          </li>
                          <li>
                            <a onClick={() => handleRoleChange(user._id, 'Tutor')}>Tutor</a>
                          </li>
                          <li>
                            <a onClick={() => handleRoleChange(user._id, 'Admin')}>Admin</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${user.isActive ? 'badge-success' : 'badge-error'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="btn btn-error btn-xs"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
