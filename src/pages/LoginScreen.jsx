import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus, FlaskConical } from 'lucide-react';
import API_BASE_URL from '../config';


const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access);
        navigate('/dashboard');
      } else {
        alert(data.detail || 'Login failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please sign in.');
        setActiveTab('signin');
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Brand Section */}
        <div className="logo-container">
          <div className="logo-circle" style={{ width: 60, height: 60, borderRadius: 16, background: '#EFF6FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Science size={32} color="#2563EB" />
          </div>
        </div>
        
        <h1 className="brand-title">
          <span className="brand-diasafe">DiaSafe</span> <span className="brand-ai">AI</span>
        </h1>
        <p className="brand-subtitle">Molecular Toxicity Analysis for Diabetics</p>

        <div className="auth-card">
          <div className="tab-selector">
            <button 
              className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button 
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={activeTab === 'signin' ? handleSignIn : handleSignUp}>
            <div className="input-group">
              <label className="input-label">Username</label>
              <div className="input-field-wrapper">
                <LogIn className="input-icon" />
                <input 
                  type="text" 
                  name="username"
                  className="input-field"
                  placeholder="Enter your username" 
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {activeTab === 'signup' && (
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-field-wrapper">
                  <Mail className="input-icon" />
                  <input 
                    type="email" 
                    name="email"
                    className="input-field"
                    placeholder="name@university.edu" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-field-wrapper">
                <Lock className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="input-field"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="input-action-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div className="input-field-wrapper">
                  <Lock className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword"
                    className="input-field"
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === 'signin' && (
              <div className="forgot-password">
                <span onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 600, fontSize: 13 }}>Forgot Password?</span>
              </div>
            )}

            <button type="submit" className="primary-btn" disabled={loading} style={{ marginTop: 12 }}>
              {loading ? <div className="loader"></div> : (
                <>
                  {activeTab === 'signin' ? "Sign In" : "Create Account"}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer-link">
            {activeTab === 'signin' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <span onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}>
              {activeTab === 'signin' ? "Create one now" : "Sign In instead"}
            </span>
          </div>
        </div>

        <p className="terms-text">
          By continuing, you agree to DiaSafe AI's<br />
          <b>Terms of Service</b> and <b>Privacy Policy</b>.
        </p>
      </div>
    </div>
  );
};

// Add missing icon for the brand (using FileText as placeholder if Science isn't found)
const Science = (props) => <FlaskConical {...props} />;
const ArrowRight = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default LoginScreen;
