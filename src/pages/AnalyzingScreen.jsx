import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, Check, Info } from 'lucide-react';
import API_BASE_URL from '../config';


const AnalyzingScreen = ({ smiles, onComplete }) => {
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
      
      // We start the real API call
      const apiPromise = fetch(`${API_BASE_URL}/api/analysis/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ smiles })
      });

      // We fake the progress for about 8 seconds minimum to show the steps
      const progressIntervals = [
          { delay: 1500, prog: 25, step: 1 },
          { delay: 3500, prog: 50, step: 2 },
          { delay: 5500, prog: 75, step: 3 },
          { delay: 8000, prog: 100, step: 4 }
      ];

      progressIntervals.forEach((item, index) => {
          setTimeout(() => {
              setProgress(item.prog);
              setCurrentStepIndex(item.step);
              
              if (index === progressIntervals.length - 1) {
                  // When animation reaches 100%, wait for API if not done, or call complete
                  apiPromise.then(async (res) => {
                      if (res.ok) {
                          const data = await res.json();
                          onComplete(data);
                      } else {
                          alert("Analysis failed. Please try again.");
                      }
                  }).catch(err => {
                      alert("Network Error: " + err.message);
                  });
              }
          }, item.delay);
      });
    };

    performAnalysis();
  }, [smiles, onComplete]);

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: 0 }}>
      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80 }}>
        
        {/* Top Icon */}
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 24, 
          background: 'linear-gradient(180deg, #3B82F6, #10B981)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <FlaskConical size={40} color="white" />
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>Analyzing Compound</h2>
        <p style={{ color: '#64748B', fontSize: 15, marginBottom: 40 }}>Please wait while we process your request</p>

        {/* Steps Card */}
        <div className="quick-action-card" style={{ width: '100%', padding: 24, borderRadius: 24, marginBottom: 24 }}>
          {steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: index === steps.length - 1 ? 0 : 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  backgroundColor: index < currentStepIndex ? '#10B981' : (index === currentStepIndex ? '#3B82F6' : '#E2E8F0'),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2
                }}>
                  {index < currentStepIndex ? <Check size={16} color="white" /> : (index === currentStepIndex ? <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white' }}></div> : null)}
                </div>
                {index < steps.length - 1 && (
                  <div style={{ 
                    width: 2, 
                    flex: 1, 
                    height: 20,
                    backgroundColor: index < currentStepIndex ? '#10B981' : '#E2E8F0',
                    marginTop: 4,
                    marginBottom: -4
                  }}></div>
                )}
              </div>
              <div>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: index === currentStepIndex ? 700 : 500,
                  color: index === currentStepIndex ? '#1E293B' : '#64748B'
                }}>{step.title}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Card */}
        <div className="quick-action-card" style={{ width: '100%', padding: 20, borderRadius: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 500, color: '#64748B' }}>Overall Progress</span>
            <span style={{ fontWeight: 800, color: '#2563EB' }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: 10, backgroundColor: '#F1F5F9', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #3B82F6, #10B981)',
              transition: 'width 1s ease-in-out'
            }}></div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', lineHeight: 1.5 }}>
          This may take 30-60 seconds depending on<br />molecular complexity
        </p>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
