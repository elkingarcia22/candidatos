import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ban,
  ArrowRight,
  MessageSquare,
  ListTodo,
  Mail,
  MoreHorizontal,
  Download,
  Share2,
  Eye,
  Printer,
  Phone,
  Video,
  RotateCcw,
  Layers,
  SkipForward,
  Shield,
  Copy,
  ChevronRight,
  FileText,
  Edit,
  AlertCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip } from './ui/tooltip';
import { toast } from 'sonner';
import { cn } from './ui/utils';

// WhatsApp Icon Component
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

interface FloatingActionBarProps {
  mode: 'vacancy' | 'general';
  onReject: () => void;
  onNextStage: () => void;
  onComment: () => void;
  onAddTodo: () => void;
  onMessage: () => void;
  candidatePhone?: string;
  onAddDocument?: () => void;
  onEditProfile?: () => void;
  isValentina?: boolean;
}

export function FloatingActionBar({
  mode,
  onReject,
  onNextStage,
  onComment,
  onAddTodo,
  onMessage,
  candidatePhone,
  onAddDocument,
  onEditProfile,
  isValentina = false
}: FloatingActionBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);
  const [submenuPosition, setSubmenuPosition] = React.useState({ top: 0, left: 0, fromBar: false });
  const [isMinimized, setIsMinimized] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const submenuRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const startMinimizeTimer = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsMinimized(true);
    }, 2500); // Wait 2.5 seconds before minimizing
  }, []);

  const clearMinimizeTimer = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  React.useEffect(() => {
    setIsMinimized(false);
    startMinimizeTimer();
    return () => clearMinimizeTimer();
  }, [mode, startMinimizeTimer, clearMinimizeTimer]);

  React.useEffect(() => {
    if (isDropdownOpen || isSubmenuOpen) {
      clearMinimizeTimer();
    } else {
      if (!isMinimized) {
        startMinimizeTimer();
      }
    }
  }, [isDropdownOpen, isSubmenuOpen, startMinimizeTimer, clearMinimizeTimer, isMinimized]);

  const handleMouseEnter = () => {
    clearMinimizeTimer();
    setIsMinimized(false);
  };

  const handleMouseLeave = () => {
    if (!isDropdownOpen && !isSubmenuOpen) {
      startMinimizeTimer();
    }
  };

  // Definición de acciones base
  const vacancyActions = [
    { key: 'reject', label: 'Descartar', icon: Ban, onClick: () => {
        if (isValentina) {
          toast.error('No ha sido posible actualizar el estado del proceso debido a un inconveniente en el sistema. Estamos trabajando para solucionarlo.');
          return;
        }
        onReject();
    }, variant: 'reject' as const },
    { key: 'next', label: 'Siguiente', icon: ArrowRight, onClick: () => {
        if (isValentina) {
          toast.error('No ha sido posible actualizar el estado del proceso debido a un inconveniente en el sistema. Estamos trabajando para solucionarlo.');
          return;
        }
        onNextStage();
    }, variant: 'primary' as const },
    { key: 'skip', label: 'Omitir etapa', icon: SkipForward, onClick: () => {
        if (isValentina) {
          toast.error('No ha sido posible actualizar el estado del proceso debido a un inconveniente en el sistema. Estamos trabajando para solucionarlo.');
          return;
        }
        toast.success('Omitiendo etapa actual...');
    }},
    { key: 'move_sep', label: 'Mover a etapa', icon: Layers, isSpecial: true },
    { key: 'interview', label: 'Agregar entrevista', icon: Video, onClick: () => {
        if (isValentina) {
          toast.error('Por el momento no podemos programar la entrevista. Inténtalo de nuevo más tarde.');
          return;
        }
        toast.success('Abriendo formulario para agregar entrevista...');
    }},
    { key: 'shield', label: 'Verificación Antecedentes', icon: Shield, onClick: () => {
        if (isValentina) {
          toast.error('Estamos presentando inconvenientes para solicitar la verificación de antecedentes. Por favor, inténtalo más tarde.');
          return;
        }
        toast.success('Solicitando verificación de antecedentes...');
    }},
    { key: 'copyAppId', label: 'Copiar Application ID', icon: FileText, onClick: () => {
        const appId = 'APP-2024-001234';
        navigator.clipboard.writeText(appId).then(() => toast.success('Application ID copiado'));
    }},
  ];

  const generalActions = [
    { key: 'viewCV', label: 'Ver CV', icon: Eye, onClick: () => {
        if (isValentina) {
          toast.error('Estamos presentando inconvenientes para visualizar el documento. Por favor, inténtalo más tarde.');
          return;
        }
        toast.success('Abriendo visor de CV...');
    }},
    { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, onClick: () => {
        if (isValentina) {
          toast.error('No es posible abrir WhatsApp en este momento. Inténtalo de nuevo en unos minutos.');
          return;
        }
        candidatePhone ? window.open(`https://wa.me/${candidatePhone.replace(/\D/g, '')}`, '_blank') : toast.error('Teléfono no disponible');
    }},
    { key: 'email', label: 'Email', icon: Mail, onClick: () => {
        if (isValentina) {
          toast.error('Por el momento no podemos abrir el cliente de correo. Inténtalo más tarde.');
          return;
        }
        onMessage();
    }},
    { key: 'editProfile', label: 'Editar perfil', icon: Edit, onClick: onEditProfile },
    { key: 'call', label: 'Llamar', icon: Phone, onClick: () => {
        if (isValentina) {
          toast.error('No es posible iniciar la llamada en este momento. Inténtalo de nuevo en unos minutos.');
          return;
        }
        candidatePhone ? window.location.href = `tel:${candidatePhone}` : toast.error('Teléfono no disponible');
    }},
    { key: 'addDoc', label: 'Agregar documento', icon: FileText, onClick: () => {
        if (onAddDocument) onAddDocument();
    }},
    { key: 'downloadCV', label: 'Descargar CV', icon: Download, onClick: () => {
        if (isValentina) {
          toast.error('Por el momento no podemos descargar el archivo, inténtalo más tarde.');
          return;
        }
        toast.success('Descargando CV...');
    }},
    { key: 'print', label: 'Imprimir perfil', icon: Printer, onClick: () => {
        if (isValentina) {
          toast.error('No ha sido posible generar la versión de impresión del perfil. Por favor, inténtalo más tarde.');
          return;
        }
        window.print();
    }},
  ];

  // Determinar qué se muestra en la barra (los primeros 4 items disponibles)
  let visibleActions: any[] = [];
  let extraActions: any[] = [];

  if (mode === 'vacancy') {
    visibleActions = vacancyActions.slice(0, 4);
    extraActions = [...vacancyActions.slice(4), ...generalActions];
  } else {
    visibleActions = generalActions.slice(0, 4);
    extraActions = generalActions.slice(4);
  }

  // Cerrar dropdown al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !(submenuRef.current && submenuRef.current.contains(event.target as Node))
      ) {
        setIsDropdownOpen(false);
        setIsSubmenuOpen(false);
      }
    };

    if (isDropdownOpen || isSubmenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isSubmenuOpen]);

  // Función para manejar el toggle del submenú con posicionamiento inteligente
  const handleSubmenuToggle = (e: React.MouseEvent, fromBar: boolean) => {
    e.stopPropagation();
    const trigger = e.currentTarget as HTMLElement;
    const rect = trigger.getBoundingClientRect();
    
    // Si viene de la barra (abajo), posicionar arriba
    // Si viene del menú (dropdown), posicionar a la derecha
    if (fromBar) {
      setSubmenuPosition({
        top: rect.top - 330, // Aproximadamente el alto del menú de etapas
        left: rect.left,
        fromBar: true
      });
    } else {
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 4,
        fromBar: false
      });
    }
    
    setIsSubmenuOpen(!isSubmenuOpen);
    if (!fromBar) {
      // Si es desde el menú, no cerramos el dropdown principal aún
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "pointer-events-auto absolute transition-all duration-500 ease-in-out z-50 flex justify-center",
        "left-1/2 bottom-6 -translate-x-1/2"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        layout
        initial={false}
        animate={{
          width: isMinimized ? 80 : 'auto',
          height: isMinimized ? 4 : 60, // Fixed height for more stable transition
          backgroundColor: isMinimized ? 'rgba(31, 41, 55, 1)' : 'rgba(17, 24, 39, 0.98)',
          borderRadius: isMinimized ? 100 : 20,
          padding: isMinimized ? 0 : '10px',
          boxShadow: isMinimized 
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 20px 40px -10px rgba(0,0,0,0.5)',
          y: isMinimized ? 0 : -4,
        }}
        transition={{
          layout: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
          default: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          }
        }}
        className={cn(
          "shadow-2xl backdrop-blur-xl border transition-colors duration-300",
          !isMinimized 
            ? "border-gray-700/50 bg-gray-900 inline-flex overflow-visible" 
            : "border-gray-600/30 cursor-pointer hover:bg-gray-700 overflow-hidden"
        )}
      >
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
              className="px-2 flex items-center h-full"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                {visibleActions.map((action) => {
                  if (action.isSpecial && action.key === 'move_sep') {
                    return (
                      <div key={action.key} className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleSubmenuToggle(e, true)}
                          className={cn(
                            "h-auto flex-col gap-0.5 px-1 py-1.5 w-[80px] flex-shrink-0 text-gray-300 hover:text-white hover:bg-gray-800 transition-all",
                            isSubmenuOpen && submenuPosition.fromBar && "bg-gray-800 text-white"
                          )}
                        >
                          <action.icon className="w-4 h-4" />
                          <span className="text-[9px] text-center">{action.label}</span>
                        </Button>
                      </div>
                    );
                  }

                  return (
                    <Button
                      key={action.key}
                      variant={action.variant === 'reject' ? 'outline' : action.variant === 'primary' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={action.onClick}
                      className={cn(
                        "h-auto flex-col gap-0.5 px-1 py-1.5 w-[80px] flex-shrink-0 transition-colors",
                        action.variant === 'reject' ? "text-red-400 hover:text-red-300 hover:bg-red-950 border-red-800 bg-transparent" :
                        action.variant === 'primary' ? "bg-blue-600 hover:bg-blue-700 text-white border-transparent" :
                        "text-gray-300 hover:text-white hover:bg-gray-800"
                      )}
                    >
                      <action.icon className="w-4 h-4" />
                      <span className="text-[9px] text-center">{action.label}</span>
                    </Button>
                  );
                })}

                {/* More Actions Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <Button
                    ref={buttonRef}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="h-auto flex-col gap-0.5 px-1 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 w-[80px] flex-shrink-0"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="text-[9px] text-center">Más</span>
                  </Button>

                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute right-0 bottom-full mb-2 bg-gray-900 border border-gray-700 shadow-2xl rounded-lg backdrop-blur-sm bg-opacity-95 w-64 max-h-[70vh] overflow-y-auto z-50"
                    >
                      {extraActions.map((action) => {
                        if (action.isSpecial) return null;

                        return (
                          <div
                            key={action.key}
                            className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                            onClick={() => {
                              if (action.onClick) action.onClick();
                              setIsDropdownOpen(false);
                            }}
                          >
                            <action.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                            <span>{action.label}</span>
                          </div>
                        );
                      })}

                      {/* Renderizado especial para 'Mover a etapa' si está en el menú Más */}
                      {mode === 'vacancy' && extraActions.some(a => a.key === 'move_sep') && (
                        <>
                          <div className="h-px bg-gray-700 my-1" />
                          <div
                            className="flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                            onClick={(e) => handleSubmenuToggle(e, false)}
                          >
                            <div className="flex items-center">
                              <Layers className="w-4 h-4 mr-3 flex-shrink-0" />
                              <span>Mover a etapa</span>
                            </div>
                            <ChevronRight className="w-4 h-4 flex-shrink-0" />
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Portal para el submenú de etapas (Renderizado fuera para evitar recortes) */}
      {isSubmenuOpen && createPortal(
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bg-gray-900 border border-gray-700 shadow-2xl rounded-lg backdrop-blur-sm bg-opacity-95 w-72 max-h-[70vh] overflow-y-auto z-[100] py-2"
          ref={submenuRef}
          style={{ 
            top: `${submenuPosition.top}px`, 
            left: `${submenuPosition.left}px` 
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-gray-800">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Mover a etapa</div>
            <button onClick={() => setIsSubmenuOpen(false)} className="text-gray-500 hover:text-white">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          {['Screening con Talent', 'Evaluación CV', 'Serena AI', 'Psicométrico', 'Caso Product Sense', 'Entrevista Hiring', 'Antecedentes', 'Seleccionado'].map((stage) => (
            <div
              key={stage}
              className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md mb-0.5"
              onClick={() => {
                if (isValentina) {
                  toast.error('Hubo un problema al procesar la acción de reclutamiento. Estamos trabajando para solucionarlo.');
                  setIsDropdownOpen(false);
                  setIsSubmenuOpen(false);
                  return;
                }
                toast.success(`✓ Candidato movido a: ${stage}`);
                setIsDropdownOpen(false);
                setIsSubmenuOpen(false);
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2.5" />
              <span>{stage}</span>
            </div>
          ))}
        </motion.div>,
        document.body
      )}
    </div>
  );
}