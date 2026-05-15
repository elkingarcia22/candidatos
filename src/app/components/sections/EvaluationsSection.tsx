import React from 'react';
import { Bot, CheckCircle, FileText } from 'lucide-react';

export function EvaluationsSection() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900">Serena AI</h4>
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
              Aprobado
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">9 sept 2025, 4:59 p.m.</p>
        </div>
      </div>

      {/* Recomendación */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-emerald-900 mb-1">Recomendación</div>
            <p className="text-sm text-emerald-800">
              Puede continuar en el proceso.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        <h5 className="text-sm font-semibold text-gray-900">Evaluación de verificación de antecedentes</h5>
        
        <div className="grid gap-4">
          <div className="flex gap-3">
            <div className="w-1.5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium text-gray-900">Identidad</div>
              <p className="text-sm text-gray-600">
                Verificada en múltiples bases oficiales, sin inconsistencias. La cédula de ciudadanía está vigente y la información coincide con los registros oficiales.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium text-gray-900">Historial penal y criminal</div>
              <p className="text-sm text-gray-600">
                Consultado, no se encontraron antecedentes pendientes con las autoridades judiciales.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium text-gray-900">Legal</div>
              <p className="text-sm text-gray-600">
                No se encontraron registros legales relevantes.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium text-gray-900">Afiliaciones</div>
              <p className="text-sm text-gray-600">
                Activo en el régimen contributivo de salud, consistente con registros.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium text-gray-900">Impuestos y Finanzas</div>
              <p className="text-sm text-gray-600">
                Sin reportes fiscales negativos, no está reportado como responsable fiscal.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium text-gray-900">Internacional y medios</div>
              <p className="text-sm text-gray-600">
                Sin registros encontrados.
              </p>
            </div>
          </div>
        </div>

        {/* Documentos */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Reporte de verificación de antecedentes</div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Descargar
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}