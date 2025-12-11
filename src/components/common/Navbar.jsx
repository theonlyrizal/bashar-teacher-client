import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLocalStorage from '../../hooks/useLocalStorage';

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [isDark, setIsDark] = useLocalStorage('darkMode', false);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'basharteacher-dark' : 'basharteacher');
  }, [isDark]);

  const handleLogout = () => {
    logout();
  };

  const navLinks = (
    <>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'rounded-full')} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'rounded-full')} to="/tuitions">
          Tuitions
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'rounded-full')} to="/tutors">
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'rounded-full')} to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'rounded-full')} to="/contact">
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-2 z-50 rounded-full w-[95%] md:w-[90%] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-x-2"
          >
            {/* {loading ? <div className="skeleton h-auto w-32"></div> : navLinks} */}
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          বাসার Teacher
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {/* {loading ? (
            <div className="flex space-x-2">
              <div className="skeleton h-8 w-28"></div>
              <div className="skeleton h-8 w-28"></div>
              <div className="skeleton h-8 w-28"></div>
            </div>
          ) : (
            navLinks
          )} */}
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-2 md:gap-4">
        {user ? (
          <div className="dropdown dropdown-end hover:cursor-pointer">
            <div tabIndex={0} role="button">
              <div className="join h-10 items-center max-w-[180px] overflow-hidden">
                <img
                  className="join-item h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border border-base-300"
                  src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                  alt="user avatar"
                />
                <p className="px-2 text-sm font-semibold truncate hidden md:block">{user.displayName || user.name}</p>
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-100 w-52 p-2 shadow-sm border border-base-200"
            >
             <li className="menu-title px-4 py-2">
                <span className="font-bold">{user.displayName || user.name}</span>
                <span className="text-xs text-primary badge badge-ghost mt-1">{user.role}</span>
              </li>
              <li>
                <Link
                  to={
                    user.role === 'Admin'
                      ? '/dashboard/admin'
                      : user.role === 'Tutor'
                      ? '/dashboard/tutor'
                      : '/dashboard/student'
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile">Profile Settings</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error btn-sm mt-2 hover:text-white"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="join rounded-full">
            <Link
              to="/login"
              className="btn btn-sm md:btn-md btn-ghost hover:bg-transparent"
            >
              Login
            </Link>
             <Link
              to="/register"
              className="btn btn-sm md:btn-md btn-primary rounded-full text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
      <div className="pl-3">
        <label className="swap swap-rotate text-primary">
          {/* Controlled checkbox */}
          <input type="checkbox" checked={isDark} onChange={() => setIsDark(!isDark)} />

          {/* Moon icon - shown when checked (dark mode) */}
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>

          {/* Sun icon - shown when unchecked (light mode) */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
