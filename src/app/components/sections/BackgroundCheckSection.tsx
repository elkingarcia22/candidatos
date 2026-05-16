import React from 'react';
import { Shield, CheckCircle2, AlertCircle, Clock, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface BackgroundCheckSectionProps {
  data?: {
    status: 'clean' | 'issues' | 'pending';
    completedDate: string;
    recommendation?: string;
    details: Array<{ 
      category: string; 
      result: string; 
      status: 'pass' | 'fail' | 'warning'; 
      records?: number; 
      description?: string 
    }>;
  };
  isValentina?: boolean;
}

export function BackgroundCheckSection({ data, isValentina }: BackgroundCheckSectionProps) {
  if (!data) {
    return (
      <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-8 text-center">
        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-500">La verificación de antecedentes no ha sido iniciada.</p>
      </div>
    );
  }

  const statusConfigs = {
    clean: { 
      label: 'Todo Limpio', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-100',
      icon: CheckCircle2,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    issues: { 
      label: 'Hallazgos', 
      color: 'text-rose-600', 
      bg: 'bg-rose-50', 
      border: 'border-rose-100',
      icon: AlertCircle,
      badge: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    pending: { 
      label: 'En Proceso', 
      color: 'text-amber-600', 
      bg: 'bg-amber-50', 
      border: 'border-amber-100',
      icon: Clock,
      badge: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  };

  const config = statusConfigs[data.status];
  const recommendation = data.recommendation || (
    data.status === 'clean' ? 'El candidato ha superado satisfactoriamente todas las validaciones.' :
    data.status === 'issues' ? 'Se han encontrado inconsistencias que requieren validación.' :
    'El proceso de verificación está en curso.'
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5 text-left">
      
      {/* Header — Patrón Serena IA */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Verificación de Antecedentes</h4>
          </div>
        </div>
      </div>

      {/* Notificación — debajo del header */}
      <div className={`flex items-center gap-3 p-3 ${config.bg} rounded-lg border ${config.border}`}>
        <config.icon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
        <p className={`text-xs font-medium ${config.color.replace('text-', 'text-opacity-90 ')}`}>
          {recommendation}
        </p>
      </div>

      {/* Detalle de validaciones — lista de bullets */}
      <ul className="space-y-2.5">
        {data.details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              detail.status === 'pass' ? 'bg-emerald-400' : 
              detail.status === 'fail' ? 'bg-rose-400' : 'bg-amber-400'
            }`} />
            <p className="text-[12.5px] text-gray-700 leading-relaxed">
              <strong className="text-gray-900 font-semibold">{detail.category}:</strong>{' '}
              {detail.description || detail.result}
            </p>
          </li>
        ))}
      </ul>

      {/* Footer / Metadatos y Acciones */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
            <span className="font-semibold text-gray-700">Última actualización:</span>
            {data.completedDate}
          </span>
        </div>
        
        <button 
          onClick={() => {
            if (isValentina) {
              toast.error('Estamos presentando inconvenientes para generar el reporte. Por favor, intenta más tarde.');
              return;
            }
            toast.success('Iniciando descarga del reporte completo...');
          }}
          className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          DESCARGAR REPORTE
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
