import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/tuitions">Tuitions</Link></li>
      <li><Link to="/tutors">Tutors</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          <span className="text-primary">e</span>TuitionBD
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} alt={user.name} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{user.name}</span>
                <span className="text-xs text-primary">{user.role}</span>
              </li>
              <li>
                <Link to={
                  user.role === 'Admin' ? '/dashboard/admin' :
                  user.role === 'Tutor' ? '/dashboard/tutor' :
                  '/dashboard/student'
                }>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile">Profile Settings</Link>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
