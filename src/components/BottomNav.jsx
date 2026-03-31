import React from 'react';
import { Home, FlaskConical, FileText, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Home', icon: Home },
    { id: 'analysis', path: '/analysis', label: 'New Analysis', icon: FlaskConical },
    { id: 'reports', path: '/reports', label: 'Reports', icon: FileText },
    { id: 'profile', path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname.includes(item.path);
        
        return (
          <div 
            key={item.id} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div className="nav-indicator"></div>
            <div className="nav-icon">
              <Icon size={24} />
            </div>
            <span className="nav-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
