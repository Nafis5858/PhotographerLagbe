import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PhotographerProfile from './pages/PhotographerProfile';
import PhotographerDashboard from './pages/PhotographerDashboard';
import PhotographerList from './pages/PhotographerList';
import PhotographerDetail from './pages/PhotographerDetail';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/photographers" element={<PhotographerList />} />
            <Route path="/photographers/:id" element={<PhotographerDetail />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/photographer/action" 
              element={
                <ProtectedRoute allowedRoles={['photographer']}>
                  <PhotographerProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/photographer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['photographer']}>
                  <PhotographerDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
