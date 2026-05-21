import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from './utils';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export function Drawer({ open, onClose, children, width = '80%' }: DrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed right-0 top-0 h-full bg-white z-50 shadow-drawer transition-transform duration-300 ease-out rounded-tl-2xl',
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width }}
      >
        <div className="h-full overflow-hidden relative">
          {children}
        </div>
      </div>
    </>
  );
}
