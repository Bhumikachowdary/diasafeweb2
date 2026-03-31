import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import VerifyOTPScreen from './pages/VerifyOTPScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import ResetSuccessScreen from './pages/ResetSuccessScreen';
import DashboardScreen from './pages/DashboardScreen';
import NewAnalysisScreen from './pages/NewAnalysisScreen';
import ReportsScreen from './pages/ReportsScreen';
import ProfileScreen from './pages/ProfileScreen';
import DetailedReportScreen from './pages/DetailedReportScreen';
import FinalReportScreen from './pages/FinalReportScreen';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/verify-otp" element={<VerifyOTPScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/reset-success" element={<ResetSuccessScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/analysis" element={<NewAnalysisScreen />} />
          <Route path="/reports" element={<ReportsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/detailed-report" element={<DetailedReportScreen />} />
          <Route path="/final-report" element={<FinalReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
