import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { id: 1, label: '首页', icon: '🏠', path: '/home' },
    { id: 2, label: '用户', icon: '👤', path: '/users' },
    { id: 3, label: '设置', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">心理咨询平台</Link>
        <nav className="nav-menu">
          {menuItems.map((item: MenuItem) => (
            <Link 
              key={item.id} 
              to={item.path} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;