import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  ExternalLink,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export function CandidateDossierSections() {
  const [openSections, setOpenSections] = useState<string[]>(['screening', 'match']);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const sections: Section[] = [
    {
      id: 'screening',
      title: 'Preguntas de Screening',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm text-gray-900 mb-1">
              ¿Cuántos años de experiencia tienes en marketing digital?
            </p>
            <p className="text-sm text-gray-600">
              Tengo 5 años de experiencia en marketing digital, especializada en automatización y growth marketing.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900 mb-1">
              ¿Tienes experiencia con herramientas de marketing automation?
            </p>
            <p className="text-sm text-gray-600">
              Sí, he trabajado con HubSpot, Marketo y ActiveCampaign. También tengo certificaciones en HubSpot.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900 mb-1">
              ¿Cuál es tu disponibilidad para comenzar?
            </p>
            <p className="text-sm text-gray-600">
              Puedo comenzar en 2 semanas si es necesario.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'match',
      title: 'Job Match Breakdown',
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">5+ años en marketing digital</p>
              <p className="text-sm text-gray-600">
                "5 años de experiencia en marketing digital, especializada en automatización"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">Experto en marketing automation</p>
              <p className="text-sm text-gray-600">
                "HubSpot, Marketo y ActiveCampaign + certificaciones"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">Experiencia en UK market (deseable)</p>
              <p className="text-sm text-gray-600">
                No se menciona experiencia específica en mercado UK
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">Certificación Google Ads (requerida)</p>
              <p className="text-sm text-gray-600">
                No se encontró evidencia de certificación
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'meetings',
      title: 'Meetings / Agenda',
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm text-gray-900">Entrevista Serena IA - Screening</h4>
                <p className="text-sm text-gray-600 mt-1">Miércoles 18 de Febrero, 2026 • 10:00 AM</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Completada</Badge>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">
                Ver transcripción
              </Button>
              <Button variant="outline" size="sm">
                Ver highlights
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm text-gray-900">Entrevista técnica con equipo</h4>
                <p className="text-sm text-gray-600 mt-1">Pendiente de agendar</p>
              </div>
              <Badge variant="outline">Pendiente</Badge>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">
                Reprogramar
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'feedback',
      title: 'Interview Feedback',
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm text-gray-900">Serena IA - Screening Interview</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-blue-600">Score: 8.5/10</span>
                <Badge className="bg-green-100 text-green-700">Alta confianza</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Candidata muy sólida con excelente experiencia en marketing automation. 
              Comunicación clara y estructurada. Muestra entusiasmo por el rol.
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Ver scorecard completo
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'resume',
      title: 'Resume / CV',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium text-sm text-gray-900">Diana_Rodriguez_CV.pdf</p>
                <p className="text-xs text-gray-500">Subido el 15 Feb 2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver como PDF
              </Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-8 bg-white min-h-[400px]">
            <div className="space-y-4 max-w-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">Diana Paola Rodríguez Suárez</h3>
                <p className="text-gray-600">Marketing Manager • Marketing Automation Specialist</p>
                <p className="text-sm text-gray-500 mt-1">diana.rodriguez@email.com • +57 300 123 4567</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">EXPERIENCIA PROFESIONAL</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Senior Marketing Manager - TechCorp</p>
                    <p className="text-sm text-gray-600">2021 - Presente</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mt-1">
                      <li>Lideré estrategia de marketing automation aumentando conversión en 45%</li>
                      <li>Implementé HubSpot y Marketo para automatización end-to-end</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900">Marketing Manager - StartupXYZ</p>
                    <p className="text-sm text-gray-600">2019 - 2021</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside mt-1">
                      <li>Desarrollé estrategia de growth marketing B2B</li>
                      <li>Certificaciones en HubSpot y Google Analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-sm text-gray-500">
            Página 1 de 1
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <Collapsible
          key={section.id}
          open={openSections.includes(section.id)}
          onOpenChange={() => toggleSection(section.id)}
        >
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-gray-600">{section.icon}</div>
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
              </div>
              {openSections.includes(section.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 pt-2">{section.content}</div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
