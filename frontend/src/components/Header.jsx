import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <Link to="/dashboard" className="logo">
            <h1>Aprova Ortopedia</h1>
          </Link>
          
          <nav className="header-nav">
            <div className="user-menu">
              <button className="user-menu-toggle" onClick={toggleDropdown}>
                <span className="user-name">{user?.nome}</span>
                <span className="user-type">({user?.tipo_usuario})</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link 
                    to="/perfil" 
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <button 
                    className="dropdown-item logout-btn" 
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

