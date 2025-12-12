import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Pages
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ErrorPage from '../pages/error/ErrorPage';
import Tutors from '../pages/tutors/Tutors';
import TutorDetails from '../pages/tutors/TutorDetails';
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import TuitionsListing from '../pages/tuitions/TutionListings';
import TuitionDetails from '../pages/tuitions/TutionsDetails';
import StudentDashboard from '../pages/dashboard/student/StudentDashboard';
import MyTuitions from '../pages/dashboard/student/MyTutions';
import PostTuition from '../pages/dashboard/student/PostTution';
import AppliedTutors from '../pages/dashboard/student/AppliedTutors';
import StudentPayments from '../pages/dashboard/student/StudentPayments';
import StudentProfile from '../pages/dashboard/student/StudentProfile';
import TutorDashboard from '../pages/dashboard/tutor/TutorDashboard';
import MyApplications from '../pages/dashboard/tutor/MyApplications';
import TutorRevenue from '../pages/dashboard/tutor/TutorRevenue';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import UserManagement from '../pages/dashboard/admin/UserManagement';
import TuitionManagement from '../pages/dashboard/admin/TutionManagement';
import Analytics from '../pages/dashboard/admin/Analytics';
import PaymentSuccessPage from '../pages/dashboard/student/PaymentSuccessPage';
import Profile from '../pages/profile/Profile';
import OngoingTuitions from '../pages/dashboard/tutor/OngoingTuitions';

// Dashboard Pages

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/tuitions',
        element: <TuitionsListing />,
      },
      {
        path: '/tuitions/:id',
        element: <TuitionDetails />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tutors',
        element: <Tutors />,
      },
      {
        path: '/tutors/:id',
        element: <TutorDetails />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      // Student Dashboard Routes
      {
        path: '/dashboard/student',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <StudentDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student/my-tuitions',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <MyTuitions />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student/post-tuition',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <PostTuition />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student/applied-tutors',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <AppliedTutors />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student/applied-tutors/:tuitionId',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <AppliedTutors />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student/payments',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <StudentPayments />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/student/profile',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <StudentProfile />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // --- NEW STRIPE SUCCESS ROUTE ---
      {
        // Note: This path should match the success_url format from your backend,
        // but the query parameters are handled by the component, not the path definition itself.
        path: '/dashboard/payment/success',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Student']}>
              <PaymentSuccessPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // Tutor Dashboard Routes
      {
        path: '/dashboard/tutor',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Tutor']}>
              <TutorDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/tutor/applications',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Tutor']}>
              <MyApplications />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/tutor/ongoing',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Tutor']}>
              <OngoingTuitions />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/tutor/revenue',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Tutor']}>
              <TutorRevenue />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // Admin Dashboard Routes
      {
        path: '/dashboard/admin',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/admin/users',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Admin']}>
              <UserManagement />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/admin/tuitions',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Admin']}>
              <TuitionManagement />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/admin/analytics',
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['Admin']}>
              <Analytics />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // 404
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
