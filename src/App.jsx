import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthProvider from './context/AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
