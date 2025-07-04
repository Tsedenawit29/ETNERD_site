import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', // 'info', 'success', 'error', 'confirm'
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
            <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
            <svg className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'confirm':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sai-teal-100 dark:bg-sai-teal-900">
            <svg className="h-6 w-6 text-sai-teal-500 dark:text-sai-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getButtonClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'confirm':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      default:
        return 'bg-sai-teal-200 hover:bg-sai-teal-300 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 lg:p-4 z-50">
      <div className="bg-white dark:bg-black rounded-xl p-4 lg:p-6 max-w-sm lg:max-w-md w-full shadow-xl transform transition-all border border-gray-200 dark:border-gray-800">
        <div className="text-center">
          {getIcon()}
          <h3 className="mt-3 lg:mt-4 text-base lg:text-lg font-medium text-gray-900 dark:text-sai-teal-200">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-4 lg:mt-6 flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
          {type === 'confirm' && (
            <button
              type="button"
              onClick={onClose}
              className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 border border-gray-300 dark:border-gray-700"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={type === 'confirm' ? onConfirm : onClose}
            className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors duration-200 ${getButtonClasses()}`}
          >
            {type === 'confirm' ? confirmText : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 