import React, { useState } from 'react';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { usePdf } from '../../hooks/redux';

const PdfViewer = () => {
  const { pdfUrl, fileName } = usePdf();
  const [loading, setLoading] = useState(true);

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const openInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  if (!pdfUrl) {
    return (
      <div className="pdf-viewer pdf-viewer--empty">
        <div className="empty-state">
          <FileText size={48} className="text-gray-400" />
          <p className="text-gray-600 mt-4">No PDF loaded</p>
          <p className="text-sm text-gray-500">Upload a PDF to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-toolbar-section">
          {fileName && (
            <span className="pdf-filename" title={fileName}>
              {fileName.length > 40 ? `${fileName.substring(0, 40)}...` : fileName}
            </span>
          )}
        </div>

        <div className="pdf-toolbar-section">
          <button 
            className="btn btn-ghost btn-sm" 
            onClick={openInNewTab} 
            title="Open in new tab"
          >
            <ExternalLink size={16} />
            <span className="ml-1">Open</span>
          </button>
          <button 
            className="btn btn-ghost btn-sm" 
            onClick={downloadPdf} 
            title="Download PDF"
          >
            <Download size={16} />
            <span className="ml-1">Download</span>
          </button>
        </div>
      </div>

      <div className="pdf-content">
        {loading && (
          <div className="pdf-loading">
            <div className="loading-spinner"></div>
            <p>Loading PDF...</p>
          </div>
        )}

        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="pdf-iframe"
          title="PDF Viewer"
          onLoad={() => setLoading(false)}
          style={{
            width: '100%',
            height: 'calc(100vh - 120px)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  );
};

export default PdfViewer;