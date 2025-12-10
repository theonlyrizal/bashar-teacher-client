import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const MyTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTuition, setEditingTuition] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchMyTuitions();
  }, []);

  const fetchMyTuitions = async () => {
    try {
      const response = await api.get('/tuitions/my-tuitions');
      if (response.data.success) {
        setTuitions(response.data.tuitions);
      }
    } catch (error) {
      console.error('Error fetching tuitions:', error);
      toast.error('Failed to load your tuitions');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tuition) => {
    setEditingTuition(tuition);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/tuitions/${editingTuition._id}`, editingTuition);
      if (response.data.success) {
        toast.success('Tuition updated successfully');
        setShowEditModal(false);
        fetchMyTuitions();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update tuition');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tuition?')) return;

    try {
      const response = await api.delete(`/tuitions/${id}`);
      if (response.data.success) {
        toast.success('Tuition deleted successfully');
        fetchMyTuitions();
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete tuition');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'badge-warning',
      Approved: 'badge-success',
      Rejected: 'badge-error',
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tuitions</h1>
        <Link to="/dashboard/student/post-tuition" className="btn btn-primary">
          <FaPlus className="mr-2" /> Post New Tuition
        </Link>
      </div>

      {tuitions.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">No Tuitions Posted Yet</h3>
          <p className="text-gray-600 mb-6">Start by posting your first tuition requirement</p>
          <Link to="/dashboard/student/post-tuition" className="btn btn-primary">
            <FaPlus className="mr-2" /> Post Your First Tuition
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {tuitions.map((tuition, index) => (
            <motion.div
              key={tuition._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="card-title text-2xl text-primary">{tuition.subject}</h2>
                    <div className="flex gap-2 mt-2">
                      <div className="badge badge-secondary">{tuition.class}</div>
                      <div className={`badge ${getStatusBadge(tuition.status)}`}>
                        {tuition.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">৳{tuition.budget}</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <span className="text-sm text-gray-600">Location:</span>
                    <p className="font-semibold">{tuition.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Schedule:</span>
                    <p className="font-semibold">{tuition.schedule}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Duration:</span>
                    <p className="font-semibold">{tuition.duration}</p>
                  </div>
                </div>

                {tuition.requirements && (
                  <p className="text-sm text-gray-700 mt-3 line-clamp-2">
                    <strong>Requirements:</strong> {tuition.requirements}
                  </p>
                )}

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/dashboard/student/applied-tutors/${tuition._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    <FaEye className="mr-1" /> View Applications
                  </Link>
                  <button
                    onClick={() => handleEdit(tuition)}
                    className="btn btn-sm btn-primary"
                    disabled={tuition.status === 'Rejected'}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tuition._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTuition && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-2xl mb-4">Edit Tuition</h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingTuition.subject}
                    onChange={(e) =>
                      setEditingTuition({ ...editingTuition, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Class *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingTuition.class}
                    onChange={(e) =>
                      setEditingTuition({ ...editingTuition, class: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Location *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingTuition.location}
                    onChange={(e) =>
                      setEditingTuition({ ...editingTuition, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Budget (৳/month) *</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={editingTuition.budget}
                    onChange={(e) =>
                      setEditingTuition({ ...editingTuition, budget: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Schedule *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingTuition.schedule}
                    onChange={(e) =>
                      setEditingTuition({ ...editingTuition, schedule: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Duration *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingTuition.duration}
                    onChange={(e) =>
                      setEditingTuition({ ...editingTuition, duration: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Requirements</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={editingTuition.requirements || ''}
                  onChange={(e) =>
                    setEditingTuition({ ...editingTuition, requirements: e.target.value })
                  }
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Contact Info</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={editingTuition.contactInfo || ''}
                  onChange={(e) =>
                    setEditingTuition({ ...editingTuition, contactInfo: e.target.value })
                  }
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Tuition
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowEditModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
