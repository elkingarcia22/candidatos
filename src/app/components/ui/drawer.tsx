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
      // Primero hacemos visible el drawer
      setIsVisible(true);
      // Luego iniciamos la animación en el siguiente frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      // Primero quitamos la animación
      setIsAnimating(false);
      // Luego ocultamos el drawer después de la animación
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Debe coincidir con duration-300
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
    
    // Prevent scrolling on the body when drawer is open
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
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-out rounded-tl-2xl',
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width }}
      >
        {/* Content */}
        <div className="h-full overflow-hidden relative">
          {children}
        </div>
      </div>
    </>
  );
}