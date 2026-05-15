// Helper functions para generar datos dinámicos desde candidatesData

import { CandidateData } from '../data/candidatesData';
import { Comment } from '../types/comments';

// ========== MAPEO DE ETAPAS ==========

export const STAGE_MAPPINGS = {
  'screening-talent': { order: 0, label: 'Screening con Talent Acquisition', shortLabel: 'Screening' },
  'evaluacion-cv': { order: 1, label: 'Evaluación de CV', shortLabel: 'CV' },
  'evaluacion-serena': { order: 2, label: 'Entrevista Serena IA', shortLabel: 'Entrevista IA' },
  'evaluacion-psicometrica': { order: 3, label: 'Evaluación Psicométrica', shortLabel: 'Psico' },
  'entrevista-tecnica': { order: 4, label: 'Entrevista Técnica', shortLabel: 'Ent. 1' },
  'entrevista-pm': { order: 5, label: 'Entrevista con PM', shortLabel: 'Ent. 2' },
  'entrevista-hiring': { order: 6, label: 'Entrevista con Hiring Manager', shortLabel: 'Hiring' },
  'antecedentes': { order: 7, label: 'Verificación de Antecedentes', shortLabel: 'Antec.' },
  'seleccionado': { order: 8, label: 'Seleccionado', shortLabel: 'Selección' },
} as const;

export type StageId = keyof typeof STAGE_MAPPINGS;

export type StageStatus = 'completed' | 'current' | 'pending' | 'rejected' | 'blocked';

/**
 * Obtiene el número de orden de una etapa
 */
export function getStageOrder(stageId: string): number {
  return STAGE_MAPPINGS[stageId as StageId]?.order || 0;
}

/**
 * Obtiene el label de una etapa
 */
export function getStageLabel(stageId: string): string {
  return STAGE_MAPPINGS[stageId as StageId]?.label || stageId;
}

/**
 * Calcula el status de una etapa basado en la etapa actual del candidato y posibles bloqueos
 */
export function getStageStatus(
  stageId: string, 
  currentStage: string, 
  candidateStatus: 'active' | 'rejected' | 'hired',
  application?: any
): StageStatus {
  if (candidateStatus === 'hired') {
    return 'completed';
  }

  const currentOrder = getStageOrder(currentStage);
  const stageOrder = getStageOrder(stageId);
  
  // Si el candidato fue descartado, solo la etapa actual se marca como rejected
  if (candidateStatus === 'rejected' && stageOrder === currentOrder) {
    return 'rejected' as StageStatus;
  }
  
  // Si hay un bloqueo definido para esta etapa, devolvemos 'blocked'
  if (application?.blocker && application.blocker.stageId === stageId) {
    return 'blocked';
  }
  
  // Las etapas anteriores se marcan como completadas (incluso si fue descartado)
  if (stageOrder < currentOrder) return 'completed';
  if (stageOrder === currentOrder) return 'current';
  return 'pending';
}

/**
 * Obtiene el progreso del candidato (etapa actual / total)
 */
export function getProgress(currentStage: string): string {
  const current = getStageOrder(currentStage);
  const total = Object.keys(STAGE_MAPPINGS).length;
  // Si current es 0, mostrar 1 (screening es la primera etapa real)
  return `Etapa ${current + 1} de ${total}`;
}

// ========== GENERACIÓN DE ACTIVIDADES ==========

interface Activity {
  day: string;
  events: Array<{
    actor: { name: string; type: 'ai' | 'candidate' | 'system' | 'recruiter' };
    eventType: 'system' | 'trigger' | 'email' | 'evaluation' | 'stage';
    status: 'success' | 'pending' | 'warning';
    timestamp: string;
    title: string;
    description: string;
    actions?: Array<{ label: string; onClick: () => void }>;
  }>;
}

/**
 * Formatea una fecha en español
 */
function formatSpanishDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Hoy';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ayer';
  } else {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

/**
 * Genera actividades dinámicas basadas en los datos del candidato
 */
export function generateActivities(
  candidate: CandidateData,
  onNavigateToSection?: (section: string) => void,
  setHighlightedStageId?: (id: string) => void
): Activity[] {
  const app = candidate.applications?.[0] || {} as any;
  const activities: Activity[] = [];
  const appliedDate = app.appliedDate ? new Date(app.appliedDate) : new Date();
  const firstName = candidate.firstName || candidate.name.split(' ')[0];
  const fullName = candidate.name;
  
  // Grupo de actividades del día de aplicación
  const dayGroup: Activity = {
    day: formatSpanishDate(app.appliedDate || new Date().toISOString()),
    events: [],
  };
  
  // Si el candidato está seleccionado, agregar evento de selección
  if (app.status === 'hired') {
    dayGroup.events.push({
      actor: { name: 'Sistema', type: 'system' },
      eventType: 'system',
      status: 'success',
      timestamp: '16:30',
      title: '🎉 Candidato seleccionado',
      description: `${fullName} ha sido seleccionado para ${app.jobTitle}`,
    });
  }
  
  // Si el candidato fue rechazado
  if (app.status === 'rejected' && app.rejectionReason) {
    dayGroup.events.push({
      actor: { name: 'Sistema', type: 'system' },
      eventType: 'system',
      status: 'warning',
      timestamp: '15:00',
      title: 'Candidato no seleccionado',
      description: `Razón: ${app.rejectionReason}`,
    });
  }
  
  // Agregar eventos según scores disponibles (en orden inverso - más reciente primero)
  if (app.scores && app.scores.hiringManagerScore) {
    dayGroup.events.push({
      actor: { name: 'Hiring Manager', type: 'recruiter' },
      eventType: 'evaluation',
      status: 'success',
      timestamp: '15:30',
      title: 'Entrevista con Hiring Manager completada',
      description: `Score: ${app.scores.hiringManagerScore} • ${app.scores.hiringManagerScore >= 85 ? 'Excelente fit' : 'Buen fit'}`,
      actions: onNavigateToSection && setHighlightedStageId ? [
        {
          label: 'Ver evaluación',
          onClick: () => {
            setHighlightedStageId('entrevista-hiring');
            onNavigateToSection('stages');
          },
        },
      ] : undefined,
    });
  }
  
  if (app.scores && app.scores.productManagerScore) {
    dayGroup.events.push({
      actor: { name: 'Product Manager', type: 'recruiter' },
      eventType: 'evaluation',
      status: 'success',
      timestamp: '14:45',
      title: 'Entrevista con PM completada',
      description: `Score: ${app.scores.productManagerScore} • ${app.scores.productManagerScore >= 85 ? 'Muy buena comunicación' : 'Buena comunicación'}`,
      actions: onNavigateToSection && setHighlightedStageId ? [
        {
          label: 'Ver evaluación',
          onClick: () => {
            setHighlightedStageId('entrevista-pm');
            onNavigateToSection('stages');
          },
        },
      ] : undefined,
    });
  }
  
  if (app.scores && app.scores.technicalScore) {
    dayGroup.events.push({
      actor: { name: 'Evaluador Técnico', type: 'recruiter' },
      eventType: 'evaluation',
      status: 'success',
      timestamp: '14:00',
      title: 'Evaluación técnica completada',
      description: `Score: ${app.scores.technicalScore} • ${app.scores.technicalScore >= 90 ? 'Excelentes skills técnicas' : 'Buenas skills técnicas'}`,
      actions: onNavigateToSection && setHighlightedStageId ? [
        {
          label: 'Ver evaluación',
          onClick: () => {
            setHighlightedStageId('entrevista-tecnica');
            onNavigateToSection('stages');
          },
        },
      ] : undefined,
    });
  }
  
  if (app.scores && app.scores.psychometricScore) {
    dayGroup.events.push({
      actor: { name: 'Sistema', type: 'system' },
      eventType: 'evaluation',
      status: 'success',
      timestamp: '13:30',
      title: 'Evaluación psicométrica completada',
      description: `Score: ${app.scores.psychometricScore} • Perfil compatible`,
      actions: onNavigateToSection && setHighlightedStageId ? [
        {
          label: 'Ver evaluación',
          onClick: () => {
            setHighlightedStageId('evaluacion-psicometrica');
            onNavigateToSection('stages');
          },
        },
      ] : undefined,
    });
  }
  
  if (app.scores && app.scores.serenaScore) {
    dayGroup.events.push({
      actor: { name: 'Serena IA', type: 'ai' },
      eventType: 'system',
      status: 'success',
      timestamp: '13:00',
      title: 'Evaluación de Serena IA completada',
      description: `Score: ${app.scores.serenaScore} • ${app.scores.serenaScore >= 90 ? 'Match excepcional' : 'Buen match'}`,
      actions: onNavigateToSection && setHighlightedStageId ? [
        {
          label: 'Ver análisis',
          onClick: () => {
            setHighlightedStageId('evaluacion-serena');
            onNavigateToSection('stages');
          },
        },
      ] : undefined,
    });
  }
  
  if (app.scores && app.scores.cvScore) {
    const confidenceText = app.confidence === 'high' ? 'Alta' : app.confidence === 'medium' ? 'Media' : 'Baja';
    dayGroup.events.push({
      actor: { name: 'Serena IA', type: 'ai' },
      eventType: 'system',
      status: 'success',
      timestamp: '12:45',
      title: 'Análisis de CV completado',
      description: `CV Score: ${app.scores.cvScore} • Confianza: ${confidenceText}`,
      actions: onNavigateToSection && setHighlightedStageId ? [
        {
          label: 'Ver evaluación',
          onClick: () => {
            setHighlightedStageId('evaluacion-cv');
            onNavigateToSection('stages');
          },
        },
      ] : undefined,
    });
  }
  
  // CV procesado por IA
  const topSkills = [
    ...(candidate.skills.technical?.slice(0, 5) || []),
  ].join(', ');
  
  dayGroup.events.push({
    actor: { name: 'Serena IA', type: 'ai' },
    eventType: 'system',
    status: 'success',
    timestamp: '12:15',
    title: 'CV procesado por IA',
    description: `Skills detectadas: ${topSkills}${candidate.skills.technical?.length > 5 ? '...' : ''}`,
  });
  
  // CV cargado
  const cvFileName = `${fullName.replace(/ /g, '_')}_CV.pdf`;
  dayGroup.events.push({
    actor: { name: fullName, type: 'candidate' },
    eventType: 'system',
    status: 'success',
    timestamp: '12:10',
    title: 'CV cargado',
    description: `${cvFileName} (287 KB)`,
  });
  
  // Aplicación recibida
  dayGroup.events.push({
    actor: { name: 'Sistema', type: 'system' },
    eventType: 'trigger',
    status: 'success',
    timestamp: '12:05',
    title: 'Aplicación recibida',
    description: 'Fuente: LinkedIn • Product Designer Senior (Remoto)',
  });
  
  activities.push(dayGroup);
  
  // Email de confirmación (1 día después)
  const emailDate = new Date(appliedDate);
  emailDate.setDate(emailDate.getDate() + 1);
  
  activities.push({
    day: formatSpanishDate(emailDate.toISOString().split('T')[0]),
    events: [
      {
        actor: { name: 'Sistema', type: 'system' },
        eventType: 'email',
        status: 'success',
        timestamp: '09:30',
        title: 'Email enviado: Confirmación de aplicación',
        description: `Asunto: Tu aplicación ha sido recibida - ${app.jobTitle}`,
      },
    ],
  });
  
  return activities;
}

// ========== GENERACIÓN DE INSIGHTS DE SERENA ==========

/**
 * Genera insights personalizados de Serena IA basados en el candidato
 */
export function generateSerenaInsights(candidate: CandidateData): {
  insights: string[];
  confidence: 'high' | 'medium' | 'low';
  updatedAgo: string;
} {
  const app = candidate.applications?.[0] || {} as any;
  const insights: string[] = [];
  const firstName = candidate.firstName || candidate.name.split(' ')[0];
  
  // Insight 1: Experiencia
  if (candidate.experience && candidate.experience.length > 0) {
    const currentJob = candidate.experience[0];
    const companies = candidate.experience.map(exp => exp.company).slice(0, 2).join(' y ');
    insights.push(
      `${candidate.yearsExperience >= 5 ? 'Candidata senior' : 'Candidata'} con ${candidate.yearsExperience} años de experiencia en ${currentJob.position} en ${companies}`
    );
  }
  
  // Insight 2: Skills técnicas principales
  if (candidate.skills && candidate.skills.technical && candidate.skills.technical.length > 0) {
    const topSkills = candidate.skills.technical.slice(0, 4).join(', ');
    const level = candidate.yearsExperience >= 5 ? 'senior' : candidate.yearsExperience >= 3 ? 'mid-level' : 'junior';
    insights.push(
      `Perfil ${level} con expertise en ${topSkills}`
    );
  }
  
  // Insight 3: Match score
  if (app.matchScore && app.matchScore > 0) {
    insights.push(
      `${app.matchScore >= 90 ? 'Excelente' : app.matchScore >= 75 ? 'Muy buen' : 'Buen'} match (${app.matchScore}%) con requisitos de la vacante`
    );
  }
  
  // Insight 4: Portfolio/Logros
  if (candidate.experience && candidate.experience[0]?.achievements && candidate.experience[0].achievements.length > 0) {
    const firstAchievement = candidate.experience[0].achievements[0];
    insights.push(firstAchievement);
  } else if (candidate.portfolio?.projects && candidate.portfolio.projects.length > 0) {
    const project = candidate.portfolio.projects[0];
    insights.push(`Portfolio destacado: ${project.name} - ${project.impact}`);
  }
  
  // Insight 5: Estado del proceso
  if (app.status === 'hired') {
    const avgScore = app.scores ? Object.values(app.scores).filter(Boolean).reduce((a: any, b: any) => a + b, 0) / Object.values(app.scores).filter(Boolean).length : 0;
    insights.push(
      `✨ Candidata SELECCIONADA - Todos los scores son ${avgScore >= 90 ? 'excelentes' : 'muy buenos'} (${Math.round(avgScore)} promedio)`
    );
  } else if (app.status === 'active') {
    const currentStage = getStageLabel(app.currentStage || 'evaluacion-cv');
    insights.push(`En proceso: ${currentStage}`);
  }
  
  // Calcular "hace cuánto" desde appliedDate
  const appliedDate = app.appliedDate ? new Date(app.appliedDate) : new Date();
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24));
  const updatedAgo = daysDiff === 0 ? 'Hoy' : daysDiff === 1 ? 'Hace 1 día' : `Hace ${daysDiff} días`;
  
  return {
    insights,
    confidence: app.confidence || 'high',
    updatedAgo,
  };
}

