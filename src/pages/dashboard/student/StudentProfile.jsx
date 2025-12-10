import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    photoURL: user?.photoURL || ''
  });
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateUserProfile(formData);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card bg-base-100 shadow-xl max-w-2xl"
      >
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src={formData.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
                  alt={formData.name}
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="badge badge-primary mt-2">{user?.role}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={user?.email}
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">Email cannot be changed</span>
              </label>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="input input-bordered"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                className="input input-bordered"
                placeholder="Enter image URL"
                value={formData.photoURL}
                onChange={handleChange}
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Provide a direct link to your profile picture
                </span>
              </label>
            </div>

            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn btn-primary btn-wide"
                disabled={updating}
              >
                {updating ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;
