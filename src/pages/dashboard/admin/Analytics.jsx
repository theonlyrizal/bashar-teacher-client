import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaUsers, FaBook, FaChartLine } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    platformFees: 0,
    totalTransactions: 0,
    avgTransaction: 0,
    totalUsers: 0,
    totalTuitions: 0,
  });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [earningsRes, usersRes, tuitionsRes] = await Promise.all([
        api.get('/payments/platform-earnings'),
        api.get('/users'),
        api.get('/tuitions/pending'),
      ]);

      const stats = earningsRes.data.stats || {};
      setAnalytics({
        totalRevenue: stats.totalRevenue || 0,
        platformFees: stats.totalPlatformFees || 0,
        totalTransactions: stats.totalTransactions || 0,
        avgTransaction: stats.averageTransaction || 0,
        totalUsers: usersRes.data.users?.length || 0,
        totalTuitions: tuitionsRes.data.tuitions?.length || 0,
      });

      setPayments(earningsRes.data.payments || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
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
      <h1 className="text-3xl font-bold mb-6">Platform Analytics</h1>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-linear-to-br from-primary to-primary/70 text-primary-content">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-sm opacity-90">Total Revenue</h2>
                <p className="text-3xl font-bold mt-2">
                  ৳{analytics.totalRevenue.toLocaleString()}
                </p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-success to-success/70 text-success-content">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-sm opacity-90">Platform Fees (5%)</h2>
                <p className="text-3xl font-bold mt-2">
                  ৳{analytics.platformFees.toLocaleString()}
                </p>
              </div>
              <FaChartLine className="text-4xl opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-secondary to-secondary/70 text-secondary-content">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-sm opacity-90">Transactions</h2>
                <p className="text-3xl font-bold mt-2">{analytics.totalTransactions}</p>
              </div>
              <FaBook className="text-4xl opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-accent to-accent/70 text-accent-content">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-sm opacity-90">Avg Transaction</h2>
                <p className="text-3xl font-bold mt-2">
                  ৳{Math.round(analytics.avgTransaction).toLocaleString()}
                </p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Platform Metrics</h2>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-2xl text-primary" />
                  <span className="font-semibold">Total Users</span>
                </div>
                <span className="text-2xl font-bold">{analytics.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBook className="text-2xl text-secondary" />
                  <span className="font-semibold">Total Tuitions</span>
                </div>
                <span className="text-2xl font-bold">{analytics.totalTuitions}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-2xl text-success" />
                  <span className="font-semibold">Revenue per User</span>
                </div>
                <span className="text-2xl font-bold">
                  ৳
                  {analytics.totalUsers > 0
                    ? Math.round(analytics.totalRevenue / analytics.totalUsers).toLocaleString()
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue Breakdown</h2>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Platform Fees (5%)</span>
                  <span className="font-bold">৳{analytics.platformFees.toLocaleString()}</span>
                </div>
                <progress
                  className="progress progress-success"
                  value={analytics.platformFees}
                  max={analytics.totalRevenue}
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Tutor Earnings (95%)</span>
                  <span className="font-bold">
                    ৳{(analytics.totalRevenue - analytics.platformFees).toLocaleString()}
                  </span>
                </div>
                <progress
                  className="progress progress-primary"
                  value={analytics.totalRevenue - analytics.platformFees}
                  max={analytics.totalRevenue}
                ></progress>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Revenue</span>
                <span className="text-success">৳{analytics.totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Transactions</h2>
          {payments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No transactions yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Tutor</th>
                    <th>Amount</th>
                    <th>Platform Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(0, 10).map((payment, index) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                      <td>{payment.studentId?.name}</td>
                      <td>{payment.tutorId?.name}</td>
                      <td className="font-bold">৳{payment.amount?.toLocaleString()}</td>
                      <td className="text-success">৳{payment.platformFee?.toLocaleString()}</td>
                      <td>
                        <div
                          className={`badge ${
                            payment.status === 'Completed' ? 'badge-success' : 'badge-warning'
                          }`}
                        >
                          {payment.status}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