// ========== CONVERSIÓN DE NOTES A COMENTARIOS ==========

/**
 * Convierte las notes simples en comentarios estructurados
 */
export function notesToComments(candidate: CandidateData): Comment[] {
  if (!candidate.notes || candidate.notes.length === 0) return [];
  
  // Distribuir notas entre las etapas principales
  const stageIds: StageId[] = [
    'evaluacion-cv',
    'evaluacion-serena',
    'evaluacion-psicometrica',
    'entrevista-tecnica',
    'entrevista-pm',
    'entrevista-hiring',
    'antecedentes',
    'seleccionado',
  ];
  
  return candidate.notes.map((note, index) => {
    const stageIndex = index % stageIds.length;
    const stageId = stageIds[stageIndex];
    const app = candidate.applications?.[0] || {} as any;
    const appliedDate = app.appliedDate ? new Date(app.appliedDate) : new Date();
    const commentDate = new Date(appliedDate);
    commentDate.setDate(commentDate.getDate() + index); // Cada comentario 1 día después
    
    return {
      id: `comment-${candidate.id}-${index}`,
      text: note,
      author: index % 3 === 0 ? 'Recruiter' : index % 3 === 1 ? 'Hiring Manager' : 'Evaluador Técnico',
      authorInitials: index % 3 === 0 ? 'RC' : index % 3 === 1 ? 'HM' : 'ET',
      timestamp: commentDate.getTime(),
      stageId,
      stageName: getStageLabel(stageId),
      isPrivate: false,
    };
  });
}

