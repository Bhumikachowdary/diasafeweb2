import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Download, CheckCircle, Link, Shield, ArrowRight } from 'lucide-react';

const DetailedReportScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;
    
    // Fallback/Mock data if no result (for preview)
    const data = result || {
        drug_overview: { name: "Metformin derivative", smiles: "CN(C)C(=N)NC(=N)N", molecular_weight: 162.2, logP: 1.85 },
        risk_summary: { level: "LOW", risk_percentage: 12.4 },
        ai_confidence: 87.6
    };

    return (
        <div className="dashboard-container" style={{ backgroundColor: 'white' }}>
            {/* Gradient Header */}
            <div style={{ 
                width: '100%', 
                height: 180, 
                background: 'linear-gradient(180deg, #2563EB, #0D9488)',
                padding: '40px 20px',
                color: 'white'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', padding: 8, color: 'white', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', padding: 8, color: 'white', cursor: 'pointer' }}>
                            <Share2 size={20} />
                        </button>
                        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', padding: 8, color: 'white', cursor: 'pointer' }}>
                            <Download size={20} />
                        </button>
                    </div>
                </div>
                <h1 style={{ fontSize: 24, fontWeight: 800 }}>Toxicity Analysis</h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{data.drug_overview.name} Analysis Results</p>
            </div>

            <div className="dashboard-content" style={{ paddingTop: 20 }}>
                {/* Stepper Mockup */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} style={{ width: 32, height: 6, borderRadius: 3, backgroundColor: s === 1 ? '#2563EB' : '#E2E8F0' }}></div>
                    ))}
                </div>

                {/* Toxicity Classification Card */}
                <div style={{ 
                    backgroundColor: '#10B981', 
                    borderRadius: 20, 
                    padding: 20, 
                    color: 'white',
                    marginBottom: 16,
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%' }}>
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>Toxicity Classification</div>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>AI-Powered Risk Assessment</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
                        <div>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>Overall Risk Level</div>
                            <div style={{ fontSize: 28, fontWeight: 900 }}>{data.risk_summary.level}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>Risk Score</div>
                            <div style={{ fontSize: 28, fontWeight: 900 }}>{data.risk_summary.risk_percentage}%</div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${data.risk_summary.risk_percentage}%`, height: '100%', backgroundColor: 'white' }}></div>
                    </div>
                </div>

                {/* Drug Overview Card */}
                <div className="quick-action-card" style={{ borderRadius: 20, padding: 20, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ backgroundColor: '#EFF6FF', padding: 8, borderRadius: '50%', color: '#3B82F6' }}>
                            <Link size={20} />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>Drug Overview</div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <InfoItem label="Drug Name" value={data.drug_overview.name} />
                        <InfoItem label="SMILES String" value={data.drug_overview.smiles} isMono />
                        <div style={{ display: 'flex', gap: 20 }}>
                            <InfoItem label="Molecular Weight" value={`${data.drug_overview.molecular_weight} g/mol`} />
                            <InfoItem label="LogP" value={data.drug_overview.logP.toString()} />
                        </div>
                    </div>
                </div>

                {/* AI Confidence Card */}
                <div style={{ 
                    background: 'linear-gradient(90deg, #3B82F6, #10B981)',
                    borderRadius: 20,
                    padding: 20,
                    color: 'white',
                    marginBottom: 32
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%' }}>
                            <Shield size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>AI Confidence Level</div>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>Model Prediction Accuracy</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>Confidence Score</div>
                            <div style={{ fontSize: 32, fontWeight: 900 }}>{data.ai_confidence}%</div>
                        </div>
                        <div style={{ width: 80, height: 80, padding: 4, position: 'relative' }}>
                            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="white" strokeWidth="3" strokeDasharray={`${data.ai_confidence}, 100`} strokeLinecap="round" />
                                <text x="18" y="20.35" fill="white" fontWeight="bold" fontSize="8" textAnchor="middle" style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>{Math.floor(data.ai_confidence)}%</text>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Next Button */}
                <button 
                  onClick={() => navigate('/protein-regulation', { state: { result: data } })}
                  className="primary-btn" 
                  style={{ marginBottom: 40 }}
                >
                    <span>Next: Protein Analysis</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, isMono }) => (
    <div>
        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', fontFamily: isMono ? 'monospace' : 'inherit' }}>{value}</div>
    </div>
);

export default DetailedReportScreen;
