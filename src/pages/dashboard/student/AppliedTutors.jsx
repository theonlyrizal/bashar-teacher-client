import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaCreditCard } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const AppliedTutors = () => {
  const { tuitionId } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tuitionId) {
      fetchApplications();
    } else {
      // If no tuitionId, show all applications for all student's tuitions
      fetchAllApplications();
    }
  }, [tuitionId]);

  const fetchApplications = async () => {
    try {
      const [tuitionRes, appsRes] = await Promise.all([
        api.get(`/tuitions/${tuitionId}`),
        api.get(`/applications/tuition/${tuitionId}`)
      ]);

      if (tuitionRes.data.success) {
        setTuition(tuitionRes.data.tuition);
      }

      if (appsRes.data.success) {
        setApplications(appsRes.data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllApplications = async () => {
    try {
      // Get all student's tuitions first
      const tuitionsRes = await api.get('/tuitions/my-tuitions');
      if (tuitionsRes.data.success) {
        const allApps = [];
        
        // Fetch applications for each tuition
        for (const tuition of tuitionsRes.data.tuitions) {
          const appsRes = await api.get(`/applications/tuition/${tuition._id}`);
          if (appsRes.data.success && appsRes.data.applications.length > 0) {
            allApps.push({
              tuition,
              applications: appsRes.data.applications
            });
          }
        }
        
        setApplications(allApps);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = (application) => {
    // Redirect to payment page
    navigate(`/dashboard/student/checkout/${application._id}`);
  };

  const handleReject = async (applicationId) => {
    if (!window.confirm('Are you sure you want to reject this application?')) return;

    try {
      const response = await api.patch(`/applications/${applicationId}/reject`);
      if (response.data.success) {
        toast.success('Application rejected');
        if (tuitionId) {
          fetchApplications();
        } else {
          fetchAllApplications();
        }
      }
    } catch (error) {
      console.error('Reject error:', error);
      toast.error('Failed to reject application');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'badge-warning',
      Approved: 'badge-success',
      Rejected: 'badge-error'
    };
    return badges[status] || 'badge-ghost';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {tuitionId ? `Applications for ${tuition?.subject}` : 'All Applications'}
      </h1>

      {tuitionId && tuition && (
        <div className="card bg-base-200 mb-6">
          <div className="card-body">
            <h2 className="card-title text-primary">{tuition.subject} - {tuition.class}</h2>
            <p>Budget: ৳{tuition.budget}/month | Location: {tuition.location}</p>
          </div>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">No Applications Yet</h3>
          <p className="text-gray-600">Tutors will apply to your posted tuitions</p>
        </div>
      ) : tuitionId ? (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((app, index) => (
            <ApplicationCard
              key={app._id}
              application={app}
              index={index}
              onAccept={handleAccept}
              onReject={handleReject}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {applications.map((group, groupIndex) => (
            <div key={groupIndex} className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl font-bold mb-4">{group.tuition.subject} - {group.tuition.class}</h2>
              <div className="grid grid-cols-1 gap-4">
                {group.applications.map((app, index) => (
                  <ApplicationCard
                    key={app._id}
                    application={app}
                    index={index}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    getStatusBadge={getStatusBadge}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationCard = ({ application, index, onAccept, onReject, getStatusBadge }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="card bg-base-100 shadow-xl"
  >
    <div className="card-body">
      <div className="flex items-start gap-4">
        <div className="avatar">
          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img 
              src={application.tutorId?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
              alt={application.tutorId?.name}
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{application.tutorId?.name}</h3>
              <p className="text-sm text-gray-600">{application.tutorId?.email}</p>
              {application.tutorId?.phone && (
                <p className="text-sm text-gray-600">{application.tutorId.phone}</p>
              )}
              <div className="mt-2">
                <div className={`badge ${getStatusBadge(application.status)}`}>
                  {application.status}
                </div>
                {application.tutorId?.isVerified && (
                  <div className="badge badge-success ml-2">Verified</div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">৳{application.expectedSalary}</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <h4 className="font-semibold mb-1">Qualifications:</h4>
              <p className="text-gray-700">{application.qualifications}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Experience:</h4>
              <p className="text-gray-700">{application.experience}</p>
            </div>
            {application.message && (
              <div>
                <h4 className="font-semibold mb-1">Message:</h4>
                <p className="text-gray-700">{application.message}</p>
              </div>
            )}
          </div>

          {application.status === 'Pending' && (
            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => onReject(application._id)}
                className="btn btn-error btn-sm"
              >
                <FaTimesCircle className="mr-1" /> Reject
              </button>
              <button
                onClick={() => onAccept(application)}
                className="btn btn-success btn-sm"
              >
                <FaCreditCard className="mr-1" /> Accept & Pay
              </button>
            </div>
          )}

          {application.status === 'Approved' && (
            <div className="alert alert-success mt-4">
              <FaCheckCircle />
              <span>This tutor has been approved and payment completed!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default AppliedTutors;
