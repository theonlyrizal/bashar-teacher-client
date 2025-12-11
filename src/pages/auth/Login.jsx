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
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const { loginWithEmail, loginWithGoogle, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [adminToken, setAdminToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data;
      if (isAdminLogin) {
        // Admin Token Login
        data = await loginAsAdmin(adminToken); 
      } else {
        // Regular Login
        data = await loginWithEmail(email, password);
      }
      
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
      // Toast handled in context
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
           {isAdminLogin ? 'Admin Portal' : 'Login to Bashar Teacher'}
        </h1>
      </div>

      <form onSubmit={handleLogin}>
        <fieldset className={`fieldset border-base-300 rounded-box w-xs md:w-96 border p-4 shadow-xl ${isAdminLogin ? 'bg-error/5 border-error/30' : 'bg-base-200'}`}>
          <legend className={`text-3xl font-bold px-2 ${isAdminLogin ? 'text-error' : 'text-primary'}`}>
            {isAdminLogin ? 'Admin Token' : 'Login'}
          </legend>

          {isAdminLogin ? (
            // Admin Token Input
            <div className="form-control w-full">
               <label className="label font-semibold">Secure Admin Token</label>
               <input
                 type="password"
                 className="input w-full input-error"
                 placeholder="Enter secure token"
                 value={adminToken}
                 onChange={(e) => setAdminToken(e.target.value)}
                 required
               />
               <label className="label text-xs text-base-content/60">
                  Enter the server-side ADMIN_TOKEN to bypass authentication.
               </label>
            </div>
          ) : (
            // Regular Email/Pass Inputs
            <>
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-base-content/50 hover:text-base-content/70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
            </>
          )}

          <button type="submit" className={`btn mt-6 w-full ${isAdminLogin ? 'btn-error text-white' : 'btn-primary'}`} disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : (isAdminLogin ? 'Authenticate' : 'Login')}
          </button>

          {!isAdminLogin && (
            <>
              <div className="divider my-4">OR</div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-primary w-full"
                disabled={loading}
              >
                <FaGoogle /> <p>Continue with Google</p>
              </button>
            </>
          )}

          <div className="mt-4 text-center">
             <div className="form-control">
               <label className="label cursor-pointer justify-center gap-2">
                 <input 
                   type="checkbox" 
                   checked={isAdminLogin} 
                   onChange={(e) => setIsAdminLogin(e.target.checked)} 
                   className="checkbox checkbox-error checkbox-sm"
                 />
                 <span className={`label-text font-medium ${isAdminLogin ? 'text-error' : 'text-base-content/60'}`}>Login as Admin</span>
               </label>
             </div>
          </div>
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
