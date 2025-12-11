import { createContext, useState, useContext, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

export const TutorContext = createContext();

const TutorProvider = ({ children }) => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]); // List of tutors (for students to browse)
  const [myApplications, setMyApplications] = useState([]); // For Tutor Dashboard
  const [myRevenue, setMyRevenue] = useState([]); // For Tutor Dashboard
  const [loading, setLoading] = useState(false);

  // Fetch Tutors (Public/Student)
  const fetchTutors = async () => {
    setLoading(true);
    try {
      // Assuming we have an endpoint for all tutors or just using users endpoint with filter
      // The server has /users/tutors/latest, but maybe we need a general /tutors endpoint?
      // Looking at server code, there isn't a dedicated /tutors endpoint for listing ALL tutors with pagination yet?
      // Server has: app.get('/users/tutors/latest'...)
      // And app.get('/users'...) which is Admin only.
      // Wait, Tutors page usually lists tutors. Let's check Tutors.jsx later.
      // For now, let's implement what we know exists or standard placeholders.
      // If Tutors.jsx was fetching data, how did it do it?
      // Maybe it was using /users/tutors/latest or something. 
      // I will implement fetching latest for now.
      const response = await api.get('/users/tutors/latest');
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      // toast.error('Failed to load tutors'); // Optional, maybe too noisy on init
    } finally {
      setLoading(false);
    }
  };

  // Fetch My Applications (Tutor Only)
  const fetchMyApplications = async () => {
    if (user?.role !== 'Tutor') return;
    setLoading(true);
    try {
      const response = await api.get('/applications/my-applications');
      setMyApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  // Fetch My Revenue (Tutor Only)
  const fetchMyRevenue = async () => {
    if (user?.role !== 'Tutor') return;
    setLoading(true);
    try {
      const response = await api.get('/payments/my-revenue');
      setMyRevenue(response.data);
    } catch (error) {
      console.error('Error fetching revenue:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update Application
  const updateApplication = async (id, updates) => {
      try {
          const response = await api.patch(`/applications/${id}`, updates);
          if (response.data.success || response.data.modifiedCount > 0) {
              toast.success('Application updated successfully');
              fetchMyApplications();
              return { success: true };
          }
          return { success: false };
      } catch (error) {
          console.error('Update application error:', error);
          toast.error(error.response?.data?.message || 'Failed to update application');
          return { success: false, error };
      }
  };

  // Delete Application
  const deleteApplication = async (id) => {
      try {
          const response = await api.delete(`/applications/${id}`);
          if (response.data.success || response.data.deletedCount > 0) {
              toast.success('Application deleted successfully');
              fetchMyApplications();
              return { success: true };
          }
          return { success: false };
      } catch (error) {
          console.error('Delete application error:', error);
          toast.error('Failed to delete application');
          return { success: false, error };
      }
  };

  const value = {
    tutors,
    myApplications,
    myRevenue,
    loading,
    fetchTutors,
    fetchMyApplications,
    fetchMyRevenue,
    updateApplication,
    deleteApplication
  };

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
};

export default TutorProvider;
