import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../components/common/Loading';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'Admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else if (user.role === 'Tutor') {
      return <Navigate to="/dashboard/tutor" replace />;
    } else {
      return <Navigate to="/dashboard/student" replace />;
    }
  }

  return children;
};

export default RoleBasedRoute;
