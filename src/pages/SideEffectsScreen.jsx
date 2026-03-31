import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Shield, Info, ArrowRight, CheckCircle2, LayoutGrid } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const SideEffectsScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result || {
        side_effect_profile: {
            overall_safety: { score: 85, classification: "Safe" },
            categories: [
                {
                    category: "Gastrointestinal",
                    effects: [
                        { effect: "Nausea", risk_level: "Low", probability: 12 },
                        { effect: "Diarrhea", risk_level: "Moderate", probability: 8 },
                        { effect: "Abdominal Pain", risk_level: "Very Low", probability: 4 }
                    ]
                },
                {
                    category: "Metabolic",
                    effects: [
                        { effect: "Hypoglycemia", risk_level: "Very Low", probability: 2 },
                        { effect: "Vitamin B12 Deficiency", risk_level: "Low", probability: 5 }
                    ]
                }
            ]
        }
    };

    const sideEffectProfile = result.side_effect_profile;
    const safetyScore = sideEffectProfile.overall_safety.score;
    const classification = sideEffectProfile.overall_safety.classification;

    const getBadgeColors = (level) => {
        switch (level.toLowerCase()) {
            case 'very low': return { bg: '#BBF7D0', text: '#10B981' };
            case 'low': return { bg: '#DCFCE7', text: '#22C55E' };
            case 'moderate': return { bg: '#FEF3C7', text: '#D97706' };
            default: return { bg: '#FEE2E2', text: '#EF4444' };
        }
    };

    return (
        <div className="dashboard-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: 0 }}>
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
                <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Possible Side Effects</h1>
                <p style={{ opacity: 0.8, fontSize: 14 }}>Adverse event profile</p>
            </div>

            <div className="dashboard-content" style={{ padding: '24px 16px 40px' }}>
                {/* Stepper Placeholder */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, overflowX: 'auto', padding: '10px 0' }}>
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: '50%', 
                            backgroundColor: step === 4 ? '#10B981' : (step < 4 ? '#3B82F6' : '#E2E8F0'),
                            color: step <= 4 ? 'white' : '#94A3B8',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 14,
                            fontWeight: 700,
                            flexShrink: 0
                        }}>
                            {step < 4 ? <CheckCircle2 size={16} /> : step}
                        </div>
                    ))}
                </div>

                {/* Summary Gradient Card */}
                <div style={{ 
                    background: 'linear-gradient(90deg, #3B82F6 0%, #0EA5E9 100%)', 
                    borderRadius: 20, 
                    padding: 20, 
                    color: 'white',
                    marginBottom: 24,
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%', marginRight: 12 }}>
                            <Shield size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 16 }}>Possible Side Effects</div>
                            <div style={{ opacity: 0.8, fontSize: 12 }}>Adverse event profile</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                        {['Low', 'Low', 'Low', 'High'].map((tag, i) => (
                            <div key={i}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: tag === 'High' ? '#3B82F6' : '#10B981', margin: '0 auto 8px' }}></div>
                                <div style={{ fontSize: 11, fontWeight: 500 }}>{tag}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overall Safety Score Card */}
                <div style={{ 
                    backgroundColor: '#10B981', 
                    borderRadius: 20, 
                    padding: 24, 
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)'
                }}>
                    <div>
                        <div style={{ opacity: 0.9, fontSize: 14, marginBottom: 4 }}>Overall Safety Score</div>
                        <div style={{ fontSize: 36, fontWeight: 900 }}>{safetyScore}/100</div>
                        <div style={{ opacity: 0.8, fontSize: 12 }}>Risk assessment index</div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px 16px', borderRadius: 12, textAlign: 'center' }}>
                        <div style={{ opacity: 0.9, fontSize: 10, textTransform: 'uppercase' }}>Classification</div>
                        <div style={{ fontWeight: 'bold', fontSize: 14 }}>{classification.toUpperCase()}</div>
                    </div>
                </div>

                {/* Side Effect Categories */}
                {sideEffectProfile.categories.map((cat, i) => (
                    <div key={i} style={{ marginBottom: 24 }}>
                        <h2 style={{ fontWeight: 900, fontSize: 18, color: '#0F172A', marginBottom: 16 }}>{cat.category}</h2>
                        <div style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {cat.effects.map((effect, j) => {
                                    const badge = getBadgeColors(effect.risk_level);
                                    return (
                                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 'bold', fontSize: 15, color: '#1E293B', marginBottom: 6 }}>{effect.effect}</div>
                                                <span style={{ 
                                                    backgroundColor: badge.bg, 
                                                    color: badge.text, 
                                                    fontSize: 11, 
                                                    fontWeight: 'bold', 
                                                    padding: '2px 8px', 
                                                    borderRadius: 6 
                                                }}>{effect.risk_level}</span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 900, fontSize: 18, color: '#0F172A' }}>{effect.probability}%</div>
                                                <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500 }}>Probability</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Clinical Recommendations Box */}
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 20, padding: 24, marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ backgroundColor: '#BBF7D0', width: 32, height: 32, borderRadius: '50%', color: '#10B981', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                            <Info size={18} />
                        </div>
                        <h3 style={{ fontWeight: 'bold', color: '#166534', fontSize: 16 }}>Clinical Recommendations</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            "Start with low dose and gradually titrate to minimize GI side effects",
                            "Monitor renal function in patients with pre-existing kidney conditions",
                            "Advise patients to take medication with meals to reduce GI discomfort",
                            "Hypoglycemia risk is minimal when used as monotherapy",
                            "Regular liver function tests recommended during first 6 months"
                        ].map((rec, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12 }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#10B981', marginTop: 8, flexShrink: 0 }}></div>
                                <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.5, fontWeight: 500 }}>{rec}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <button 
                  onClick={() => navigate('/dosage-concentration', { state: { result } })}
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
                    Next: Safer Concentration
                    <ArrowRight size={18} />
                </button>
            </div>

            <BottomNav />
        </div>
    );
};

export default SideEffectsScreen;
