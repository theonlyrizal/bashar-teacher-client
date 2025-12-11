import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaUserGraduate, FaMoneyBillWave, FaPlus } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import api from '../../../utils/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTuitions: 0,
    approvedTuitions: 0,
    totalApplications: 0,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get('/student/stats');
      const data = res.data;

      setStats({
        totalTuitions: data.totalTuitions || 0,
        approvedTuitions: data.approvedTuitions || 0,
        totalApplications: data.totalApplications || 0,
        totalPayments: data.totalSpent || 0, // Using totalSpent (amount) as requested, or switch to totalPayments (count) if user meant count. Code below uses FaMoneyBillWave so Amount is better.
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'My Tuitions',
      value: stats.totalTuitions,
      icon: <FaBook className="text-4xl" />,
      color: 'bg-primary',
      link: '/dashboard/student/my-tuitions',
    },
    {
      title: 'Approved Tuitions',
      value: stats.approvedTuitions,
      icon: <FaUserGraduate className="text-4xl" />,
      color: 'bg-success',
      link: '/dashboard/student/my-tuitions',
    },
    {
      title: 'Applications Received',
      value: stats.totalApplications,
      icon: <FaUserGraduate className="text-4xl" />,
      color: 'bg-secondary',
      link: '/dashboard/student/applied-tutors',
    },
    {
      title: 'Total Spent',
      value: `৳${stats.totalPayments.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-4xl" />,
      color: 'bg-accent',
      link: '/dashboard/student/payments',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's your tuition management overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className={`card ${stat.color} text-white shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-white/90 text-sm">{stat.title}</h2>
                    <p className="text-4xl font-bold mt-2">
                      {loading ? <span className="loading loading-spinner"></span> : stat.value}
                    </p>
                  </div>
                  <div className="opacity-50">{stat.icon}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-base-100 shadow-xl mb-8"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/student/post-tuition" className="btn btn-primary btn-lg">
              <FaPlus className="mr-2" /> Post New Tuition
            </Link>
            <Link to="/dashboard/student/my-tuitions" className="btn btn-outline btn-lg">
              <FaBook className="mr-2" /> View My Tuitions
            </Link>
            <Link to="/dashboard/student/applied-tutors" className="btn btn-outline btn-lg">
              <FaUserGraduate className="mr-2" /> View Applications
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Getting Started Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-linear-to-r from-primary/10 to-secondary/10"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">How to Find a Tutor</h2>
          <div className="steps steps-vertical lg:steps-horizontal">
            <div className="step step-primary">Post a tuition requirement</div>
            <div className="step step-primary">Review applications from tutors</div>
            <div className="step">Accept a tutor & complete payment</div>
            <div className="step">Start learning!</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
