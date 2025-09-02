import React, { useEffect, useState } from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      {/* Animated background elements */}
      <div className="bg-animation">
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
        <div className="energy-orb orb-1"></div>
        <div className="energy-orb orb-2"></div>
      </div>

      <div className={`error-container ${animate ? 'animate-in' : ''}`}>
        {/* Logo/Brand section */}
        <div className="brand-section">
          <div className="eco-logo">
            <div className="logo-leaf"></div>
            <span className="brand-name">EcoEnergy</span>
          </div>
        </div>

        {/* Error content */}
        <div className="error-content">
          <div className="error-illustration">
            <div className="broken-leaf">
              <div className="leaf-part leaf-left"></div>
              <div className="leaf-part leaf-right"></div>
            </div>
            <div className="error-code">404</div>
          </div>

          <h1 className="error-title">Oops! Page Not Found</h1>
          <p className="error-description">
            It seems like this page has gone off the grid! 🌱 
            <br />
            The renewable energy you're looking for might have been moved or doesn't exist.
          </p>

          <div className="action-buttons">
            <button 
              className="primary-button"
              onClick={handleGoHome}
            >
              <span className="button-icon">🏠</span>
              Back to Dashboard
            </button>
            <button 
              className="secondary-button"
              onClick={handleRefresh}
            >
              <span className="button-icon">🔄</span>
              Try Again
            </button>
          </div>

          <div className="help-section">
            <p className="help-text">
              Need help? Our green energy support team is here for you!
            </p>
            <a href="mailto:support@ecoenergy.com" className="support-link">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;