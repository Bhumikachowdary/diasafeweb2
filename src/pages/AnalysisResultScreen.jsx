import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Check, FileText, ArrowRight, Sparkles } from 'lucide-react';

const AnalysisResultScreen = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Home Button */}
      <button 
        onClick={() => navigate('/dashboard')}
        style={{
          position: 'fixed',
          top: 40,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: 'white',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        <Home size={24} color="#334155" />
      </button>

      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100 }}>
        
        {/* Success Icon */}
        <div style={{ 
          width: 100, 
          height: 100, 
          borderRadius: 28, 
          background: 'linear-gradient(180deg, #4ADE80, #22C55E)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
          boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)'
        }}>
          <Check size={48} color="white" />
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>Analysis Complete!</h2>
        <p style={{ color: '#64748B', fontSize: 16, marginBottom: 40 }}>Choose how you'd like to view your results</p>

        {/* Report Options */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <ReportOption 
            icon={FileText}
            iconBg="#3B82F6"
            title="Detailed Report"
            description="Step-by-step comprehensive analysis covering all aspects"
            points={["Toxicity Analysis", "Protein Regulation", "Targeted Organs", "Side Effects", "Safer Concentration"]}
            onClick={() => navigate('/detailed-report', { state: { result } })}
          />

          <ReportOption 
            icon={FileText}
            iconBg="#9333EA"
            title="Final Report"
            description="Executive summary with key findings and recommendations"
            points={["Overall Assessment", "Key Findings Summary", "Clinical Recommendations"]}
            isQuick={true}
            onClick={() => navigate('/final-report', { state: { result } })}
          />

        </div>

        {/* Info Box */}
        <div style={{ 
          marginTop: 32,
          width: '100%', 
          backgroundColor: '#EFF6FF', 
          borderRadius: 16, 
          padding: 16, 
          display: 'flex', 
          gap: 16, 
          alignItems: 'center' 
        }}>
          <div style={{ color: '#3B82F6' }}>
            <Sparkles size={32} />
          </div>
          <p style={{ fontSize: 13, color: '#334155', lineHeight: '1.4' }}>
            You can always access both views later from your saved reports. The detailed report provides in-depth analysis, while the final report gives you a quick overview.
          </p>
        </div>

        <div style={{ height: 40 }}></div>
      </div>
    </div>
  );
};

const ReportOption = ({ icon: Icon, iconBg, title, description, points, onClick, isQuick }) => (
  <div 
    onClick={onClick}
    className="quick-action-card" 
    style={{ 
      margin: 0, 
      padding: 20, 
      borderRadius: 24, 
      display: 'flex', 
      alignItems: 'center', 
      cursor: 'pointer',
      transition: 'transform 0.2s',
      border: '1px solid #F1F5F9'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ 
      width: 52, 
      height: 52, 
      borderRadius: 16, 
      backgroundColor: iconBg, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexShrink: 0
    }}>
      <Icon size={28} color="white" />
    </div>

    <div style={{ flex: 1, padding: '0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <h4 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B' }}>{title}</h4>
        {isQuick && (
          <span style={{ 
            fontSize: 10, 
            fontWeight: 800, 
            color: '#9333EA', 
            backgroundColor: '#F3E8FF', 
            padding: '4px 8px', 
            borderRadius: 8 
          }}>Quick</span>
        )}
      </div>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>{description}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ 
              width: 4, 
              height: 4, 
              borderRadius: '50%', 
              backgroundColor: (p === "Toxicity Analysis" || p === "Overall Assessment") ? '#3B82F6' : (p === "Protein Regulation" || p === "Key Findings Summary" ? '#9333EA' : '#64748B') 
            }}></div>
            <span style={{ fontSize: 13, color: '#334155' }}>{p}</span>
          </div>
        ))}
      </div>
    </div>

    <ArrowRight size={20} color="#CBD5E1" />
  </div>
);

export default AnalysisResultScreen;
