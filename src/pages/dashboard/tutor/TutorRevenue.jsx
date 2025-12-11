import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const TutorRevenue = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    completedPayments: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response = await api.get('/payments/tutor-revenue');
      if (response.data.success) {
        setPayments(response.data.payments);

        const completed = response.data.payments.filter((p) => p.status === 'Completed');
        const totalRevenue = completed.reduce((sum, p) => sum + (p.tutorAmount || 0), 0);

        setStats({
          totalRevenue,
          completedPayments: completed.length,
          totalTransactions: response.data.payments.length,
        });
      }
    } catch (error) {
      console.error('Error fetching revenue:', error);
      toast.error('Failed to load revenue data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
      <h1 className="text-3xl font-bold mb-6">Revenue History</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-success text-success-content">
          <div className="card-body">
            <h2 className="card-title">Total Revenue</h2>
            <p className="text-4xl font-bold">৳{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm opacity-80">From {stats.completedPayments} tuitions</p>
          </div>
        </div>

        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Completed Payments</h2>
            <p className="text-4xl font-bold">{stats.completedPayments}</p>
            <p className="text-sm opacity-80">Successfully received</p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h2 className="card-title">Average per Tuition</h2>
            <p className="text-4xl font-bold">
              ৳
              {stats.completedPayments > 0
                ? Math.round(stats.totalRevenue / stats.completedPayments).toLocaleString()
                : 0}
            </p>
            <p className="text-sm opacity-80">Per completed payment</p>
          </div>
        </div>
      </div>

      {/* Revenue Table */}
      {payments.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <FaMoneyBillWave className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No Revenue Yet</h3>
          <p className="text-gray-600">Start getting hired to earn revenue</p>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Tuition</th>
                    <th>Total Amount</th>
                    <th>Platform Fee (5%)</th>
                    <th>Your Earning</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td>{formatDate(payment.createdAt)}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 rounded-full">
                              <img
                                src={
                                  payment.studentId?.photoURL ||
                                  'https://i.ibb.co/4pDNDk1/avatar.png'
                                }
                                alt={payment.studentId?.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{payment.studentId?.name}</div>
                            <div className="text-sm text-gray-600">{payment.studentId?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-semibold">{payment.tuitionId?.subject}</div>
                        <div className="text-sm text-gray-600">{payment.tuitionId?.class}</div>
                      </td>
                      <td className="font-bold">৳{payment.amount?.toLocaleString()}</td>
                      <td className="text-error">-৳{payment.platformFee?.toLocaleString()}</td>
                      <td className="font-bold text-success">
                        ৳{payment.tutorAmount?.toLocaleString()}
                      </td>
                      <td className="text-sm font-mono">{payment.transactionId}</td>
                      <td>
                        <div
                          className={`badge ${
                            payment.status === 'Completed' ? 'badge-success' : 'badge-warning'
                          }`}
                        >
                          {payment.status === 'Completed' && <FaCheckCircle className="mr-1" />}
                          {payment.status}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Platform Fee Notice */}
      <div className="alert alert-info mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Bashar Teacher charges a 5% platform fee on all transactions to maintain and improve our
          services.
        </span>
      </div>
    </div>
  );
};

export default TutorRevenue;
