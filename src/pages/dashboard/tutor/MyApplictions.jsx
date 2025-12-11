import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { TutorContext } from '../../../context/TutorContext/TutorContext';

const MyApplications = () => {
  const { myApplications: applications, loading, fetchMyApplications, updateApplication, deleteApplication } = useContext(TutorContext);
  
  const [editingApp, setEditingApp] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const handleEdit = (app) => {
    if (app.status !== 'Pending') {
      toast.error('Can only edit pending applications');
      return;
    }
    setEditingApp(app);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateApplication(editingApp._id, {
        qualifications: editingApp.qualifications,
        experience: editingApp.experience,
        expectedSalary: editingApp.expectedSalary,
        message: editingApp.message
    });
    
    if (result.success) {
      setShowEditModal(false);
    }
  };

  const handleDelete = async (id, status) => {
    if (status !== 'Pending') {
      toast.error('Can only delete pending applications');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this application?')) return;
    await deleteApplication(id);
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
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">No Applications Yet</h3>
          <p className="text-base-content/70 mb-6">Start applying to available tuitions</p>
          <Link to="/tuitions" className="btn btn-primary">
            Browse Tuitions
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((app, index) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="card-title text-2xl text-primary">
                      {app.tuitionId?.subject} - {app.tuitionId?.class}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <div className={`badge ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </div>
                      {app.tuitionId?.isActive && (
                        <div className="badge badge-success">Active</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">৳{app.expectedSalary}</div>
                    <div className="text-sm text-base-content/60">per month</div>
                  </div>
                </div>

                {app.tuitionId && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <span className="text-sm text-base-content/60">Location:</span>
                      <p className="font-semibold">{app.tuitionId.location}</p>
                    </div>
                    <div>
                      <span className="text-sm text-base-content/60">Schedule:</span>
                      <p className="font-semibold">{app.tuitionId.schedule}</p>
                    </div>
                    <div>
                      <span className="text-sm text-base-content/60">Budget:</span>
                      <p className="font-semibold">৳{app.tuitionId.budget}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-sm font-semibold">Your Qualifications:</p>
                  <p className="text-sm text-base-content/80">{app.qualifications}</p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/tuitions/${app.tuitionId?._id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    <FaEye className="mr-1" /> View Tuition
                  </Link>
                  {app.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleEdit(app)}
                        className="btn btn-sm btn-primary"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(app._id, app.status)}
                        className="btn btn-sm btn-error"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </>
                  )}
                </div>

                {app.status === 'Approved' && (
                  <div className="alert alert-success mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Congratulations! You've been hired for this tuition.</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingApp && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-4">Edit Application</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Qualifications *</span></label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={editingApp.qualifications}
                  onChange={(e) => setEditingApp({ ...editingApp, qualifications: e.target.value })}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Experience *</span></label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={editingApp.experience}
                  onChange={(e) => setEditingApp({ ...editingApp, experience: e.target.value })}
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Expected Salary (৳/month) *</span></label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={editingApp.expectedSalary}
                  onChange={(e) => setEditingApp({ ...editingApp, expectedSalary: e.target.value })}
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label"><span className="label-text">Message</span></label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={editingApp.message || ''}
                  onChange={(e) => setEditingApp({ ...editingApp, message: e.target.value })}
                />
              </div>

              <div className="modal-action">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Application
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

export default MyApplications;
