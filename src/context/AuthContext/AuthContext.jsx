import { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import toast from 'react-hot-toast';
import { auth } from '../../config/firebase.config';
import api from '../../utils/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Register with email and password
  const registerWithEmail = async (name, email, password, role, phone) => {
    try {
      // Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Register in backend
      const response = await api.post('/auth/register', {
        name,
        email,
        role,
        phone,
        photoURL: userCredential.user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png',
        firebaseUid: userCredential.user.uid,
      });

      if (response.data.success) {
        // Save token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success('Registration successful!');
        return response.data;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Login with email and password
  const loginWithEmail = async (email, password) => {
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Login to backend
      const response = await api.post('/auth/login', {
        email,
        firebaseUid: userCredential.user.uid,
      });

      if (response.data.success) {
        // Save token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success('Login successful!');
        return response.data;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();

      // Send to backend
      const response = await api.post('/auth/google', {
        token,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
        toast.success('Login successful!');
        return response.data;
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.response?.data?.message || 'Google login failed');
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      const response = await api.patch(`/users/${user.id}`, updates);
      if (response.data.success) {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully');
        return response.data;
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  // Check auth status on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if we have user data in localStorage
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } else {
          // Verify with backend
          try {
            const response = await api.get('/auth/verify-token');
            if (response.data.success) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
              setUser(response.data.user);
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    token,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
