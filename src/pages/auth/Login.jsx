import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SectionBody from '../../components/shared/SectionBody';
import { FaGoogle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginWithEmail(email, password);
      // toast.success('Login Successful!'); // optional, native prompt might already handle or user didn't ask for it
      
      // Redirect based on role
      if (data.user.role === 'Admin') {
        navigate('/dashboard/admin');
      } else if (data.user.role === 'Tutor') {
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

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const data = await loginWithGoogle();
      
      // Redirect based on role
      if (data.user.role === 'Admin') {
        navigate('/dashboard/admin');
      } else if (data.user.role === 'Tutor') {
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
           Login to Bashar Teacher
        </h1>
      </div>

      <form onSubmit={handleEmailLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs md:w-96 border p-4 shadow-xl">
          <legend className="text-3xl text-primary font-bold px-2">Login</legend>

          <label className="label font-semibold">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label font-semibold">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input w-full pr-10"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="btn btn-primary mt-4 w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>

          <div className="divider my-4">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-primary w-full"
            disabled={loading}
          >
            <FaGoogle /> <p>Continue with Google</p>
          </button>
        </fieldset>
      </form>

      <div className="mt-4">
        <Link className="text-primary underline font-medium" to="/register" state={location.state}>
          Don't have an account? Register
        </Link>
      </div>
    </SectionBody>
  );
};

export default Login;
