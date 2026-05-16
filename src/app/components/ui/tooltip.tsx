import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [actualSide, setActualSide] = useState(side);
  const [isPositioned, setIsPositioned] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      let top = 0;
      let left = 0;
      let finalSide = side;

      // Check if there's enough space on the left
      if (side === 'left') {
        const spaceOnLeft = triggerRect.left;
        const spaceOnRight = viewportWidth - triggerRect.right;
        
        if (spaceOnLeft < tooltipRect.width + 16 && spaceOnRight > spaceOnLeft) {
          // Switch to right if not enough space on left
          finalSide = 'right';
        }
      }

      switch (finalSide) {
        case 'top':
          top = triggerRect.top - 8;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.left - 8;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.right + 8;
          break;
      }

      setActualSide(finalSide);
      setPosition({ top, left });
      setIsPositioned(true);
    } else {
      setActualSide(side);
      setIsPositioned(false);
    }
  }, [isVisible, side]);

  const getTooltipClasses = () => {
    const baseClasses = 'fixed px-3 py-2 bg-gray-900 text-white text-xs rounded-xl shadow-xl max-w-[320px] pointer-events-none z-[9999]';
    const visibilityClass = isPositioned ? 'opacity-100' : 'opacity-0';
    
    let transformClasses = '';

    switch (actualSide) {
      case 'top':
        transformClasses = '-translate-x-1/2 -translate-y-full';
        break;
      case 'bottom':
        transformClasses = '-translate-x-1/2';
        break;
      case 'left':
        transformClasses = '-translate-x-full -translate-y-1/2';
        break;
      case 'right':
        transformClasses = '-translate-y-1/2';
        break;
    }

    return `${baseClasses} ${transformClasses} ${visibilityClass} transition-opacity duration-[50ms]`;
  };

  const tooltip = isVisible ? (
    <div 
      ref={tooltipRef} 
      className={getTooltipClasses()}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      <div 
        className="relative inline-flex" 
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {tooltip && createPortal(tooltip, document.body)}
    </>
  );
}