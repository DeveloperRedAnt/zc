import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastProps, Toaster } from './toast';

// Toast context types
type ToastWithId = ToastProps & { id: string };

interface ToastContextType {
  toasts: ToastWithId[];
  showToast: (toast: Omit<ToastProps, 'onClose'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const showToast = useCallback((toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id, onClose: () => hideToast(id) }]);
    setTimeout(() => hideToast(id), 5000);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
        {toasts.map((toast) => (
          <Toaster key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
