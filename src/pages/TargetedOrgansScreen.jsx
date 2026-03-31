import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Download, CheckCircle2, Activity, ArrowRight, Info, LayoutGrid } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const TargetedOrgansScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || {
    primary_target_organs: ["Liver", "Kidney", "Heart"],
    organ_toxicity_profile: [
      { organ: "Liver", affinity: 85, description: "High metabolic processing potential with minimal hepatocyte stress detected." },
      { organ: "Kidney", affinity: 65, description: "Standard renal clearance pathway with no significant tubular toxicity." },
      { organ: "Heart", affinity: 45, description: "Low myocardial interaction, maintaining stable cardiac rhythm parameters." }
    ]
  };

  const organArray = result.organ_toxicity_profile;
  const topThree = result.primary_target_organs.join(" → ");

  return (
    <div className="dashboard-container" style={{ backgroundColor: 'white', paddingBottom: 0 }}>
      {/* Gradient Header */}
      <div style={{ 
        background: 'linear-gradient(180deg, #2563EB 0%, #0D9488 100%)', 
        padding: '40px 20px 24px', 
        color: 'white' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white' }}>
              <Share2 size={20} />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white' }}>
              <Download size={20} />
            </button>
          </div>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Targeted Organs</h1>
        <p style={{ opacity: 0.8, fontSize: 14 }}>Organ Toxicity Profile</p>
      </div>

      <div className="dashboard-content" style={{ padding: '24px 16px 40px' }}>
        {/* Stepper Placeholder */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, overflowX: 'auto', padding: '10px 0' }}>
            {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    backgroundColor: step === 3 ? '#10B981' : (step < 3 ? '#3B82F6' : '#E2E8F0'),
                    color: step <= 3 ? 'white' : '#94A3B8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0
                }}>
                    {step < 3 ? <CheckCircle2 size={16} /> : step}
                </div>
            ))}
        </div>

        {/* Organ Distribution Card */}
        <div style={{ 
          background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)', 
          borderRadius: 20, 
          padding: 20, 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 12, marginRight: 16 }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>Organ Distribution</div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>Tissue-specific targeting profile</div>
          </div>
        </div>

        {/* Primary Target Organs Card */}
        <div style={{ backgroundColor: '#F0F9FF', borderRadius: 20, padding: 24, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 'bold', color: '#64748B', letterSpacing: '0.05em', marginBottom: 12 }}>PRIMARY TARGET ORGANS</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#1E293B' }}>{topThree}</div>
        </div>

        {/* Organ Toxicity Analysis List */}
        <h2 style={{ fontWeight: 'bold', fontSize: 18, color: '#1E293B', marginBottom: 16 }}>Organ Toxicity Analysis</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {organArray.map((item, idx) => (
            <div key={idx} style={{ 
              backgroundColor: 'white', 
              borderRadius: 20, 
              padding: 24, 
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              border: '1px solid #F1F5F9'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: '#1E293B', marginBottom: 4 }}>{item.organ}</div>
              <div style={{ color: '#2563EB', fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>Affinity: {item.affinity}%</div>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5 }}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Clinical Notes Box */}
        <div style={{ backgroundColor: '#FDF2F8', borderRadius: 20, padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B', marginBottom: 16 }}>Clinical Notes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              "Affinity percentages based on receptor binding and tissue distribution studies",
              "Higher affinity indicates greater potential for organ-specific effects",
              "Monitoring recommended for organs with affinity > 70%"
            ].map((note, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#D946EF', fontWeight: 'bold' }}>•</span>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.4 }}>{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button 
          onClick={() => navigate('/side-effects', { state: { result } })}
          style={{ 
            width: '100%', 
            height: 56, 
            borderRadius: 16, 
            border: 'none',
            background: 'linear-gradient(90deg, #2563EB 0%, #0D9488 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(13, 148, 136, 0.2)',
            marginBottom: 40
          }}
        >
          Next: Side Effects
          <ArrowRight size={18} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default TargetedOrgansScreen;
