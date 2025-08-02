import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';

const CitationButton = ({ citation, onClick }) => {
  const { page, text, context } = citation;

  const handleClick = () => {
    if (onClick && page) {
      onClick(page);
    }
  };

  return (
    <button
      className="citation-button"
      onClick={handleClick}
      title={`Go to page ${page}${context ? `: ${context}` : ''}`}
    >
      <FileText size={14} />
      <span className="citation-text">
        Page {page}
        {text && (
          <span className="citation-preview">
            {text.length > 30 ? `${text.substring(0, 30)}...` : text}
          </span>
        )}
      </span>
      <ExternalLink size={12} className="citation-icon" />
    </button>
  );
};

export default CitationButton;