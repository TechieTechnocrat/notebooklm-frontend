import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, MessageSquare, Settings } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import PdfViewer from './PdfViewer';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatInterface from './ChatInterface';

const MainInterface = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useUI();
  const { fileName } = usePdf();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNewDocument = () => {
    dispatch(resetPdf());
    dispatch(clearMessages());
    dispatch(setCurrentView('upload'));
  };

  return (
    <div className="main-interface">
      <Header />
      
      <div className="main-content">
        <Sidebar />
        
        <div className={`content-area ${sidebarCollapsed ? 'content-area--expanded' : ''}`}>
          <div className="panels">
            <div className="panel panel--pdf">
              <div className="panel-header">
                <div className="panel-title">
                  <FileText size={18} />
                  <span>{fileName}</span>
                </div>
              </div>
              <div className="panel-content">
                <PdfViewer />
              </div>
            </div>
            
            <div className="panel panel--chat">
              <div className="panel-header">
                <div className="panel-title">
                  <MessageSquare size={18} />
                  <span>Chat</span>
                </div>
              </div>
              <div className="panel-content">
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile && !sidebarCollapsed && (
        <div 
          className="mobile-overlay"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
    </div>
  );
};

export default MainInterface;