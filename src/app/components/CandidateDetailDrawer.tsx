import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { SerenaIAPanel } from './SerenaIAPanel';
import { CandidateHeader } from './CandidateHeader';
import { CandidateSidebar } from './CandidateSidebar';
import { GeneralInfoSection } from './sections/GeneralInfoSection';
import { ApplicationSection } from './sections/ApplicationSection';
import { VacanciesSection } from './sections/VacanciesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { DocumentsSection } from './sections/DocumentsSection';
import { FloatingActionBar } from './FloatingActionBar';
import { EditModeBar } from './EditModeBar';
import { toast } from 'sonner';
import { Comment } from '../types/comments';
import { candidatesData } from '../data/candidatesData';
import { notesToComments, generateTasks } from '../utils/candidateHelpers';
import { useOnboarding } from '../context/OnboardingContext';

// Definir tipo de tarea
export interface Task {
  id: string;
  name: string;
  status: 'por iniciar' | 'vencida' | 'finalizada';
  dueDate?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  comments?: Array<{
    id: string;
    text: string;
    author: string;
    date: string;
  }>;
}

interface CandidateDetailDrawerProps {
  candidateId: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  totalCandidates?: number;
  currentIndex?: number;
  customCandidates?: any[];
  onCreate?: (candidate: any) => void;
  isInsideVacancy?: boolean;
  initialApplicationId?: string | null;
  initialSection?: string;
}

