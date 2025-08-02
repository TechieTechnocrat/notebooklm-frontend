import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X, UserPlusIcon } from 'lucide-react';
import { useAppDispatch, useUI } from '../../hooks/redux';
import { removeNotification } from '../../slices/uiSlice';

const NotificationContainer = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useUI();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  const handleDismiss = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={handleDismiss}
          getIcon={getIcon}
        />
      ))}
    </div>
  );
};

const Notification = ({ notification, onDismiss, getIcon }) => {
  const { id, type = 'info', title, message, duration = 5000 } = notification;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  return (
    <div className={`notification notification--${type}`}>
      <div className="notification-icon">
        {getIcon(type)}
      </div>
      
      <div className="notification-content">
        {title && <h4 className="notification-title">{title}</h4>}
        {message && <p className="notification-message">{message}</p>}
      </div>
      
      <button
        className="notification-close"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default NotificationContainer;