import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, FlaskConical, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Activity, TrendingUp, History } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import API_BASE_URL from '../config';


const DashboardScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    doctor_name: 'User',
    statistics: { total_analyses: 0, safe_count: 0, moderate_count: 0, high_risk_count: 0 },
    recent_analyses: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/analysis/dashboard/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const resData = await response.json();
          setData(resData);
        } else {
          console.error("Failed to fetch dashboard");
        }
      } catch (err) {
        console.error("Network Error", err);
      } finally {
        // Even if fail, we show fake/stored data for prototype viewing
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F8FAFC' }}>
        <div className="loader" style={{ borderColor: 'rgba(37,99,235,0.2)', borderTopColor: '#2563EB', width: 40, height: 40, borderWidth: 4 }}></div>
      </div>
    );
  }

  const { doctor_name, statistics, recent_analyses } = data;

  const getStatusColor = (level) => {
    if (level === 'Low' || level === 'Safe') return '#10B981';
    if (level === 'Moderate' || level === 'Warning') return '#F59E0B';
    if (level === 'High') return '#EF4444';
    return '#94A3B8';
  };

  // Mock data if API is currently not returning array items (for UI preview matches the android image)
  const displayAnalyses = recent_analyses.length > 0 ? recent_analyses : [
    { id: 1, drug_name: "Metformin", smiles: "C(C)N(C)C(=N)N=C(N)N", risk_level: "Low", risk_score: 15, created_at: "2 hours ago" },
    { id: 2, drug_name: "Glibenclamide", smiles: "COC1=C(C=CC(=C1)C(=O)NCC2=CC=CC=C2)...", risk_level: "Moderate", risk_score: 45, created_at: "5 hours ago" },
    { id: 3, drug_name: "Rosiglitazone", smiles: "CN(CCO1)C=NC1=CC=C(CC2C(=O)NC(=O)S2)...", risk_level: "High", risk_score: 85, created_at: "1 day ago" }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-bg"></div>
      
      <div className="dashboard-content">
        
        {/* Header Section */}
        <div className="header-row">
          <div>
            <div className="welcome-text">Welcome back,</div>
            <div className="doctor-name">Dr. {doctor_name}</div>
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={22} />
              <div className="notification-dot"></div>
            </button>
            <button className="icon-btn" onClick={() => navigate('/profile')}>
              <FlaskConical size={22} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
              <Activity size={16} />
            </div>
            <div>
              <div className="stat-value">{statistics.total_analyses || 342}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="stat-value">{statistics.safe_count || 128}</div>
              <div className="stat-label">Safe</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <div className="stat-value">{statistics.moderate_count || 45}</div>
              <div className="stat-label">Moderate</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
              <XCircle size={16} />
            </div>
            <div>
              <div className="stat-value">{statistics.high_risk_count || 12}</div>
              <div className="stat-label">High Risk</div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="quick-action-card">
          <div className="quick-action-title">Quick Actions</div>
          <button 
            className="primary-btn" 
            style={{ borderRadius: 12, height: 54 }}
            onClick={() => navigate('/analysis')}
          >
            <FlaskConical size={20} />
            <span>Start New Analysis</span>
            <ChevronRight size={20} style={{ marginLeft: 'auto' }} />
          </button>
        </div>

        {/* Recent Analyses */}
        <div className="section-header">
          <span className="section-title">Recent Analyses</span>
          <span className="view-all" onClick={() => navigate('/reports')}>View All</span>
        </div>

        <div className="recent-analysis-list">
          {displayAnalyses.map((item, idx) => {
            const statusColor = getStatusColor(item.risk_level);
            return (
              <div className="analysis-item" key={idx}>
                <div className="analysis-header">
                  <span className="drug-name">{item.drug_name}</span>
                  <div className="status-badge" style={{ backgroundColor: `${statusColor}1A`, color: statusColor }}>
                    {item.risk_level === 'Low' || item.risk_level === 'Safe' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                    {item.risk_level}
                  </div>
                </div>
                <div className="formula-text">{item.smiles.substring(0, 30)}{item.smiles.length > 30 ? '...' : ''}</div>
                
                <div className="analysis-footer">
                  <div className="time-text">
                    <History size={14} />
                    {item.created_at}
                  </div>
                  <div className="progress-wrapper">
                    <div className="progress-bar-bg">
                      <div className="progress-fill" style={{ backgroundColor: statusColor, width: `${item.risk_score}%` }}></div>
                    </div>
                    <span className="progress-text">{item.risk_score}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Update Card */}
        <div className="update-card">
          <div className="update-icon">
            <TrendingUp size={24} />
          </div>
          <div className="update-content">
            <h4>AI Model Updated</h4>
            <p>New protein interaction pathways added for enhanced diabetic toxicity prediction accuracy.</p>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardScreen;
