import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg'; // Using the existing logo.svg

const SplashScreen = () => {
    const navigate = useNavigate();
    const [scale, setScale] = useState(0.7);
    const [alpha, setAlpha] = useState(0);

    useEffect(() => {
        // Animation
        setTimeout(() => {
            setScale(1);
            setAlpha(1);
        }, 100);

        // Redirect after 3.5 seconds
        const timer = setTimeout(() => {
            const onboarded = localStorage.getItem('onboarded');
            const token = localStorage.getItem('token');
            
            if (!onboarded) {
                navigate('/onboarding');
            } else if (token) {
                navigate('/dashboard');
            } else {
                navigate('/login');
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Glowing effect background */}
            <div style={{ 
                position: 'absolute', 
                width: 400, 
                height: 400, 
                borderRadius: '50%', 
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0) 70%)',
                zIndex: 0
            }}></div>

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                transform: `scale(${scale})`, 
                opacity: alpha, 
                transition: 'transform 1s ease-out, opacity 1s ease-out',
                zIndex: 1
            }}>
                <div style={{ 
                    width: 180, 
                    height: 180, 
                    borderRadius: '50%', 
                    backgroundColor: 'white', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                    marginBottom: 32
                }}>
                    <img src={logo} alt="Logo" style={{ width: 110, height: 110 }} />
                </div>

                <h1 style={{ 
                    fontSize: 42, 
                    fontWeight: 900, 
                    marginBottom: 12,
                    background: 'linear-gradient(90deg, #2563EB 0%, #0D9488 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-1px'
                }}>
                    DiaSafe AI
                </h1>

                <p style={{ 
                    fontSize: 16, 
                    color: '#64748B', 
                    fontWeight: 500,
                    opacity: 0.8
                }}>
                    Anti-Diabetic Drug Toxicity Analysis
                </p>
            </div>

            {/* Bottom Dots Animation */}
            <div style={{ 
                position: 'absolute', 
                bottom: 80, 
                display: 'flex', 
                gap: 12 
            }}>
                {[0, 1, 2].map((i) => (
                    <div key={i} style={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        backgroundColor: '#60A5FA',
                        animation: `pulse 1.2s infinite ease-in-out ${i * 0.2}s`
                    }}></div>
                ))}
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
