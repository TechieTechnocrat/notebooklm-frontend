import React from 'react';
import { Menu, X, Upload, Sun, Moon, FileText } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { useUI, usePdf } from '../../hooks/redux';
import { toggleSidebar, toggleTheme, setCurrentView } from '../../slices/uiSlice';
import { resetPdf } from '../../slices/pdfSlice';
import { clearMessages } from '../../slices/chatSlice';


const Header = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, theme } = useUI();
  const { fileName } = usePdf();

  const handleNewDocument = () => {
    dispatch(resetPdf());
    dispatch(clearMessages());
    dispatch(setCurrentView('upload'));
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="btn btn-ghost header-menu-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
        
        <div className="header-title">
          <FileText size={24} />
          <h1>NotebookLM Clone</h1>
        </div>
      </div>

      <div className="header-center">
        {fileName && (
          <div className="current-document">
            <FileText size={16} />
            <span className="document-name">{fileName}</span>
          </div>
        )}
      </div>

      <div className="header-right">
        <button
          className="btn btn-ghost"
          onClick={handleNewDocument}
          title="Upload new document"
        >
          <Upload size={18} />
          <span className="btn-text">New Document</span>
        </button>
        
        <button
          className="btn btn-ghost"
          onClick={() => dispatch(toggleTheme())}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;