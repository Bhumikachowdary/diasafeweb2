import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, Check, Info, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';

const AnalyzingScreen = ({ smiles, sdf_content, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: "Processing molecular structure", subtitle: "Parsing SMILES notation" },
    { title: "Analyzing chemical properties", subtitle: "Computing molecular descriptors" },
    { title: "Integrating bioinformatics data", subtitle: "Checking protein interactions" },
    { title: "Running AI toxicity model", subtitle: "Predicting safety profile" }
  ];

  useEffect(() => {
    const performAnalysis = async () => {
      const token = localStorage.getItem('token');
      
      const body = smiles ? { smiles } : { sdf_content };

      try {
          const apiPromise = fetch(`${API_BASE_URL}/api/analysis/create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
          });

          // Animation sequence
          const progressIntervals = [
              { delay: 1500, prog: 25, step: 1 },
              { delay: 3500, prog: 50, step: 2 },
              { delay: 5500, prog: 75, step: 3 },
              { delay: 8000, prog: 100, step: 4 }
          ];

          progressIntervals.forEach((item, index) => {
              setTimeout(async () => {
                  setProgress(item.prog);
                  setCurrentStepIndex(item.step);
                  
                  if (index === progressIntervals.length - 1) {
                      try {
                          const res = await apiPromise;
                          if (res.ok) {
                              const data = await res.json();
                              onComplete(data);
                          } else {
                              alert("Analysis failed. Please try again.");
                              window.location.reload();
                          }
                      } catch (err) {
                           alert("Network Error: " + err.message);
                           window.location.reload();
                      }
                  }
              }, item.delay);
          });
      } catch (err) {
          alert("Error starting analysis: " + err.message);
      }
    };

    performAnalysis();
  }, [smiles, sdf_content, onComplete]);

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: 0, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Animated Icon Container */}
        <div style={{ 
          width: 90, 
          height: 90, 
          borderRadius: 28, 
          background: 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 32,
          boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
          position: 'relative'
        }}>
          <FlaskConical size={44} color="white" />
          <div style={{ 
            position: 'absolute', 
            width: '120%', 
            height: '120%', 
            borderRadius: 36, 
            border: '2px solid #2563EB', 
            opacity: 0.3,
            animation: 'pulse 2s infinite' 
          }}></div>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1E293B', marginBottom: 8, textAlign: 'center' }}>Analyzing Compound</h2>
        <p style={{ color: '#64748B', fontSize: 16, marginBottom: 48, textAlign: 'center' }}>Our AI models are processing your request</p>

        {/* Steps Card */}
        <div style={{ width: '100%', backgroundColor: 'white', padding: 28, borderRadius: 28, marginBottom: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
          {steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: index === steps.length - 1 ? 0 : 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
                <div style={{ 
                  width: 28, 
                  height: 28, 
                  borderRadius: '50%', 
                  backgroundColor: index < currentStepIndex ? '#10B981' : (index === currentStepIndex ? '#3B82F6' : '#E2E8F0'),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                  transition: 'background-color 0.5s ease',
                  color: 'white'
                }}>
                  {index < currentStepIndex ? <Check size={18} /> : (index === currentStepIndex ? <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white' }}></div> : null)}
                </div>
                {index < steps.length - 1 && (
                  <div style={{ 
                    width: 2, 
                    flex: 1, 
                    backgroundColor: index < currentStepIndex ? '#10B981' : '#E2E8F0',
                    marginTop: 4,
                    marginBottom: -4,
                    transition: 'background-color 0.5s ease'
                  }}></div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: index === currentStepIndex ? 800 : 500,
                  color: index === currentStepIndex ? '#1E293B' : '#94A3B8',
                  transition: 'color 0.5s ease'
                }}>{step.title}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Display */}
        <div style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 24, marginBottom: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800, color: '#64748B', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Progress</span>
            <span style={{ fontWeight: 900, color: '#2563EB', fontSize: 18 }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: 12, backgroundColor: '#F1F5F9', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #3B82F6, #10B981)',
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#94A3B8' }}>
            <Loader2 className="animate-spin" size={18} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Running massive-scale simulations...</span>
        </div>

        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
            100% { transform: scale(1); opacity: 0.3; }
          }
          .animate-spin {
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
