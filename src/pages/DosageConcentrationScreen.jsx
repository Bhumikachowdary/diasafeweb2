import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2, Accessibility, Pill, TrendingUp, User, FlaskConical, CircleHelp, Info, CheckCircle2, Shield, Lock, LayoutGrid, Download, FileJson, Share } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const DosageConcentrationScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state?.result || {
        concentration_analysis: {
            human_model: {
                optimal_range: "250-500 mg",
                min_effective: "125 mg",
                max_safe: "750 mg",
                ld50: "2500 mg",
                therapeutic_index: 20
            },
            dose_response: [
                { dose: 25, efficacy: 45 },
                { dose: 50, efficacy: 75 },
                { dose: 75, efficacy: 90 },
                { dose: 100, efficacy: 98 }
            ],
            therapeutic_index: 20
        }
    };

    const concentration = result.concentration_analysis;
    const humanModel = concentration.human_model;

    return (
        <div className="dashboard-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: 0 }}>
            {/* Header Block Gradient */}
            <div style={{ background: 'linear-gradient(180deg, #2563EB 0%, #0D9488 100%)', padding: '40px 24px 24px', position: 'relative' }}>
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
                            <Accessibility size={20} />
                        </button>
                    </div>
                </div>
                <h1 style={{ color: 'white', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Safer Concentration</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    Multi-Model Dosing Recommendations
                </p>
            </div>

            {/* Content Section */}
            <div className="dashboard-content" style={{ padding: '0 16px 40px', marginTop: '-20px' }}>
                {/* Stepper Placeholder */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, overflowX: 'auto', padding: '10px 0' }}>
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: '50%', 
                            backgroundColor: step === 5 ? '#10B981' : (step < 5 ? '#3B82F6' : '#E2E8F0'),
                            color: step <= 5 ? 'white' : '#94A3B8',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 14,
                            fontWeight: 700,
                            flexShrink: 0
                        }}>
                            {step < 5 ? <CheckCircle2 size={16} /> : step}
                        </div>
                    ))}
                </div>

                {/* Analysis Complete Card */}
                <div style={{ 
                    background: 'linear-gradient(90deg, #10B981 0%, #0D9488 100%)', 
                    borderRadius: 20, 
                    padding: 24, 
                    color: 'white',
                    boxShadow: '0 8px 30px rgba(16, 185, 129, 0.25)',
                    marginBottom: 24
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: '50%', marginRight: 16 }}>
                            <Pill size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>Concentration Analysis Complete</div>
                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Safe dosing ranges determined</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Human Optimal</div>
                            <div style={{ fontSize: 24, fontWeight: 800 }}>{humanModel.optimal_range}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Therapeutic Index</div>
                            <div style={{ fontSize: 24, fontWeight: 800 }}>{concentration.therapeutic_index}</div>
                        </div>
                    </div>
                </div>

                {/* Dose-Response Analysis */}
                <div className="section-header" style={{ marginBottom: 12 }}>
                    <span className="section-title">Dose-Response Analysis</span>
                </div>
                <div className="quick-action-card" style={{ padding: 20, borderRadius: 24, marginBottom: 24 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {concentration.dose_response.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>{item.dose}%</div>
                                    <div style={{ fontSize: 11, color: '#64748B' }}>Dose Concentration</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 800, fontSize: 18, color: '#10B981' }}>{item.efficacy}%</div>
                                    <div style={{ fontSize: 11, color: '#64748B' }}>Efficacy</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12, marginTop: 16 }}>
                        <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.5 }}>
                            Note: Higher dose concentration increases efficacy but may also elevate the probability of minor side effects.
                        </p>
                    </div>
                </div>

                {/* Human Model Card */}
                <div style={{ backgroundColor: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', marginBottom: 24 }}>
                    <div style={{ backgroundColor: '#10B981', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center' }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%', marginRight: 12 }}>
                            <User size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 16 }}>Human Model</div>
                            <div style={{ opacity: 0.8, fontSize: 11 }}>Clinical Dosing Recommendations</div>
                        </div>
                    </div>
                    <div style={{ padding: 20 }}>
                        <div style={{ display: 'flex', marginBottom: 16 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, color: '#64748B' }}>Min Effective</div>
                                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>{humanModel.min_effective}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, color: '#64748B' }}>Max Safe</div>
                                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>{humanModel.max_safe}</div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: 16, borderRadius: 12, textAlign: 'center', marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', gap: 6, marginBottom: 4 }}>
                                <CheckCircle2 size={16} />
                                <span style={{ fontWeight: 'bold', fontSize: 14 }}>Optimal Range</span>
                            </div>
                            <div style={{ color: '#166534', fontWeight: 800, fontSize: 28 }}>{humanModel.optimal_range}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, color: '#64748B' }}>LD50</div>
                                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#1E293B' }}>{humanModel.ld50}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, color: '#64748B' }}>Therapeutic Index</div>
                                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#1E293B' }}>{humanModel.therapeutic_index}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toxicological Dose Card */}
                <div style={{ backgroundColor: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', marginBottom: 24 }}>
                    <div style={{ backgroundColor: '#F97316', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center' }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: '50%', marginRight: 12 }}>
                            <FlaskConical size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 16 }}>Toxicological Reference Dose</div>
                            <div style={{ opacity: 0.8, fontSize: 11 }}>Animal to human extrapolation</div>
                        </div>
                    </div>
                    <div style={{ padding: 20 }}>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                            <div style={{ flex: 1, backgroundColor: '#FFF7ED', padding: 12, borderRadius: 12 }}>
                                <div style={{ display: 'flex', alignContent: 'center', color: '#F97316', gap: 4, marginBottom: 4 }}>
                                    <TrendingUp size={14} />
                                    <span style={{ fontSize: 10, fontWeight: 'bold' }}>Animal LOEL</span>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#7C2D12' }}>200</div>
                                <div style={{ fontSize: 9, color: 'rgba(124,45,18,0.7)' }}>mg/kg body weight</div>
                            </div>
                            <div style={{ flex: 1, backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12 }}>
                                <div style={{ display: 'flex', alignContent: 'center', color: '#2563EB', gap: 4, marginBottom: 4 }}>
                                    <User size={14} />
                                    <span style={{ fontSize: 10, fontWeight: 'bold' }}>Human Equiv. Dose</span>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#1E3A8A' }}>32.43</div>
                                <div style={{ fontSize: 9, color: 'rgba(30,58,138,0.7)' }}>mg/kg body weight</div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: 12, borderRadius: 12, display: 'flex', gap: 8 }}>
                            <Info size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: 11, color: '#92400E', lineHeight: 1.5 }}>
                                Allometric scaling factor applied (1.0). Calculated using FDA guidance for cross-species dose conversion.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Translation Notes */}
                <div style={{ backgroundColor: '#FAF5FF', border: '1px solid #F3E8FF', borderRadius: 24, padding: 20, marginBottom: 24 }}>
                     <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ backgroundColor: '#F3E8FF', padding: 8, borderRadius: '50%', color: '#A855F7', marginRight: 12 }}>
                            <TrendingUp size={18} />
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#6B21A8' }}>Clinical Translation Notes</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            "Zebrafish data provides early toxicity screening and developmental safety.",
                            "Rodent models confirm pharmacokinetics and efficacy benchmarks.",
                            "Human predictions based on allometric scaling and physiological models.",
                            "Recommended starting dose: 250-500 mg proceed with caution.",
                            "Titrate and increase by 250 mg weekly based on patient response."
                        ].map((note, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12 }}>
                                <CheckCircle2 size={16} color="#A855F7" style={{ flexShrink: 0, marginTop: 2 }} />
                                <p style={{ fontSize: 13, color: '#6B21A8', lineHeight: 1.4 }}>{note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Analysis Complete Section */}
                <div className="section-header" style={{ marginBottom: 16 }}>
                    <span className="section-title">Analysis Summary</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                    {[
                        { icon: Shield, color: '#10B981', title: "Low Toxicity Profile", desc: "Safe for anti-diabetic therapeutic use" },
                        { icon: Lock, color: '#2563EB', title: "Favorable Protein Regulation", desc: "Enhanced insulin sensitivity mechanisms" },
                        { icon: LayoutGrid, color: '#A855F7', title: "Optimal Organ Distribution", desc: "High hepatic and pancreatic affinity" },
                        { icon: CheckCircle2, color: '#0D9488', title: "Well-Defined Dosing", desc: "Clear therapeutic concentration ranges" }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${item.color}1A`, color: item.color, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                                <item.icon size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#1E293B' }}>{item.title}</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Download Report Card */}
                <div className="quick-action-card" style={{ padding: 20, textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
                        <Download size={20} color="#2563EB" style={{ marginRight: 8 }} />
                        <span style={{ fontWeight: 'bold', fontSize: 14, color: '#1E293B' }}>Download Detailed Report</span>
                    </div>
                    <button className="primary-btn" style={{ borderRadius: 14, height: 56 }}>
                        <FileJson size={20} />
                        <span>Download Complete Analysis (PDF)</span>
                    </button>
                    <p style={{ fontSize: 11, color: '#64748B', marginTop: 12 }}>
                        Includes: Toxicity, Proteins, Organs, Side Effects, and Concentration
                    </p>
                </div>

                {/* Bottom Buttons */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <button style={{ flex: 1, height: 50, borderRadius: 12, border: '1.5px solid #E2E8F0', backgroundColor: 'transparent', color: '#64748B', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                        <Download size={18} />
                        Export
                    </button>
                    <button style={{ flex: 1, height: 50, borderRadius: 12, border: '1.5px solid #E2E8F0', backgroundColor: 'transparent', color: '#64748B', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                        <Share size={18} />
                        Share
                    </button>
                </div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
                    <button 
                        onClick={() => navigate('/analysis')}
                        style={{ flex: 1, height: 56, borderRadius: 12, border: '1.5px solid #A855F7', backgroundColor: 'transparent', color: '#A855F7', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Back to Choice
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        style={{ flex: 1, height: 56, borderRadius: 12, backgroundColor: '#1E293B', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                    >
                        <LayoutGrid size={20} />
                        Dashboard
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default DosageConcentrationScreen;
