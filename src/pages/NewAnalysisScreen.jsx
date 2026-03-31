import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Target, UploadCloud, Edit3, Info, ChevronRight, Activity, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import AnalyzingScreen from './AnalyzingScreen';
import AnalysisResultScreen from './AnalysisResultScreen';

const NewAnalysisScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  
  const [smilesString, setSmilesString] = useState(location.state?.drawResult || '');
  const [selectedMethod, setSelectedMethod] = useState('SMILES');
  const [viewState, setViewState] = useState('input'); // 'input', 'analyzing', 'result'
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sdfContent, setSdfContent] = useState('');

  const handleStartAnalysis = () => {
    if (selectedMethod === 'SMILES') {
        if (!smilesString.trim()) {
            alert("Please enter a SMILES string");
            return;
        }
        setViewState('analyzing');
    } else if (selectedMethod === 'SDF File') {
        if (!sdfContent) {
            alert("Please upload an SDF file first");
            return;
        }
        setViewState('analyzing');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setSdfContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
    setViewState('result');
  };

  if (viewState === 'analyzing') {
    return <AnalyzingScreen 
        smiles={selectedMethod === 'SMILES' ? smilesString : null} 
        sdf_content={selectedMethod === 'SDF File' ? sdfContent : null}
        onComplete={handleAnalysisComplete} 
    />;
  }

  if (viewState === 'result') {
    return <AnalysisResultScreen result={analysisResult} />;
  }

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Background Header Gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(180deg, #2563EB 0%, #0D9488 100%)', zIndex: 0 }}></div>
      
      <div className="dashboard-content" style={{ padding: '40px 24px 100px', position: 'relative', zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          <button 
            onClick={() => navigate('/dashboard')} 
            style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginRight: 16 }}
          >
            <ArrowLeft size={24} />
          </button>
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 12, marginRight: 16 }}>
            <Activity size={24} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 24, fontWeight: 800 }}>New Analysis</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500 }}>AI-Powered Toxicity Assessment</div>
          </div>
        </div>

        {/* Method Selector */}
        <div className="quick-action-card" style={{ marginBottom: 24, borderRadius: 24, padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', marginBottom: 20 }}>Select Input Method</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <MethodTab 
                label="SMILES" 
                icon={Target} 
                isSelected={selectedMethod === 'SMILES'} 
                onClick={() => setSelectedMethod('SMILES')} 
            />
            <MethodTab 
                label="SDF File" 
                icon={UploadCloud} 
                isSelected={selectedMethod === 'SDF File'} 
                onClick={() => setSelectedMethod('SDF File')} 
            />
            <MethodTab 
                label="Draw" 
                icon={Edit3} 
                isSelected={selectedMethod === 'Draw'} 
                onClick={() => navigate('/draw')} 
            />
          </div>
        </div>

        {/* Input Methods Content */}
        {selectedMethod === 'SMILES' && (
          <div className="quick-action-card" style={{ marginBottom: 24, borderRadius: 24, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: '#64748B', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enter SMILES String</div>
            <textarea 
              value={smilesString}
              onChange={(e) => setSmilesString(e.target.value)}
              placeholder="e.g., CN(C)C(=N)NC(=N)N"
              style={{
                width: '100%',
                height: 120,
                borderRadius: 16,
                border: '1.5px solid #E2E8F0',
                padding: 16,
                backgroundColor: '#F8FAFC',
                fontSize: 15,
                fontWeight: 500,
                color: '#334155',
                outline: 'none',
                resize: 'none',
                fontFamily: 'monospace',
                boxSizing: 'border-box'
              }}
            />
            
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 14, color: '#1E293B', fontWeight: 800, marginBottom: 12 }}>Quick Examples:</div>
              <ExampleItem name="Metformin" formula="CN(C)C(=N)NC(=N)N" onClick={setSmilesString} />
              <ExampleItem name="Gliclazide" formula="CC1=CC=C(C=C1)S(=O)(=O)NC(=O)NN2CCCCCC2" onClick={setSmilesString} />
              <ExampleItem name="Sitagliptin" formula="C1CN2C(=NN=C2C(F)(F)F)CN1CC(=O)N3CCN(CC3)" onClick={setSmilesString} />
            </div>
          </div>
        )}

        {selectedMethod === 'SDF File' && (
          <div className="quick-action-card" style={{ marginBottom: 24, borderRadius: 24, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: '#64748B', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upload SDF File</div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".sdf"
              onChange={handleFileChange} 
            />

            {!selectedFile ? (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  style={{ height: 180, border: '2px dashed #CBD5E1', borderRadius: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backgroundColor: '#F8FAFC' }}
                >
                    <div style={{ backgroundColor: '#DBEAFE', padding: 16, borderRadius: '50%', marginBottom: 12 }}>
                        <UploadCloud size={32} color="#2563EB" />
                    </div>
                    <div style={{ fontWeight: 800, color: '#1E293B' }}>Tap to upload SDF file</div>
                    <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Supports .sdf format</div>
                </div>
            ) : (
                <div style={{ padding: 20, border: '1.5px solid #2563EB', backgroundColor: '#EFF6FF', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Activity color="#2563EB" style={{ marginRight: 12 }} />
                        <div>
                            <div style={{ fontWeight: 'bold', color: '#1E40AF', fontSize: 15 }}>{selectedFile.name}</div>
                            <div style={{ fontSize: 12, color: '#60A5FA' }}>{(selectedFile.size / 1024).toFixed(1)} KB</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => { setSelectedFile(null); setSdfContent(''); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
          </div>
        )}

        {/* AI Info Card */}
        <div style={{ marginBottom: 32, borderRadius: 24, backgroundColor: '#EFF6FF', padding: 20, display: 'flex', gap: 16, border: '1px solid #DBEAFE' }}>
          <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#2563EB', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Info size={20} />
          </div>
          <div>
            <h4 style={{ color: '#1E3A8A', margin: '0 0 4px 0', fontSize: 15, fontWeight: 800 }}>Analysis Information</h4>
            <p style={{ color: 'rgba(30,58,138,0.7)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                Our AI model analyzes toxicity specific to diabetic human models, including liver and kidney safety, protein interactions, and therapeutic concentration ranges.
            </p>
          </div>
        </div>

        {/* Start Button */}
        <button 
            disabled={selectedMethod === 'SMILES' ? !smilesString : !selectedFile}
            onClick={handleStartAnalysis}
            className="primary-btn" 
            style={{ 
                borderRadius: 16, 
                height: 60, 
                width: '100%',
                background: (selectedMethod === 'SMILES' ? !!smilesString : !!selectedFile) 
                    ? 'linear-gradient(90deg, #2563EB, #0D9488)' 
                    : '#CBD5E1',
                boxShadow: (selectedMethod === 'SMILES' ? !!smilesString : !!selectedFile) 
                    ? '0 8px 25px rgba(13, 148, 136, 0.2)' 
                    : 'none',
                color: 'white',
                border: 'none',
                fontWeight: 800,
                fontSize: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                cursor: (selectedMethod === 'SMILES' ? !!smilesString : !!selectedFile) ? 'pointer' : 'default'
            }}
        >
            <FlaskConical size={20} />
            Start Toxicity Analysis
            <ChevronRight size={20} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

const MethodTab = ({ label, icon: Icon, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      flex: 1, 
      height: 90, 
      borderRadius: 20, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
      border: `2px solid ${isSelected ? '#2563EB' : 'transparent'}`,
      boxShadow: isSelected ? '0 4px 15px rgba(37,99,235,0.1)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ 
        backgroundColor: isSelected ? '#2563EB' : '#F1F5F9', 
        padding: 10, 
        borderRadius: 12, 
        color: isSelected ? 'white' : '#64748B',
        marginBottom: 8
    }}>
        <Icon size={22} />
    </div>
    <div style={{ fontSize: 13, fontWeight: 800, color: isSelected ? '#2563EB' : '#64748B' }}>{label}</div>
  </div>
);

const ExampleItem = ({ name, formula, onClick }) => (
  <div 
    onClick={() => onClick(formula)}
    style={{ padding: 14, backgroundColor: 'white', border: '1px solid #F1F5F9', borderRadius: 16, marginBottom: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <div>
        <div style={{ fontWeight: 800, fontSize: 14, color: '#1E293B' }}>{name}</div>
        <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace', marginTop: 2 }}>{formula.length > 30 ? formula.substring(0, 30) + '...' : formula}</div>
    </div>
    <ChevronRight size={18} color="#CBD5E1" />
  </div>
);

export default NewAnalysisScreen;
