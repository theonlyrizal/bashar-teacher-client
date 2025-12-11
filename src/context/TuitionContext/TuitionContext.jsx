import { createContext, useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

export const TuitionContext = createContext();

const TuitionProvider = ({ children }) => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch My Tuitions (Student Specific)
  const fetchMyTuitions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await api.get('/tuitions/my-tuitions');
      // Fix: Server returns array directly, or object with success: true. 
      // Handle both cases for robustness.
      if (Array.isArray(response.data)) {
        setTuitions(response.data);
      } else if (response.data.success && Array.isArray(response.data.tuitions)) {
          setTuitions(response.data.tuitions);
      } else {
         // Fallback or empty
         setTuitions([]); 
      }
    } catch (error) {
      console.error('Error fetching tuitions:', error);
      toast.error('Failed to load your tuitions');
    } finally {
      setLoading(false);
    }
  };

  // Post Tuition
  const postTuition = async (tuitionData) => {
    try {
      const response = await api.post('/tuitions', tuitionData);
      if (response.data.insertedId) {
        toast.success('Tuition posted successfully!');
        // Refresh list
        fetchMyTuitions(); 
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Post tuition error:', error);
      toast.error(error.response?.data?.message || 'Failed to post tuition');
      return { success: false, error };
    }
  };

  // Update Tuition
  const updateTuition = async (id, updates) => {
    try {
        const response = await api.patch(`/tuitions/${id}`, updates);
        // Note: Server might return result object, usually check modifiedCount or acknowledged
        if (response.data.modifiedCount > 0 || response.data.acknowledged) {
            toast.success('Tuition updated successfully');
            fetchMyTuitions();
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.error('Update error:', error);
        toast.error('Failed to update tuition');
        return { success: false, error };
    }
  };

  // Delete Tuition
  const deleteTuition = async (id) => {
    try {
        const response = await api.delete(`/tuitions/${id}`);
        if (response.data.deletedCount > 0 || response.data.success) {
            toast.success('Tuition deleted successfully');
            fetchMyTuitions();
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete tuition');
        return { success: false, error };
    }
  };

  // Initial Fetch when user is logged in
  useEffect(() => {
    if (user && user.role === 'Student') {
        fetchMyTuitions();
    }
  }, [user]);

  const value = {
    tuitions,
    loading,
    fetchMyTuitions,
    postTuition,
    updateTuition,
    deleteTuition
  };

  return <TuitionContext.Provider value={value}>{children}</TuitionContext.Provider>;
};

export default TuitionProvider;
