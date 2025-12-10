import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaBook, FaUser, FaPhone } from 'react-icons/fa';
import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const TuitionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTuitionDetails();
  }, [id]);

  const fetchTuitionDetails = async () => {
    try {
      const response = await api.get(`/tuitions/${id}`);
      if (response.data.success) {
        setTuition(response.data.tuition);
      }
    } catch (error) {
      console.error('Error fetching tuition:', error);
      toast.error('Failed to load tuition details');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    if (user.role !== 'Tutor') {
      toast.error('Only tutors can apply for tuitions');
      return;
    }
    setShowApplyModal(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post('/applications', {
        tuitionId: id,
        ...applicationData,
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
        setShowApplyModal(false);
        setApplicationData({
          qualifications: '',
          experience: '',
          expectedSalary: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Application error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tuition Not Found</h2>
          <Link to="/tuitions" className="btn btn-primary">
            Browse Tuitions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-base-100 rounded-lg shadow-xl p-8 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">{tuition.subject}</h1>
                <div className="badge badge-secondary badge-lg">{tuition.class}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-success">৳{tuition.budget}</div>
                <div className="text-sm text-gray-600">per month</div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-2xl text-primary" />
                <div>
                  <div className="text-xs text-gray-600">Location</div>
                  <div className="font-semibold">{tuition.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-2xl text-secondary" />
                <div>
                  <div className="text-xs text-gray-600">Schedule</div>
                  <div className="font-semibold">{tuition.schedule}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBook className="text-2xl text-accent" />
                <div>
                  <div className="text-xs text-gray-600">Duration</div>
                  <div className="font-semibold">{tuition.duration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-base-100 rounded-lg shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">Tuition Details</h2>

            {tuition.requirements && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Requirements:</h3>
                <p className="text-gray-700">{tuition.requirements}</p>
              </div>
            )}

            {tuition.contactInfo && (
              <div>
                <h3 className="font-semibold mb-2">Contact Information:</h3>
                <p className="text-gray-700">{tuition.contactInfo}</p>
              </div>
            )}
          </div>

          {/* Student Info */}
          <div className="bg-base-100 rounded-lg shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">Posted By</h2>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img
                    src={tuition.studentId?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                    alt={tuition.studentId?.name}
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg">{tuition.studentId?.name}</div>
                <div className="text-sm text-gray-600">{tuition.studentId?.email}</div>
                {tuition.studentId?.phone && (
                  <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <FaPhone /> {tuition.studentId.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/tuitions" className="btn btn-outline">
              Back to Listings
            </Link>
            {user?.role === 'Tutor' && (
              <button onClick={handleApplyClick} className="btn btn-primary flex-1">
                Apply for This Tuition
              </button>
            )}
            {!user && (
              <Link to="/login" className="btn btn-primary flex-1">
                Login to Apply
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-4">Apply for Tuition</h3>
            <form onSubmit={handleApplicationSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" value={user?.name} className="input input-bordered" disabled />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" value={user?.email} className="input input-bordered" disabled />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Qualifications *</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Your educational qualifications, degrees, certifications..."
                  value={applicationData.qualifications}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, qualifications: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Experience *</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Your teaching experience, years of experience, subjects taught..."
                  value={applicationData.experience}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, experience: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Expected Salary (৳/month) *</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="e.g., 5000"
                  value={applicationData.expectedSalary}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, expectedSalary: e.target.value })
                  }
                  required
                  min="0"
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Message (Optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Any additional message or information..."
                  value={applicationData.message}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, message: e.target.value })
                  }
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="btn btn-ghost"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowApplyModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
