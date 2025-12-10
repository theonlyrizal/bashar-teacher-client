import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    
    setLoading(true);
    
    try {
      await registerWithEmail(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.phone
      );
      
      // Redirect based on role
      if (formData.role === 'Admin') {
        navigate('/dashboard/admin');
      } else if (formData.role === 'Tutor') {
        navigate('/dashboard/tutor');
      } else {
        navigate('/dashboard/student');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
            Create Account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="input input-bordered"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Register As</span>
              </label>
              <select
                name="role"
                className="select select-bordered"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value={ROLES.STUDENT}>Student</option>
                <option value={ROLES.TUTOR}>Tutor</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password (min 6 characters)"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="input input-bordered"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Register'}
            </button>
          </form>
          
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
