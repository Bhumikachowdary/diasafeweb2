import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config';


const ForgotPasswordScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/forgot-password/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                // Success - navigate to OTP verification
                localStorage.setItem('reset_email', email);
                navigate('/verify-otp');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to send OTP. Please check your email.');
            }
        } catch (err) {
            setError('Network Error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-header" style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
                    <button 
                        onClick={() => navigate('/login')} 
                        style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Login
                    </button>
                </div>

                <div className="auth-card">
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>Forgot Password?</h2>
                    <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.5, marginBottom: 32 }}>
                        Enter your registered email address and we'll send you an OTP to reset your password.
                    </p>

                    <form onSubmit={handleSendOtp}>
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <div className="input-field-wrapper">
                                <Mail className="input-icon" />
                                <input 
                                    type="email" 
                                    className={`input-field ${error ? 'error' : ''}`}
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            {error && <div className="error-text">{error}</div>}
                        </div>

                        <button type="submit" className="primary-btn" style={{ marginTop: 12 }} disabled={isLoading}>
                            {isLoading ? <div className="loader"></div> : (
                                <>
                                    Send OTP
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
