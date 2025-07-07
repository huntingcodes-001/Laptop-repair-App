import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Login from './pages/Login';
import SetupProfile from './pages/SetupProfile';
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/team" element={<Layout><Team /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/setup-profile" element={<Layout><SetupProfile /></Layout>} />
          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard/customer" 
            element={
              <ProtectedRoute requiredRole="customer" requireProfile={true}>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute requiredRole="admin" requireProfile={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/employee" 
            element={
              <ProtectedRoute requiredRole="employee" requireProfile={true}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect old dashboard route */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;