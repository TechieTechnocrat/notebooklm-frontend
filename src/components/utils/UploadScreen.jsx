import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { uploadPdf, clearError } from '../../slices/pdfSlice';
import { usePdf, useUI } from '../../hooks/redux';
import { setCurrentView } from '../../slices/uiSlice';
import { useAppDispatch } from '../../hooks/redux';
import { ProgressBar } from './ProgressBar';

const UploadScreen = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, uploadProgress, isUploaded, fileName } = usePdf();
  const { theme } = useUI();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      dispatch(uploadPdf(file));
    } else {
      // Handle error - not a PDF
      console.error('Please upload a PDF file');
    }
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isLoading
  });

  useEffect(() => {
    if (isUploaded) {
      setTimeout(() => {
        dispatch(setCurrentView('main'));
      }, 1000);
    }
  }, [isUploaded, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="upload-screen">
      <div className="upload-container">
        <div className="upload-header">
          <h1 className="upload-title">
            NotebookLM Clone
          </h1>
          <p className="upload-subtitle">
            Upload your PDF document to start chatting and exploring its contents
          </p>
        </div>

        <div className="upload-content">
          {!isLoading && !isUploaded && (
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? 'dropzone--active' : ''}`}
            >
              <input {...getInputProps()} />
              <div className="dropzone-content">
                <Upload className="dropzone-icon" size={48} />
                <h3 className="dropzone-title">
                  {isDragActive ? 'Drop your PDF here' : 'Upload PDF to start chatting'}
                </h3>
                <p className="dropzone-description">
                  Click or drag and drop your file here
                </p>
                <p className="dropzone-note">
                  Only PDF files are supported
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="upload-progress">
              <div className="progress-content">
                <FileText className="progress-icon" size={48} />
                <h3 className="progress-title">Uploading PDF</h3>
                <p className="progress-description">
                  Processing {fileName}...
                </p>
                <ProgressBar progress={uploadProgress} />
                <p className="progress-percentage">{uploadProgress}%</p>
              </div>
            </div>
          )}

          {isUploaded && (
            <div className="upload-success">
              <div className="success-content">
                <FileText className="success-icon" size={48} />
                <h3 className="success-title">PDF Uploaded Successfully!</h3>
                <p className="success-description">
                  {fileName} is ready for interaction
                </p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => dispatch(setCurrentView('main'))}
                >
                  Start Chatting
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="upload-error">
              <AlertCircle className="error-icon" size={24} />
              <p className="error-message">{error}</p>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(clearError())}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;