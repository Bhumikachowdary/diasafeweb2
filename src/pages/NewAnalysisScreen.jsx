import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Target, UploadCloud, Edit3, Info, ChevronRight, Activity } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import AnalyzingScreen from './AnalyzingScreen';
import AnalysisResultScreen from './AnalysisResultScreen';

const NewAnalysisScreen = () => {
  const navigate = useNavigate();
  const [smilesString, setSmilesString] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('SMILES');
  const [viewState, setViewState] = useState('input'); // 'input', 'analyzing', 'result'
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleStartAnalysis = () => {
    if (!smilesString.trim()) {
      alert("Please enter a SMILES string");
      return;
    }
    setViewState('analyzing');
  };

  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
    setViewState('result');
  };

  if (viewState === 'analyzing') {
    return <AnalyzingScreen smiles={smilesString} onComplete={handleAnalysisComplete} />;
  }

  if (viewState === 'result') {
    return <AnalysisResultScreen result={analysisResult} />;
  }

  return (
    <div className="dashboard-container">
      {/* Background Header */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 140, 
          background: 'linear-gradient(90deg, #2563EB, #0D9488)',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          zIndex: 0
        }}
      ></div>
      
      <div className="dashboard-content" style={{ padding: '32px 24px 20px', position: 'relative', zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginRight: 16 }}
          >
            <ArrowLeft size={24} />
          </button>
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 12, marginRight: 16 }}>
            <Activity size={24} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>New Analysis</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>AI-Powered Toxicity Assessment</div>
          </div>
        </div>

        {/* Card for Method Selection */}
        <div className="quick-action-card" style={{ marginBottom: 16, borderRadius: 20 }}>
          <div className="quick-action-title" style={{ fontSize: 16, marginBottom: 16 }}>Select Input Method</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <MethodItem label="SMILES" icon={Target} isSelected={selectedMethod === 'SMILES'} onClick={() => setSelectedMethod('SMILES')} />
            <MethodItem label="SDF File" icon={UploadCloud} isSelected={selectedMethod === 'SDF File'} onClick={() => setSelectedMethod('SDF File')} />
            <MethodItem label="Draw" icon={Edit3} isSelected={selectedMethod === 'Draw'} onClick={() => setSelectedMethod('Draw')} />
          </div>
        </div>

        {/* Input Methods Content */}
        {selectedMethod === 'SMILES' && (
          <div className="quick-action-card" style={{ marginBottom: 16, borderRadius: 20 }}>
            <div className="quick-action-title" style={{ fontSize: 16, marginBottom: 16 }}>Enter SMILES String</div>
            <textarea 
              value={smilesString}
              onChange={(e) => setSmilesString(e.target.value)}
              placeholder="e.g., CN(C)C(=N)NC(=N)N"
              style={{
                width: '100%',
                height: 120,
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                padding: 16,
                backgroundColor: '#F8FAFC',
                fontSize: 16,
                outline: 'none',
                resize: 'none',
                fontFamily: 'monospace'
              }}
            />
            
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 14, color: 'gray', fontWeight: 500, marginBottom: 8 }}>Quick Examples:</div>
              <ExampleItem name="Metformin" formula="CN(C)C(=N)NC(=N)N" onClick={setSmilesString} />
              <ExampleItem name="Gliclazide" formula="CC1=CC=C(C=C1)S(=O)(=O)NC(=O)NN2CCCCCC2" onClick={setSmilesString} />
              <ExampleItem name="Sitagliptin" formula="C1CN2C(=NN=C2C(F)(F)F)CN1CC(=O)N3CCN(CC3)" onClick={setSmilesString} />
            </div>
          </div>
        )}

        {selectedMethod === 'SDF File' && (
          <div className="quick-action-card" style={{ marginBottom: 16, borderRadius: 20 }}>
            <div className="quick-action-title" style={{ fontSize: 16, marginBottom: 16 }}>Upload SDF File</div>
            <div style={{ height: 180, border: '2px dashed #E2E8F0', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <UploadCloud size={48} color="#2563EB" />
              <div style={{ marginTop: 12, fontWeight: 'bold', color: '#1E293B' }}>Tap to upload SDF file</div>
              <div style={{ fontSize: 12, color: 'gray' }}>Supports .sdf format</div>
            </div>
          </div>
        )}

        {selectedMethod === 'Draw' && (
          <div className="quick-action-card" style={{ marginBottom: 16, borderRadius: 20 }}>
            <div className="quick-action-title" style={{ fontSize: 16, marginBottom: 16 }}>Chemical Structure Drawing</div>
            <div style={{ height: 250, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <Edit3 size={48} color="#CBD5E1" />
              <div style={{ marginTop: 12, color: 'gray' }}>Tap here to start drawing</div>
              <div style={{ fontSize: 12, color: '#CBD5E1' }}>Integration with chemical drawing tool</div>
            </div>
          </div>
        )}

        {/* AI Info Card */}
        <div className="update-card" style={{ marginBottom: 24, borderRadius: 16, backgroundColor: '#EFF6FF' }}>
          <div className="update-icon" style={{ borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#2563EB' }}>
            <Info size={20} />
          </div>
          <div className="update-content">
            <h4 style={{ color: '#1E3A8A' }}>Analysis Information</h4>
            <p style={{ color: 'rgba(30,58,138,0.7)' }}>Our AI model analyzes toxicity specific to diabetic human models, including liver and kidney safety, protein interactions, and therapeutic concentration ranges.</p>
          </div>
        </div>

        {/* Start Button */}
        {selectedMethod === 'SMILES' && (
          <button 
            onClick={handleStartAnalysis}
            className="primary-btn" 
            style={{ 
              borderRadius: 12, 
              height: 56, 
              padding: '0 24px',
              marginBottom: 40, 
              background: 'linear-gradient(90deg, #2563EB, #0D9488)',
              boxShadow: '0 8px 16px rgba(37,99,235,0.2)'
            }}
          >
            <FlaskConical size={20} />
            <span style={{ fontWeight: 700, marginLeft: 10, marginRight: 10 }}>Start Toxicity Analysis</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

const MethodItem = ({ label, icon: Icon, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      flex: 1, 
      height: 80, 
      borderRadius: 12, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
      border: `1px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}
  >
    <Icon size={24} color={isSelected ? '#2563EB' : 'gray'} />
    <div style={{ marginTop: 4, fontSize: 12, fontWeight: 'bold', color: isSelected ? '#2563EB' : 'gray' }}>{label}</div>
  </div>
);

const ExampleItem = ({ name, formula, onClick }) => (
  <div 
    onClick={() => onClick(formula)}
    style={{ padding: 12, backgroundColor: '#F8FAFC', borderRadius: 12, marginBottom: 8, cursor: 'pointer' }}
  >
    <div style={{ fontWeight: 'bold', fontSize: 14, color: '#334155' }}>{name}</div>
    <div style={{ fontSize: 11, color: 'gray', fontFamily: 'monospace', marginTop: 2 }}>{formula}</div>
  </div>
);

export default NewAnalysisScreen;
