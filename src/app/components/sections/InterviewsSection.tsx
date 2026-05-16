import React from 'react';
import { ProcessStepSection } from './ProcessStepSection';
import { Video, Users, User } from 'lucide-react';

export function InterviewsSection() {
  const steps = [
    {
      id: 'hr-interview',
      title: 'Entrevista con RRHH',
      status: 'completed' as const,
      date: '20 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-semibold text-gray-900">Andrea Ruiz - HR Manager</h5>
                <span className="text-xs text-gray-500">30 minutos</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Calificación General</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">5/5</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Notas</p>
                  <p className="text-sm text-gray-700">
                    Candidato con buen perfil técnico, comunicación clara sobre su experiencia en backend. 
                    Demuestra conocimiento sólido en Node.js, Python y arquitecturas de microservicios. 
                    Mostró interés genuino en seguir creciendo profesionalmente.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Fortalezas Identificadas</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      Comunicación
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      Liderazgo
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      Visión Estratégica
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'technical-interview',
      title: 'Entrevista Técnica',
      status: 'completed' as const,
      date: '22 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-semibold text-gray-900">Carlos Ramírez - Director de Marketing</h5>
                <span className="text-xs text-gray-500">45 minutos</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Calificación General</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <svg className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">4/5</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Evaluación Técnica</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Conocimiento de HubSpot</span>
                      <span className="font-semibold text-gray-900">Avanzado</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Google Analytics & Data Studio</span>
                      <span className="font-semibold text-gray-900">Experto</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Email Marketing</span>
                      <span className="font-semibold text-gray-900">Avanzado</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Feedback</p>
                  <p className="text-sm text-gray-700">
                    Sólidos conocimientos técnicos y experiencia práctica demostrable. 
                    Compartió casos de éxito concretos con métricas reales. Recomiendo continuar al siguiente paso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'panel-interview',
      title: 'Entrevista Panel',
      status: 'pending' as const,
      date: 'Por programar',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Entrevista con Equipo</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Sesión grupal con miembros del equipo de marketing para evaluar fit y dinámica de trabajo.
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Programar Entrevista
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Ver Disponibilidad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ProcessStepSection
      title="Entrevistas"
      description="Historial completo de entrevistas realizadas con el candidato"
      steps={steps}
    />
  );
}
