import React from 'react';
import { Save, X, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';

interface EditModeBarProps {
  onSave: () => void;
  onCancel: () => void;
  hideButtons?: boolean;
  isNew?: boolean;
}

export function EditModeBar({ onSave, onCancel, hideButtons = false, isNew = false }: EditModeBarProps) {
  return (
    <div className="pointer-events-auto max-w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-600 border border-blue-500 shadow-2xl rounded-2xl backdrop-blur-sm transition-all duration-300">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between gap-12">
            <div className="flex items-center gap-3 text-white whitespace-nowrap">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                {isNew ? 'Modo de creación activo' : 'Modo de edición activo'}
              </span>
            </div>
            
            {!hideButtons && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md transition-all font-bold text-xs uppercase tracking-widest h-9"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={onSave}
                  className="bg-white hover:bg-white text-blue-600 font-bold shadow-lg hover:shadow-white/20 transition-all text-xs uppercase tracking-widest px-4 h-9"
                >
                  {isNew ? (
                    <>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Crear candidato
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
