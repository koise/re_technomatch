import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Footer.scss';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`site-footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">TechnoMatch</h3>
          <p className="footer-description">
            The ultimate competitive programming platform for students.
            Level up your coding skills through structured competition.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="GitHub"><span className="social-icon">GitHub</span></a>
            <a href="#" aria-label="Twitter"><span className="social-icon">Twitter</span></a>
            <a href="#" aria-label="Discord"><span className="social-icon">Discord</span></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Platform</h3>
          <ul className="footer-links">
            <li><a href="#">Features</a></li>
            <li><a href="#">Battle Modes</a></li>
            <li><a href="#">Challenges</a></li>
            <li><a href="#">Leaderboard</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Learning Path</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Legal</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} TechnoMatch. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <span className="legal-separator">|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 