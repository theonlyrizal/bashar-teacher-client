import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaReceipt } from 'react-icons/fa';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const StudentPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments/student-payments');
      if (response.data.success) {
        setPayments(response.data.payments);
        
        // Calculate stats
        const completed = response.data.payments.filter(p => p.status === 'Completed');
        const totalAmount = completed.reduce((sum, p) => sum + p.amount, 0);
        
        setStats({
          total: response.data.payments.length,
          completed: completed.length,
          totalAmount
        });
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Total Payments</h2>
            <p className="text-4xl font-bold">{stats.total}</p>
          </div>
        </div>
        
        <div className="card bg-success text-success-content">
          <div className="card-body">
            <h2 className="card-title">Completed</h2>
            <p className="text-4xl font-bold">{stats.completed}</p>
          </div>
        </div>
        
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h2 className="card-title">Total Spent</h2>
            <p className="text-4xl font-bold">৳{stats.totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      {payments.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <FaReceipt className="text-6xl text-base-content/20 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No Payments Yet</h3>
          <p className="text-base-content/60">Your payment history will appear here</p>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Tutor</th>
                    <th>Tuition</th>
                    <th>Amount</th>
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
                                src={payment.tutorId?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
                                alt={payment.tutorId?.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{payment.tutorId?.name}</div>
                            <div className="text-sm text-base-content/60">{payment.tutorId?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-semibold">{payment.tuitionId?.subject}</div>
                        <div className="text-sm text-base-content/60">{payment.tuitionId?.class}</div>
                      </td>
                      <td className="font-bold text-success">৳{payment.amount.toLocaleString()}</td>
                      <td className="text-sm font-mono">{payment.transactionId}</td>
                      <td>
                        <div className={`badge ${payment.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
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
    </div>
  );
};

export default StudentPayments;
