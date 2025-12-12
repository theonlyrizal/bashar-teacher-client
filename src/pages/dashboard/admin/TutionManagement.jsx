import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AdminContext } from '../../../context/AdminContext/AdminContext';

const TuitionManagement = () => {
  const { adminTuitions: tuitions, loading, fetchAdminTuitions, updateTuitionStatus } = useContext(AdminContext);
  const [filter, setFilter] = useState('Pending');

  useEffect(() => {
    fetchAdminTuitions();
  }, []);

  const handleApprove = async (tuitionId) => {
    if (!window.confirm('Approve this tuition posting?')) return;
    await updateTuitionStatus(tuitionId, 'Approved');
  };

  const handleReject = async (tuitionId) => {
    if (!window.confirm('Reject this tuition posting? The student will be notified.')) return;
    await updateTuitionStatus(tuitionId, 'Rejected');
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'badge-warning',
      Approved: 'badge-success',
      Rejected: 'badge-error'
    };
    return badges[status] || 'badge-ghost';
  };

  const filteredTuitions = mb_filter(tuitions);

  function mb_filter(ts) {
    if (!ts) return [];
    if (filter === 'All') return ts;
    return ts.filter(t => t.status === filter);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tuition Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-warning text-black">
          <div className="card-body">
            <h2 className="card-title text-sm">Pending Review</h2>
            <p className="text-3xl font-bold">{tuitions ? tuitions.filter(t => t.status === 'Pending').length : 0}</p>
          </div>
        </div>
        <div className="card bg-success text-white">
          <div className="card-body">
            <h2 className="card-title text-sm">Approved</h2>
            <p className="text-3xl font-bold">{tuitions ? tuitions.filter(t => t.status === 'Approved').length : 0}</p>
          </div>
        </div>
        <div className="card bg-error text-white">
          <div className="card-body">
            <h2 className="card-title text-sm">Rejected</h2>
            <p className="text-3xl font-bold">{tuitions ? tuitions.filter(t => t.status === 'Rejected').length : 0}</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['Pending', 'Approved', 'Rejected', 'All'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-ghost'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tuitions List */}
      {filteredTuitions.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">No {filter} Tuitions</h3>
          <p className="text-base-content/60">No tuitions match the current filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTuitions.map((tuition, index) => (
            <motion.div
              key={tuition._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="card-title text-2xl text-primary">
                      {tuition.subject} - {tuition.class}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <div className={`badge ${getStatusBadge(tuition.status)}`}>
                        {tuition.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-success">৳{tuition.budget}</div>
                    <div className="text-sm text-base-content/60">per month</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <span className="text-sm text-base-content/60">Location:</span>
                    <p className="font-semibold">{tuition.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-base-content/60">Schedule:</span>
                    <p className="font-semibold">{tuition.schedule}</p>
                  </div>
                  <div>
                    <span className="text-sm text-base-content/60">Duration:</span>
                    <p className="font-semibold">{tuition.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-base-content/60">Posted:</span>
                    <p className="font-semibold">{new Date(tuition.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {tuition.requirements && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-1">Requirements:</h4>
                    <p className="text-base-content/80 text-sm">{tuition.requirements}</p>
                  </div>
                )}

                {/* Student Info */}
                <div className="mt-4 p-4 bg-base-200 rounded-lg">
                  <h4 className="font-semibold mb-2">Posted By:</h4>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img 
                          src={tuition.studentId?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
                          alt={tuition.studentId?.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{tuition.studentId?.name}</div>
                      <div className="text-sm text-base-content/60">{tuition.studentId?.email}</div>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/tuitions/${tuition._id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    <FaEye className="mr-1" /> View Details
                  </Link>
                  {tuition.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleReject(tuition._id)}
                        className="btn btn-error btn-sm"
                      >
                        <FaTimesCircle className="mr-1" /> Reject
                      </button>
                      <button
                        onClick={() => handleApprove(tuition._id)}
                        className="btn btn-success btn-sm"
                      >
                        <FaCheckCircle className="mr-1" /> Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TuitionManagement;
