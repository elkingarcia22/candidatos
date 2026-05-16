import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip } from './ui/tooltip';

interface DrawerNavigationProps {
  currentIndex: number;
  totalCandidates: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function DrawerNavigation({
  currentIndex,
  totalCandidates,
  onClose,
  onPrevious,
  onNext,
}: DrawerNavigationProps) {
  const hasPrevious = currentIndex > 1;
  const hasNext = currentIndex < totalCandidates;

  return (
    <div className="flex flex-col gap-1">
      {/* Close Button */}
      <Tooltip content="Cerrar" side="left">
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white border border-gray-200 rounded-l-lg flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors group"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
        </button>
      </Tooltip>

      {/* Spacer between close and navigation */}
      <div className="h-4" />

      {/* Previous Button */}
      <Tooltip content={hasPrevious ? 'Candidato anterior' : 'No hay candidato anterior'} side="left">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`w-10 h-10 border rounded-l-lg flex items-center justify-center shadow-lg transition-colors group ${
            hasPrevious
              ? 'bg-white border-gray-200 hover:bg-gray-50 cursor-pointer'
              : 'bg-gray-100 border-gray-200 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className={`w-5 h-5 ${hasPrevious ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300'}`} />
        </button>
      </Tooltip>

      {/* Next Button */}
      <Tooltip content={hasNext ? 'Siguiente candidato' : 'No hay más candidatos'} side="left">
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`w-10 h-10 border rounded-l-lg flex items-center justify-center shadow-lg transition-colors group ${
            hasNext
              ? 'bg-white border-gray-200 hover:bg-gray-50 cursor-pointer'
              : 'bg-gray-100 border-gray-200 cursor-not-allowed'
          }`}
        >
          <ChevronRight className={`w-5 h-5 ${hasNext ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300'}`} />
        </button>
      </Tooltip>
    </div>
  );
}