// ========== GENERACIÓN DE TAREAS ==========

interface Task {
  id: string;
  name: string;
  assignee: string;
  assigneeInitials: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  linkedToStage?: string;
}

/**
 * Genera tareas dinámicas basadas en la etapa y estado del candidato
 */
export function generateTasks(candidate: CandidateData): Task[] {
  const app = candidate.applications?.[0] || {} as any;
  const tasks: Task[] = [];
  const firstName = candidate.firstName || candidate.name.split(' ')[0];
  const now = new Date();
  
  if (app.status === 'hired') {
    // Tareas para candidato seleccionado
    tasks.push({
      id: `task-onboarding-${candidate.id}`,
      name: `Preparar onboarding para ${firstName}`,
      assignee: 'HR Manager',
      assigneeInitials: 'HM',
      dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      priority: 'high',
      completed: false,
    });
    
    tasks.push({
      id: `task-offer-${candidate.id}`,
      name: `Enviar oferta formal a ${firstName}`,
      assignee: 'Talent Acquisition',
      assigneeInitials: 'TA',
      dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      priority: 'high',
      completed: true, // Ya seleccionado
    });
    
    tasks.push({
      id: `task-equipment-${candidate.id}`,
      name: `Solicitar equipo para ${firstName}`,
      assignee: 'IT',
      assigneeInitials: 'IT',
      dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      priority: 'medium',
      completed: false,
    });
  } else if (app.status === 'active') {
    // Tareas según etapa actual
    switch (app.currentStage) {
      case 'evaluacion-cv':
        tasks.push({
          id: `task-review-cv-${candidate.id}`,
          name: `Revisar CV completo de ${firstName}`,
          assignee: 'Recruiter',
          assigneeInitials: 'RC',
          dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
          priority: 'medium',
          completed: false,
          linkedToStage: 'evaluacion-cv',
        });
        break;
        
      case 'evaluacion-serena':
        tasks.push({
          id: `task-serena-${candidate.id}`,
          name: `Revisar análisis de Serena IA para ${firstName}`,
          assignee: 'Talent Lead',
          assigneeInitials: 'TL',
          dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
          priority: 'high',
          completed: false,
          linkedToStage: 'evaluacion-serena',
        });
        break;
        
      case 'entrevista-tecnica':
        tasks.push({
          id: `task-schedule-tech-${candidate.id}`,
          name: `Agendar entrevista técnica con ${firstName}`,
          assignee: 'Recruiter',
          assigneeInitials: 'RC',
          dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
          priority: 'high',
          completed: false,
          linkedToStage: 'entrevista-tecnica',
        });
        break;
        
      case 'entrevista-pm':
        tasks.push({
          id: `task-schedule-pm-${candidate.id}`,
          name: `Coordinar entrevista con PM para ${firstName}`,
          assignee: 'Product Manager',
          assigneeInitials: 'PM',
          dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
          priority: 'high',
          completed: false,
          linkedToStage: 'entrevista-pm',
        });
        break;
        
      case 'entrevista-hiring':
        tasks.push({
          id: `task-schedule-hiring-${candidate.id}`,
          name: `Agendar reunión final con Hiring Manager - ${firstName}`,
          assignee: 'Hiring Manager',
          assigneeInitials: 'HM',
          dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
          priority: 'high',
          completed: false,
          linkedToStage: 'entrevista-hiring',
        });
        break;
        
      case 'antecedentes':
        tasks.push({
          id: `task-background-${candidate.id}`,
          name: `Verificar referencias laborales de ${firstName}`,
          assignee: 'HR',
          assigneeInitials: 'HR',
          dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
          priority: 'medium',
          completed: false,
          linkedToStage: 'antecedentes',
        });
        break;
    }
  }
  
  return tasks;
}

// ========== PARSING DE DATOS ==========

/**
 * Divide nombre completo en firstName y lastName
 */
export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.split(' ');
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

/**
 * Parsea location "Ciudad, País" en objetos separados
 */
export function parseLocation(location: string): { city: string; country: string } {
  const [city, country] = location.split(',').map(s => s.trim());
  return { city: city || location, country: country || '' };
}