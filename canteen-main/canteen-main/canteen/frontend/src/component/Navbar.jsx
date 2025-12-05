import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <div className="logo">
              <img 
                src='https://ai-images.s3.eu-central-1.wasabisys.com/29707693/1013247/e4b06c54-a275-495c-9bbb-df8b0158b-03.png' 
                alt="CampusBites Logo"
                className="logo-image"
              />
              <div className="logo-text-container">
                <span className="logo-text">Campus</span>
                <span className="logo-highlight">Bites</span>
              </div>
            </div>
          </Link>
        </div>
       {/*tagline */}
         <div className="navbar-tagline">
          <span className="tagline-text"><i>Fresh Food , Zero Delay, Just Eat..</i></span>
        </div>

        {/*Desktop Navigation */}
         <div className="desktop-nav">
          <Link to="/admin/login" className="nav-link">
            <span className="nav-link-text">Admin Login</span> 
           {/* <span className="nav-link-icon">→</span> */}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`menu-button ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>

        {/* Dropdown Menu */}
        <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/admin/login" 
            className="dropdown-item"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="dropdown-icon">👨‍💼</span>
            <span className="dropdown-text">Admin Login</span>
             {/* <span className="dropdown-arrow">→</span> */}
          </Link> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;