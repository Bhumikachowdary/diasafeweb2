import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ResetSuccessScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ color: '#10B981', marginBottom: 24 }}>
                        <CheckCircle2 size={72} strokeWidth={2.5} />
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 12 }}>Password Reset Successful!</h2>
                    <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
                        Your password has been successfully updated. You can now use your new password to sign in to your DiaSafe AI account.
                    </p>

                    <button 
                        onClick={() => navigate('/login')} 
                        className="primary-btn" 
                        style={{ background: '#10B981', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.2)' }}
                    >
                        Success Login
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetSuccessScreen;
