import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Building,
  Shield,
  Moon,
  Bell,
  LogOut,
  Camera
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import API_BASE_URL from '../config';


const ProfileScreen = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    doctor_name: 'User',
    email: 'user@research.edu',
    statistics: {
      total_analyses: 0,
      safe_count: 0,
      high_risk_count: 0
    }
  });

  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/analysis/dashboard/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            doctor_name: data.doctor_name,
            email: data.email || 'user@research.edu',
            statistics: data.statistics
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar-circle">
            <User size={48} color="#2563EB" />
          </div>
          <div className="avatar-edit-btn">
            <Camera size={16} />
          </div>
        </div>

        <h2 className="profile-name">{profileData.doctor_name}</h2>
        <p className="profile-email">{profileData.email}</p>
        <div className="profile-role">Molecular Research Scientist</div>
      </div>

      {/* Content */}
      <div className="profile-section-container">
        
        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard icon={FlaskConical} color="#3B82F6" value={profileData.statistics.total_analyses} label="Total Analyses" />
          <StatCard icon={CheckCircle2} color="#10B981" value={profileData.statistics.safe_count} label="Safe Results" />
          <StatCard icon={AlertTriangle} color="#EF4444" value={profileData.statistics.high_risk_count} label="High Risk" />
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h3 className="info-section-title">Account Information</h3>
          <InfoItem icon={Mail} color="#2563EB" label="Email Address" value={profileData.email} />
          <InfoItem icon={Building} color="#0D9488" label="Organization" value="BioPharma Research Institute" />
          <InfoItem icon={Shield} color="#8B5CF6" label="Access Level" value="Premium Researcher" />
        </div>

        {/* Preferences Section */}
        <div className="info-section">
          <h3 className="info-section-title">Preferences</h3>
          <ToggleItem icon={Moon} color="#1E293B" title="Dark Mode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <ToggleItem icon={Bell} color="#F59E0B" title="Push Notifications" checked={notifications} onChange={() => setNotifications(!notifications)} />
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 700 }}>DiaSafe AI v2.1.0</div>
          <div style={{ color: '#CBD5E1', fontSize: 11, marginTop: 4 }}>© 2026 Molecular AI Lab</div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

/* Components */

const StatCard = ({ icon: Icon, color, value, label }) => (
  <div className="stat-card">
    <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15`, color }}>
      <Icon size={20} />
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const InfoItem = ({ icon: Icon, color, label, value }) => (
  <div className="info-item">
    <div className="info-icon-wrapper" style={{ backgroundColor: `${color}15`, color }}>
      <Icon size={20} />
    </div>
    <div className="info-text-group">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  </div>
);

const ToggleItem = ({ icon: Icon, color, title, checked, onChange }) => (
  <div className="toggle-group">
    <div className="toggle-info">
      <div className="info-icon-wrapper" style={{ backgroundColor: `${color}15`, color }}>
        <Icon size={20} />
      </div>
      <div className="info-value">{title}</div>
    </div>
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  </div>
);

export default ProfileScreen;