import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClipboardList, FaCheckCircle, FaMoneyBillWave, FaSearch } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import api from '../../../utils/api';

const TutorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalApplications: 0,
    approvedApplications: 0,
    pendingApplications: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get('/tutor/stats');
      const data = res.data;

      setStats({
        totalApplications: data.totalApplications || 0,
        approvedApplications: data.approvedApplications || 0,
        pendingApplications: data.pendingApplications || 0,
        totalRevenue: data.totalRevenue || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: <FaClipboardList className="text-4xl" />,
      color: 'text-primary',
      link: '/dashboard/tutor/applications',
    },
    {
      title: 'Approved',
      value: stats.approvedApplications,
      icon: <FaCheckCircle className="text-4xl" />,
      color: 'text-success',
      link: '/dashboard/tutor/ongoing',
    },
    {
      title: 'Pending',
      value: stats.pendingApplications,
      icon: <FaClipboardList className="text-4xl" />,
      color: 'text-warning',
      link: '/dashboard/tutor/applications',
    },
    {
      title: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-4xl" />,
      color: 'text-accent',
      link: '/dashboard/tutor/revenue',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-base-content/70">Track your tutoring applications and revenue</p>
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
              className={`card shadow-xl hover:shadow-2xl transition-all`}
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-base-content/70 text-sm">{stat.title}</h2>
                    <p className={`text-4xl font-bold mt-2 ${stat.color}`}>
                      {loading ? <span className="loading loading-spinner"></span> : stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
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
            <Link to="/tuitions" className="btn btn-primary btn-lg">
              <FaSearch className="mr-2" /> Browse Tuitions
            </Link>
            <Link to="/dashboard/tutor/applications" className="btn btn-outline btn-lg">
              <FaClipboardList className="mr-2" /> My Applications
            </Link>
            <Link to="/dashboard/tutor/ongoing" className="btn btn-outline btn-lg">
              <FaCheckCircle className="mr-2" /> Ongoing Tuitions
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
          <h2 className="card-title text-2xl mb-4">How to Get Hired</h2>
          <div className="steps steps-vertical lg:steps-horizontal">
            <div className="step step-primary">Browse available tuitions</div>
            <div className="step step-primary">Submit your application</div>
            <div className="step">Get approved by student</div>
            <div className="step">Start earning!</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorDashboard;
