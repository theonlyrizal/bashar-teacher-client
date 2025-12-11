import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import SectionBody from '../../components/shared/SectionBody';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Validation States
  const [sixChar, setSixChar] = useState(false);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time Validation for Password
    if (name === 'password') {
      value.length >= 6 ? setSixChar(true) : setSixChar(false);
      /[A-Z]/.test(value) ? setUpper(true) : setUpper(false);
      /[a-z]/.test(value) ? setLower(true) : setLower(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!sixChar || !upper || !lower) {
      toast.error('Please meet all password requirements!');
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
      
      toast.success('Registration and Login Successful!');

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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionBody>
      <div className="flex flex-col justify-center items-center p-5">
        <h1 className="text-primary text-4xl font-bold">
           Create Account
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs md:w-96 border p-4 shadow-xl">
          <legend className="text-3xl text-primary font-bold px-2">Register</legend>

          <label className="label font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="label font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className="input w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="label font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="0123456789"
            className="input w-full"
            value={formData.phone}
            onChange={handleChange}
          />

          <label className="label font-semibold">Register As</label>
          <select
            name="role"
            className="select w-full"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value={ROLES.STUDENT}>Student</option>
            <option value={ROLES.TUTOR}>Tutor</option>
          </select>
          
          <label className="label font-semibold">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="input w-full pr-10"
              placeholder="Min 6 chars"
              value={formData.password}
              onChange={handleChange}
              required
            />
             <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Validation Feedback */}
          <div className="mt-2 pl-1">
            <ul className="text-sm space-y-1">
              <li className={`${sixChar ? 'text-success' : 'text-error'} flex items-center transition-colors duration-200`}>
                <FaArrowRight className="mr-2 text-xs" /> 6 characters long
              </li>
              <li className={`${upper ? 'text-success' : 'text-error'} flex items-center transition-colors duration-200`}>
                <FaArrowRight className="mr-2 text-xs" /> At least one Upper Case
              </li>
              <li className={`${lower ? 'text-success' : 'text-error'} flex items-center transition-colors duration-200`}>
                <FaArrowRight className="mr-2 text-xs" /> At least one Lower Case
              </li>
            </ul>
          </div>

          <label className="label font-semibold mt-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="input w-full"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className="btn btn-primary mt-6 w-full duration-300" 
            disabled={loading || !(sixChar && upper && lower)}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Register'}
          </button>
        </fieldset>
      </form>
      
      <div className="mt-4">
        <Link className="text-primary underline font-medium" to="/login" state={location.state}>
          Already have an account? Login
        </Link>
      </div>
    </SectionBody>
  );
};

export default Register;