export function CandidateDetailDrawer({ 
  candidateId, 
  onPrevious, 
  onNext,
  onClose,
  totalCandidates = 0,
  currentIndex = 1,
  customCandidates,
  onCreate,
  isInsideVacancy: isInsideVacancyProp,
  initialApplicationId,
  initialSection
}: CandidateDetailDrawerProps) {
  const isNewCandidate = candidateId === 'new';
  const { 
    openFeedback, 
    activeSection, 
    setActiveSection, 
    isSerenaActive, 
    setSerenaActive, 
    isEditMode, 
    setEditMode, 
    isInsideVacancy, 
    setInsideVacancy 
  } = useOnboarding();

  const lastIsInsideVacancyPropRef = useRef<boolean | undefined>(undefined);
  const lastCandidateIdRef = useRef<string | null>(null);
  const prevActiveSectionRef = useRef<string | null>(null);

  useEffect(() => {
    const candidateChanged = lastCandidateIdRef.current !== candidateId;
    const propChanged = lastIsInsideVacancyPropRef.current !== isInsideVacancyProp;

    if (candidateChanged || propChanged) {
      lastCandidateIdRef.current = candidateId;
      lastIsInsideVacancyPropRef.current = isInsideVacancyProp;

      if (isInsideVacancyProp !== undefined) {
        setInsideVacancy(isInsideVacancyProp);
      }
    }
  }, [candidateId, isInsideVacancyProp, setInsideVacancy]);
  const [triggerDocumentUpload, setTriggerDocumentUpload] = useState(false);
  const [isSectionEditing, setIsSectionEditing] = useState(false);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(initialApplicationId || null);
  const [highlightedStageId, setHighlightedStageId] = useState<string | null>(null);
  
  // Configuración inicial basada en el candidato y los parámetros recibidos
  useEffect(() => {
    if (isNewCandidate) {
      setEditMode(true);
      setActiveSection('generalInfo');
      setEditedCandidateData({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        city: '',
        country: '',
        identificationNumber: '',
        identificationType: 'Cédula de Ciudadanía',
        experience: [],
        education: [],
        applications: [],
        skills: { technical: [], soft: [] },
        avatar: '?'
      });
    } else {
      // Al abrir un candidato existente, asegurarnos de que el modo edición esté apagado
      setEditMode(false);
      setActiveApplicationId(initialApplicationId || null);
      
      // Si recibimos un ID de aplicación, ir directamente a la sección de vacantes
      if (initialApplicationId) {
        setActiveSection('vacancies');
        setInsideVacancy(true);
      } else if (initialSection) {
        setActiveSection(initialSection);
        setInsideVacancy(false);
      } else {
        setActiveSection('generalInfo');
        setInsideVacancy(false);
      }
    }
  }, [isNewCandidate, candidateId, initialApplicationId, initialSection, setActiveSection, setEditMode, setInsideVacancy, setActiveApplicationId]);
  
  
  // Estado para comentarios compartido entre StagesSection y ActivityHubPanel
  const [comments, setComments] = useState<Comment[]>([]);

  // Estado para tareas compartido entre ActivityHubPanel y ToDoTab
  const [tasks, setTasks] = useState<Task[]>([]);

  // Estado para edición sincronizada
  const [editedCandidateData, setEditedCandidateData] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  

  // Función para agregar un nuevo comentario
  const addComment = (
    text: string,
    stageId: string,
    stageName: string,
    isPrivate: boolean = false
  ) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: 'Usuario Actual', // En producción, esto vendría del usuario autenticado
      authorInitials: 'UC',
      timestamp: new Date(),
      stageId,
      stageName,
      isPrivate,
    };
    setComments(prev => [...prev, newComment]);
  };

  // Función para editar un comentario
  const editComment = (id: string, newText: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === id ? { ...comment, text: newText } : comment
      )
    );
    toast.success('Comentario actualizado');
  };

  // Función para eliminar un comentario
  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
    toast.success('Comentario eliminado');
  };

  // Los comentarios se hacen directamente en cada etapa (inline)
  const openCommentPanel = (_stageId: string) => {};

  // Función para navegar a documentos y abrir selector de archivos
  const handleAddDocument = () => {
    // Cambiar a la sección de documentos
    setActiveSection('documents');
    // Trigger file upload después de un pequeño delay para permitir que el componente se monte
    setTriggerDocumentUpload(true);
  };

  // Funciones para manejar el modo de edición
  const handleEditProfile = () => {
    setEditedCandidateData({ ...mockCandidate });
    setValidationErrors([]);
    setEditMode(true);
    
    // Solo navegar a información general si no estamos en una sección ya editable
    if (!['experience', 'education'].includes(activeSection)) {
      setActiveSection('generalInfo');
    }
    
    toast.info('Modo de edición activado');
  };

  const handleSaveChanges = () => {
    // Definir campos obligatorios
    const mandatoryFields = [
      { key: 'firstName', label: 'Nombre' },
      { key: 'lastName', label: 'Apellido' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'identificationNumber', label: 'Número de identificación' },
      { key: 'city', label: 'Ciudad' },
      { key: 'country', label: 'País' }
    ];
    
    // Simulación de error para Valentina Herrera Castro
    if (mockCandidate.name === 'Valentina Herrera Castro') {
      toast.error('Lo sentimos, no hemos podido guardar los cambios en el perfil. Por favor, inténtalo de nuevo en unos minutos.');
      return;
    }

    const errors: string[] = [];
    mandatoryFields.forEach(field => {
      if (!editedCandidateData[field.key] || editedCandidateData[field.key].toString().trim() === '') {
        errors.push(field.key);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Si pasa la validación
    if (isNewCandidate) {
      const newCandidate = {
        ...editedCandidateData,
        id: `cand-${Date.now()}`,
        name: `${editedCandidateData.firstName} ${editedCandidateData.lastName}`,
        status: 'active',
        applications: editedCandidateData.applications || []
      };
      onCreate?.(newCandidate);
      toast.success('Candidato creado exitosamente');
      onClose?.();
    } else {
      setEditMode(false);
      setValidationErrors([]);
      // Aquí se guardarían los cambios realmente (en una DB u estado global persistente)
      toast.success('Cambios guardados exitosamente');
      console.log('Guardando cambios del perfil...', editedCandidateData);
    }
  };

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleCancelEdit = () => {
    if (isNewCandidate || isEditMode) {
      setShowCancelConfirmation(true);
    } else {
      onClose();
    }
  };

  const handleConfirmCancel = () => {
    setEditMode(false);
    setValidationErrors([]);
    setEditedCandidateData(null);
    setShowCancelConfirmation(false);
    onClose();
    toast.info('Creación cancelada');
  };

  const handleAbortCancel = () => {
    setShowCancelConfirmation(false);
  };

  const listToSearch = customCandidates || candidatesData;

  const mockCandidate = useMemo(() => {
    return listToSearch.find(candidate => candidate.id === candidateId) || (candidateId === 'cand-sim-001' ? {
      id: 'cand-sim-001',
      name: 'Alejandro Martínez Rodríguez',
      firstName: 'Alejandro',
      lastName: 'Martínez Rodríguez',
      email: 'alejandro.martinez@email.com',
      phone: '+57 315 987 6543',
      age: 32,
      birthDate: '1992-08-12',
      city: 'Medellín',
      country: 'Colombia',
      location: 'Medellín, Colombia',
      nationality: 'Colombiana',
      identificationType: 'Cédula de Ciudadanía',
      identificationNumber: '1.084.567.890',
      identification: `1.084.567.890`,
      yearsExperience: 8,
      availability: 'Tiempo completo',
      currency: 'Peso colombiano (COP)',
      expectedSalary: '$12.000.000 - $15.000.000 COP',
      origin: 'Importado por CV',
      stage: 'Screening Talent',
      status: 'active',
      avatar: 'AM',
      linkedin: 'https://www.linkedin.com/in/alejandromartinezrodriguez',
      description: 'Senior Software Engineer con más de 8 años de trayectoria especializado en arquitecturas distribuidas y sistemas de alto rendimiento. Experto en Golang y el ecosistema Cloud Native (Docker, Kubernetes).',
      documents: [
        {
          id: 'doc-sim-001',
          name: 'CV_Alejandro_Martinez.pdf',
          type: 'PDF',
          size: '1.4 MB',
          uploadedDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
          uploadedBy: 'Alejandro Martínez Rodríguez'
        }
      ],
      experience: [
        {
          id: 'exp-sim-1',
          company: 'TechFlow Solutions',
          position: 'Senior Backend Engineer (Go)',
          location: 'Medellín, Colombia',
          startDate: '2020-11-01',
          current: true,
          description: 'Liderazgo técnico de la unidad de servicios financieros. Arquitecto principal del sistema de procesamiento de pagos en tiempo real.',
          achievements: [
            'Reducción del tiempo de respuesta de la API en un 45%',
            'Implementación de arquitectura basada en eventos con Kafka'
          ]
        }
      ],
      education: [
        {
          institution: 'Universidad Nacional de Colombia',
          degree: 'Ingeniería de Sistemas',
          year: '2016',
          description: 'Énfasis en ingeniería de software.'
        }
      ],
      applications: [
        {
          id: `app-sim-001`,
          jobTitle: 'Desarrollador Golang',
          jobLocation: 'Remoto',
          currentStage: 'screening-talent',
          status: 'active',
          appliedDate: new Date().toISOString().split('T')[0],
          matchScore: 94,
          confidence: 'high',
          scores: {
            cvScore: 94,
            serenaScore: 88
          },
          cvEvaluation: {
            summary: 'Perfil técnico excepcional con una alineación del 94% respecto a los requisitos de la vacante.',
            score: 94,
            criteria: [
              { label: 'Experiencia Seniority', score: 95, status: 'pass' },
              { label: 'Dominio de Golang', score: 98, status: 'pass' }
            ],
            evaluations: [
              { category: 'Experiencia Backend', description: 'Posee más de 8 años en desarrollo backend.' }
            ]
          },
          serenaInterview: {
            transcript: [],
            questionScores: [],
            overallFeedback: {
              summary: 'Candidato con perfil de liderazgo técnico.',
              strengths: ['Arquitecturas distribuidas'],
              improvements: []
            }
          }
        }
      ],
      skills: {
        technical: ['Golang', 'Docker', 'Kubernetes', 'gRPC', 'PostgreSQL', 'Redis'],
        soft: ['Liderazgo Técnico', 'Resolución de Problemas', 'Mentoria']
      },
      notes: ['Candidato referido por el equipo interno.', 'Muy buen dominio técnico detectado en la evaluación inicial de CV.']
    } : listToSearch.find(candidate => {
      // Fallback: try to match by index if candidateId is a numeric string
      const numericId = parseInt(candidateId, 10);
      if (!isNaN(numericId)) {
        return listToSearch.indexOf(candidate) === numericId - 1;
      }
      return false;
    })) || (isNewCandidate ? {
      id: 'new',
      name: 'Nuevo Candidato',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      city: '',
      country: '',
      identificationNumber: '',
      experience: [],
      education: [],
      applications: [],
      avatar: '?'
    } : {
      name: 'Candidato no encontrado',
      location: 'Desconocido',
      email: 'no-disponible@example.com',
      phone: 'N/A',
      age: 0,
      identificationNumber: 'N/A',
      linkedin: '',
      experience: [],
      education: [],
      salaryRange: 'N/A',
      availability: 'N/A',
      noticePeriod: 'N/A',
      yearsExperience: 0,
      workedHereBefore: false,
      tags: [],
      matchScore: 0,
      confidence: 'low' as const,
    });
  }, [candidateId, listToSearch, isNewCandidate]);

  const handleEditIdentification = () => {
    handleEditProfile();
    setActiveSection('generalInfo');
    // Forzamos el foco después de un breve delay para que el DOM se actualice
    setTimeout(() => {
      const input = document.getElementById('identification-number-input');
      if (input) {
        input.focus();
        // Opcional: resaltar el campo
        input.classList.add('ring-2', 'ring-blue-500', 'border-transparent');
      }
    }, 100);
  };

  // Resetear sección y generar datos cuando el candidato cambia
  useEffect(() => {
    // Al cambiar de candidato, mantenemos la sección activa
    setHighlightedStageId(null);

    if (mockCandidate && 'notes' in mockCandidate) {
      // Generar comentarios desde notes
      const generatedComments = notesToComments(mockCandidate as any);
      setComments(generatedComments);
      
      // Generar tareas dinámicamente
      const generatedTasks = generateTasks(mockCandidate as any);
      // Convertir el formato de Task de helpers a Task del componente
      const formattedTasks = generatedTasks.map(task => ({
        id: task.id,
        name: task.name,
        status: task.completed ? ('finalizada' as const) : ('por iniciar' as const),
        dueDate: task.dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        assignee: {
          name: task.assignee,
          avatar: task.assigneeInitials,
        },
      }));
      setTasks(formattedTasks);
    }
  }, [candidateId]);

  // Set default active application when candidate changes.
  // Priority: initialApplicationId (from popover click) > first active app > null
  useEffect(() => {
    if (mockCandidate && mockCandidate.applications && mockCandidate.applications.length > 0) {
      if (initialApplicationId) {
        // Always honor an explicitly selected application ID
        const matchingApp = mockCandidate.applications.find((app: any) => app.id === initialApplicationId);
        setActiveApplicationId(matchingApp ? initialApplicationId : null);
      } else {
        // Default: select the first active application (or null if none)
        const activeApp = mockCandidate.applications.find((app: any) => app.status === 'active');
        setActiveApplicationId(activeApp ? activeApp.id : null);
      }
    } else {
      setActiveApplicationId(null);
    }
  }, [candidateId, mockCandidate, initialApplicationId]);

  const activeApplication = mockCandidate?.applications?.find((app: any) => app.id === activeApplicationId) || mockCandidate?.applications?.[0];

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };


  const isValentina = mockCandidate?.name === 'Valentina Herrera Castro';
  const isAndres = mockCandidate?.name === 'Andrés Parra Gómez';

  const renderSection = () => {
    const candidate = mockCandidate;
    
    switch (activeSection) {
      case 'generalInfo':
        return (
          <GeneralInfoSection 
            candidate={isEditMode ? editedCandidateData : candidate} 
            isEditMode={isEditMode} 
            onDataChange={(newData: any) => setEditedCandidateData(newData)}
            validationErrors={validationErrors}
            isValentina={isValentina}
          />
        );
      case 'application':
        return <ApplicationSection />;
      case 'vacancies':
        return (
          <VacanciesSection 
            candidate={candidate}
            applications={candidate.applications || []}
            comments={comments}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
            openCommentPanel={openCommentPanel}
            highlightedStageId={highlightedStageId}
            onVacancySelect={setInsideVacancy}
            isValentina={isValentina}
            isAndres={isAndres}
            onEditProfile={handleEditIdentification}
            forceSummary={!isInsideVacancy}
            initialVacancyId={activeApplicationId}
          />
        );
      case 'experience':
        const experiences = isEditMode ? (editedCandidateData as any)?.experience : candidate.experience;
        return (
          <ExperienceSection 
            experiences={experiences} 
            isEditMode={isEditMode} 
            onEditingChange={setIsSectionEditing} 
            onDataChange={(newExp) => setEditedCandidateData(prev => ({ ...prev, experience: newExp } as any))}
            isValentina={isValentina} 
          />
        );
      case 'education':
        const eduData = isEditMode ? (editedCandidateData as any)?.education : candidate.education;
        const certData = isEditMode ? (editedCandidateData as any)?.certificates : (candidate as any).certificates;
        return (
          <EducationSection 
            education={eduData} 
            certificates={certData}
            isEditMode={isEditMode} 
            onEditingChange={setIsSectionEditing} 
            onDataChange={(newData) => setEditedCandidateData(prev => ({ 
              ...prev, 
              education: newData.education,
              certificates: newData.certificates
            } as any))}
            isValentina={isValentina} 
          />
        );
      case 'documents':
        const docs = isEditMode ? (editedCandidateData as any)?.documents : (candidate as any).documents;
        return (
          <DocumentsSection 
            triggerUpload={triggerDocumentUpload} 
            documents={docs || []} 
            onDataChange={(newDocs) => setEditedCandidateData(prev => ({ ...prev, documents: newDocs } as any))}
            isValentina={isValentina} 
          />
        );
      default:
        return (
          <GeneralInfoSection 
            candidate={isEditMode ? editedCandidateData : candidate} 
            isEditMode={isEditMode}
            onDataChange={(newData: any) => setEditedCandidateData(newData)}
            validationErrors={validationErrors}
          />
        );
    }
  };

  // Resetear estados al cambiar de sección
  useEffect(() => {
    if (prevActiveSectionRef.current === 'vacancies' && activeSection !== 'vacancies') {
      setInsideVacancy(false);
    }
    prevActiveSectionRef.current = activeSection;
    setIsSectionEditing(false);
  }, [activeSection, setInsideVacancy]);

  // Resetear isSectionEditing al salir de modo edición general
  useEffect(() => {
    if (!isEditMode) {
      setIsSectionEditing(false);
    }
  }, [isEditMode]);

  // Reset trigger when section changes
  React.useEffect(() => {
    if (triggerDocumentUpload && activeSection === 'documents') {
      // Reset after a short delay to allow the component to mount
      setTimeout(() => {
        setTriggerDocumentUpload(false);
      }, 500);
    }
  }, [activeSection, triggerDocumentUpload]);

  return (
    <div id="candidate-detail-drawer" className="h-full bg-gray-50 flex flex-col relative">
      {/* <FeedbackFAB onClick={openFeedback} /> */}
      
      {/* Candidate Header */}
      <div data-tour="candidate-header">
        <CandidateHeader 
          candidate={(isEditMode && isNewCandidate && editedCandidateData) ? editedCandidateData : mockCandidate} 
          currentIndex={currentIndex}
          totalCandidates={isNewCandidate ? 1 : totalCandidates}
          onBack={onClose || (() => {})}
          onPrevious={isNewCandidate ? () => {} : handlePrevious}
          onNext={isNewCandidate ? () => {} : handleNext}
          onSerenaClick={isNewCandidate ? undefined : () => setSerenaActive(true)}
          isDisabled={isSectionEditing}
          isValentina={isValentina}
          isAndres={isAndres}
          isNew={isNewCandidate}
        />
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Column - Candidate Information */}
        <div className="flex-1 flex transition-all duration-300 overflow-hidden">
          {/* Sidebar */}
          <CandidateSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
            isEditMode={isEditMode}
            applications={mockCandidate.applications}
            activeApplicationId={activeApplicationId}
            onApplicationChange={setActiveApplicationId}
            isDisabled={isSectionEditing}
            isValentina={isValentina}
            isAndres={isAndres}
          />

          {/* Center Column - Content Area */}
          <div id="candidate-center-column" className="flex-1 bg-gray-50 relative">
            {/* Scrollable Content */}
            <div className="absolute inset-0 overflow-auto">
              <div id="candidate-content-area" className="max-w-4xl mx-auto p-8 pb-32">
                {renderSection()}
              </div>
            </div>

            {/* Confirmation Overlay / Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-40 h-24 pointer-events-none">
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
                {showCancelConfirmation ? (
                  <div className="flex flex-col items-center bg-white border-2 border-red-200 shadow-2xl rounded-2xl p-4 min-w-[400px] animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">¿Confirmas cancelar?</h4>
                        <p className="text-xs text-gray-500 font-medium">Toda la información ingresada se perderá definitivamente.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <button 
                        onClick={handleConfirmCancel}
                        className="flex-1 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      >
                        SÍ, CANCELAR CREACIÓN
                      </button>
                      <button 
                        onClick={handleAbortCancel}
                        className="flex-1 py-2 bg-white text-gray-700 text-xs font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        CONTINUAR EDITANDO
                      </button>
                    </div>
                  </div>
                ) : isEditMode ? (
                  <EditModeBar
                    onSave={handleSaveChanges}
                    onCancel={handleCancelEdit}
                    hideButtons={isSectionEditing}
                    isValentina={isValentina}
                    isNew={isNewCandidate}
                  />
                ) : (
                  <FloatingActionBar
                    mode={isInsideVacancy ? 'vacancy' : 'general'}
                    onReject={() => console.log('Reject')}
                    onNextStage={() => console.log('Next stage')}
                    onComment={() => {}}
                    onAddTodo={() => {}}
                    onMessage={() => console.log('Message')}
                    candidatePhone={mockCandidate.phone}
                    onAddDocument={handleAddDocument}
                    onEditProfile={handleEditProfile}
                    onSerenaClick={() => setSerenaActive(true)}
                    isValentina={isValentina}
                    isAndres={isAndres}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Serena IA Side Panel - Now anchored to the main container below header */}
        <div 
          className={`flex-shrink-0 transition-all duration-300 ease-in-out h-full overflow-hidden border-gray-200 ${
            isSerenaActive ? "w-[400px] border-l" : "w-0 border-none"
          }`}
        >
          <SerenaIAPanel 
            isOpen={isSerenaActive} 
            onClose={() => setSerenaActive(false)} 
            candidate={mockCandidate} 
            isValentina={isValentina}
          />
        </div>
      </div>
    </div>
  );
}