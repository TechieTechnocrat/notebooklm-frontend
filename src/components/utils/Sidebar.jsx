import React from 'react';
import { MessageSquare, FileText, History, Settings, Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { useUI, useChat, usePdf } from '../../hooks/redux';
import { clearMessages } from '../../slices/chatSlice';
import { setCurrentView } from '../../slices/uiSlice';
import { resetPdf } from '../../slices/pdfSlice';


const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useUI();
  const { messages } = useChat();
  const { fileName } = usePdf();

  const handleClearChat = () => {
    dispatch(clearMessages());
  };

  const handleNewDocument = () => {
    dispatch(resetPdf());
    dispatch(clearMessages());
    dispatch(setCurrentView('upload'));
  };

  const recentQuestions = messages
    .filter(msg => msg.type === 'user')
    .slice(-5)
    .reverse();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">
            <FileText size={16} />
            Document
          </h3>
          <div className="sidebar-item sidebar-item--active">
            <FileText size={16} />
            <span className="sidebar-item-text">{fileName}</span>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <h3 className="sidebar-section-title">
              <History size={16} />
              Recent Questions
            </h3>
            {messages.length > 0 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleClearChat}
                title="Clear chat history"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          
          <div className="sidebar-items">
            {recentQuestions.length > 0 ? (
              recentQuestions.map((message) => (
                <div key={message.id} className="sidebar-item sidebar-item--question">
                  <MessageSquare size={14} />
                  <span className="sidebar-item-text">{message.content}</span>
                </div>
              ))
            ) : (
              <div className="sidebar-empty">
                <p>No questions yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-actions">
          <button
            className="btn btn-primary w-full"
            onClick={handleNewDocument}
          >
            <FileText size={16} />
            New Document
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;