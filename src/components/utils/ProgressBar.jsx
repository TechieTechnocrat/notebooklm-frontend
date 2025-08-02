import React from 'react';

export const ProgressBar = ({ progress = 0, variant = 'primary', size = 'md', showLabel = false }) => {
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      {showLabel && (
        <div className="progress-label">
          <span>{progress}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className={`progress-fill progress-fill--${variant}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

;