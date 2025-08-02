import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { usePdf } from '../../hooks/redux';
import { setCurrentPage, setTotalPages } from '../../slices/pdfSlice';




const PdfViewer = () => {
  const dispatch = useAppDispatch();
  const { pdfUrl, currentPage, totalPages, fileName } = usePdf();
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    dispatch(setTotalPages(numPages));
    setLoading(false);
  }, [dispatch]);

  const onDocumentLoadError = useCallback((error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
  }, []);

  const goToPrevPage = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  const goToPage = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      dispatch(setCurrentPage(value));
    }
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const rotate = () => setRotation(prev => (prev + 90) % 360);

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

  if (!pdfUrl) {
    return (
      <div className="pdf-viewer pdf-viewer--empty">
        <p>No PDF loaded</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-toolbar-section">
          <button
            className="btn btn-ghost btn-sm"
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="page-indicator">
            <input
              type="number"
              value={currentPage}
              onChange={goToPage}
              min={1}
              max={totalPages}
              className="page-input"
            />
            <span className="page-total">of {totalPages}</span>
          </div>

          <button
            className="btn btn-ghost btn-sm"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="pdf-toolbar-section">
          <button className="btn btn-ghost btn-sm" onClick={zoomOut} disabled={scale <= 0.5} title="Zoom out">
            <ZoomOut size={16} />
          </button>
          <span className="zoom-indicator">{Math.round(scale * 100)}%</span>
          <button className="btn btn-ghost btn-sm" onClick={zoomIn} disabled={scale >= 3.0} title="Zoom in">
            <ZoomIn size={16} />
          </button>
        </div>

        <div className="pdf-toolbar-section">
          <button className="btn btn-ghost btn-sm" onClick={rotate} title="Rotate">
            <RotateCw size={16} />
          </button>
          <button className="btn btn-ghost btn-sm" onClick={downloadPdf} title="Download PDF">
            <Download size={16} />
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

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<p>Loading document...</p>}
          className="pdf-document"
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            rotate={rotation}
            className="pdf-page"
            renderTextLayer={true}
            renderAnnotationLayer={true}
            loading={<p>Loading page...</p>}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
