import React, { useEffect } from 'react'
import { usePdf, useUI } from '../hooks/redux';
import UploadScreen from './utils/UploadScreen';
import MainInterface from './utils/MainInterface';
import NotificationContainer from './utils/NotificationContainer';

export const DefaultPage = () => {
  const { currentView, theme } = useUI();
  const { isUploaded } = usePdf();
    useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
 const getCurrentView = () => {
    if (!isUploaded || currentView === 'upload') {
      return <UploadScreen />;
    }
    return <MainInterface />;
  };
  return (
    <div className="min-h-screen bg-primary">
      {getCurrentView()}
      <NotificationContainer />
    </div>
  )
}
