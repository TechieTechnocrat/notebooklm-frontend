import React from 'react';
import { User, Bot, AlertCircle, Loader2 } from 'lucide-react';
import CitationButton from './CitationButton';

const MessageBubble = ({ message, onCitationClick, isLoading = false }) => {
  const { type, content, citations, timestamp } = message;

  const getIcon = () => {
    switch (type) {
      case 'user':
        return <User size={18} />;
      case 'ai':
        return <Bot size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      default:
        return <Bot size={18} />;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`message-bubble message-bubble--${type}`}>
      <div className="message-avatar">
        {getIcon()}
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {type === 'user' ? 'You' : type === 'ai' ? 'AI Assistant' : 'System'}
          </span>
          {timestamp && (
            <span className="message-time">
              {formatTime(timestamp)}
            </span>
          )}
        </div>
        
        <div className="message-body">
          {isLoading ? (
            <div className="message-loading">
              <Loader2 className="loading-spinner" size={16} />
              <span>Thinking...</span>
            </div>
          ) : (
            <>
              <p className="message-text">{content}</p>
              
              {citations && citations.length > 0 && (
                <div className="message-citations">
                  <span className="citations-label">Sources:</span>
                  <div className="citations-list">
                    {citations.map((citation, index) => (
                      <CitationButton
                        key={index}
                        citation={citation}
                        onClick={() => onCitationClick(citation.page)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;