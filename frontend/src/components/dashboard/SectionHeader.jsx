import React from 'react';

const SectionHeader = ({ title, subtitle, icon, children }) => {
  return (
    <>
      <div className="section-header">
        <h2>{title}</h2>
        {icon && <div className="section-icon">{icon}</div>}
        {children}
      </div>
      {subtitle && <div className="section-subtitle">{subtitle}</div>}
    </>
  );
};

export default SectionHeader; 