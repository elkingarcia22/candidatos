import React from 'react';
import { ProcessStepSection } from './ProcessStepSection';

export function ScreeningSection() {
  const steps = [
    {
      id: 'initial-screening',
      title: 'Screening Inicial',
      status: 'completed' as const,
      date: '15 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Preguntas de Screening</h5>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  ¿Cuántos años de experiencia tienes en Marketing Digital?
                </p>
                <p className="text-sm text-gray-600">5 años de experiencia liderando equipos de marketing digital</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  ¿Tienes experiencia con HubSpot?
                </p>
                <p className="text-sm text-gray-600">Sí, 3 años utilizando HubSpot para automatización y gestión de campañas</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  ¿Cuál es tu expectativa salarial?
                </p>
                <p className="text-sm text-gray-600">$8,000,000 - $10,000,000 COP mensuales</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'skills-assessment',
      title: 'Evaluación de Habilidades',
      status: 'completed' as const,
      date: '18 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-3">Resultados de Evaluación</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Marketing Digital</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Analítica y Métricas</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Automatización de Marketing</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'phone-screening',
      title: 'Screening Telefónico',
      status: 'in-progress' as const,
      date: 'Programado para 25 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Próxima llamada programada:</span> 25 de marzo a las 10:00 AM
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Entrevistador: Juan Carlos Martínez (Hiring Manager)
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ProcessStepSection
      title="Proceso de Screening"
      description="Evaluación inicial del candidato, preguntas de filtro y validación de requisitos básicos"
      steps={steps}
    />
  );
}
