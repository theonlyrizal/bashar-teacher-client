import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const OngoingTuitions = () => {
  const [ongoingTuitions, setOngoingTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOngoingTuitions();
  }, []);

  const fetchOngoingTuitions = async () => {
    try {
      const response = await api.get('/applications/approved');
      if (response.data.success) {
        setOngoingTuitions(response.data.applications);
      }
    } catch (error) {
      console.error('Error fetching ongoing tuitions:', error);
      toast.error('Failed to load ongoing tuitions');
    } finally {
      setLoading(false);
    }
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
      <h1 className="text-3xl font-bold mb-6">Ongoing Tuitions</h1>

      {ongoingTuitions.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <FaCheckCircle className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No Ongoing Tuitions</h3>
          <p className="text-gray-600 mb-6">
            Once your applications are approved, they will appear here
          </p>
          <Link to="/dashboard/tutor/applications" className="btn btn-primary">
            View My Applications
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {ongoingTuitions.map((application, index) => {
            const tuition = application.tuitionId;
            const student = tuition?.studentId;

            return (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="card-title text-2xl text-primary">
                        {tuition?.subject} - {tuition?.class}
                      </h2>
                      <div className="badge badge-success mt-2">
                        <FaCheckCircle className="mr-1" /> Approved
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-success">
                        ৳{application.expectedSalary}
                      </div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </div>

                  {tuition && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />
                        <div>
                          <div className="text-xs text-gray-600">Location</div>
                          <div className="font-semibold">{tuition.location}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Schedule</div>
                        <div className="font-semibold">{tuition.schedule}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Duration</div>
                        <div className="font-semibold">{tuition.duration}</div>
                      </div>
                    </div>
                  )}

                  {tuition?.requirements && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-1">Requirements:</h4>
                      <p className="text-gray-700 text-sm">{tuition.requirements}</p>
                    </div>
                  )}

                  {/* Student Info */}
                  {student && (
                    <div className="mt-6 p-4 bg-base-200 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FaUser /> Student Information
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img
                              src={student.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                              alt={student.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.email}</div>
                          {student.phone && (
                            <div className="text-sm text-gray-600">{student.phone}</div>
                          )}
                        </div>
                      </div>
                      {tuition.contactInfo && (
                        <div className="mt-3">
                          <div className="text-sm font-semibold">Contact:</div>
                          <div className="text-sm text-gray-700">{tuition.contactInfo}</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="card-actions justify-end mt-4">
                    <Link to={`/tuitions/${tuition?._id}`} className="btn btn-outline btn-sm">
                      View Full Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
