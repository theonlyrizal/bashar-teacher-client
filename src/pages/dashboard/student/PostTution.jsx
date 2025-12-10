import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { CLASSES, SUBJECTS, DIVISIONS } from '../../../utils/constants';

const PostTuition = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    class: '',
    location: '',
    budget: '',
    schedule: '',
    duration: '',
    requirements: '',
    contactInfo: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post('/tuitions', formData);
      if (response.data.success) {
        toast.success('Tuition posted successfully! Awaiting admin approval.');
        navigate('/dashboard/student/my-tuitions');
      }
    } catch (error) {
      console.error('Post tuition error:', error);
      toast.error(error.response?.data?.message || 'Failed to post tuition');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">Post New Tuition</h1>
        <p className="text-gray-600">Fill in the details to find the perfect tutor</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject *</span>
                </label>
                <select
                  name="subject"
                  className="select select-bordered"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Class/Grade *</span>
                </label>
                <select
                  name="class"
                  className="select select-bordered"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  {CLASSES.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Location *</span>
                </label>
                <select
                  name="location"
                  className="select select-bordered"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Location</option>
                  {DIVISIONS.map(division => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Budget (৳/month) *</span>
                </label>
                <input
                  type="number"
                  name="budget"
                  className="input input-bordered"
                  placeholder="e.g., 5000"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Schedule/Days *</span>
                </label>
                <input
                  type="text"
                  name="schedule"
                  className="input input-bordered"
                  placeholder="e.g., Monday, Wednesday, Friday"
                  value={formData.schedule}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Duration *</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  className="input input-bordered"
                  placeholder="e.g., 6 months, 1 year"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-semibold">Additional Requirements</span>
              </label>
              <textarea
                name="requirements"
                className="textarea textarea-bordered h-32"
                placeholder="Describe any specific requirements, qualifications needed, or additional information..."
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-semibold">Contact Information</span>
              </label>
              <input
                type="text"
                name="contactInfo"
                className="input input-bordered"
                placeholder="Phone number or preferred contact method"
                value={formData.contactInfo}
                onChange={handleChange}
              />
            </div>

            <div className="alert alert-info mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Your tuition will be reviewed by an admin before being published to tutors.</span>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard/student')}
                className="btn btn-ghost"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? <span className="loading loading-spinner"></span> : 'Post Tuition'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostTuition;
