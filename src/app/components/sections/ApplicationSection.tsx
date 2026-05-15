import React from 'react';
import { CandidateDossierSections } from '../CandidateDossierSections';

export function ApplicationSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detalles de la Aplicación</h3>
        <p className="text-sm text-gray-600 mb-6">
          Información completa sobre la aplicación del candidato a esta posición
        </p>
        
        {/* Collapsible Sections from existing component */}
        <CandidateDossierSections />
      </div>
    </div>
  );
}
