import React from 'react';
import { CheckCircle2, FileText } from 'lucide-react';

interface CVAnalysisSectionProps {
  data?: {
    summary?: string;
    score?: number;
    criteria?: Array<{ label: string; score: number; status: 'pass' | 'fail' | 'warning' }>;
    evaluations?: Array<{ category: string; description: string }>;
    minimumThreshold?: number;
    decision?: string;
    recommendation?: string;
  };
  candidateName: string;
}

export function CVAnalysisSection({ data, candidateName }: CVAnalysisSectionProps) {
  const evaluations = data?.evaluations ?? (
    data?.criteria?.map(c => ({ category: c.label, description: `Puntaje obtenido: ${c.score}/100.` })) ?? [
      { category: 'Experiencia', description: 'El candidato cuenta con amplia experiencia en roles similares, demostrando estabilidad laboral.' },
      { category: 'Relevancia', description: 'Su perfil se alinea con los requisitos técnicos exigidos por la vacante.' },
    ]
  );

  const cvScore = data?.score ?? 85;
  const minThreshold = data?.minimumThreshold ?? 70;
  const decision = data?.decision ?? 'Válida (supera el umbral)';
  const recommendation = data?.recommendation ?? `El perfil de ${candidateName} presenta una alta afinidad con los requisitos.`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">

      {/* Header — mismo patrón que PsychometricSection */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Análisis de CV</h4>
            <p className="text-xs text-gray-500">Evaluado por Serena IA</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{cvScore}</div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Puntaje CV</p>
        </div>
      </div>

      {/* Recomendación — justo debajo del header, igual que otras etapas */}
      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <p className="text-xs font-medium text-emerald-800">
          {recommendation}
        </p>
      </div>

      {/* Evaluation bullets */}
      <ul className="space-y-2.5">
        {evaluations.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
            <p className="text-[12.5px] text-gray-700 leading-relaxed">
              <strong className="text-gray-900 font-semibold">{item.category}:</strong>{' '}
              {item.description}
            </p>
          </li>
        ))}
      </ul>

      {/* Umbral y Decisión — sin repetir puntaje ya visible en el header */}
      <div className="border-t border-gray-100 pt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600">
          <span className="font-semibold text-gray-700">Umbral mínimo:</span>
          {minThreshold}/100
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-700 font-medium">
          {decision}
        </span>
      </div>
    </div>
  );
}
