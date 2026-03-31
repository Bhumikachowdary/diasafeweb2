import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Filter, CheckCircle2, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import API_BASE_URL from '../config';


const ReportsScreen = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/analysis/history/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      
      {/* Header Block Gradient */}
      <div style={{ background: 'linear-gradient(180deg, #2563EB 0%, #0D9488 100%)', padding: 24, paddingBottom: 40, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 12 }}>
            <FileText size={24} color="white" />
          </div>
          <div style={{ marginLeft: 16 }}>
            <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Saved Reports</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{reports.length} analysis reports</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, height: 50, padding: '0 16px' }}>
          <Search size={20} color="gray" style={{ marginRight: 12 }} />
          <input 
            type="text" 
            placeholder="Search reports..." 
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }}
          />
          <Filter size={20} color="#3B82F6" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <div className="dashboard-content" style={{ padding: '24px 16px', marginTop: -20 }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reports.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'gray' }}>No reports found.</div>
            ) : (
              reports.map((report, idx) => {
                const isSafe = report.risk_level === 'SAFE' || report.risk_level === 'LOW';
                const isWarning = report.risk_level === 'HIGH';
                const statusColor = isSafe ? '#22C55E' : isWarning ? '#EF4444' : '#F59E0B';
                
                return (
                  <div key={idx} className="analysis-item" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B' }}>{report.name || 'Analysis ' + report.id}</div>
                        <div style={{ fontSize: 12, color: 'gray', marginTop: 4 }}>{report.smiles.substring(0, 30)}{report.smiles.length > 30 ? '...' : ''}</div>
                      </div>
                      
                      <div style={{ backgroundColor: `${statusColor}1A`, padding: '4px 8px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {isSafe ? <CheckCircle2 size={14} color={statusColor} /> : <AlertTriangle size={14} color={statusColor} />}
                        <span style={{ fontSize: 12, fontWeight: 'bold', color: statusColor }}>{report.risk_level}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                      <div style={{ fontSize: 14, color: 'gray' }}>Toxicity Score</div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1E293B' }}>{report.risk_score}%</div>
                    </div>

                    <div className="progress-bar-bg" style={{ marginTop: 8, height: 8 }}>
                      <div className="progress-fill" style={{ backgroundColor: statusColor, width: `${report.risk_score}%` }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', color: 'gray', fontSize: 13 }}>
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        {new Date(report.created_at).toLocaleDateString()}
                      </div>
                      <div 
                        onClick={() => navigate('/detailed-report', { state: { result: report } })}
                        style={{ color: '#3B82F6', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      >
                        View Details
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ReportsScreen;
