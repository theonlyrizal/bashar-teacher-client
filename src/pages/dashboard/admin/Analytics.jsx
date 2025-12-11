import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaUsers, FaBook, FaChartLine } from 'react-icons/fa';
import { AdminContext } from '../../../context/AdminContext/AdminContext';

const Analytics = () => {
  const { stats, adminPayments, loading } = useContext(AdminContext);

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Calculate generic platform fees (5% assumption as per component)
  const platformFees = stats.totalRevenue * 0.05;
  const avgTransaction = stats.totalTransactions > 0 ? stats.totalRevenue / stats.totalTransactions : 0;

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
                  ৳{stats.totalRevenue?.toLocaleString()}
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
                  ৳{platformFees.toLocaleString()}
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
                <p className="text-3xl font-bold mt-2">{stats.totalTransactions}</p>
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
                  ৳{Math.round(avgTransaction).toLocaleString()}
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
                <span className="text-2xl font-bold">{stats.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaBook className="text-2xl text-secondary" />
                  <span className="font-semibold">Total Tuitions</span>
                </div>
                <span className="text-2xl font-bold">{stats.totalTuitions}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-2xl text-success" />
                  <span className="font-semibold">Revenue per User</span>
                </div>
                <span className="text-2xl font-bold">
                  ৳
                  {stats.totalUsers > 0
                    ? Math.round(stats.totalRevenue / stats.totalUsers).toLocaleString()
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
                  <span className="font-bold">৳{platformFees.toLocaleString()}</span>
                </div>
                <progress
                  className="progress progress-success"
                  value={platformFees}
                  max={stats.totalRevenue}
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Tutor Earnings (95%)</span>
                  <span className="font-bold">
                    ৳{(stats.totalRevenue - platformFees).toLocaleString()}
                  </span>
                </div>
                <progress
                  className="progress progress-primary"
                  value={stats.totalRevenue - platformFees}
                  max={stats.totalRevenue}
                ></progress>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Revenue</span>
                <span className="text-success">৳{stats.totalRevenue?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Transactions</h2>
          {(!adminPayments || adminPayments.length === 0) ? (
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
                  {adminPayments.slice(0, 10).map((payment, index) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td>{new Date(payment.createdAt || payment.date).toLocaleDateString()}</td>
                      <td>{payment.studentId?.name || 'Unknown'}</td>
                      <td>{payment.tutorId?.name || 'Unknown'}</td>
                      <td className="font-bold">৳{payment.amount?.toLocaleString()}</td>
                      {/* Assuming logic for fee if not present in payment object, but usually it might be. 
                          If not, calculating 5% dynamically */}
                      <td className="text-success">৳{(payment.platformFee || (payment.amount * 0.05))?.toLocaleString()}</td>
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
