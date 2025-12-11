import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBookOpen,
  FaUserGraduate,
  FaHandshake,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaDollarSign,
} from 'react-icons/fa';
import api from '../../utils/api';

const Home = () => {
  const [latestTuitions, setLatestTuitions] = useState([]);
  const [latestTutors, setLatestTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestData();
  }, []);

  const fetchLatestData = async () => {
    try {
      // These endpoints will be implemented in the server
      const [tuitionsRes, tutorsRes] = await Promise.all([
        api.get('/tuitions/latest').catch(() => ({ data: { tuitions: [] } })),
        api.get('/users/tutors/latest').catch(() => ({ data: { tutors: [] } })),
      ]);

      setLatestTuitions(tuitionsRes.data.tuitions || []);
      setLatestTutors(tutorsRes.data.tutors || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Find Your Perfect Match
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 mb-8">
              Connect with qualified tutors or discover exciting tuition opportunities across
              Bangladesh
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
              <Link to="/tuitions" className="btn btn-primary btn-lg">
                <FaBookOpen className="mr-2" />
                Browse Tuitions
              </Link>
              <Link to="/tutors" className="btn btn-outline btn-lg">
                <FaUserGraduate className="mr-2" />
                Find Tutors
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { label: 'Active Tutors', value: '500+' },
                { label: 'Students Helped', value: '2000+' },
                { label: 'Success Rate', value: '95%' },
                { label: 'Subjects', value: '15+' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest Tuition Posts */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Latest Tuition Opportunities</h2>

            {loading ? (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : latestTuitions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestTuitions.slice(0, 6).map((tuition, index) => (
                  <motion.div
                    key={tuition._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <div className="card-body">
                      <h3 className="card-title text-primary">{tuition.subject}</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Class:</strong> {tuition.class}
                        </p>
                        <p>
                          <strong>Location:</strong> {tuition.location}
                        </p>
                        <p>
                          <strong>Budget:</strong> ৳{tuition.budget}/month
                        </p>
                        <p>
                          <strong>Schedule:</strong> {tuition.schedule}
                        </p>
                      </div>
                      <div className="card-actions justify-end mt-4">
                        <Link to={`/tuitions/${tuition._id}`} className="btn btn-primary btn-sm">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No tuitions available yet. Be the first to post!</p>
                <Link to="/dashboard/student" className="btn btn-primary mt-4">
                  Post a Tuition
                </Link>
              </div>
            )}

            {latestTuitions.length > 0 && (
              <div className="text-center mt-8">
                <Link to="/tuitions" className="btn btn-outline btn-lg">
                  View All Tuitions
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Latest Tutors */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Meet Our Top Tutors</h2>

            {loading ? (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : latestTutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestTutors.slice(0, 6).map((tutor, index) => (
                  <motion.div
                    key={tutor._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="card bg-base-100 shadow-xl"
                  >
                    <figure className="px-10 pt-10">
                      <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={tutor.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                            alt={tutor.name}
                          />
                        </div>
                      </div>
                    </figure>
                    <div className="card-body items-center text-center">
                      <h3 className="card-title">{tutor.name}</h3>
                      <div className="badge badge-primary">{tutor.role}</div>
                      <p className="text-sm text-gray-600">{tutor.email}</p>
                      {tutor.isVerified && (
                        <div className="badge badge-success gap-2">
                          <FaCheckCircle /> Verified
                        </div>
                      )}
                      <div className="card-actions mt-4">
                        <Link to={`/tutors/${tutor._id}`} className="btn btn-primary btn-sm">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No tutors available yet.</p>
              </div>
            )}

            {latestTutors.length > 0 && (
              <div className="text-center mt-8">
                <Link to="/tutors" className="btn btn-outline btn-lg">
                  View All Tutors
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-center mb-4">How Bashar Teacher Works</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Simple, transparent, and efficient process to connect students with tutors
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaUserGraduate className="text-5xl text-primary" />,
                  title: 'Step 1: Create Profile',
                  description:
                    'Students post tuition requirements, tutors create detailed profiles with qualifications',
                },
                {
                  icon: <FaHandshake className="text-5xl text-secondary" />,
                  title: 'Step 2: Match & Apply',
                  description:
                    'Tutors browse and apply to suitable tuitions. Students review applications and choose the best fit',
                },
                {
                  icon: <FaCheckCircle className="text-5xl text-accent" />,
                  title: 'Step 3: Start Learning',
                  description:
                    'Secure payment processing, then tutoring begins. Track progress through our platform',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-linear-to-br from-primary/20 to-secondary/20 p-6 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-linear-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-center mb-4">Why Choose Bashar Teacher?</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We provide a secure, efficient, and trusted platform for quality education
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FaShieldAlt className="text-4xl text-primary" />,
                  title: 'Verified Tutors',
                  description: 'All tutors are verified with proper credentials',
                },
                {
                  icon: <FaDollarSign className="text-4xl text-success" />,
                  title: 'Secure Payments',
                  description: 'Safe and encrypted payment processing',
                },
                {
                  icon: <FaStar className="text-4xl text-warning" />,
                  title: 'Quality Assured',
                  description: 'Rating and review system for transparency',
                },
                {
                  icon: <FaClock className="text-4xl text-info" />,
                  title: '24/7 Support',
                  description: 'Always here to help you succeed',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="card bg-base-100 shadow-xl"
                >
                  <div className="card-body items-center text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="card-title text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and tutors on Bashar Teacher today
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="btn btn-lg bg-white text-primary hover:bg-gray-100">
                Register Now
              </Link>
              <Link
                to="/about"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
