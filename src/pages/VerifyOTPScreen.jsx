import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';


const VerifyOTPScreen = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem('reset_email');
        if (!storedEmail) {
            navigate('/forgot-password');
        } else {
            setEmail(storedEmail);
        }
    }, [navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length < 4) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/verify-otp/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            if (response.ok) {
                localStorage.setItem('otp_verified', 'true');
                localStorage.setItem('otp_code', otp);
                navigate('/reset-password');
            } else {
                setError('Invalid or expired OTP. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-header" style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
                    <button 
                        onClick={() => navigate('/forgot-password')} 
                        style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 }}
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                </div>

                <div className="auth-card">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <div style={{ backgroundColor: '#EFF6FF', padding: 16, borderRadius: '50%', color: '#2563EB' }}>
                            <ShieldCheck size={40} />
                        </div>
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8, textAlign: 'center' }}>Verify Identity</h2>
                    <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.5, marginBottom: 32, textAlign: 'center' }}>
                        Enter the 6-digit code sent to<br />
                        <span style={{ fontWeight: 700, color: '#334155' }}>{email}</span>
                    </p>

                    <form onSubmit={handleVerify}>
                        <div className="input-group">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <input 
                                    type="text" 
                                    className={`input-field ${error ? 'error' : ''}`}
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => { 
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        if (val.length <= 6) setOtp(val);
                                        setError(null); 
                                    }}
                                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: 24, fontWeight: 700, height: 60 }}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            {error && <div className="error-text" style={{ textAlign: 'center' }}>{error}</div>}
                        </div>

                        <button type="submit" className="primary-btn" style={{ marginTop: 12 }} disabled={isLoading}>
                            {isLoading ? <div className="loader"></div> : (
                                <>
                                    Verify Code
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#64748B' }}>
                            Didn't receive code? <span style={{ color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}>Resend</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTPScreen;
