import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaChalkboardTeacher } from 'react-icons/fa';
import { TutorContext } from '../../context/TutorContext/TutorContext';
import toast from 'react-hot-toast';

const TutorDetails = () => {
  const { id } = useParams();
  const { getTutor } = useContext(TutorContext);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorDetails();
  }, [id]);

  const fetchTutorDetails = async () => {
    setLoading(true);
    const data = await getTutor(id);
    if (data.tutor) {
      setTutor(data.tutor);
    } else {
      toast.error('Failed to load tutor details');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tutor Not Found</h2>
          <Link to="/tutors" className="btn btn-primary">
            Browse Tutors
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
          className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header / Banner */}
          <div className="bg-primary h-32 md:h-48"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-base-100 ring-offset-2">
                  <img src={tutor.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} alt={tutor.name} />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{tutor.name}</h1>
                <div className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <FaMapMarkerAlt className="text-primary" />
                  {tutor.location || 'Location not provided'}
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-secondary" /> About Me
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {tutor.about || "This tutor hasn't added a bio yet."}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-accent" />
                  <span>{tutor.email}</span>
                </div>
                {tutor.phone && (
                   <div className="flex items-center gap-3 text-gray-700">
                    <FaPhone className="text-success" />
                    <span>{tutor.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center md:text-left">
              <Link to="/tutors" className="btn btn-outline">
                Back to Tutors
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorDetails;
