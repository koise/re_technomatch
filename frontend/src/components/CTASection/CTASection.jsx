import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './CTASection.scss';

const CTASection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`cta-section ${theme}`}>
      <div className="circuit-lines">
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
      </div>
      <div className="cta-container">
        <div className="cta-content">
          <h2>Ready to Level Up Your Coding Skills?</h2>
          <p>Join thousands of students in competitive programming battles</p>
          <div className="cta-badges">
            <div className="achievement-badge">
              <span className="badge-icon">⚡</span>
              <span>50K+ Battles</span>
            </div>
            <div className="achievement-badge">
              <span className="badge-icon">🏆</span>
              <span>500+ Challenges</span>
            </div>
          </div>
          <button className="btn btn-cta pulse-animation">Start Your Journey</button>
        </div>
      </div>
      <div className="cta-backdrop">
        <div className="backdrop-circle"></div>
        <div className="backdrop-circle"></div>
      </div>
      <div className="tech-border top-left"></div>
      <div className="tech-border top-right"></div>
      <div className="tech-border bottom-left"></div>
      <div className="tech-border bottom-right"></div>
    </section>
  );
};

export default CTASection; 