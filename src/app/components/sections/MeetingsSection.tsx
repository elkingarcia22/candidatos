import React from 'react';
import { ProcessStepSection } from './ProcessStepSection';
import { Calendar, MapPin, Users } from 'lucide-react';

export function MeetingsSection() {
  const steps = [
    {
      id: 'coffee-chat',
      title: 'Coffee Chat Informal',
      status: 'completed' as const,
      date: '17 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900">Reunión Inicial</h5>
                    <p className="text-xs text-gray-500 mt-1">17 de marzo, 2026 • 11:00 AM - 11:30 AM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Completado
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Café Tostao - Calle 85, Bogotá</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Andrea Ruiz (HR Manager)</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Notas</p>
                  <p className="text-sm text-gray-700">
                    Buena primera impresión. El candidato mostró interés en el rol y 
                    la cultura de la empresa. Conversación fluida sobre experiencias previas y expectativas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'office-visit',
      title: 'Visita a Oficinas',
      status: 'completed' as const,
      date: '21 de marzo, 2026',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900">Tour por Oficinas + Meet & Greet</h5>
                    <p className="text-xs text-gray-500 mt-1">21 de marzo, 2026 • 3:00 PM - 4:30 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Completado
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Oficina UBITS - Carrera 7 #71-21, Bogotá</span>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Participantes</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      Carlos Ramírez (Director Marketing)
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      Ana Morales (Marketing Lead)
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      3 miembros del equipo
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Feedback del Equipo</p>
                  <p className="text-sm text-gray-700">
                    El equipo tuvo buena conexión con el candidato. Todos coinciden en que 
                    tiene potencial para encajar en la cultura y dinámica del equipo. Mostró entusiasmo 
                    por los proyectos actuales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'final-meeting',
      title: 'Reunión Final con CEO',
      status: 'pending' as const,
      date: 'Por programar',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Última Etapa</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Reunión final con el CEO para discutir visión a largo plazo, expectativas 
                  y detalles de la oferta.
                </p>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">OPCIONES DE FECHAS SUGERIDAS</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="meeting-date" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Lunes 27 de marzo - 10:00 AM</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="meeting-date" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Miércoles 29 de marzo - 2:00 PM</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="meeting-date" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Viernes 31 de marzo - 11:00 AM</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Confirmar Fecha
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
      title="Reuniones y Encuentros"
      description="Registro de todas las reuniones presenciales y virtuales con el candidato"
      steps={steps}
    />
  );
}
