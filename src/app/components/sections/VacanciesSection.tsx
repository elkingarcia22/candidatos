import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { StagesSection } from './StagesSection';
import { ChevronRight, ChevronLeft, BriefcaseBusiness, AlertCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { Tooltip } from '../ui/tooltip';
import { Button } from '../ui/button';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface VacanciesSectionProps {
  candidate: any;
  applications: any[];
  comments: any[];
  addComment: any;
  editComment?: any;
  deleteComment?: any;
  openCommentPanel: any;
  highlightedStageId: any;
  onVacancySelect?: (isSelected: boolean) => void;
  isValentina?: boolean;
  isAndres?: boolean;
  onEditProfile?: () => void;
}

export function VacanciesSection({ 
  candidate, 
  applications, 
  comments, 
  addComment, 
  editComment,
  deleteComment,
  openCommentPanel, 
  highlightedStageId,
  onVacancySelect,
  isValentina,
  isAndres,
  onEditProfile
}: VacanciesSectionProps) {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const activeApp = applications?.find(app => app.status === 'active') || applications?.[0];
    if (activeApp) {
      setSelectedVacancyId(activeApp.id);
    } else {
      setSelectedVacancyId(null);
    }
  }, [candidate?.id]);

  React.useEffect(() => {
    if (onVacancySelect) {
      onVacancySelect(!!selectedVacancyId);
    }
  }, [selectedVacancyId, onVacancySelect]);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de scroll
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Sub-componente: Vista de Historial / Resumen
  const renderSummaryView = () => {
    const [selectedStageDetailId, setSelectedStageDetailId] = useState<string | null>(null);
    const activeCount = applications.filter(app => app.status === 'active').length;
    const totalCount = applications.length;

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active': return 'EN CURSO';
        case 'hired': return 'CONTRATADO';
        case 'rejected': return 'RECHAZADO';
        default: return status.toUpperCase();
      }
    };
    
    const getStatusStyles = (status: string, isBlocked?: boolean) => {
      if (isBlocked) {
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', rings: 'ring-amber-100' };
      }
      switch (status) {
        case 'active': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-500', rings: 'ring-blue-100' };
        case 'hired': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500', rings: 'ring-emerald-100' };
        case 'rejected': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-500', rings: 'ring-red-100' };
        default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100', dot: 'bg-gray-500', rings: 'ring-gray-100' };
      }
    };

    return (
      <div className="space-y-4">
        {selectedVacancyId ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <button 
              onClick={() => {
                if (selectedStageDetailId) {
                  setSelectedStageDetailId(null);
                } else {
                  setSelectedVacancyId(null);
                }
              }}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              {selectedStageDetailId ? 'Volver a las etapas de la vacante' : 'Volver al historial de vacantes'}
            </button>
            
            {applications.find(app => app.id === selectedVacancyId) && (
              <StagesSection 
                comments={comments} 
                addComment={addComment} 
                editComment={editComment}
                deleteComment={deleteComment}
                openCommentPanel={openCommentPanel} 
                highlightedStageId={highlightedStageId} 
                activeApplication={applications.find(app => app.id === selectedVacancyId)} 
                candidate={candidate} 
                isValentina={isValentina}
                selectedStageDetailId={selectedStageDetailId}
                onDetailChange={setSelectedStageDetailId}
                onEditProfile={onEditProfile}
              />
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <BriefcaseBusiness className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Historial de Vacantes</h3>
                  <p className="text-sm text-gray-500">Participación en vacantes de la empresa</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                  VACANTES ACTUALES: {activeCount}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                  TOTAL: {totalCount}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {applications.map(app => {
                const isBlocked = app.status === 'active' && !!app.blocker;
                const styles = getStatusStyles(app.status, isBlocked);
                return (
                  <div 
                    key={app.id} 
                    onClick={() => setSelectedVacancyId(app.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                      isBlocked
                        ? "border-amber-200 bg-amber-50/40 hover:border-amber-300 hover:shadow-sm"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-4 h-4 rounded-full flex items-center justify-center ring-4", styles.rings)}>
                        {isBlocked
                          ? <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />
                          : <div className={cn("w-2 h-2 rounded-full", styles.dot)} />
                        }
                      </div>
                      <div>
                        <h4 className={cn(
                          "font-bold uppercase tracking-wide text-sm transition-colors",
                          isBlocked ? "text-amber-900 group-hover:text-amber-700" : "text-gray-900 group-hover:text-blue-600"
                        )}>{app.jobTitle}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">Postulación: {app.appliedDate || 'No disponible'}</p>
                        {isBlocked && app.blocker?.reason && (
                          <div className="mt-1 flex flex-col gap-2">
                            <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {app.blocker.reason}
                            </p>
                            {app.blocker.action && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isValentina && app.blocker?.action?.type === 'edit_profile') {
                                    onEditProfile?.();
                                    return;
                                  }
                                  if (isValentina) {
                                    toast.error('No es posible abrir WhatsApp en este momento. Inténtalo de nuevo en unos minutos.');
                                    return;
                                  }
                                  if (app.blocker.action.type === 'whatsapp' && candidate?.phone) {
                                    const phone = candidate.phone.replace(/[^0-9]/g, '');
                                    const text = encodeURIComponent(app.blocker.action.message || '');
                                    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
                                  }
                                }}
                                className="w-fit h-7 px-2.5 text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-sm border border-gray-200"
                              >
                                {app.blocker.action.type === 'whatsapp' && <WhatsAppIcon className="w-3 h-3" />}
                                {app.blocker.action.label}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isBlocked ? (
                        <div className="px-3 py-1.5 rounded-md border text-[10px] font-bold tracking-wide bg-amber-50 text-amber-700 border-amber-200">
                          ACCIÓN REQUERIDA
                        </div>
                      ) : (
                        <div className={cn("px-3 py-1.5 rounded-md border text-[10px] font-bold tracking-wide", styles.bg, styles.text, styles.border)}>
                          {getStatusText(app.status)}
                        </div>
                      )}
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-colors",
                        isBlocked ? "text-amber-300 group-hover:text-amber-500" : "text-gray-300 group-hover:text-blue-500"
                      )} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Ordenar aplicaciones: las activas primero
  const sortedApplications = applications ? [...applications].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return 0;
  }) : [];

  return (
    <div className="space-y-6">
      {renderSummaryView()}
    </div>
  );
}
