import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaBook, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import api from '../../../utils/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTutors: 0,
    totalTuitions: 0,
    pendingTuitions: 0,
    totalRevenue: 0,
    totalTransactions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="text-4xl" />,
      color: 'text-primary',
      link: '/dashboard/admin/users',
    },
    {
      title: 'Students',
      value: stats.totalStudents,
      icon: <FaUsers className="text-4xl" />,
      color: 'text-info',
      link: '/dashboard/admin/users',
    },
    {
      title: 'Tutors',
      value: stats.totalTutors,
      icon: <FaUsers className="text-4xl" />,
      color: 'text-secondary',
      link: '/dashboard/admin/users',
    },
    {
      title: 'Pending Tuitions',
      value: stats.pendingTuitions,
      icon: <FaBook className="text-4xl" />,
      color: 'text-warning',
      link: '/dashboard/admin/tuitions',
    },
    {
      title: 'Total Tuitions',
      value: stats.totalTuitions,
      icon: <FaCheckCircle className="text-4xl" />,
      color: 'text-success',
      link: '/dashboard/admin/tuitions',
    },
    {
      title: 'Platform Revenue',
      value: `৳${stats.totalRevenue?.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-4xl" />,
      color: 'text-accent',
      link: '/dashboard/admin/analytics',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-base-content/70">
          Manage users, approve tuitions, and monitor platform performance
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    <h2 className="card-title text-gray-600 text-sm">{stat.title}</h2>
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
        transition={{ delay: 0.6 }}
        className="card bg-base-100 shadow-xl mb-8"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/admin/users" className="btn btn-primary btn-lg">
              <FaUsers className="mr-2" /> Manage Users
            </Link>
            <Link to="/dashboard/admin/tuitions" className="btn btn-outline btn-lg">
              <FaBook className="mr-2" /> Review Tuitions
            </Link>
            <Link to="/dashboard/admin/analytics" className="btn btn-outline btn-lg">
              <FaMoneyBillWave className="mr-2" /> View Analytics
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Platform Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card bg-linear-to-r from-primary/10 to-secondary/10"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Platform Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">User Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span className="font-bold">
                    {stats.totalStudents} (
                    {stats.totalUsers > 0
                      ? Math.round((stats.totalStudents / stats.totalUsers) * 100)
                      : 0}
                    %)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tutors:</span>
                  <span className="font-bold">
                    {stats.totalTutors} (
                    {stats.totalUsers > 0
                      ? Math.round((stats.totalTutors / stats.totalUsers) * 100)
                      : 0}
                    %)
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tuition Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pending Review:</span>
                  <span className="font-bold text-warning">{stats.pendingTuitions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Posted:</span>
                  <span className="font-bold text-success">{stats.totalTuitions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
