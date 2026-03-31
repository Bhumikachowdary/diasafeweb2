import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';


const ResetPasswordScreen = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verified = localStorage.getItem('otp_verified');
        if (verified !== 'true') {
            navigate('/forgot-password');
        }
    }, [navigate]);

    const handleReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError(null);

        const email = localStorage.getItem('reset_email');
        const otp = localStorage.getItem('otp_code');

        try {
            const response = await fetch(`${API_BASE_URL}/api/reset-password/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, new_password: password })
            });

            if (response.ok) {
                localStorage.clear();
                navigate('/reset-success');
            } else {
                setError('Failed to reset password. Please try again.');
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
                <div className="auth-card">
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>Set New Password</h2>
                    <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.5, marginBottom: 32 }}>
                        Create a strong password to protect your account.
                    </p>

                    <form onSubmit={handleReset}>
                        <div className="input-group">
                            <label className="input-label">New Password</label>
                            <div className="input-field-wrapper">
                                <Lock className="input-icon" />
                                <input 
                                    type={isPasswordVisible ? "text" : "password"}
                                    className={`input-field ${error ? 'error' : ''}`}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                                    disabled={isLoading}
                                    required
                                />
                                <button type="button" className="input-action-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Confirm Password</label>
                            <div className="input-field-wrapper">
                                <Lock className="input-icon" />
                                <input 
                                    type={isPasswordVisible ? "text" : "password"}
                                    className={`input-field ${error ? 'error' : ''}`}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            {error && <div className="error-text">{error}</div>}
                        </div>

                        <button type="submit" className="primary-btn" style={{ marginTop: 12 }} disabled={isLoading}>
                            {isLoading ? <div className="loader"></div> : (
                                <>
                                    Update Password
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

export default ResetPasswordScreen;
