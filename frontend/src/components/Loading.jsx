import React from 'react';

export const Loading = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

