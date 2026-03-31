import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, FlaskConical, CheckCircle2 } from 'lucide-react';
import logo from '../logo.svg';

const onboardingData = [
  {
    title: "Welcome to AI",
    subtitle: "Revolutionizing Drug Safety Research",
    description: "An intelligent platform designed for pharmaceutical researchers, biotechnology scientists, and drug development teams to predict anti-diabetic drug toxicity using advanced AI.",
    items: [
      "Pharmaceutical Researchers - Accelerate preclinical screening",
      "Biotechnology Scientists - Validate compound safety",
      "Clinical Research Teams - Support trial planning",
      "Academic Institutions - Advance diabetes research"
    ],
    iconColor: "#0EA5E9",
    iconBrush: null
  },
  {
    title: "Shaping Future Healthcare",
    subtitle: "AI-Driven Drug Development for Tomorrow",
    description: "Our platform will transform how we develop safer diabetes medications, reducing development time, costs, and accelerating life-saving treatments to patients worldwide.",
    items: [
      "Faster Drug Discovery - Cut preclinical testing time by 60%",
      "Reduced Animal Testing - Ethical AI-powered predictions",
      "Personalized Medicine - Tailored diabetes treatments",
      "Global Health Impact - Safer drugs for 500M+ diabetics"
    ],
    iconColor: "#D946EF",
    gradient: "linear-gradient(180deg, #A855F7 0%, #EC4899 100%)"
  },
  {
    title: "Powered by Innovation",
    subtitle: "Next-Generation AI Technology",
    description: "Our platform combines cutting-edge machine learning, bioinformatics, and molecular modeling to deliver unprecedented accuracy in toxicity prediction.",
    items: [
      "Deep Learning Models - Trained on 15,000+ compounds",
      "Multi-Species Analysis - Zebrafish, Mouse, Rat, Human",
      "Real-time Processing - Results in under 60 seconds",
      "Continuous Learning - Improving with every analysis"
    ],
    iconColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981 0%, #34D399 100%)"
  }
];

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const data = onboardingData[currentPage];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      localStorage.setItem('onboarded', 'true');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboarded', 'true');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      {/* Skip Button */}
      <div style={{ textAlign: 'right' }}>
        <button 
          onClick={skipOnboarding}
          style={{ background: 'none', border: 'none', color: '#64748B', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
        >
          Skip
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        {/* Logo / Icon Box */}
        {data.gradient ? (
          <div style={{ 
            width: 140, 
            height: 140, 
            borderRadius: 30, 
            background: data.gradient,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 32
          }}>
            <FlaskConical size={60} color="white" />
          </div>
        ) : (
          <div style={{ 
            width: 160, 
            height: 160, 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 32
          }}>
            <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} />
          </div>
        )}

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', textAlign: 'center', margin: 0 }}>{data.title}</h1>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#3B82F6', marginTop: 8, textAlign: 'center' }}>{data.subtitle}</h2>
        <p style={{ fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 16, maxWidth: 320, lineHeight: 1.6 }}>{data.description}</p>

        <div style={{ width: '100%', maxWidth: 400, marginTop: 32, backgroundColor: 'white', borderRadius: 24, padding: 20, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {data.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  backgroundColor: data.iconColor, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  flexShrink: 0
                }}>
                  <FlaskConical size={16} color="white" />
                </div>
                <span style={{ fontSize: 13, color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '32px 0 16px' 
      }}>
        {currentPage > 0 ? (
          <button 
            onClick={handleBack}
            style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
          >
            <ChevronLeft size={24} color="#334155" />
          </button>
        ) : <div style={{ width: 48 }}></div>}

        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map(idx => (
            <div key={idx} style={{ 
              width: idx === currentPage ? 32 : 8, 
              height: 8, 
              borderRadius: 4, 
              backgroundColor: idx === currentPage ? '#2563EB' : '#CBD5E1',
              transition: 'all 0.3s ease'
            }}></div>
          ))}
        </div>

        <button 
          onClick={handleNext}
          style={{ 
            height: 48, 
            borderRadius: 12, 
            border: 'none', 
            background: 'linear-gradient(90deg, #2563EB 0%, #0D9488 100%)', 
            color: 'white', 
            padding: '0 24px', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6, 
            cursor: 'pointer' 
          }}
        >
          {currentPage === 2 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
