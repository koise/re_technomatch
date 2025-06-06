import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="logo-text">TechnoMatch</div>
          <div className="logo-tagline">Level up your code</div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Platform</h4>
            <Link to="/features">Features</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          
          <div className="link-group">
            <h4>Resources</h4>
            <Link to="/docs">Documentation</Link>
            <Link to="/api">API</Link>
            <Link to="/support">Support</Link>
          </div>
          
          <div className="link-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
          </div>
        </div>
        
        <div className="footer-social">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <span className="icon-github">GitHub</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <span className="icon-twitter">Twitter</span>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <span className="icon-discord">Discord</span>
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">© {currentYear} TechnoMatch. All rights reserved.</div>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 