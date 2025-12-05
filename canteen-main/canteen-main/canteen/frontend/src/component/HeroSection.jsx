import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title animate-slide-up">
            Delicious <span className="highlight">Food</span> 
            <br />Just a Click Away!
          </h1>
          <p className="hero-subtitle animate-fade-in">
            Order your favorite meals from campus canteen with our 
            smart management system. Fast delivery, fresh food, 
            and amazing discounts!
          </p>
        </div>
        
        <div className="hero-image animate-slide-right">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Delicious Food"
            className="hero-main-image"
          />
          
          <div className="floating-images">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
              alt="Pizza"
              className="floating-image floating-1"
            />
            <img 
              src="https://images.unsplash.com/photo-1559715745-e1b33a271c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
              alt="Burger"
              className="floating-image floating-2"
            />
            <img 
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
              alt="Salad"
              className="floating-image floating-3"
            />
          </div>
        </div>
      </div>
      
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;