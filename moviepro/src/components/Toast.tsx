import React, { useEffect } from 'react';
import { Check, Info, Trash2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'add' | 'remove' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'add',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div 
      role="status" 
      aria-live="polite"
      className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        type === 'add' 
          ? 'bg-purple-600 text-white' 
          : type === 'remove' 
          ? 'bg-zinc-700 text-zinc-300' 
          : 'bg-indigo-600 text-white'
      }`}>
        {type === 'add' && <Check className="w-3.5 h-3.5" />}
        {type === 'remove' && <Trash2 className="w-3.5 h-3.5" />}
        {type === 'info' && <Info className="w-3.5 h-3.5" />}
      </div>
      <span className="text-sm font-medium tracking-wide text-zinc-200">{message}</span>
      <button 
        onClick={onClose} 
        aria-label="Dismiss notification"
        className="ml-2 text-zinc-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
