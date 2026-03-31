import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Download, TrendingUp, TrendingDown, Info, ArrowRight, CheckCircle2, LayoutGrid, Activity, Stethoscope } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const ProteinRegulationScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result || {
        protein_analysis: {
            summary: { upregulated_count: 5, downregulated_count: 3 },
            upregulated: [
                { protein: "INSR", evidence_count: 12, effect: "+45%" },
                { protein: "SLC2A4", evidence_count: 8, effect: "+30%" },
                { protein: "IRS1", evidence_count: 15, effect: "+55%" }
            ],
            downregulated: [
                { protein: "PTPN1", evidence_count: 6, effect: "-20%" },
                { protein: "SOCS3", evidence_count: 10, effect: "-35%" }
            ],
            clinical_significance: {
                title: "Improved Insulin Signaling",
                description: "The analysis shows strong upregulation of insulin receptor proteins and glucose transporters, suggesting potential therapeutic efficacy in type 2 diabetes models."
            }
        }
    };

    const protein = result.protein_analysis;
    const upCount = protein.summary.upregulated_count;
    const downCount = protein.summary.downregulated_count;
    const total = upCount + downCount;

    return (
        <div className="dashboard-container" style={{ backgroundColor: 'white', paddingBottom: 0 }}>
            {/* Gradient Header */}
            <div style={{ background: 'linear-gradient(180deg, #2563EB 0%, #0D9488 100%)', padding: '40px 20px 24px', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <button onClick={() => navigate(-1)} style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Share2 size={20} />
                        </button>
                        <button style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Download size={20} />
                        </button>
                    </div>
                </div>
                <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Protein Regulation</h1>
                <p style={{ opacity: 0.8, fontSize: 14 }}>Molecular Pathway Analysis</p>
            </div>

            <div className="dashboard-content" style={{ padding: '24px 16px 40px' }}>
                {/* Stepper Placeholder */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, overflowX: 'auto', padding: '10px 0' }}>
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: '50%', 
                            backgroundColor: step === 2 ? '#10B981' : (step < 2 ? '#3B82F6' : '#E2E8F0'),
                            color: step <= 2 ? 'white' : '#94A3B8',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 14,
                            fontWeight: 700,
                            flexShrink: 0
                        }}>
                            {step < 2 ? <CheckCircle2 size={16} /> : step}
                        </div>
                    ))}
                </div>

                {/* Protein Analysis Summary Card */}
                <div style={{ 
                    background: 'linear-gradient(180deg, #3B82F6 0%, #0D9488 100%)', 
                    borderRadius: 20, 
                    padding: 20, 
                    color: 'white',
                    marginBottom: 24,
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%', marginRight: 12 }}>
                            <Activity size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>Protein Analysis</div>
                            <div style={{ opacity: 0.8, fontSize: 12 }}>Molecular regulation profile</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', padding: 12, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, opacity: 0.8 }}>Total Proteins</div>
                            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{total}</div>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', padding: 12, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, opacity: 0.8 }}>Upregulated</div>
                            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{upCount}</div>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', padding: 12, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, opacity: 0.8 }}>Downregulated</div>
                            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{downCount}</div>
                        </div>
                    </div>
                </div>

                {/* Upregulated Section */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, color: '#10B981' }}>
                        <TrendingUp size={20} style={{ marginRight: 8 }} />
                        <h2 style={{ fontWeight: 'bold', fontSize: 18, color: '#1E293B' }}>Upregulated Proteins</h2>
                    </div>
                    {protein.upregulated.map((item, i) => (
                        <div key={i} style={{ 
                            backgroundColor: '#F0FDF4', 
                            borderRadius: 16, 
                            padding: 16, 
                            marginBottom: 12, 
                            display: 'flex', 
                            alignItems: 'center' 
                        }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#10B981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                                <TrendingUp size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>{item.protein}</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>Evidence count: {item.evidence_count}</div>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#10B981' }}>{item.effect}</div>
                        </div>
                    ))}
                </div>

                {/* Downregulated Section */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, color: '#EF4444' }}>
                        <TrendingDown size={20} style={{ marginRight: 8 }} />
                        <h2 style={{ fontWeight: 'bold', fontSize: 18, color: '#1E293B' }}>Downregulated Proteins</h2>
                    </div>
                    {protein.downregulated.map((item, i) => (
                        <div key={i} style={{ 
                            backgroundColor: '#FEF2F2', 
                            borderRadius: 16, 
                            padding: 16, 
                            marginBottom: 12, 
                            display: 'flex', 
                            alignItems: 'center' 
                        }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#EF4444', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                                <TrendingDown size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>{item.protein}</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>Evidence count: {item.evidence_count}</div>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#EF4444' }}>{item.effect}</div>
                        </div>
                    ))}
                </div>

                {/* Clinical Significance Box */}
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 16, padding: 20, marginBottom: 24, display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ color: '#10B981', marginRight: 16, marginTop: 4 }}>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontWeight: 'bold', color: '#166534', fontSize: 15, marginBottom: 4 }}>{protein.clinical_significance.title}</h3>
                        <p style={{ fontSize: 13, color: '#166534', opacity: 0.8, lineHeight: 1.5 }}>{protein.clinical_significance.description}</p>
                    </div>
                </div>

                {/* CTD Evidence Box */}
                <div style={{ backgroundColor: '#EFF6FF', borderRadius: 16, padding: 20, marginBottom: 32, display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ color: '#2563EB', marginRight: 16, marginTop: 4 }}>
                        <Info size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontWeight: 'bold', color: '#1E3A8A', fontSize: 15, marginBottom: 4 }}>CTD Evidence-Based Regulation</h3>
                        <p style={{ fontSize: 13, color: '#1E3A8A', opacity: 0.8, lineHeight: 1.5 }}>Protein regulation derived from Comparative Toxicogenomics Database interactions.</p>
                    </div>
                </div>

                {/* Next Button */}
                <button 
                  onClick={() => navigate('/targeted-organs', { state: { result } })}
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
                    Next: Targeted Organs
                    <ArrowRight size={18} />
                </button>
            </div>

            <BottomNav />
        </div>
    );
};

export default ProteinRegulationScreen;
