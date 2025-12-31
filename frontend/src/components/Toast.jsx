import React, { useEffect } from 'react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
  };

  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">{icons[type] || icons.success}</span>
      <span>{message}</span>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div id="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
