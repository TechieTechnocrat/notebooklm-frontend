import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { useChat, usePdf } from '../../hooks/redux';
import { askQuestion, setCurrentQuestion } from '../../slices/chatSlice';
import { setCurrentPage } from '../../slices/pdfSlice';
import MessageBubble from './MessageBubble';


const ChatInterface = () => {
  const dispatch = useAppDispatch();
  const { messages, currentQuestion, isLoading, error } = useChat();
  const { isUploaded } = usePdf();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading || !isUploaded) {
      return;
    }

    dispatch(askQuestion(inputValue.trim()));
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    dispatch(setCurrentQuestion(e.target.value));
  };

  const handleCitationClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const suggestedQuestions = [
    "What is this document about?",
    "Summarize the main points",
    "What are the key findings?",
    "Extract important dates and numbers"
  ];

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-content">
              <Bot className="welcome-icon" size={48} />
              <h3 className="welcome-title">Ready to chat about your PDF!</h3>
              <p className="welcome-description">
                Ask me anything about the document. I can help you understand, summarize, or find specific information.
              </p>
              
              <div className="suggested-questions">
                <p className="suggested-title">Try asking:</p>
                <div className="suggestion-buttons">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => setInputValue(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onCitationClick={handleCitationClick}
          />
        ))}

        {isLoading && (
          <MessageBubble
            message={{
              id: 'loading',
              type: 'ai',
              content: '',
              timestamp: new Date().toISOString(),
            }}
            isLoading={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        {error && (
          <div className="chat-error">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="chat-form">
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={isUploaded ? "Ask a question about your PDF..." : "Upload a PDF first to start chatting"}
              className="chat-input"
              disabled={!isUploaded || isLoading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputValue.trim() || isLoading || !isUploaded}
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="loading-spinner" size={18} />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </form>

        <div className="chat-footer">
          <p className="chat-footer-text">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;