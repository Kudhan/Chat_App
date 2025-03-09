import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage, SignUpPage, SettingsPage, ProfilePage } from './pages';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Use useEffect to check authentication status on initial render
  useEffect(() => {
    checkAuth();  // Check if the user is authenticated
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
