// Datos completos de candidatos para Product Designer Senior

export interface Application {
  id: string;
  jobTitle: string;
  jobLocation: string;
  currentStage: string;
  status: 'active' | 'rejected' | 'hired';
  appliedDate: string;
  matchScore: number;
  confidence: 'high' | 'medium' | 'low';
  scores: {
    cvScore?: number;
    psychometricScore?: number;
    serenaScore?: number;
    technicalScore?: number;
    productManagerScore?: number;
    hiringManagerScore?: number;
  };
  rejectionReason?: string;
  blocker?: {
    stageId: string;
    reason: string;
    priority: 'high' | 'medium';
    action?: {
      type: 'whatsapp' | 'email' | 'document';
      label: string;
      message?: string;
    };
  };
  serenaInterview?: {
    transcript: Array<{
      role: 'serena' | 'candidate';
      text: string;
      timestamp?: string;
    }>;
    questionScores: Array<{
      objective: string;
      question: string;
      score: number;
      analysis?: string;
    }>;
    overallFeedback: {
      summary: string;
      strengths: string[];
      improvements: string[];
      onboardingStrategy?: string;
      leaderRecommendation?: string;
    };
  };
  cvEvaluation?: {
    summary: string;
    score: number;
    criteria: Array<{ label: string, score: number, status: "pass" | "fail" | "warning" }>;
    // Rich Serena IA evaluation fields
    evaluations?: Array<{ category: string; description: string }>;
    minimumThreshold?: number;
    decision?: string;
    recommendation?: string;
  };
  backgroundCheck?: {
    status: 'clean' | 'issues' | 'pending';
    completedDate: string;
    recommendation?: string;
    details: Array<{ category: string; result: string; status: 'pass' | 'fail' | 'warning'; records?: number; description?: string }>;
  };
  psychometricEvaluation?: {
    iq: number;
    learningQuotient: number;
    factors: Array<{ label: string; description: string; status: 'pass' | 'fail' | 'warning' }>;
    brainDominance: string;
    observation: string;
    recommendation: string;
    reports?: Array<{ name: string; date: string; type: string }>;
  };
}

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  avatar: string;
  yearsExperience: number;
  
  // Lista de aplicaciones (vacantes)
  applications: Application[];
  
  // Información personal adicional
  firstName?: string;
  lastName?: string;
  identificationNumber?: string;
  identificationType?: string;
  nationality?: string;
  linkedin?: string;
  birthDate?: string;
  
  // Ubicación detallada
  city?: string;
  country?: string;
  willingToRelocate?: boolean;
  interestedLocations?: string[];
  
  // Información laboral adicional
  noticePeriod?: string;
  noticePeriodUnit?: string;
  currency?: string;
  expectedSalary?: string; // Puede ser general o específico, lo dejamos aquí por ahora
  availability?: string;
  
  // Perfil profesional
  description?: string;
  
  // Experiencia laboral
  experience: Array<{
    id?: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    location?: string;
    startDate?: string;
    endDate?: string | null;
    current?: boolean;
    achievements?: string[];
  }>;
  
  // Educación
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    current?: boolean;
    description?: string;
  }>;
  
  // Skills y competencias
  skills: {
    technical: string[];
    soft: string[];
  };
  
  // Portfolio
  portfolio: {
    url: string;
    projects: Array<{
      name: string;
      description: string;
      impact: string;
    }>;
  };
  
  // Documentos
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedDate: string;
    uploadedBy: string;
  }>;
  
  // Notas generales del candidato
  notes: string[];
}

export const candidatesData: CandidateData[] = [
  // ====== ETAPA 9: SELECCIONADO (1 HIRED) ======
  {
    id: 'cand-001',
    name: 'María García López',
    email: 'maria.garcia@email.com',
    phone: '+57 300 123 4567',
    age: 28,
    location: 'Bogotá, Colombia',
    avatar: 'MG',
    yearsExperience: 5,
    expectedSalary: '$8.000.000 - $10.000.000 COP',
    availability: 'Inmediata',
    
    // Lista de aplicaciones (vacantes)
    applications: [
      {
        id: 'app-001-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas de diseño complejos y su profundo conocimiento en accesibilidad (WCAG). Su trayectoria en empresas de producto como Stripe y Rappi garantiza una curva de aprendizaje mínima.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'María García cuenta con más de 5 años de experiencia en diseño de producto, liderando sistemas de diseño en Rappi y Platzi, altamente relevante para el rol de Product Designer Senior.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración (2+ años por empresa), lo cual indica un compromiso sostenido y estabilidad profesional.' },
            { category: 'Relevancia', description: 'Su experiencia en diseño de sistemas escalables y research de usuarios se alinea perfectamente con los requisitos técnicos del puesto.' },
            { category: 'Ubicación', description: 'Reside en Bogotá, Colombia y está dispuesta a reubicarse, lo cual es favorable para la modalidad de trabajo requerida.' },
            { category: 'Requisitos deseables', description: 'Cumple con la mayoría de los requisitos técnicos incluyendo Figma, Design Systems y accesibilidad WCAG. Su portfolio demuestra impacto medible en cada proyecto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'María García López es una candidata altamente calificada para el puesto de Product Designer Senior. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer Senior',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'seleccionado',
        status: 'hired',
        appliedDate: '2026-02-10',
        matchScore: 92,
        confidence: 'high',
        scores: {
          cvScore: 92,
          psychometricScore: 88,
          serenaScore: 91,
          technicalScore: 94,
          productManagerScore: 90,
          hiringManagerScore: 93
        },
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Valentina demuestra una estructura cognitiva sólida, ideal para roles de liderazgo en diseño donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidata altamente recomendada. Sus habilidades cognitivas superan el percentil 90 para el cargo de Senior Product Designer.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ],
          minimumThreshold: 70,
          obtainedScore: 88,
          decision: 'Candidato Recomendado'
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola María, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'La candidata demuestra una capacidad excepcional para articular desafíos arquitectónicos complejos, destacando la importancia de los Design Tokens como solución escalable y agnóstica.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Presenta un enfoque humano y participativo en la gestión de stakeholders. Su estrategia de gobernanza compartida es un indicador sólido de madurez en liderazgo técnico.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Su dominio de la normativa WCAG es profundo. La integración de linters en Figma y auditorías en CI/CD demuestra un enfoque preventivo y profesional hacia la accesibilidad.'
            }
          ],
          overallFeedback: {
            summary: 'Luisa demuestra una sólida base técnica y estratégica en la gestión de productos digitales con componentes de IA. Su habilidad para comunicarse efectivamente con diferentes stakeholders es notable, aunque podría beneficiarse de una mayor claridad en la descripción de experiencias específicas. Con un enfoque más detallado en ejemplos concretos, podría destacar aún más en roles de liderazgo de producto.',
            strengths: [
              'Experiencia en el desarrollo de módulos de reclutamiento con inteligencia artificial.',
              'Conocimiento en la integración de modelos de IA mediante API Keys y en servidores locales.',
              'Capacidad para definir estrategias y roadmaps equilibrando prioridades urgentes e importantes.',
              'Habilidad para comunicarse efectivamente con stakeholders técnicos y de negocio, adaptando el lenguaje según la audiencia.'
            ],
            improvements: [
              'Podría mejorar en la claridad al describir experiencias pasadas, especialmente en el ámbito de edtech.',
              'Sería beneficioso profundizar en ejemplos específicos de integración de IA en productos para demostrar un conocimiento más detallado.'
            ],
            onboardingStrategy: 'No se ha definido una estrategia específica.',
            leaderRecommendation: 'No se han generado recomendaciones específicas.'
          }
        },
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        }
      },
      {
        id: 'app-001-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UX Lead',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'entrevista-tecnica',
        status: 'rejected',
        appliedDate: '2025-11-15',
        matchScore: 85,
        confidence: 'medium',
        scores: {
          cvScore: 88,
          technicalScore: 78
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola María, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'La respuesta refleja un entendimiento profundo de la escalabilidad técnica y la importancia de la abstracción mediante tokens.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Demuestra habilidades interpersonales sólidas al proponer un modelo de gobernanza colaborativo en lugar de una imposición técnica.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Su metodología de integrar accesibilidad en el pipeline de desarrollo es una de las mejores prácticas observadas en candidatos Senior.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Falta de experiencia específica en el sector fintech'
      },
      {
        id: 'app-001-3',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UI Specialist',
        jobLocation: 'Remote',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2024-05-20',
        matchScore: 95,
        confidence: 'high',
        scores: {
          cvScore: 96,
          technicalScore: 98
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola María, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'La candidata demuestra una capacidad excepcional para articular desafíos arquitectónicos complejos, destacando la importancia de los Design Tokens como solución escalable y agnóstico.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Presenta un enfoque humano y participativo en la gestión de stakeholders. Su estrategia de gobernanza compartida es un indicador sólido de madurez en liderazgo técnico.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Su dominio de la normativa WCAG es profundo. La integración de linters en Figma y auditorías en CI/CD demuestra un enfoque preventivo y profesional hacia la accesibilidad.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],
    
    // Información personal adicional
    firstName: 'María',
    lastName: 'García López',
    identificationNumber: '1015432189',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/mariagarcia',
    birthDate: '15/03/1998',
    
    // Ubicación detallada
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Medellín', 'Remote'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'Semanas',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Product Designer con más de 5 años de experiencia creando experiencias digitales centradas en el usuario. Especializada en diseño de sistemas escalables, investigación UX y prototipado rápido. He trabajado con equipos multidisciplinarios en startups tecnológicas líderes como Rappi y Platzi, liderando proyectos desde la conceptualización hasta el lanzamiento. Mi enfoque combina pensamiento estratégico con ejecución visual impecable, siempre basándome en datos y feedback de usuarios. Apasionada por la educación digital y el impacto social a través del diseño.',
    
    experience: [
      {
        company: 'Rappi',
        position: 'Senior Product Designer',
        duration: 'Ene 2023 - Presente',
        description: 'Lideré el rediseño del sistema de diseño de la app principal, impactando a +10M usuarios. Trabajé en estrecha colaboración con Product Managers y desarrolladores para crear experiencias intuitivas.',
        location: 'Bogotá, Colombia',
        startDate: 'Enero 2023',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el sistema de diseño impactando a +10M usuarios',
          'Lideré iniciativas de accesibilidad aumentando el cumplimiento WCAG del 60% al 95%',
          'Mentoría de 3 diseñadores junior en mejores prácticas de producto',
          'Colaboración directa con C-level en definición de estrategia de diseño'
        ]
      },
      {
        company: 'Platzi',
        position: 'Product Designer',
        duration: 'Mar 2021 - Dic 2022',
        description: 'Diseñé la experiencia de usuario para nuevos cursos y plataformas de aprendizaje. Implementé metodologías de design thinking y research de usuarios.',
        location: 'Bogotá, Colombia',
        startDate: 'Marzo 2021',
        endDate: 'Diciembre 2022',
        current: false,
        achievements: [
          'Diseñé el nuevo flujo de rutas de aprendizaje con 25% de incremento en completion rate',
          'Implementé programa de user research con +200 entrevistas realizadas',
          'Creé componentes reutilizables que redujeron tiempo de desarrollo en 40%',
          'Lideré rediseño de experiencia mobile con mejora del NPS de 45 a 68'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de los Andes',
        degree: 'Diseño Industrial',
        year: '2020',
        description: 'Enfoque en diseño de productos digitales y experiencia de usuario. Proyecto de grado sobre accesibilidad en plataformas educativas.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Design Systems', 'Prototyping', 'User Research', 'Adobe Creative Suite', 'FigJam', 'Miro', 'Maze', 'UserTesting', 'Analytics'],
      soft: ['Liderazgo', 'Comunicación', 'Trabajo en equipo', 'Pensamiento crítico', 'Adaptabilidad', 'Empatía', 'Mentoría', 'Presentación ejecutiva']
    },
    portfolio: {
      url: 'https://mariagarcia.design',
      projects: [
        {
          name: 'Rappi Design System 2.0',
          description: 'Rediseño completo del sistema de diseño con enfoque en accesibilidad',
          impact: 'Reducción del 40% en tiempo de desarrollo de features'
        },
        {
          name: 'Platzi Learning Path',
          description: 'Nueva experiencia de rutas de aprendizaje personalizadas',
          impact: 'Incremento del 25% en completion rate'
        }
      ]
    },
    documents: [
      { id: 'doc-001-1', name: 'CV_Maria_Garcia.pdf', type: 'PDF', size: '1.2 MB', uploadedDate: '2026-02-10', uploadedBy: 'María García López' },
      { id: 'doc-001-2', name: 'Portfolio_MG_2024.pdf', type: 'PDF', size: '25.4 MB', uploadedDate: '2026-02-10', uploadedBy: 'María García López' },
      { id: 'doc-001-3', name: 'Cedula_Ciudadania.pdf', type: 'PDF', size: '0.8 MB', uploadedDate: '2026-02-10', uploadedBy: 'María García López' }
    ],
    notes: [
      'Excelente portfolio con casos de estudio detallados',
      'Experiencia relevante en startups tech colombianas',
      'Muy buena presentación de proyectos de impacto',
      'Fit cultural excepcional',
      'Referencias muy positivas',
      'Demuestra liderazgo nato y capacidad de mentoría'
    ]
  },
  // ====== ETAPA 8: VERIFICACIÓN ANTECEDENTES (0 ACTIVOS, 1 RECHAZADO) ======
  {
    id: 'cand-003',
    name: 'Andrés Parra Gómez',
    email: 'andres.parra@email.com',
    phone: '+57 313 456 7890',
    age: 33,
    location: 'Santa Marta, Colombia',
    avatar: 'AP',
    yearsExperience: 8,
    expectedSalary: '$9.000.000 - $10.000.000 COP',
    availability: '1 mes',
    
    // Lista de aplicaciones (vacantes)
    applications: [
      {
        id: 'app-003-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer Senior',
        jobLocation: 'Santa Marta, Colombia',
        currentStage: 'antecedentes',
        status: 'rejected',
        appliedDate: '2026-02-14',
        matchScore: 76,
        confidence: 'medium',
        scores: {
          cvScore: 76,
          psychometricScore: 72,
          serenaScore: 70,
          technicalScore: 68,
          productManagerScore: 65,
          hiringManagerScore: 71
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Andrés, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'El candidato demuestra una sólida capacidad analítica, aunque su enfoque en la unificación de componentes se centra primordialmente en la eficiencia técnica inmediata.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Su estrategia de gobernanza es acertada, sin embargo, se percibe cierta falta de profundidad en la gestión de las dinámicas emocionales del equipo durante el cambio.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Conocimiento técnico sólido. Su enfoque en auditorías automáticas es excelente, pero podría beneficiarse de un mayor énfasis en la inclusión desde la fase de ideación.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Inconsistencias encontradas en verificación de referencias laborales.',
        backgroundCheck: {
          status: 'issues',
          completedDate: '2026-04-12',
          recommendation: 'Se detectaron inconsistencias en el historial laboral. Se requiere validación adicional antes de continuar.',
          details: [
            { category: 'Identidad', result: 'Verificada correctamente.', status: 'pass', records: 5, description: 'Verificada en bases oficiales, sin inconsistencias. Registros encontrados: 5.' },
            { category: 'Historial penal y criminal', result: 'No se registran antecedentes.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Referencias Laborales', result: 'Discrepancia detectada en fechas con TechSolutions SAS (8 meses de diferencia).', status: 'fail', records: 1, description: 'Discrepancia detectada en fechas con TechSolutions SAS (8 meses de diferencia). Requiere validación.' },
            { category: 'Veracidad de CV', result: 'Inconsistencias encontradas en historial laboral.', status: 'fail', records: 1, description: 'Se encontraron inconsistencias entre el CV declarado y los registros oficiales.' }
          ]
        }
      },
      {
        id: 'app-003-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Web Designer Specialist',
        jobLocation: 'Barranquilla, Colombia',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2024-03-10',
        matchScore: 82,
        confidence: 'high',
        scores: {
          cvScore: 85,
          technicalScore: 88
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Andrés, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-003-3',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Frontend Engineer',
        jobLocation: 'Remote',
        currentStage: 'evaluacion-cv',
        status: 'active',
        appliedDate: '2026-04-01',
        matchScore: 68,
        confidence: 'medium',
        scores: {
          cvScore: 70
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Andrés, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-003-4',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UI Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'entrevista-tecnica',
        status: 'rejected',
        appliedDate: '2025-01-15',
        matchScore: 72,
        confidence: 'medium',
        scores: {
          cvScore: 74,
          technicalScore: 70
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Andrés, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Falta de experiencia en diseño de producto complejo.'
      },
      {
        id: 'app-003-5',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Web Developer',
        jobLocation: 'Remote',
        currentStage: 'evaluacion-cv',
        status: 'active',
        appliedDate: '2026-04-10',
        matchScore: 75,
        confidence: 'medium',
        scores: {
          cvScore: 78
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Andrés, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],
    
    // Información personal adicional
    firstName: 'Andrés',
    lastName: 'Parra Gómez',
    identificationNumber: '1098765432',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiano',
    linkedin: 'https://www.linkedin.com/in/andresparra',
    birthDate: '10/05/1993',
    
    // Ubicación detallada
    city: 'Santa Marta',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    
    // Información laboral adicional
    noticePeriod: '1',
    noticePeriodUnit: 'Mes',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Diseñador Digital con 8 años de experiencia en desarrollo web y diseño de interfaces. He trabajado en diversos proyectos para agencias digitales y clientes corporativos, con enfoque en sitios web responsivos, landing pages de alta conversión y experiencias de usuario intuitivas. Mi background técnico en ingeniería de sistemas me permite colaborar efectivamente con equipos de desarrollo y entender las limitaciones técnicas. Busco hacer la transición hacia diseño de producto digital en startups tech. Apasionado por el diseño limpio, la usabilidad y las últimas tendencias en desarrollo web.',
    
    experience: [
      {
        id: 'exp-003-001',
        company: 'Digital Agency Colombia',
        position: 'Diseñador Web Senior',
        duration: 'Mar 2018 - Presente',
        description: 'Diseño y desarrollo de sitios web corporativos para clientes nacionales e internacionales. Liderazgo de proyectos desde el brief inicial hasta el lanzamiento. Coordinación con equipos de marketing y desarrollo.',
        location: 'Santa Marta, Colombia',
        startDate: '2018-03',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé +40 sitios web para clientes de diversos sectores',
          'Implementé mejores prácticas de SEO aumentando tráfico orgánico en 35%',
          'Creé sistema de templates reutilizables que redujo tiempo de desarrollo en 25%',
          'Lideré rediseño de sitio e-commerce con incremento de conversión del 18%'
        ]
      },
      {
        id: 'exp-003-002',
        company: 'TechSolutions SAS',
        position: 'Desarrollador Frontend / Diseñador',
        duration: 'Ene 2016 - Feb 2018',
        description: 'Desarrollo frontend con HTML, CSS, JavaScript y diseño de interfaces para aplicaciones web. Trabajo con frameworks como Bootstrap y WordPress. Colaboración con backend para integración de APIs.',
        location: 'Barranquilla, Colombia',
        startDate: '2016-01',
        endDate: '2018-02',
        current: false,
        achievements: [
          'Desarrollé +20 landing pages con tasas de conversión superiores al 8%',
          'Implementé diseño responsive para 15 aplicaciones web legacy',
          'Colaboré en migración de sitios a WordPress mejorando mantenibilidad',
          'Mentoría a 2 diseñadores junior en buenas prácticas frontend'
        ]
      },
      {
        id: 'exp-003-003',
        company: 'Freelance',
        position: 'Diseñador Web Freelance',
        duration: 'Jun 2014 - Dic 2015',
        description: 'Proyectos freelance de diseño web para pequeñas empresas y emprendimientos. Gestión completa del proceso desde briefing hasta entrega y hosting.',
        location: 'Santa Marta, Colombia',
        startDate: '2014-06',
        endDate: '2015-12',
        current: false,
        achievements: [
          'Completé +15 proyectos web para pymes locales',
          'Desarrollo de identidad visual y branding para 5 startups',
          'Implementé estrategias de posicionamiento web básico'
        ]
      }
    ],
    education: [
      {
        institution: 'Platzi',
        degree: 'Master en Desarrollo Frontend y Diseño UX',
        year: '2025',
        current: true,
        description: 'Especialización avanzada en arquitectura de aplicaciones modernas, micro-frontends y estrategias complejas de experiencia de usuario.'
      },
      {
        institution: 'Universidad del Magdalena',
        degree: 'Ingeniería de Sistemas',
        year: '2015',
        description: 'Título profesional en Ingeniería de Sistemas con énfasis en desarrollo web y bases de datos. Proyecto de grado sobre sistemas de información para pymes locales.'
      }
    ],
    skills: {
      technical: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Bootstrap', 'Responsive Design', 'SEO Básico', 'Git (básico)'],
      soft: ['Versatilidad', 'Problem solving', 'Gestión de proyectos', 'Comunicación con clientes', 'Autogestión', 'Aprendizaje continuo']
    },
    portfolio: {
      url: 'https://andresparra.dev',
      projects: [
        {
          name: 'E-commerce Tienda Regional',
          description: 'Sitio e-commerce con WordPress y WooCommerce para cadena de retail',
          impact: 'Conversión del 4.2%, +200 transacciones mensuales'
        },
        {
          name: 'Landing Pages Alta Conversión',
          description: 'Portfolio de +30 landing pages para campañas digitales',
          impact: 'Tasa promedio de conversión del 8.5%'
        },
        {
          name: 'Sitios Corporativos',
          description: 'Diseño y desarrollo de sitios web para empresas B2B',
          impact: 'Portfolio de 15+ clientes corporativos activos'
        }
      ]
    },
    documents: [
      { id: 'doc-003-1', name: 'Andres_Parra_CV.pdf', type: 'PDF', size: '1.1 MB', uploadedDate: '2026-02-14', uploadedBy: 'Andrés Parra Gómez' },
      { id: 'doc-003-2', name: 'Certificado_Laboral_DigitalAgency.pdf', type: 'PDF', size: '0.9 MB', uploadedDate: '2026-02-14', uploadedBy: 'Andrés Parra Gómez' }
    ],
    notes: [
      'Perfil con experiencia en web development pero limitada en producto digital',
      'Background técnico interesante - ingeniería de sistemas',
      'Portfolio enfocado en agencias y sitios corporativos tradicionales',
      'Poca experiencia en metodologías UX research y design thinking',
      'No tiene experiencia en startups tech ni productos SaaS',
      'Durante verificación de antecedentes se encontraron inconsistencias',
      'ALERTA: Empresa "TechSolutions SAS" no confirmó fechas de trabajo declaradas (Ene 2016 - Feb 2018). El contacto de RRHH indicó que el candidato trabajó desde Junio 2016 hasta Octubre 2017, con una diferencia de 8 meses respecto a lo declarado en CV. Esta discrepancia genera dudas sobre la veracidad de la información proporcionada.'
    ]
  },

  // ====== ETAPA 7: ENTREVISTA HIRING MANAGER (1 ACTIVO) ======
  {
    id: 'cand-004',
    name: 'Carolina Mendoza Ríos',
    email: 'carolina.mendoza@email.com',
    phone: '+57 311 234 5678',
    age: 29,
    location: 'Medellín, Colombia',
    avatar: 'CM',
    yearsExperience: 6,
    expectedSalary: '$8.500.000 - $10.500.000 COP',
    availability: '2 semanas',
    
    // Lista de aplicaciones (vacantes)
    applications: [
      {
        id: 'app-004-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer Senior',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'hiring-manager',
        status: 'active',
        appliedDate: '2026-02-15',
        matchScore: 89,
        confidence: 'high',
        scores: {
          cvScore: 89,
          psychometricScore: 85,
          serenaScore: 87,
          technicalScore: 90,
          productManagerScore: 88,
          hiringManagerScore: 86
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carolina, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-004-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Interaction Designer',
        jobLocation: 'Remote',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2025-08-20',
        matchScore: 92,
        confidence: 'high',
        scores: {
          cvScore: 94,
          technicalScore: 95
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carolina, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-004-3',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UX Researcher',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'rejected',
        appliedDate: '2025-03-12',
        matchScore: 78,
        confidence: 'medium',
        scores: {
          cvScore: 75
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carolina, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Perfil más orientado a diseño visual que a investigación pura.'
      },
      {
        id: 'app-004-4',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer',
        jobLocation: 'Remote',
        currentStage: 'entrevista-tecnica',
        status: 'rejected',
        appliedDate: '2024-11-05',
        matchScore: 84,
        confidence: 'high',
        scores: {
          cvScore: 86,
          technicalScore: 82
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carolina, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'El candidato decidió retirar su postulación.'
      }
    ],
    
    // Información personal adicional
    firstName: 'Carolina',
    lastName: 'Mendoza Ríos',
    identificationNumber: '1012345678',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/carolinamendoza',
    birthDate: '12/11/1996',
    
    // Ubicación detallada
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'Semanas',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Product Designer con 6 años de experiencia diseñando productos fintech de alto impacto para usuarios globales. Actualmente trabajo en Stripe diseñando experiencias de pago que son utilizadas por miles de merchants alrededor del mundo. Mi enfoque combina investigación de usuarios profunda, pensamiento estratégico de producto y excelencia en ejecución visual. He trabajado 100% remoto con equipos distribuidos en múltiples zonas horarias, desarrollando habilidades excepcionales de comunicación asíncrona y autonomía. Especializada en design systems escalables, optimización de conversión mediante A/B testing y diseño centrado en datos. Apasionada por crear experiencias simples para problemas complejos, especialmente en el ecosistema de pagos digitales y fintech.',
    matchScore: 91,
    confidence: 'high',
    
    experience: [
      {
        id: 'exp-carolina-001',
        company: 'Stripe (Remote)',
        position: 'Product Designer',
        duration: 'Mar 2022 - Presente',
        description: 'Diseño de experiencias de pago para merchants globales en el equipo de Payment Products. Trabajo 100% remoto con equipos distribuidos en San Francisco, Dublín y Singapur. Responsable del diseño end-to-end de features desde research hasta lanzamiento.',
        location: 'Remote (USA)',
        startDate: 'Marzo 2022',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé Payment Links feature adoptado por +50K merchants con $120M en volumen procesado',
          'Lideré rediseño del dashboard de pagos incrementando NPS de 67 a 81',
          'Implementé sistema de A/B testing que optimizó conversión en checkout en 12%',
          'Creé componentes de design system utilizados por 8 equipos de producto',
          'Facilitación de user research con +100 merchants en 15 países diferentes',
          'Colaboración directa con Engineering, PM y Data Science en ambiente altamente técnico'
        ]
      },
      {
        id: 'exp-carolina-002',
        company: 'Bold',
        position: 'UX Designer',
        duration: 'Ago 2019 - Feb 2022',
        description: 'Diseño de productos fintech para comercios colombianos (POS, pagos digitales, analytics). Research y testing con usuarios reales en terreno. Primera experiencia en startup tech de rápido crecimiento.',
        location: 'Medellín, Colombia',
        startDate: 'Agosto 2019',
        endDate: 'Febrero 2022',
        current: false,
        achievements: [
          'Diseñé Bold POS System alcanzando NPS de 82 entre +3K comercios',
          'Lideré research cualitativo con 80+ comercios para identificar pain points',
          'Creé flujos de onboarding reduciendo tiempo de activación de 45min a 12min',
          'Implementé design system que estandarizó experiencia en 4 productos',
          'Colaboré en estrategia de producto participando en definición de roadmap',
          'Diseñé analytics dashboard aumentando engagement de merchants en 35%'
        ]
      },
      {
        id: 'exp-carolina-003',
        company: 'Platzi',
        position: 'UX/UI Designer',
        duration: 'Ene 2018 - Jul 2019',
        description: 'Diseño de experiencias educativas para plataforma de educación online con +3M estudiantes. Optimización de flujos de aprendizaje y gamificación. Trabajo en equipo ágil con sprints de 2 semanas.',
        location: 'Remoto',
        startDate: 'Enero 2018',
        endDate: 'Julio 2019',
        current: false,
        achievements: [
          'Diseñé sistema de logros y badges incrementando completion rate en 18%',
          'Rediseñé player de video mejorando tiempo de engagement de 12min a 19min',
          'Creé 120+ pantallas para nuevas features de la plataforma educativa',
          'Implementé mejoras de usabilidad basadas en heatmaps y session recordings',
          'Colaboré en investigación con +50 estudiantes para validar hipótesis de diseño'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad EAFIT',
        degree: 'Diseño de Interacción',
        year: '2018',
        description: 'Pregrado en Diseño de Interacción con énfasis en experiencia de usuario y diseño de servicios digitales. Proyecto de grado sobre diseño de aplicaciones fintech para población no bancarizada.'
      },
      {
        institution: 'Interaction Design Foundation',
        degree: 'User Research - Methods and Best Practices',
        year: '2020',
        description: 'Certificación en métodos avanzados de investigación de usuarios, incluyendo entrevistas, testing de usabilidad y análisis de datos cualitativos.'
      },
      {
        institution: 'Reforge',
        degree: 'Product Strategy',
        year: '2023',
        description: 'Programa intensivo de estrategia de producto enfocado en growth, métricas de producto y toma de decisiones basada en datos.'
      }
    ],
    skills: {
      technical: ['Figma (Expert)', 'Design Systems', 'Advanced Prototyping', 'User Research', 'A/B Testing', 'Analytics (Mixpanel, Amplitude)', 'SQL (Basic)', 'HTML/CSS (Basic)', 'Maze', 'UserTesting', 'Hotjar', 'Optimal Workshop', 'Design Tokens', 'Component Libraries'],
      soft: ['Trabajo remoto', 'Comunicación asíncrona', 'Autonomía', 'Colaboración global', 'Stakeholder management', 'Presentaciones de producto', 'Pensamiento estratégico', 'Data-driven decision making', 'Inglés fluido (C1)', 'Facilitación de workshops']
    },
    portfolio: {
      url: 'https://carolinamendoza.co',
      projects: [
        {
          name: 'Stripe Payment Links',
          description: 'Feature de links de pago simplificados que permite a merchants crear y compartir links de pago sin integración técnica. Diseño end-to-end desde research hasta launch.',
          impact: 'Adoptado por +50K merchants, $120M en volumen de pagos procesados, NPS de 85'
        },
        {
          name: 'Stripe Dashboard Redesign',
          description: 'Rediseño completo del dashboard principal de pagos enfocado en claridad de información y acción rápida para merchants',
          impact: 'Incremento del NPS de 67 a 81, reducción de 40% en tickets de soporte relacionados con navegación'
        },
        {
          name: 'Bold POS System',
          description: 'Sistema de punto de venta físico y digital para comercios colombianos con gestión de inventario, reportes y analíticas en tiempo real',
          impact: 'NPS de 82 entre +3K usuarios activos, reducción de 73% en tiempo de onboarding'
        },
        {
          name: 'Bold Analytics Dashboard',
          description: 'Dashboard de analíticas financieras para merchants con visualización de ventas, transacciones y tendencias',
          impact: 'Incremento del 35% en engagement de merchants, feature más valorada según encuestas'
        }
      ]
    },
    scores: {
      cvScore: 91,
      psychometricScore: 87,
      serenaScore: 89,
      technicalScore: 92,
      productManagerScore: 88
    },
    documents: [
      { id: 'doc-004-1', name: 'Carolina_Mendoza_Resume.pdf', type: 'PDF', size: '1.3 MB', uploadedDate: '2026-02-15', uploadedBy: 'Carolina Mendoza Ríos' },
      { id: 'doc-004-2', name: 'Stripe_Recommendation_Letter.pdf', type: 'PDF', size: '0.7 MB', uploadedDate: '2026-02-15', uploadedBy: 'Carolina Mendoza Ríos' },
      { id: 'doc-004-3', name: 'Fintech_UX_Portfolio.pdf', type: 'PDF', size: '18.2 MB', uploadedDate: '2026-02-15', uploadedBy: 'Carolina Mendoza Ríos' }
    ],
    notes: [
      'Experiencia en Stripe muy valorada - producto de clase mundial',
      'Excelente manejo de trabajo remoto y comunicación asíncrona',
      'Portfolio con proyectos de impacto global medible y cuantificable',
      'Fit cultural excepcional: autónoma, colaborativa, data-driven',
      'Background fintech muy relevante para productos de UBITS',
      'Certificaciones de Reforge e IDF demuestran inversión en aprendizaje continuo',
      'Inglés fluido - apta para colaboración internacional',
      'Expectativa salarial competitiva y alineada con experiencia',
      'En proceso de entrevista con Hiring Manager'
    ]
  },
  {
    id: 'cand-005',
    name: 'Carlos Rodríguez Méndez',
    email: 'carlos.rodriguez@email.com',
    phone: '+57 310 234 5678',
    age: 32,
    location: 'Medellín, Colombia',
    avatar: 'CR',
    yearsExperience: 7,
    expectedSalary: '$9.000.000 - $11.000.000 COP',
    availability: '2 semanas',
    
    // Lista de aplicaciones (vacantes)
    applications: [
      {
        id: 'app-005-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer Senior',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'entrevista-pm',
        status: 'active',
        appliedDate: '2026-02-16',
        matchScore: 88,
        confidence: 'high',
        scores: {
          cvScore: 88,
          psychometricScore: 85,
          serenaScore: 86,
          technicalScore: 89,
          productManagerScore: 87
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carlos, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-005-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UX Lead',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2025-06-10',
        matchScore: 92,
        confidence: 'high',
        scores: {
          cvScore: 94,
          technicalScore: 95
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carlos, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-005-3',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Service Designer',
        jobLocation: 'Remote',
        currentStage: 'evaluacion-cv',
        status: 'rejected',
        appliedDate: '2025-01-20',
        matchScore: 78,
        confidence: 'medium',
        scores: {
          cvScore: 75
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Carlos, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'El perfil no se ajusta completamente al enfoque estratégico requerido.'
      }
    ],
    
    // Información personal adicional
    firstName: 'Carlos',
    lastName: 'Rodríguez Méndez',
    identificationNumber: '1045678901',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiano',
    linkedin: 'https://www.linkedin.com/in/carlosrodriguez',
    birthDate: '18/04/1994',
    
    // Ubicación detallada
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote', 'Medellín'],
    
    // Información laboral adicional
    noticePeriod: '2',
    noticePeriodUnit: 'Semanas',
    currency: 'Peso colombiano (COP)',
    
    experience: [
      {
        company: 'Bancolombia',
        position: 'Lead UX/UI Designer',
        duration: 'Jun 2020 - Presente',
        description: 'Lidero equipo de 5 diseñadores en la transformación digital de productos bancarios. Responsable de la estrategia de diseño end-to-end en aplicaciones móviles y web con +15M usuarios activos.',
        location: 'Medellín, Colombia',
        startDate: 'Junio 2020',
        endDate: null,
        current: true,
        achievements: [
          'Lideré rediseño completo de app móvil incrementando NPS de 45 a 72 en 6 meses',
          'Creé BcoDS (Bancolombia Design System) adoptado por 15+ equipos de producto',
          'Reduje tiempo de diseño a producción en 45% mediante componentes reutilizables'
        ]
      },
      {
        company: 'Globant',
        position: 'Senior UX Designer',
        duration: 'Ene 2018 - May 2020',
        description: 'Diseño de experiencias para clientes internacionales Fortune 500 en retail, fintech y telecomunicaciones.',
        location: 'Medellín, Colombia',
        startDate: 'Enero 2018',
        endDate: 'Mayo 2020',
        current: false,
        achievements: [
          'Diseñé experiencia de e-commerce para retailer USA con +$5M en ventas mensuales',
          'Facilité 15+ Design Sprints con clientes en USA, México y Colombia'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad EAFIT',
        degree: 'Diseño de Interacción',
        year: '2017',
        description: 'Énfasis en experiencia de usuario y diseño de servicios digitales.'
      }
    ],
    skills: {
      technical: ['Figma', 'Design Systems', 'User Research', 'Leadership'],
      soft: ['Mentoria', 'Comunicación estratégica', 'Stakeholder Management']
    },
    portfolio: {
      url: 'https://carlosrodriguez.co',
      projects: [
        {
          name: 'Bancolombia App Redesign',
          description: 'Rediseño completo de la aplicación móvil con +15M usuarios activos',
          impact: 'NPS incrementó de 45 a 72'
        }
      ]
    },
    documents: [
      { id: 'doc-005-1', name: 'Carlos_Rodriguez_CV.pdf', type: 'PDF', size: '1.6 MB', uploadedDate: '2026-02-16', uploadedBy: 'Carlos Rodríguez Méndez' },
      { id: 'doc-005-2', name: 'Portfolio_CR_2024.pdf', type: 'PDF', size: '12.5 MB', uploadedDate: '2026-02-16', uploadedBy: 'Carlos Rodríguez Méndez' }
    ],
    notes: [
      'Excelente perfil senior con experiencia en banca',
      'Liderazgo de equipos comprobado - gestiona 5 diseñadores actualmente',
      'Certificaciones adicionales en UX Management y Design Sprint',
      'Portfolio con proyectos de alto impacto medible en métricas de negocio',
      'Excelente fit para roles de liderazgo y mentoría',
      'Experiencia con stakeholders C-level y presentaciones ejecutivas',
      'Design system de gran escala - BcoDS usado por 15+ equipos',
      'Expectativa salarial en rango superior pero justificada por experiencia',
      'En proceso de entrevista con Product Manager'
    ]
  },
  {
    id: 'cand-006',
    name: 'Sebastián Jiménez Gómez',
    email: 'sebastian.jimenez@email.com',
    phone: '+57 301 890 1234',
    age: 25,
    location: 'Barranquilla, Colombia',
    avatar: 'SJ',
    yearsExperience: 3,
    expectedSalary: '$6.500.000 - $8.000.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-006-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer Junior',
        jobLocation: 'Barranquilla, Colombia',
        currentStage: 'entrevista-pm',
        status: 'rejected',
        appliedDate: '2026-02-17',
        matchScore: 78,
        confidence: 'medium',
        scores: {
          cvScore: 78,
          psychometricScore: 74,
          serenaScore: 76,
          technicalScore: 80,
          productManagerScore: 65
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Sebastián, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'En entrevista con PM mostró poca profundidad en procesos de research y toma de decisiones basadas en datos.'
      },
      {
        id: 'app-006-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UI Designer',
        jobLocation: 'Remote',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2025-05-10',
        matchScore: 82,
        confidence: 'high',
        scores: {
          cvScore: 85,
          technicalScore: 88
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Sebastián, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-006-3',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Motion Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'active',
        appliedDate: '2026-04-12',
        matchScore: 85,
        confidence: 'medium',
        scores: {
          cvScore: 85
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Sebastián, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],
    
    firstName: 'Sebastián',
    lastName: 'Jiménez Gómez',
    identificationNumber: '1047890123',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/sebastianjimenez',
    birthDate: '1999-11-20',
    city: 'Barranquilla',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    description: 'Product Designer con 3 años de experiencia en el sector de Media & Entertainment. Especializado en el diseño de interfaces móviles para aplicaciones de streaming de música y video. Mi enfoque se centra en la optimización de flujos de navegación y la mejora del engagement mediante micro-interacciones y motion design. Apasionado por la intersección entre el diseño visual y la usabilidad técnica.',
    
    experience: [
      {
        id: 'exp-006-001',
        company: 'Audiomack',
        position: 'Product Designer',
        duration: 'Oct 2022 - Presente',
        description: 'Diseño de features para plataforma de música streaming. Optimización de player y discovery. Colaboración remota con equipo en USA.',
        location: 'Remote (USA)',
        startDate: '2022-10',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el reproductor de música mobile logrando un incremento del 28% en el tiempo de escucha promedio',
          'Implementé sistema de gestos para navegación rápida entre playlists activas',
          'Colaboré en el lanzamiento de features de descubrimiento social de música',
          'Coordiné con el equipo de ingeniería en USA para la implementación pixel-perfect de diseños en React Native'
        ]
      },
      {
        id: 'exp-006-002',
        company: 'Zemoga',
        position: 'Junior UX Designer',
        duration: 'Ene 2021 - Sep 2022',
        description: 'Diseño para clientes internacionales en media y entertainment. Aprendizaje rápido en ambiente ágil.',
        location: 'Bogotá, Colombia',
        startDate: '2021-01',
        endDate: '2022-09',
        current: false,
        achievements: [
          'Participé en el rediseño de la interfaz de usuario para 2 plataformas OTT de gran escala',
          'Realicé mantenimiento y expansión de librerías de componentes UI en Figma',
          'Apoyé en la ejecución de test de usabilidad moderados con usuarios reales',
          'Documenté flujos de usuario complejos para facilitar el onboarding de desarrolladores'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad del Norte',
        degree: 'Diseño Gráfico',
        year: '2020',
        description: 'Enfoque en diseño visual y comunicación. Proyecto de grado sobre identidad digital de marcas en mercados emergentes.'
      }
    ],
    skills: {
      technical: ['Figma', 'Prototyping', 'Visual Design', 'Motion Design', 'Illustration', 'Branding', 'After Effects', 'Lottie', 'UI Design Patterns', 'Responsive Design'],
      soft: ['Creatividad', 'Trabajo remoto', 'Inglés fluido', 'Autogestión', 'Curiosidad', 'Adaptabilidad']
    },
    portfolio: {
      url: 'https://sebastianjimenez.co',
      projects: [
        {
          name: 'Audiomack Player Redesign',
          description: 'Rediseño del reproductor de música con nuevas features y gestos intuitivos',
          impact: 'Engagement +28%, Rating en Store subió de 4.2 a 4.6'
        },
        {
          name: 'Zemoga UI Kit',
          description: 'Librería de componentes escalables para proyectos de media digital',
          impact: 'Reducción del 20% en tiempo de prototipado'
        }
      ]
    },
    documents: [
      { id: 'doc-006-1', name: 'Sebastian_Jimenez_Portfolio.pdf', type: 'PDF', size: '14.2 MB', uploadedDate: '2026-02-17', uploadedBy: 'Sebastián Jiménez Gómez' },
      { id: 'doc-006-2', name: 'Zemoga_Reference_Letter.pdf', type: 'PDF', size: '0.9 MB', uploadedDate: '2026-02-17', uploadedBy: 'Sebastián Jiménez Gómez' }
    ],
    notes: [
      'Buen manejo de diseño visual y motion',
      'Experiencia en productos de streaming es un plus',
      'Inglés sólido para trabajar con equipos globales',
      'Necesita profundizar en metodologías de research profundo'
    ]
  },

  // ====== ETAPA 5: TEST PSICOMÉTRICO (1 ACTIVO, 1 RECHAZADO) ======
  {
    id: 'cand-007',
    name: 'Camila Andrea Martínez',
    email: 'camila.martinez@email.com',
    phone: '+57 320 345 6789',
    age: 26,
    location: 'Bogotá, Colombia',
    avatar: 'CAM',
    yearsExperience: 4,
    expectedSalary: '$7.500.000 - $9.000.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-007-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-psicometrica',
        status: 'active',
        appliedDate: '2026-02-18',
        matchScore: 85,
        confidence: 'high',
        scores: {
          cvScore: 85,
          psychometricScore: 82,
          serenaScore: 84,
          technicalScore: 86
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Camila Andrea, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-007-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UX Researcher',
        jobLocation: 'Remote',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2024-09-15',
        matchScore: 88,
        confidence: 'high',
        scores: {
          cvScore: 90,
          technicalScore: 85
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Camila Andrea, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-007-3',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Service Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'rejected',
        appliedDate: '2023-11-20',
        matchScore: 70,
        confidence: 'medium',
        scores: {
          cvScore: 72
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Camila Andrea, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'La candidata buscaba un rol más enfocado en diseño visual.'
      }
    ],
    
    firstName: 'Camila Andrea',
    lastName: 'Martínez López',
    identificationNumber: '1024567890',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://linkedin.com/in/camila-martinez-designer',
    birthDate: '1999-05-14',
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remoto'],
    noticePeriod: '2',
    noticePeriodUnit: 'semanas',
    currency: 'COP',
    description: 'Product Designer con 4 años de experiencia especializada en diseño de experiencias mobile-first para e-commerce y marketplaces. Expertise en accesibilidad, design systems y colaboración con equipos de producto. Apasionada por crear experiencias inclusivas que generen impacto medible en conversión y retención.',
    
    experience: [
      {
        id: 'exp-camila-001',
        company: 'Mercado Libre Colombia',
        position: 'Product Designer',
        duration: 'Ago 2022 - Presente',
        description: 'Diseño de experiencias para el marketplace líder de Latinoamérica. Responsable del rediseño del flujo de checkout mobile y optimización de la experiencia de búsqueda y navegación.',
        location: 'Bogotá, Colombia (Remoto)',
        startDate: '2022-08',
        endDate: null,
        current: true,
        achievements: [
          'Lideré el rediseño del checkout mobile que aumentó la conversión en 18% y redujo el abandono de carrito en 22%',
          'Implementé mejoras de accesibilidad (WCAG 2.1 AA) que ampliaron la base de usuarios en segmentos vulnerables (+15%)',
          'Creé y documenté 45+ componentes del design system que redujeron tiempo de diseño en 40%',
          'Facilitó 12 sesiones de design critique con PM, developers y stakeholders, mejorando la colaboración cross-funcional',
          'Diseñé features de navegación personalizadas basadas en ML que incrementaron engagement en 28%'
        ]
      },
      {
        id: 'exp-camila-002',
        company: 'Koombea',
        position: 'UX/UI Designer',
        duration: 'Feb 2020 - Jul 2022',
        description: 'Diseño de productos digitales para clientes de USA y Latinoamérica. Especialización en aplicaciones móviles nativas para iOS y Android con enfoque en usabilidad y engagement.',
        location: 'Barranquilla, Colombia (Remoto)',
        startDate: '2020-02',
        endDate: '2022-07',
        current: false,
        achievements: [
          'Diseñé 8 apps móviles completas (iOS/Android) para clientes en healthtech, fintech y fitness',
          'Implementé estrategia de gamification en fitness app que logró 65% de retención a 30 días',
          'Conduje 25+ sesiones de user research y testing que validaron hipótesis de producto',
          'Colaboré con developers en implementación pixel-perfect usando Figma Auto Layout y Variants',
          'Mentoré a 2 diseñadores junior en mejores prácticas de UX research y visual design'
        ]
      },
      {
        id: 'exp-camila-003',
        company: 'Agencia Creativa Digital',
        position: 'Diseñadora Gráfica Jr.',
        duration: 'Ene 2019 - Ene 2020',
        description: 'Diseño de piezas gráficas y experiencias digitales para pequeñas y medianas empresas. Primera experiencia profesional enfocada en branding y diseño web.',
        location: 'Bogotá, Colombia',
        startDate: '2019-01',
        endDate: '2020-01',
        current: false,
        achievements: [
          'Diseñé identidades visuales completas para 15 clientes (logo, branding, web)',
          'Creé 20+ landing pages optimizadas para conversión con tasas superiores al 8%',
          'Aprendí fundamentos de UX research mediante proyectos reales con usuarios finales'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Jorge Tadeo Lozano',
        degree: 'Diseño Gráfico',
        year: '2015 - 2019',
        description: 'Énfasis en diseño digital e interactivo. Proyecto de grado: "Diseño de experiencias accesibles para adultos mayores en apps de e-commerce".'
      },
      {
        institution: 'Platzi',
        degree: 'Especialización en UX/UI Design',
        year: '2020',
        description: 'Rutas de UX Research, Prototipado Avanzado, Design Systems y Accesibilidad Web.'
      },
      {
        institution: 'Interaction Design Foundation',
        degree: 'Certificación en Mobile UX Design',
        year: '2021',
        description: 'Certificación internacional enfocada en mejores prácticas de diseño para experiencias móviles.'
      }
    ],
    skills: {
      technical: [
        'Figma Advanced',
        'Adobe XD',
        'Prototyping',
        'Mobile-First Design',
        'Accessibility (WCAG 2.1)',
        'Design Systems',
        'Design Tokens',
        'Auto Layout',
        'Component Variants',
        'Micro-interactions',
        'Animation',
        'User Research',
        'Usability Testing',
        'A/B Testing',
        'Maze',
        'Lookback',
        'FigJam',
        'Miro',
        'HTML/CSS Básico',
        'Notion'
      ],
      soft: [
        'Colaboración cross-funcional',
        'Empatía con usuarios',
        'Problem solving',
        'Pensamiento crítico',
        'Comunicación visual',
        'Storytelling',
        'Resiliencia',
        'Curiosidad',
        'Atención al detalle',
        'Gestión del tiempo'
      ]
    },
    portfolio: {
      url: 'https://camilamartinez.design',
      projects: [
        {
          name: 'MercadoLibre Checkout Redesign',
          description: 'Rediseño completo del flujo de checkout mobile aplicando principios de simplificación, reducción de fricción y optimización de conversión.',
          impact: 'Conversión aumentó 18%, abandono de carrito redujo 22%, tiempo de compra redujo 35%'
        },
        {
          name: 'Accessibility Improvements - MercadoLibre',
          description: 'Implementación de mejoras de accesibilidad WCAG 2.1 AA en navegación, búsqueda y checkout. Incluye contraste, navegación por teclado, screen readers y tamaños táctiles.',
          impact: '+15% usuarios en segmentos vulnerables, 4.8★ rating de accesibilidad en tiendas'
        },
        {
          name: 'Fitness App con Gamification - Koombea',
          description: 'App de entrenamiento personalizado para cliente USA. Diseño de sistema de logros, badges, challenges y leaderboards que incentivan engagement.',
          impact: '65% retención a 30 días, 3.2 sesiones/semana promedio, 4.6★ en App Store'
        },
        {
          name: 'Design System - MercadoLibre',
          description: 'Contribución al design system corporativo. Creación y documentación de 45+ componentes mobile reutilizables con variantes, estados y especificaciones técnicas.',
          impact: 'Tiempo de diseño reducido 40%, consistencia visual 95%, adopción por 8 equipos'
        }
      ]
    },
    documents: [
      { id: 'doc-007-1', name: 'Camila_Martinez_UX_CV.pdf', type: 'PDF', size: '1.4 MB', uploadedDate: '2026-02-18', uploadedBy: 'Camila Andrea Martínez' },
      { id: 'doc-007-2', name: 'MercadoLibre_Project_Case.pdf', type: 'PDF', size: '10.8 MB', uploadedDate: '2026-02-18', uploadedBy: 'Camila Andrea Martínez' },
      { id: 'doc-007-3', name: 'IDF_Certification.pdf', type: 'PDF', size: '1.2 MB', uploadedDate: '2026-02-18', uploadedBy: 'Camila Andrea Martínez' }
    ],
    notes: [
      'Excelente portafolio con casos de estudio bien documentados y métricas de impacto claras',
      'Expertise sólida en mobile-first design y accesibilidad, habilidades muy demandadas',
      'Experiencia relevante en e-commerce con Mercado Libre, perfecta para nuestro contexto',
      'Resultados medibles: +18% conversión, +65% retención, mejoras cuantificables en UX',
      'Fuerte colaboración cross-funcional con PM y developers, fit cultural prometedor',
      'Design systems: creó 45+ componentes, redujo tiempo de diseño 40%',
      'User research: 25+ sesiones de testing, validación de hipótesis',
      'Mentoría: capacitó a 2 diseñadores junior, habilidades de liderazgo emergentes',
      'Pasión por accesibilidad e inclusión, valores alineados con nuestra visión',
      'Perfil mid-level con potencial senior, crecimiento acelerado en MercadoLibre'
    ]
  },
  {
    id: 'cand-008',
    name: 'Natalia Rincón Castro',
    email: 'natalia.rincon@email.com',
    phone: '+57 317 567 8901',
    age: 27,
    location: 'Armenia, Colombia',
    avatar: 'NR',
    yearsExperience: 3,
    expectedSalary: '$6.000.000 - $7.500.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-008-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Content Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'test-psicometrico',
        status: 'rejected',
        appliedDate: '2026-02-19',
        matchScore: 62,
        confidence: 'medium',
        scores: {
          cvScore: 62,
          psychometricScore: 45,
          serenaScore: 58,
          technicalScore: 52
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Natalia, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Test psicométrico reveló bajo score en pensamiento analítico y resolución de problemas complejos.'
      },
      {
        id: 'app-008-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Visual Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'rejected',
        appliedDate: '2025-08-11',
        matchScore: 55,
        confidence: 'low',
        scores: {
          cvScore: 60
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Natalia, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Falta experiencia en roles de producto digital.'
      }
    ],

    firstName: 'Natalia',
    lastName: 'Rincón Castro',
    identificationNumber: '1094567812',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/nataliarincon',
    birthDate: '1997-03-12',
    city: 'Armenia',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Eje Cafetero'],
    description: 'Diseñadora de contenidos con enfoque en e-commerce regional. Experiencia en la creación de piezas visuales para canales digitales y optimización de contenido para catálogos online. Buscando transicionar hacia roles de diseño de producto UX/UI.',
    
    experience: [
      {
        id: 'exp-008-001',
        company: 'E-commerce Local',
        position: 'Diseñadora de Contenidos',
        duration: 'Ago 2021 - Presente',
        description: 'Creación de contenidos visuales para redes sociales y e-commerce.',
        location: 'Armenia, Colombia',
        startDate: '2021-08',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé el contenido visual para 5 campañas de temporada con incremento del 15% en engagement',
          'Gestioné el catálogo digital de +200 productos asegurando consistencia visual',
          'Colaboré en la definición de la línea gráfica para el relanzamiento de la marca en Instagram',
          'Optimizé el flujo de creación de assets reduciendo el tiempo de entrega en un 20%'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad del Quindío',
        degree: 'Comunicación y Diseño',
        year: '2020',
        description: 'Formación en comunicación visual, semiótica y diseño publicitario. Énfasis en medios digitales.'
      }
    ],
    skills: {
      technical: ['Canva', 'Photoshop', 'Illustrator', 'Redes Sociales', 'Content Marketing', 'Copywriting', 'Figma (Básico)'],
      soft: ['Creatividad', 'Organización', 'Trabajo en equipo', 'Comunicación asertiva']
    },
    portfolio: {
      url: 'https://instagram.com/nataliadesigns',
      projects: [
        {
          name: 'Social Media Campaign 2023',
          description: 'Campaña visual para crecimiento de audiencia orgánica',
          impact: 'Aumento de 2K seguidores en 3 meses'
        }
      ]
    },
    documents: [
      { id: 'doc-008-1', name: 'Natalia_Rincon_CV.pdf', type: 'PDF', size: '0.8 MB', uploadedDate: '2026-02-19', uploadedBy: 'Natalia Rincón Castro' }
    ],
    notes: [
      'Perfil junior con enfoque en contenido visual',
      'Buen manejo de herramientas de diseño gráfico tradicional',
      'Necesita formación en UX/UI y metodologías de producto',
      'Actitud positiva hacia el aprendizaje'
    ]
  },
  // ====== ETAPA 4: PARA REVISIÓN (1 ACTIVO, 2 RECHAZADOS) ======
  {
    id: 'cand-009',
    name: 'Diego Alejandro Torres',
    email: 'diego.torres@email.com',
    phone: '+57 315 456 7890',
    age: 30,
    location: 'Cali, Colombia',
    avatar: 'DT',
    yearsExperience: 6,
    expectedSalary: '$8.500.000 - $10.500.000 COP',
    availability: '1 mes',

    applications: [
      {
        id: 'app-009-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer',
        jobLocation: 'Cali, Colombia',
        currentStage: 'para-revision',
        status: 'active',
        appliedDate: '2026-02-19',
        matchScore: 86,
        confidence: 'high',
        scores: {
          cvScore: 86,
          psychometricScore: 83,
          serenaScore: 85
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Diego Alejandro, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-009-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'UX Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'hired',
        status: 'hired',
        appliedDate: '2024-03-01',
        matchScore: 89,
        confidence: 'high',
        scores: {
          cvScore: 90,
          technicalScore: 85
        },
        
        backgroundCheck: {
          status: 'clean',
          completedDate: '2026-03-05',
          recommendation: 'Puede continuar en el proceso. Todos los antecedentes verificados correctamente.',
          details: [
            { category: 'Identidad', result: 'Verificada en múltiples bases oficiales, sin inconsistencias.', status: 'pass', records: 7, description: 'Verificada en múltiples bases oficiales, sin inconsistencias. Registros encontrados: 7.' },
            { category: 'Historial penal y criminal', result: 'No se encontraron antecedentes penales.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Legal', result: 'Sin registros negativos.', status: 'pass', records: 1, description: 'Sin registros negativos. Registros encontrados: 1.' },
            { category: 'Afiliaciones', result: 'Activo en el sistema de salud, consistente con registros.', status: 'pass', records: 1, description: 'Activo en el sistema de salud, consistente con registros. Registros encontrados: 1.' },
            { category: 'Impuestos y Finanzas', result: 'Sin reportes fiscales negativos.', status: 'pass', records: 1, description: 'Sin reportes fiscales negativos. Registros encontrados: 1.' },
            { category: 'Internacional y medios', result: 'Sin registros encontrados.', status: 'pass', records: 0, description: 'Sin registros encontrados.' }
          ]
        },
        
        psychometricEvaluation: {
          iq: 115,
          learningQuotient: 122,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Superior al promedio. Capacidad excepcional para articular conceptos complejos y comunicarse eficazmente.', status: 'pass' },
            { label: 'Concentración y Atención', description: 'Alta capacidad de enfoque bajo presión y en tareas repetitivas de precisión.', status: 'pass' },
            { label: 'Planeación y Organización', description: 'Sobresaliente. Capacidad para gestionar múltiples flujos de trabajo de forma estructurada.', status: 'pass' },
            { label: 'Análisis y Abstracción', description: 'Muy alto. Facilidad para identificar patrones y sintetizar información compleja.', status: 'pass' }
          ],
          brainDominance: 'Límbico Izquierdo y Cortical Izquierdo. Enfoque analítico, secuencial y orientado a procesos de diseño rigurosos.',
          observation: 'Demuestra una estructura cognitiva sólida, ideal para roles donde la precisión y el pensamiento sistémico son críticos.',
          recommendation: 'Candidato altamente recomendado. Sus habilidades cognitivas superan el percentil 90.',
          reports: [
            { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
            { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' }
          ]
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Diego Alejandro, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],
    
    firstName: 'Diego Alejandro',
    lastName: 'Torres Ruiz',
    identificationNumber: '1019876543',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/diegotorres',
    birthDate: '1994-08-25',
    city: 'Cali',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote', 'Medellín'],
    description: 'Product Designer con 6 años de experiencia en el sector Fintech. Actualmente en Nubank, liderando el diseño de experiencias de ahorro e inversión para el mercado colombiano. Experto en transformar flujos financieros complejos en interfaces intuitivas y accesibles. Mi proceso combina investigación profunda con iteración rápida basada en datos.',
    
    experience: [
      {
        id: 'exp-009-001',
        company: 'Nubank Colombia',
        position: 'Product Designer',
        duration: 'Mar 2021 - Presente',
        description: 'Diseño de experiencias fintech centradas en el usuario. Trabajo en features de ahorro, inversión y crédito. Research cualitativo y cuantitativo.',
        location: 'Bogotá, Colombia',
        startDate: '2021-03',
        endDate: null,
        current: true,
        achievements: [
          'Lideré el diseño de la feature "Cajitas de Ahorro" para Colombia logrando 200K adopciones en 3 meses',
          'Implementé metodología de research continuo que redujo el tiempo de validación de hipótesis en un 30%',
          'Rediseñé el flujo de solicitud de crédito aumentando la aprobación directa en un 12%',
          'Colaboré en la adaptación del Design System global de Nubank para las necesidades específicas de Latam'
        ]
      },
      {
        id: 'exp-009-002',
        company: 'PSL - Pragma',
        position: 'UX Designer',
        duration: 'Ene 2019 - Feb 2021',
        description: 'Diseño de soluciones empresariales para sector bancario y retail. Facilitación de workshops y metodologías ágiles.',
        location: 'Medellín, Colombia',
        startDate: '2019-01',
        endDate: '2021-02',
        current: false,
        achievements: [
          'Diseñé el dashboard administrativo corporativo para un banco líder, reduciendo el tiempo de tareas operativas en un 50%',
          'Facilité +15 Design Sprints con clientes corporativos para definir roadmaps de producto',
          'Implementé el primer programa de accesibilidad web para una plataforma de retail con +1M de usuarios'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad del Valle',
        degree: 'Diseño Visual',
        year: '2018',
        description: 'Enfoque en sistemas de información y diseño de interacción. Tesis sobre interfaces para servicios públicos digitales.'
      }
    ],
    skills: {
      technical: ['Figma', 'User Testing', 'Journey Mapping', 'Wireframing', 'Design Systems', 'Maze', 'Service Design', 'SQL (Básico)', 'Data Visualization', 'Axure'],
      soft: ['Facilitación', 'Pensamiento estratégico', 'Colaboración cross-funcional', 'Orientación al usuario', 'Liderazgo técnico']
    },
    portfolio: {
      url: 'https://diegotorres.design',
      projects: [
        {
          name: 'Nubank Savings Feature',
          description: 'Feature de ahorro automático con insights personalizados',
          impact: 'Adoptado por 200K+ usuarios en 3 meses, NPS de 82'
        },
        {
          name: 'Banking Dashboard - PSL',
          description: 'Dashboard administrativo para gestión bancaria de alta complejidad',
          impact: 'Reducción del 50% en tiempo de tareas operativas, ROI de 30% en eficiencia'
        }
      ]
    },
    documents: [
      { id: 'doc-009-1', name: 'Diego_Torres_Designer.pdf', type: 'PDF', size: '1.7 MB', uploadedDate: '2026-02-19', uploadedBy: 'Diego Alejandro Torres' },
      { id: 'doc-009-2', name: 'Nubank_Experience_Letter.pdf', type: 'PDF', size: '1.1 MB', uploadedDate: '2026-02-19', uploadedBy: 'Diego Alejandro Torres' }
    ],
    notes: [
      'Experiencia en fintech muy relevante',
      'Buen balance entre research y ejecución'
    ]
  },
  {
    id: 'cand-010',
    name: 'Camila Suárez Ortiz',
    email: 'camila.suarez@email.com',
    phone: '+57 301 234 5678',
    age: 22,
    location: 'Manizales, Colombia',
    avatar: 'CS',
    yearsExperience: 1,
    expectedSalary: '$3.500.000 - $4.500.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-010-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Junior UX/UI',
        jobLocation: 'Manizales, Colombia',
        currentStage: 'para-revision',
        status: 'rejected',
        appliedDate: '2026-02-20',
        matchScore: 48,
        confidence: 'low',
        scores: {
          cvScore: 48,
          psychometricScore: 52,
          serenaScore: 45
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Camila, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Perfil muy junior. Aún está estudiando y no tiene experiencia profesional relevante en producto digital.'
      }
    ],

    firstName: 'Camila',
    lastName: 'Suárez Ortiz',
    identificationNumber: '1053123456',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://behance.net/camilasuarez',
    birthDate: '2002-09-18',
    city: 'Manizales',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    description: 'Diseñadora Visual en formación con gran entusiasmo por el diseño de interfaces y la experiencia de usuario. Experiencia inicial en diseño gráfico y gestión de redes sociales. Buscando mi primera oportunidad formal en diseño de producto para aplicar mis conocimientos académicos y habilidades creativas.',
    
    experience: [
      {
        id: 'exp-010-001',
        company: 'Pasantía Universitaria',
        position: 'Diseñadora Junior',
        duration: 'Jun 2023 - Dic 2023',
        description: 'Apoyo en diseño de material gráfico y redes sociales.',
        location: 'Manizales, Colombia',
        startDate: '2023-06',
        endDate: '2023-12',
        current: false,
        achievements: [
          'Diseñé piezas gráficas para 20+ campañas de comunicación interna de la universidad',
          'Gestioné las redes sociales de la facultad logrando un incremento del 10% en seguidores',
          'Colaboré en la diagramación de boletines digitales mensuales',
          'Aprendí a usar Figma para maquetación básica de interfaces web'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de Caldas',
        degree: 'Diseño Visual (En curso)',
        year: '2024',
        description: 'Enfoque en comunicación visual, multimedia e interactividad. Actualmente cursando el último semestre.'
      }
    ],
    skills: {
      technical: ['Figma (básico)', 'Illustrator', 'Photoshop', 'Canva', 'Layout design', 'Color theory'],
      soft: ['Ganas de aprender', 'Entusiasmo', 'Trabajo en equipo', 'Creatividad']
    },
    portfolio: {
      url: 'https://behance.net/camilasuarez',
      projects: [
        {
          name: 'University Newsletter',
          description: 'Rediseño del boletín informativo de la Facultad de Artes',
          impact: 'Mejora en la legibilidad y tasa de apertura del 15%'
        }
      ]
    },
    documents: [
      { id: 'doc-010-1', name: 'Camila_Suarez_Resume_Jr.pdf', type: 'PDF', size: '0.9 MB', uploadedDate: '2026-02-20', uploadedBy: 'Camila Suárez Ortiz' }
    ],
    notes: [
      'Perfil muy junior con potencial académico',
      'Aún está terminando sus estudios universitarios',
      'Falta experiencia profesional real en entornos de producto digital',
      'Muestra buena disposición para el aprendizaje y el crecimiento'
    ]
  },
  {
    id: 'cand-011',
    name: 'Felipe Vargas Ruiz',
    email: 'felipe.vargas@email.com',
    phone: '+57 311 012 3456',
    age: 35,
    location: 'Bucaramanga, Colombia',
    avatar: 'FV',
    yearsExperience: 10,
    expectedSalary: '$12.000.000 - $15.000.000 COP',
    availability: '2 meses',
    
    applications: [
      {
        id: 'app-011-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Senior UX Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'para-revision',
        status: 'rejected',
        appliedDate: '2026-02-21',
        matchScore: 38,
        confidence: 'low',
        scores: {
          cvScore: 38,
          psychometricScore: 42,
          serenaScore: 35
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Felipe, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Perfil enfocado en desarrollo web básico. No tiene experiencia en diseño de producto ni metodologías UX. Expectativa salarial fuera de rango.'
      }
    ],

    firstName: 'Felipe',
    lastName: 'Vargas Ruiz',
    identificationNumber: '1076543210',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/felipevargas',
    birthDate: '1989-05-18',
    city: 'Bucaramanga',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote'],
    description: 'Diseñador web con una década de experiencia en el desarrollo de sitios corporativos y plataformas personalizadas. Experto en WordPress y maquetación frontend. Enfocado en la autogestión y entrega de proyectos llave en mano para clientes nacionales e internacionales.',
    
    experience: [
      {
        id: 'exp-011-001',
        company: 'Freelance',
        position: 'Diseñador Web',
        duration: '2016 - Presente',
        description: 'Desarrollo de sitios web y landing pages para diversos clientes.',
        location: 'Remote',
        startDate: '2016-01',
        endDate: null,
        current: true,
        achievements: [
          'He entregado más de 100 proyectos web funcionales para diferentes industrias',
          'Implementé flujos de trabajo basados en WordPress que facilitan la administración de contenidos por el cliente',
          'Desarrollé landing pages de alta conversión para campañas de marketing digital',
          'Mantengo una base de 20 clientes recurrentes bajo esquemas de soporte mensual'
        ]
      }
    ],
    education: [
      {
        institution: 'SENA',
        degree: 'Técnico en Diseño Web',
        year: '2015',
        description: 'Formación técnica en maquetación HTML/CSS, diseño gráfico básico y gestión de CMS.'
      }
    ],
    skills: {
      technical: ['HTML', 'CSS', 'WordPress', 'Photoshop', 'PHP (Básico)', 'CPanel', 'SEO On-page', 'Responsive Design'],
      soft: ['Independencia', 'Autogestión', 'Comunicación con clientes', 'Resolución de problemas']
    },
    portfolio: {
      url: 'https://felipevargas.com',
      projects: [
        {
          name: 'Corporate Site Rebuild',
          description: 'Migración y rediseño de sitio corporativo a WordPress escalable',
          impact: 'Reducción del 40% en costos de mantenimiento'
        }
      ]
    },
    documents: [
      { id: 'doc-011-1', name: 'Felipe_Vargas_Web_Resume.pdf', type: 'PDF', size: '1.2 MB', uploadedDate: '2026-02-21', uploadedBy: 'Felipe Vargas Ruiz' },
      { id: 'doc-011-2', name: 'SENA_Technician_Degree.pdf', type: 'PDF', size: '0.7 MB', uploadedDate: '2026-02-21', uploadedBy: 'Felipe Vargas Ruiz' }
    ],
    notes: [
      'Perfil altamente operativo y técnico en web tradicional',
      'Mucha experiencia freelance pero falta de trabajo en equipos de producto complejos',
      'No familiarizado con Figma ni metodologías de UX modernas',
      'Expectativa salarial alta para el seniority en producto digital'
    ]
  },
  {
    id: 'cand-012',
    name: 'Patricia Daniela Ramírez',
    email: 'patricia.ramirez@email.com',
    phone: '+57 320 987 6543',
    age: 27,
    location: 'Bogotá, Colombia',
    avatar: 'PR',
    yearsExperience: 4,
    expectedSalary: '$7.500.000 - $9.000.000 COP',
    availability: '2 semanas',
    
    applications: [
      {
        id: 'app-012-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-serena',
        status: 'active',
        appliedDate: '2026-02-22',
        matchScore: 82,
        confidence: 'high',
        scores: {
          cvScore: 82,
          psychometricScore: 80,
          serenaScore: 81
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Patricia Daniela, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-012-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Lead UX/UI Designer',
        jobLocation: 'Remote',
        currentStage: 'entrevista-tecnica',
        status: 'active',
        appliedDate: '2026-03-10',
        matchScore: 88,
        confidence: 'high',
        scores: {
          cvScore: 85,
          technicalScore: 82
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Patricia Daniela, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],

    firstName: 'Patricia Daniela',
    lastName: 'Ramírez Silva',
    identificationNumber: '1015678901',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/patriciaramirez',
    birthDate: '1997-06-21',
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: false,
    interestedLocations: ['Bogotá', 'Remote'],
    description: 'Product Designer con 4 años de experiencia especializada en productos SaaS y B2B. Actualmente en Alegra, liderando la simplificación de flujos contables y administrativos para pymes. Enfocada en la investigación de usuario continua y el diseño de interfaces que resuelven problemas de alta complejidad técnica manteniendo la facilidad de uso.',
    
    experience: [
      {
        id: 'exp-012-001',
        company: 'Alegra',
        position: 'Product Designer',
        duration: 'May 2022 - Presente',
        description: 'Diseño de productos SaaS para pymes. Enfoque en simplificación de procesos contables y facturación. User research continuo.',
        location: 'Bogotá, Colombia (Remote)',
        startDate: '2022-05',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el flujo de facturación electrónica reduciendo el tiempo de tarea en un 60%',
          'Implementé un sistema de onboarding dinámico que aumentó la activación de usuarios nuevos en un 25%',
          'Lideré el proceso de investigación cualitativa con +50 contadores para definir la arquitectura de información del módulo de reportes',
          'Contribuí al escalamiento del sistema de diseño interno para aplicaciones web y mobile'
        ]
      },
      {
        id: 'exp-012-002',
        company: 'Lemontech',
        position: 'UX/UI Designer',
        duration: 'Sep 2020 - Abr 2022',
        description: 'Diseño de herramientas legales digitales. Trabajo con usuarios B2B. Prototipado y testing de soluciones.',
        location: 'Bogotá, Colombia',
        startDate: '2020-09',
        endDate: '2022-04',
        current: false,
        achievements: [
          'Diseñé la interfaz para el sistema de gestión de casos legales logrando una satisfacción del usuario del 4.5/5',
          'Ejecuté pruebas de usabilidad con abogados en 3 países para validar iteraciones de producto',
          'Colaboré en la maquetación frontend de componentes UI usando React y Tailwind CSS'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Nacional de Colombia',
        degree: 'Diseño Industrial',
        year: '2020',
        description: 'Formación en diseño de productos y sistemas complejos. Énfasis en metodologías de investigación y ergonomía cognitiva.'
      }
    ],
    skills: {
      technical: ['Figma', 'FigJam', 'Prototyping', 'User Interviews', 'Usability Testing', 'Information Architecture', 'SaaS Design', 'B2B UX', 'Agile Methodologies'],
      soft: ['Empatía', 'Comunicación clara', 'Trabajo remoto', 'Autonomía', 'Aprendizaje continuo', 'Pensamiento analítico']
    },
    portfolio: {
      url: 'https://patriciaramirez.com',
      projects: [
        {
          name: 'Alegra Invoicing Flow',
          description: 'Simplificación completa del proceso de facturación para pequeñas empresas',
          impact: 'Tiempo de facturación reducido en 60%, Tasa de error -15%'
        },
        {
          name: 'Legal Management Tool',
          description: 'Herramienta de gestión de expedientes digitales para firmas de abogados',
          impact: 'Satisfacción de usuarios del 4.5/5, Adopción del 80%'
        }
      ]
    },
    documents: [
      { id: 'doc-012-1', name: 'Patricia_Ramirez_SaaS_UX.pdf', type: 'PDF', size: '2.3 MB', uploadedDate: '2026-02-22', uploadedBy: 'Patricia Daniela Ramírez' },
      { id: 'doc-012-2', name: 'Alegra_Design_Systems.pdf', type: 'PDF', size: '15.2 MB', uploadedDate: '2026-02-22', uploadedBy: 'Patricia Daniela Ramírez' }
    ],
    notes: [
      'Experiencia sólida en productos B2B/SaaS de alta complejidad',
      'Buen enfoque en simplificación de procesos administrativos complejos',
      'Portfolio con casos de uso reales y métricas de impacto claras',
      'Capacidad comprobada para realizar investigación de usuario profunda'
    ]
  },
  {
    id: 'cand-013',
    name: 'Juliana Ortiz Mendoza',
    email: 'juliana.ortiz@email.com',
    phone: '+57 318 654 3210',
    age: 28,
    location: 'Cali, Colombia',
    avatar: 'JO',
    yearsExperience: 5,
    expectedSalary: '$8.000.000 - $9.500.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-013-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-serena',
        status: 'active',
        appliedDate: '2026-02-22',
        matchScore: 83,
        confidence: 'high',
        scores: {
          cvScore: 83,
          psychometricScore: 79,
          serenaScore: 80
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Juliana, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      },
      {
        id: 'app-013-2',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Senior UI Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'entrevista-pm',
        status: 'rejected',
        appliedDate: '2025-05-18',
        matchScore: 80,
        confidence: 'high',
        scores: {
          cvScore: 82,
          technicalScore: 79,
          productManagerScore: 70
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Juliana, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Perfil demasiado enfocado en investigación cualitativa en lugar de visual UI.'
      }
    ],

    firstName: 'Juliana',
    lastName: 'Ortiz Mendoza',
    identificationNumber: '1116789012',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/julianaortiz',
    birthDate: '1996-02-14',
    city: 'Cali',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote', 'Medellín'],
    description: 'Product Designer apasionada por los Marketplaces y el diseño basado en datos. En OLX Autos, he optimizado los flujos de búsqueda y publicación, impactando directamente en la conversión de leads. Manejo un balance entre estética visual y funcionalidad técnica.',
    
    experience: [
      {
        id: 'exp-013-001',
        company: 'TuCarro (OLX Autos)',
        position: 'Product Designer',
        duration: 'Feb 2021 - Presente',
        description: 'Diseño de features para marketplace de autos. Optimización de búsqueda y flujos de compra/venta.',
        location: 'Bogotá, Colombia',
        startDate: '2021-02',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el sistema de filtros logrando un incremento del 22% en la conversión de Leads a contactos',
          'Implementé un nuevo flujo de publicación de anuncios reduciendo el tiempo de carga en un 35%',
          'Lideré el equipo de UX para el lanzamiento de la nueva plataforma mobile de OLX Autos',
          'Establecí procesos de QA visual que aseguraron una consistencia del 95% en producción'
        ]
      },
      {
        id: 'exp-013-002',
        company: 'LatAm Startups',
        position: 'UX Designer',
        duration: 'May 2019 - Ene 2021',
        description: 'Diseño para múltiples productos digitales. Enfoque en mobile y conversión.',
        location: 'Cali, Colombia',
        startDate: '2019-05',
        endDate: '2021-01',
        current: false,
        achievements: [
          'Diseñé la primera versión MVP para 3 startups del portafolio',
          'Reduje la tasa de abandono en el checkout de una app de delivery en un 18%',
          'Ejecuté más de 50 pruebas de usabilidad remotas para validar iteraciones de producto'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Icesi',
        degree: 'Diseño de Medios Interactivos',
        year: '2018',
        description: 'Enfoque en interacción humano-computador y diseño de experiencias digitales complejas. Proyecto de tesis premiado sobre educación financiera gamificada.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Hotjar', 'Google Analytics', 'Data Visualization', 'Storytelling', 'UI Animation'],
      soft: ['Data-driven', 'Colaboración', 'Orientación a resultados', 'Empatía', 'Proactividad']
    },
    portfolio: {
      url: 'https://julianaortiz.design',
      projects: [
        {
          name: 'TuCarro Search Enhancement',
          description: 'Mejora en sistema de búsqueda y filtros para marketplace transaccional',
          impact: 'Conversión de búsqueda a contacto +22%, Tiempo de búsqueda -15%'
        },
        {
          name: 'Startups LatAm Brand Kit',
          description: 'Sistema de diseño visual para aceleradora regional',
          impact: 'Adopción por 5 startups activas'
        }
      ]
    },
    documents: [
      { id: 'doc-013-1', name: 'Juliana_Ortiz_Marketplace_Portfolio.pdf', type: 'PDF', size: '11.4 MB', uploadedDate: '2026-02-22', uploadedBy: 'Juliana Ortiz Mendoza' },
      { id: 'doc-013-2', name: 'Icesi_Diploma.pdf', type: 'PDF', size: '0.8 MB', uploadedDate: '2026-02-22', uploadedBy: 'Juliana Ortiz Mendoza' }
    ],
    notes: [
      'Experiencia en marketplace relevante',
      'Enfoque en métricas y conversión',
      'Buen portafolio con resultados medibles',
      'Excelente capacidad de comunicación y sustento de diseño'
    ]
  },
  {
    id: 'cand-014',
    name: 'Juan Camilo Vásquez',
    email: 'juancamilo.vasquez@email.com',
    phone: '+57 312 678 9012',
    age: 29,
    location: 'Medellín, Colombia',
    avatar: 'JV',
    currentStage: 'serena-ai',
    status: 'rejected',
    appliedDate: '2026-02-22',
    expectedSalary: '$8.000.000 - $9.500.000 COP',
    availability: '3 semanas',
    yearsExperience: 5,
    firstName: 'Juan Camilo',
    lastName: 'Vásquez Duque',
    identificationNumber: '1036543210',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/juancamilovasquez',
    birthDate: '1995-10-05',
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    description: 'Product Designer Senior con experiencia en productos de e-commerce y delivery a gran escala. Experto en optimización de flujos de búsqueda y descubrimiento de productos mediante A/B testing y análisis de comportamiento de usuario. Enfocado en la excelencia visual y la consistencia sistémica.',
    matchScore: 84,
    confidence: 'high',
    experience: [
      {
        id: 'exp-014-001',
        company: 'Cornershop by Uber',
        position: 'Product Designer',
        duration: 'Jul 2021 - Presente',
        description: 'Diseño de experiencias para app de delivery y marketplace. Optimización de flujos de compra y navegación. A/B testing y data-driven design.',
        location: 'Medellín, Colombia',
        startDate: '2021-07',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el motor de búsqueda interno incrementando las búsquedas exitosas en un 35%',
          'Implementé variaciones de A/B testing para el flujo de checkout que resultaron en una mejora del 7% en conversión total',
          'Colaboré en la integración visual de Cornershop bajo los lineamientos de Uber Design',
          'Diseñé el nuevo sistema de suscripciones regionales para Latam'
        ]
      },
      {
        id: 'exp-014-002',
        company: 'S4N',
        position: 'UX Designer',
        duration: 'Mar 2019 - Jun 2021',
        description: 'Consultoría de diseño para diversos clientes. Diseño de apps móviles y plataformas web. Workshops de co-creación.',
        location: 'Medellín, Colombia',
        startDate: '2019-03',
        endDate: '2021-06',
        current: false,
        achievements: [
          'Facilité workshops de co-creación con clientes del sector seguros para definir la arquitectura de información de portales corporativos',
          'Diseñé 4 aplicaciones móviles financieras bajo estándares de seguridad y usabilidad bancaria',
          'Lideré el equipo de UI para la modernización de la plataforma digital de una caja de compensación regional'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Pontificia Bolivariana',
        degree: 'Comunicación Social - Énfasis Digital',
        year: '2018',
        description: 'Estudios enfocados en la convergencia digital, diseño de interfaces y comunicación estratégica en entornos web.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Data Visualization', 'A/B Testing', 'Mobile First', 'Responsive Design', 'Design Systems', 'Micro-interactions'],
      soft: ['Analítico', 'Orientado a resultados', 'Proactividad', 'Trabajo bajo presión', 'Pensamiento crítico']
    },
    portfolio: {
      url: 'https://juancamilovasquez.co',
      projects: [
        {
          name: 'Cornershop Search Optimization',
          description: 'Mejora del search y descubrimiento de productos mediante filtrado predictivo',
          impact: 'Búsquedas exitosas +35%, Transacciones desde búsqueda +18%'
        }
      ]
    },
    scores: {
      cvScore: 84,
      psychometricScore: 81,
      serenaScore: 68
    },
    documents: [
      { id: 'doc-014-1', name: 'Juan_Camilo_Vasquez_CV.pdf', type: 'PDF', size: '1.5 MB', uploadedDate: '2026-02-22', uploadedBy: 'Juan Camilo Vásquez' },
      { id: 'doc-014-2', name: 'Cornershop_Recommendation.pdf', type: 'PDF', size: '0.9 MB', uploadedDate: '2026-02-22', uploadedBy: 'Juan Camilo Vásquez' }
    ],
    notes: [
      'Perfil senior con experiencia en empresas de gran escala',
      'Fuerte enfoque en métricas y optimización continua',
      'Capacidad analítica sobre el promedio',
      'Buen manejo de diseño sistémico y componentes complejos'
    ],
    rejectionReason: 'Score de Serena AI por debajo del umbral. Mostró debilidades en pensamiento sistémico y arquitectura de información.'
  },

  // ====== ETAPA 2: PSICOMÉTRICO (2 ACTIVOS, 2 RECHAZADOS) ======
  {
    id: 'cand-015',
    name: 'Daniela Castro Pinzón',
    email: 'daniela.castro@email.com',
    phone: '+57 324 111 2233',
    age: 25,
    location: 'Bogotá, Colombia',
    avatar: 'DC',
    yearsExperience: 3,
    expectedSalary: '$7.000.000 - $8.500.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-015-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Mid UX Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'psicometrico',
        status: 'active',
        appliedDate: '2026-02-23',
        matchScore: 79,
        confidence: 'high',
        scores: {
          cvScore: 79,
          psychometricScore: 76
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Daniela, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],

    firstName: 'Daniela',
    lastName: 'Castro Pinzón',
    identificationNumber: '1024567819',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/danielacastro',
    birthDate: '1999-12-15',
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Medellín', 'Remote'],
    description: 'Product Designer Mid con fuerte enfoque en Fintech. Actualmente en Nequi, diseñando funcionalidades de ahorro que impactan a millones de usuarios colombianos. Caracterizada por una adopción rápida de metodologías ágiles y un diseño centrado en la facilidad de uso para el usuario masivo.',

    experience: [
      {
        id: 'exp-015-001',
        company: 'Nequi',
        position: 'UX/UI Designer',
        duration: 'Nov 2022 - Presente',
        description: 'Diseño de features para app de banca digital. Trabajo en equipo multifuncional ágil.',
        location: 'Bogotá, Colombia',
        startDate: '2022-11',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé la funcionalidad "Metas de ahorro" logrando una adopción del 30% de la base activa en el primer mes',
          'Participé en el rediseño del flujo de pagos QR mejorando la tasa de éxito en transacciones en un 15%',
          'Contribuí a la definición de la guía de estilos visuales para la nueva interfaz adaptativa de Nequi',
          'Lideré sesiones de ideación colectiva con el equipo de desarrollo para simplificar flujos de registro'
        ]
      },
      {
        id: 'exp-015-002',
        company: 'Rokk3r Labs',
        position: 'Junior Product Designer',
        duration: 'Mar 2021 - Oct 2022',
        description: 'Diseño para startups en etapa temprana. Validación rápida de hipótesis.',
        location: 'Bogotá, Colombia',
        startDate: '2021-03',
        endDate: '2022-10',
        current: false,
        achievements: [
          'Diseñé 5 MVPs para diferentes verticales de negocio, desde Fintech hasta Agrotech',
          'Implementé procesos de diseño Lean que redujeron el tiempo de prototipado de 3 a 1 semana',
          'Validé hipótesis de usuario mediante pruebas de guerrilla y entrevistas cualitativas rápidas'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de los Andes',
        degree: 'Diseño',
        year: '2020',
        description: 'Formación académica integral con énfasis en diseño sistémico y experimental. Proyecto de grado sobre inclusión financiera.'
      }
    ],
    skills: {
      technical: ['Figma', 'Prototyping', 'Design Thinking', 'Lean UX', 'Mobile Design', 'User Research', 'Agile Methodologies', 'User Flows'],
      soft: ['Adaptabilidad', 'Aprendizaje rápido', 'Colaboración', 'Empatía', 'Proactividad']
    },
    portfolio: {
      url: 'https://danielacastro.design',
      projects: [
        {
          name: 'Nequi Metas Feature',
          description: 'Feature de ahorro por metas personalizadas con recordatorios inteligentes',
          impact: 'Adopción del 30% en primer mes, Satisfacción del usuario 4.7/5'
        }
      ]
    },
    documents: [
      { id: 'doc-015-1', name: 'Daniela_Castro_Fintech_UX.pdf', type: 'PDF', size: '1.2 MB', uploadedDate: '2026-02-23', uploadedBy: 'Daniela Castro Pinzón' },
      { id: 'doc-015-2', name: 'Nequi_Ahorro_Case_Study.pdf', type: 'PDF', size: '8.4 MB', uploadedDate: '2026-02-23', uploadedBy: 'Daniela Castro Pinzón' }
    ],
    notes: [
      'Experiencia en fintech digital masiva',
      'Portfolio con proyectos recientes y reales',
      'Buena actitud y potencial de crecimiento acelerado',
      'Conocimiento sólido en metodologías Lean y Ágiles'
    ]
  },
  {
    id: 'cand-016',
    name: 'Andrés Felipe Gutiérrez',
    email: 'andres.gutierrez@email.com',
    phone: '+57 318 444 5566',
    age: 31,
    location: 'Medellín, Colombia',
    avatar: 'AG',
    yearsExperience: 6,
    expectedSalary: '$8.500.000 - $10.000.000 COP',
    availability: '1 mes',
    
    applications: [
      {
        id: 'app-016-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Senior UX Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'psicometrico',
        status: 'active',
        appliedDate: '2026-02-23',
        matchScore: 85,
        confidence: 'high',
        scores: {
          cvScore: 85,
          psychometricScore: 82
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Andrés Felipe, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],

    firstName: 'Andrés Felipe',
    lastName: 'Gutiérrez Paredes',
    identificationNumber: '1017444556',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/andresgutierrez',
    birthDate: '1992-06-15',
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote'],
    description: 'Senior UX Designer con 6 años de experiencia en el sector seguros y financiero. Especializado en liderar procesos de transformación digital para grandes corporaciones, enfocándose en Service Design y optimización de la experiencia del cliente a través de múltiples puntos de contacto digitales.',

    experience: [
      {
        id: 'exp-016-001',
        company: 'SURA',
        position: 'Senior UX Designer',
        duration: 'Ene 2021 - Presente',
        description: 'Diseño de experiencias digitales para seguros y pensiones. Liderazgo de iniciativas de transformación digital.',
        location: 'Medellín, Colombia',
        startDate: '2021-01',
        endDate: null,
        current: true,
        achievements: [
          'Lideré el rediseño del portal de clientes SURA incrementando las transacciones digitales en un 45%',
          'Implementé un nuevo sistema de gestión de reclamaciones online eliminando el 30% del volumen de llamadas a soporte físico',
          'Coordiné equipos multidisciplinarios para el lanzamiento de la nueva App de Seguros en 3 países de Latam',
          'Establecí metodologías de Service Design que mejoraron el NPS de servicios digitales de 65 a 81'
        ]
      },
      {
        id: 'exp-016-002',
        company: 'Indra',
        position: 'UX Designer',
        duration: 'Jun 2018 - Dic 2020',
        description: 'Consultoría de diseño para sector financiero y público.',
        location: 'Bogotá, Colombia',
        startDate: '2018-06',
        endDate: '2020-12',
        current: false,
        achievements: [
          'Diseñé la interfaz de usuario para 2 portales de banca electrónica bajo estándares de alta seguridad',
          'Facilité más de 20 talleres de co-creación con entidades gubernamentales para digitalizar trámites ciudadanos',
          'Desarrollé el sistema de componentes UI para un proyecto de modernización tecnológica estatal'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Pontificia Bolivariana',
        degree: 'Diseño Industrial',
        year: '2017',
        description: 'Enfoque en diseño de productos y servicios. Proyecto de grado sobre ergonomía digital.'
      }
    ],
    skills: {
      technical: ['Figma', 'Axure', 'User Research', 'Service Design', 'Workshop Facilitation', 'Prototyping Advanced', 'Information Architecture', 'Design Strategy'],
      soft: ['Liderazgo', 'Pensamiento estratégico', 'Comunicación ejecutiva', 'Gestión de proyectos', 'Facilitación']
    },
    portfolio: {
      url: 'https://andresgutierrez.co',
      projects: [
        {
          name: 'SURA Digital Transformation',
          description: 'Rediseño de portal de clientes y app móvil integral para seguros y salud',
          impact: 'Transacciones digitales +45%, Reducción de costos operativos -15%'
        }
      ]
    },
    documents: [
      { id: 'doc-016-1', name: 'Andres_Gutierrez_Service_Design.pdf', type: 'PDF', size: '1.8 MB', uploadedDate: '2026-02-23', uploadedBy: 'Andrés Felipe Gutiérrez' },
      { id: 'doc-016-2', name: 'SURA_Transformation_Case.pdf', type: 'PDF', size: '12.1 MB', uploadedDate: '2026-02-23', uploadedBy: 'Andrés Felipe Gutiérrez' }
    ],
    notes: [
      'Experiencia corporativa sólida en sectores de alta complejidad',
      'Conocimiento profundo en seguros y procesos financieros',
      'Liderazgo comprobado en proyectos de transformación digital de gran escala',
      'Excelente capacidad para articular estrategias de diseño ante directivos'
    ]
  },
  {
    id: 'cand-017',
    name: 'Roberto Muñoz León',
    email: 'roberto.munoz@email.com',
    phone: '+57 319 234 5678',
    age: 40,
    location: 'Cartagena, Colombia',
    avatar: 'RM',
    yearsExperience: 15,
    expectedSalary: '$10.000.000 - $12.000.000 COP',
    availability: '3 meses',
    
    applications: [
      {
        id: 'app-017-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Senior UX Designer',
        jobLocation: 'Medellín, Colombia',
        currentStage: 'psicometrico',
        status: 'rejected',
        appliedDate: '2026-02-24',
        matchScore: 42,
        confidence: 'low',
        scores: {
          cvScore: 42,
          psychometricScore: 38
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Roberto, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Experiencia en publicidad tradicional. No tiene experiencia en diseño digital ni producto. Perfil no alineado con la posición.'
      }
    ],

    firstName: 'Roberto',
    lastName: 'Muñoz León',
    identificationNumber: '1019234567',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'No disponible',
    birthDate: '1984-11-20',
    city: 'Cartagena',
    country: 'Colombia',
    willingToRelocate: false,
    interestedLocations: ['Cartagena'],
    description: 'Director de Arte senior con 15 años de trayectoria en el sector de la publicidad tradicional y BTL. Amplia experiencia en el liderazgo de equipos creativos para campañas de gran alcance nacional, con enfoque en artes visuales, diseño editorial y producción de medios impresos.',

    experience: [
      {
        id: 'exp-017-001',
        company: 'Empresa Tradicional',
        position: 'Director de Arte',
        duration: '2010 - Presente',
        description: 'Dirección creativa para campañas publicitarias tradicionales y BTL.',
        location: 'Colombia',
        startDate: '2010-01',
        endDate: null,
        current: true,
        achievements: [
          'Lideré la dirección de arte para campañas nacionales de consumo masivo con presupuestos superiores a $500M',
          'Gestioné el equipo creativo interno de 10 personas asegurando altos estándares de calidad gráfica',
          'Coordiné la producción y ejecución de más de 50 eventos BTL en todo el país',
          'Logré reconocimientos locales por excelencia en diseño de piezas publicitarias impresas'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Jorge Tadeo Lozano',
        degree: 'Publicidad',
        year: '2008',
        description: 'Formación en creatividad publicitaria, redacción y artes gráficas. Énfasis en gestión de cuentas creativas.'
      }
    ],
    skills: {
      technical: ['Photoshop', 'Illustrator', 'Dirección de arte', 'Diseño Editorial', 'Producción Impresa', 'Concept Development'],
      soft: ['Liderazgo creativo', 'Gestión de equipos', 'Comunicación asertiva', 'Negociación con proveedores']
    },
    portfolio: {
      url: 'No disponible',
      projects: []
    },
    documents: [
      { id: 'doc-017-1', name: 'Roberto_Munoz_Arts_Resume.pdf', type: 'PDF', size: '2.5 MB', uploadedDate: '2026-02-24', uploadedBy: 'Roberto Muñoz León' }
    ],
    notes: [
      'Perfil altamente senior en publicidad convencional',
      'Falta de experiencia en entornos digitales y diseño de producto (SaaS/Apps)',
      'No familiarizado con herramientas modernas de UX/UI (Figma, Sketch)',
      'Fuerte capacidad de liderazgo pero en un área no alineada con la vacante'
    ]
  },
  {
    id: 'cand-018',
    name: 'Mariana Gómez Peña',
    email: 'mariana.gomez@email.com',
    phone: '+57 315 777 8899',
    age: 24,
    location: 'Ibagué, Colombia',
    avatar: 'MG',
    yearsExperience: 2,
    expectedSalary: '$5.500.000 - $7.000.000 COP',
    availability: 'Inmediata',
    
    applications: [
      {
        id: 'app-018-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Junior UX Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'psicometrico',
        status: 'rejected',
        appliedDate: '2026-02-24',
        matchScore: 50,
        confidence: 'low',
        scores: {
          cvScore: 50,
          psychometricScore: 44
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Mariana, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        rejectionReason: 'Perfil enfocado en diseño gráfico tradicional. No cuenta con experiencia en producto digital ni conocimientos de UX.'
      }
    ],

    firstName: 'Mariana',
    lastName: 'Gómez Peña',
    identificationNumber: '1015777889',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'No disponible',
    birthDate: '2000-05-24',
    city: 'Ibagué',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    description: 'Diseñadora Junior con 2 años de experiencia en agencias creativas regionales. Enfocada en la creación de contenidos visuales para redes sociales, diseño de identidad corporativa y apoyo en iniciativas de marketing digital para pymes.',

    experience: [
      {
        id: 'exp-018-001',
        company: 'Agencia Creativa Regional',
        position: 'Diseñadora Junior',
        duration: 'Ene 2022 - Presente',
        description: 'Diseño de piezas para redes sociales y material publicitario.',
        location: 'Ibagué, Colombia',
        startDate: '2022-01',
        endDate: null,
        current: true,
        achievements: [
          'Desarrollé la línea gráfica mensual para 10 clientes locales aumentando su presencia digital',
          'Creé identidades corporativas completas para 3 nuevas empresas de la región',
          'Apoyé en la producción de assets de video corto para campañas de Reels y TikTok',
          'Participé en el rediseño de materiales impresos para eventos corporativos regionales'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de Ibagué',
        degree: 'Diseño Gráfico',
        year: '2021',
        description: 'Formación en fundamentos de diseño gráfico, color y composición. Proyecto final sobre branding para emprendimientos sociales.'
      }
    ],
    skills: {
      technical: ['Photoshop', 'Illustrator', 'Canva', 'After Effects', 'InDesign', 'Branding Básico', 'Social Media Design'],
      soft: ['Creatividad', 'Trabajo en equipo', 'Orientación al detalle', 'Aprendizaje rápido']
    },
    portfolio: {
      url: 'https://behance.net/lauragomez',
      projects: [
        {
          name: 'Regional Branding Project',
          description: 'Identidad visual para cooperativa agrícola local',
          impact: 'Unificación de imagen en 5 sucursales'
        }
      ]
    },
    documents: [
      { id: 'doc-018-1', name: 'Mariana_Gomez_Jr_Portfolio.pdf', type: 'PDF', size: '9.2 MB', uploadedDate: '2026-02-24', uploadedBy: 'Mariana Gómez Peña' }
    ],
    notes: [
      'Perfil junior con buen manejo de herramientas gráficas',
      'Experiencia limitada a diseño gráfico tradicional y redes sociales',
      'Sin formación ni experiencia en UX/UI o diseño de producto',
      'Necesita desarrollar pensamiento estratégico de producto'
    ]
  },

  // ====== ETAPA 1: EVALUACIÓN CV (4 ACTIVOS) ======
  {
    id: 'cand-019',
    name: 'Mateo Sánchez Rojas',
    email: 'mateo.sanchez@email.com',
    phone: '+57 323 555 6677',
    age: 26,
    location: 'Sogamoso, Colombia',
    avatar: 'MS',
    yearsExperience: 3,
    expectedSalary: '$5.500.000 - $7.500.000 COP',
    availability: 'Inmediata (Remoto o reubicación)',
    
    applications: [
      {
        id: 'app-019-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Backend Developer Node.js',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'active',
        appliedDate: '2026-03-07',
        matchScore: 78,
        confidence: 'medium',
        scores: {
          cvScore: 78
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Mateo, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        blocker: {
          stageId: 'evaluacion-cv',
          reason: 'Sin respuesta a solicitud de documentos adicionales',
          priority: 'high',
          action: {
            type: 'whatsapp',
            label: 'Reiterar solicitud por WhatsApp',
            message: 'Hola Mateo, te escribimos para recordarte el envío de los documentos adicionales solicitados para avanzar en tu proceso de selección. Quedamos atentos.'
          }
        }
      }
    ],

    firstName: 'Mateo',
    lastName: 'Sánchez Rojas',
    identificationNumber: '1052345678',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/mateosanchez',
    birthDate: '1998-04-12',
    city: 'Sogamoso',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    description: 'Ingeniero de Sistemas con 3 años de experiencia en desarrollo backend. Especializado en la creación de arquitecturas escalables con Node.js y AWS. Certificado como Solutions Architect, con fuerte enfoque en microservicios, bases de datos no relacionales y optimización de rendimiento en sistemas distribuidos.',

    experience: [
      {
        id: 'exp-019-001',
        company: 'TechSolutions Latam',
        position: 'Backend Developer',
        duration: 'Ene 2024 - Presente',
        description: 'Desarrollo de APIs RESTful con Node.js y Express. Implementación de microservicios en AWS. Trabajo con bases de datos MongoDB y PostgreSQL.',
        location: 'Remote',
        startDate: '2024-01',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé e implementé una arquitectura de microservicios que procesa +100K transacciones diarias sin interrupciones',
          'Optimicé las consultas de base de datos en PostgreSQL reduciendo los tiempos de respuesta del API en un 40%',
          'Lideré la migración de servicios on-premise a AWS Lambda, reduciendo costos de infraestructura en un 25%',
          'Implementé pipelines de CI/CD automáticos que aseguraron una cobertura de tests del 90%'
        ]
      },
      {
        id: 'exp-019-002',
        company: 'StartupCo',
        position: 'Junior Backend Developer',
        duration: 'Mar 2022 - Dic 2023',
        description: 'Desarrollo backend con Python y Flask. Integración de servicios de terceros. Manejo de autenticación y autorización.',
        location: 'Bogotá, Colombia',
        startDate: '2022-03',
        endDate: '2023-12',
        current: false,
        achievements: [
          'Desarrollé el módulo de pagos integrando APIs de terceros (Stripe, PSE) para un e-commerce regional',
          'Implementé sistema de autenticación basado en JWT y OAuth2 aumentando la seguridad de la plataforma',
          'Colaboré en la documentación técnica de las APIs usando Swagger para facilitar el consumo por el equipo frontend'
        ]
      },
      {
        id: 'exp-019-003',
        company: 'DevAgency',
        position: 'Trainee Developer',
        duration: 'Jun 2021 - Feb 2022',
        description: 'Primer rol profesional en desarrollo backend. Aprendizaje de Node.js, bases de datos y APIs.',
        location: 'Medellín, Colombia',
        startDate: '2021-06',
        endDate: '2022-02',
        current: false,
        achievements: [
          'Aprendí y apliqué patrones de diseño backend fundamentales en proyectos de mantenimiento',
          'Corregí +50 bugs críticos en servicios legados mejorando la estabilidad del sistema',
          'Participé activamente en revisiones de código aprendiendo mejores prácticas de legibilidad y seguridad'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Santo Tomás',
        degree: 'Ingeniería de Sistemas',
        year: '2021',
        description: 'Formación profesional con énfasis en ingeniería de software, algoritmos y redes. Proyecto de grado sobre computación en la nube.'
      },
      {
        institution: 'AWS Training',
        degree: 'AWS Certified Solutions Architect - Associate',
        year: '2023',
        description: 'Certificación oficial que valida capacidades para diseñar arquitecturas escalables y resilientes en la nube de Amazon.'
      }
    ],
    skills: {
      technical: ['Node.js', 'Express', 'Python', 'Flask', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs', 'Microservices', 'Redis', 'Kubernetes (Básico)'],
      soft: ['Trabajo en equipo', 'Resolución de problemas', 'Aprendizaje continuo', 'Comunicación técnica', 'Adaptabilidad', 'Analítico']
    },
    portfolio: {
      url: 'https://github.com/mateosanchez',
      projects: [
        {
          name: 'E-commerce Microservices',
          description: 'Arquitectura de microservicios para plataforma e-commerce de alto tráfico',
          impact: 'Sistema escalable procesando 10K+ peticiones/seg, Disponibilidad del 99.9%'
        },
        {
          name: 'API Gateway Python',
          description: 'Gateway de APIs centralizado para orquestación de servicios',
          impact: 'Reducción del 30% en latencia de red, Centralización de seguridad'
        }
      ]
    },
    documents: [
      { id: 'doc-019-1', name: 'Mateo_Sanchez_Backend_CV.pdf', type: 'PDF', size: '1.2 MB', uploadedDate: '2026-03-07', uploadedBy: 'Mateo Sánchez Rojas' },
      { id: 'doc-019-2', name: 'AWS_Solutions_Architect_Cert.pdf', type: 'PDF', size: '0.9 MB', uploadedDate: '2026-03-07', uploadedBy: 'Mateo Sánchez Rojas' }
    ],
    notes: [
      'Experiencia sólida de 3 años en backend demostrable',
      'Stack técnico moderno y demandado: Node, Python, AWS',
      'Certificación AWS demuestra proactividad y conocimiento técnico estandarizado',
      'Perfil junior-mid con gran potencial para evolucionar a arquitecto',
      'Excelente disposición para reubicarse o trabajar remoto'
    ]
  },
  {
    id: 'cand-020',
    name: 'Isabella Moreno Cruz',
    email: 'isabella.moreno@email.com',
    phone: '+57 311 888 9900',
    age: 26,
    location: 'Cali, Colombia',
    avatar: 'IM',
    yearsExperience: 3,
    expectedSalary: '$7.000.000 - $8.500.000 COP',
    availability: '2 semanas',
    
    applications: [
      {
        id: 'app-020-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Product Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'active',
        appliedDate: '2026-02-25',
        matchScore: 78,
        confidence: 'high',
        scores: {
          cvScore: 78
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Isabella, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],

    firstName: 'Isabella',
    lastName: 'Moreno Cruz',
    identificationNumber: '1118889901',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/isabellamoreno',
    birthDate: '1998-11-20',
    city: 'Cali',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Medellín', 'Remote'],
    description: 'Product Designer con 3 años de experiencia en el diseño de interfaces seguras e intuitivas para procesos de verificación de identidad. Apasionada por el UX Research y el diseño sistémico, enfocada en simplificar la complejidad técnica para mejorar la experiencia del usuario final.',

    experience: [
      {
        id: 'exp-020-001',
        company: 'Truora',
        position: 'Product Designer',
        duration: 'Jun 2022 - Presente',
        description: 'Diseño de productos de verificación de identidad. UX para procesos complejos.',
        location: 'Bogotá, Colombia',
        startDate: '2022-06',
        endDate: null,
        current: true,
        achievements: [
          'Rediseñé el flujo de vinculación (identity verification) reduciendo el tiempo de abandono en un 25%',
          'Implementé una librería de componentes de UI unificada para los productos B2B de Truora',
          'Conduje pruebas de usabilidad en 3 países para validar la adaptación cultural del flujo de verificación',
          'Colaboré estrechamente con el equipo de KYC para asegurar el cumplimiento legal en el diseño de interfaces'
        ]
      },
      {
        id: 'exp-020-002',
        company: 'Aplyca',
        position: 'UX/UI Designer',
        duration: 'Ene 2021 - May 2022',
        description: 'Diseño para clientes de diversos sectores.',
        location: 'Bogotá, Colombia',
        startDate: '2021-01',
        endDate: '2022-05',
        current: false,
        achievements: [
          'Diseñé el portal transaccional para una importante entidad pública, mejorando la satisfacción del usuario en un 15%',
          'Desarrollé wireframes y prototipos navegables de alta fidelidad para el lanzamiento de un marketplace regional',
          'Participó en la creación de guías de estilo para múltiples clientes corporativos'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad Icesi',
        degree: 'Diseño de Medios Interactivos',
        year: '2020',
        description: 'Enfoque en interacción humano-computador y diseño digital. Proyecto destacado sobre accesibilidad en interfaces.'
      }
    ],
    skills: {
      technical: ['Figma', 'User Research', 'Prototyping', 'Usability Testing', 'Design Systems', 'Responsive Design', 'Wireframing', 'InVision'],
      soft: ['Empatía', 'Problem solving', 'Colaboración', 'Comunicación asertiva', 'Adaptabilidad']
    },
    portfolio: {
      url: 'https://isabellamoreno.co',
      projects: [
        {
          name: 'Truora ID Verification',
          description: 'Flujo de verificación de identidad simplificado con biometría facial',
          impact: 'Tiempo de verificación -60%, Tasa de éxito +12%'
        }
      ]
    },
    documents: [
      { id: 'doc-020-1', name: 'Isabella_Moreno_Identity_UX.pdf', type: 'PDF', size: '1.5 MB', uploadedDate: '2026-02-25', uploadedBy: 'Isabella Moreno Cruz' },
      { id: 'doc-020-2', name: 'Truora_Design_Tokens.pdf', type: 'PDF', size: '4.2 MB', uploadedDate: '2026-02-25', uploadedBy: 'Isabella Moreno Cruz' }
    ],
    notes: [
      'Experiencia en procesos complejos y de seguridad digital',
      'Buen enfoque en simplificación de flujos extensos',
      'Fuerte capacidad analítica y de investigación de usuario',
      'Portfolio muestra proyectos de alto impacto transaccional'
    ]
  },
  {
    id: 'cand-021',
    name: 'Santiago Vargas Luna',
    email: 'santiago.vargas@email.com',
    phone: '+57 314 222 3344',
    age: 29,
    location: 'Medellín, Colombia',
    avatar: 'SV',
    yearsExperience: 5,
    expectedSalary: '$8.000.000 - $9.500.000 COP',
    availability: '3 semanas',
    
    applications: [
      {
        id: 'app-021-1',
        cvEvaluation: {
          summary: 'Perfil con excelente alineación técnica y estratégica. Se destaca su experiencia liderando sistemas complejos y su profundo conocimiento.',
          score: 92,
          criteria: [
            { label: 'Años de Experiencia', score: 95, status: 'pass' },
            { label: 'Stack Tecnológico', score: 90, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 100, status: 'pass' },
            { label: 'Estabilidad Laboral', score: 85, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'El candidato cuenta con experiencia altamente relevante para el rol.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración, lo cual indica un compromiso sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia se alinea perfectamente con los requisitos técnicos del puesto.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'El candidato es altamente calificado. Se recomienda avanzar en el proceso de selección.'
        },
        jobTitle: 'Senior Product Designer',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'evaluacion-cv',
        status: 'active',
        appliedDate: '2026-02-26',
        matchScore: 80,
        confidence: 'high',
        scores: {
          cvScore: 80
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Santiago, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en tu última experiencia. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnóstico al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        }
      }
    ],

    firstName: 'Santiago',
    lastName: 'Vargas Luna',
    identificationNumber: '1074567891',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/santiagovargas',
    birthDate: '1995-07-28',
    city: 'Medellín',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Bogotá', 'Remote'],
    description: 'Product Designer Senior con 5 años de experiencia enfocados en el sector Healthtech. Actualmente en Tul, diseñando experiencias integrales para telemedicina y gestión hospitalaria digital. Experto en simplificar procesos clínicos complejos para usuarios finales y profesionales de la salud.',

    experience: [
      {
        id: 'exp-021-001',
        company: 'Tul',
        position: 'Product Designer',
        duration: 'Mar 2021 - Presente',
        description: 'Diseño para plataforma de salud digital. Telemedicina y gestión de citas.',
        location: 'Bogotá, Colombia',
        startDate: '2021-03',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé el portal de telemedicina que ha procesado +100K consultas virtuales exitosas',
          'Reduje la tasa de inasistencia a citas médicas en un 20% mediante un nuevo sistema de recordatorios y preparación pre-consulta',
          'Implementé el sistema de diseño "HealthUI" que estandarizó la experiencia en 3 países',
          'Coordiné con equipos médicos para validar la usabilidad de interfaces críticas en entornos de urgencias'
        ]
      },
      {
        id: 'exp-021-002',
        company: 'Lean Solutions Group',
        position: 'UX Designer',
        duration: 'Jul 2019 - Feb 2021',
        description: 'Diseño de soluciones digitales para sector salud.',
        location: 'Medellín, Colombia',
        startDate: '2019-07',
        endDate: '2021-02',
        current: false,
        achievements: [
          'Optimicé el flujo de registro de pacientes reduciendo el tiempo de ingreso de 15 a 5 minutos',
          'Diseñé dashboards de seguimiento para administradores de clínicas con visualización de ocupación en tiempo real',
          'Conduje investigaciones etnográficas en centros de salud para entender el contexto real de uso de las herramientas digitales'
        ]
      }
    ],
    education: [
      {
        institution: 'Universidad de Antioquia',
        degree: 'Diseño Visual',
        year: '2018',
        description: 'Formación en diseño de comunicación visual con énfasis en medios interactivos y lenguajes audiovisuales.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'InVision', 'User Research', 'Journey Mapping', 'Information Architecture', 'Usability Testing', 'Data Analysis'],
      soft: ['Empatía', 'Comunicación', 'Trabajo remoto', 'Problem solving', 'Pensamiento crítico']
    },
    portfolio: {
      url: 'https://santiagovargas.design',
      projects: [
        {
          name: 'Tul Telemedicina',
          description: 'Plataforma integral de consultas médicas virtuales y seguimiento clínico',
          impact: '100K+ consultas realizadas, NPS de 78 entre doctores y pacientes'
        }
      ]
    },
    documents: [
      { id: 'doc-021-1', name: 'Santiago_Vargas_Healthtech_Resume.pdf', type: 'PDF', size: '1.3 MB', uploadedDate: '2026-02-26', uploadedBy: 'Santiago Vargas Luna' },
      { id: 'doc-021-2', name: 'HealthUI_Design_System.pdf', type: 'PDF', size: '22.4 MB', uploadedDate: '2026-02-26', uploadedBy: 'Santiago Vargas Luna' }
    ],
    notes: [
      'Experiencia profunda en healthtech muy valiosa',
      'Portfolio con impacto social y métricas claras de volumen',
      'Buen balance entre diseño visual y arquitectura de información clínica',
      'Residente en Medellín, abierto a remoto o Bogotá'
    ]
  },


  // ====== ETAPA 8: VERIFICACIÓN ANTECEDENTES (1 ACTIVO CON BLOCKER, 1 RECHAZADO) ======
  {
    id: 'cand-002',
    name: 'Valentina Herrera Castro',
    email: 'valentina.herrera@email.com',
    phone: '+57 318 789 0123',
    age: 31,
    location: 'Bogotá, Colombia',
    avatar: 'VH',
    yearsExperience: 8,
    expectedSalary: '$9.500.000 - $11.500.000 COP',
    availability: '1 mes',
    
    // Lista de aplicaciones (vacantes)
    applications: [
      {
        id: 'app-002-1',
        cvEvaluation: {
          summary: 'Candidata con fuerte enfoque en diseño de interacción y metodologías ágiles. Su experiencia en Accenture Interactive demuestra capacidad para manejar proyectos de gran escala. Requiere validación de sus certificaciones internacionales pendientes.',
          score: 84,
          criteria: [
            { label: 'Años de Experiencia', score: 80, status: 'pass' },
            { label: 'Stack Tecnológico', score: 85, status: 'pass' },
            { label: 'Educación y Certificaciones', score: 70, status: 'warning' },
            { label: 'Estabilidad Laboral', score: 90, status: 'pass' }
          ],
          evaluations: [
            { category: 'Experiencia', description: 'Valentina Ruiz cuenta con más de 6 años de experiencia en UX/UI, incluyendo roles de liderazgo en Accenture Interactive y proyectos internacionales de gran escala, altamente relevante para el puesto.' },
            { category: 'Estabilidad laboral', description: 'Ha mantenido roles de larga duración (2+ años por empresa), lo cual indica estabilidad y compromiso profesional sostenido.' },
            { category: 'Relevancia', description: 'Su experiencia en diseño de interacción y metodologías ágiles se alinea bien con los requisitos del puesto, aunque requiere validación de sus certificaciones internacionales.' },
            { category: 'Ubicación', description: 'Reside en Bogotá, Colombia y tiene disponibilidad para trabajo remoto o presencial, lo cual facilita la incorporación.' },
            { category: 'Requisitos deseables', description: 'Cumple con los requisitos técnicos principales. Sin embargo, sus certificaciones internacionales están pendientes de validación, lo cual podría tener un impacto leve en la evaluación final.' }
          ],
          minimumThreshold: 70,
          decision: 'Válida (supera el umbral)',
          recommendation: 'Valentina Ruiz es una candidata calificada para el puesto de Product Designer Senior. Se recomienda avanzar en el proceso con validación de certificaciones pendientes.'
        },
        jobTitle: 'Product Designer Senior',
        jobLocation: 'Bogotá, Colombia',
        currentStage: 'antecedentes',
        status: 'active',
        appliedDate: '2026-02-12',
        matchScore: 94,
        confidence: 'high',
        scores: {
          cvScore: 94,
          psychometricScore: 90,
          serenaScore: 92,
          technicalScore: 95,
          productManagerScore: 91,
          hiringManagerScore: 94
        },
        psychometricEvaluation: {
          iq: 95,
          learningQuotient: 107,
          factors: [
            { label: 'Juicio y Vocabulario', description: 'Promedio, lo que sugiere que puede tener dificultades ocasionales con conceptos verbales complejos.', status: 'warning' },
            { label: 'Concentración y Atención', description: 'Muy bajos, lo que podría afectar su capacidad para resolver problemas aritméticos y tolerar la presión.', status: 'fail' },
            { label: 'Planeación y Organización', description: 'Dificultades significativas, lo que podría impactar en la planificación y atención a detalles.', status: 'fail' },
            { label: 'Análisis y Abstracción', description: 'Promedio, pero con algunas dificultades en comprensión rápida y analogías abstractas.', status: 'warning' }
          ],
          brainDominance: 'Usa los cuatro cuadrantes del cerebro con facilidad, lo que le permite adaptarse a diferentes situaciones y abordar problemas de manera versátil.',
          observation: 'Aunque el candidato presenta algunas debilidades en concentración, atención y planeación, su capacidad para adaptarse y utilizar diferentes enfoques cognitivos es una fortaleza significativa. Esto puede ser beneficioso en un entorno de desarrollo frontend donde se requiere flexibilidad.',
          recommendation: 'El candidato es apto para continuar en el proceso de selección, ya que sus habilidades cognitivas generales y su capacidad de adaptación son adecuadas para el rol de Frontend Developer SemiSenior.',
          reports: [
            { name: 'Perfil de Inteligencia', date: '25 Abr 2026', type: 'PDF' },
            { name: 'Dominancia Cerebral', date: '25 Abr 2026', type: 'PDF' }
          ],
          minimumThreshold: 70,
          obtainedScore: 90,
          decision: 'Válida (supera el umbral)'
        },
        blocker: {
          stageId: 'antecedentes',
          reason: 'Información incompleta: No contamos con el número de identificación para realizar la verificación de antecedentes.',
          priority: 'high',
          action: {
            type: 'edit_profile',
            label: 'Ingresar identificación'
          }
        },
        serenaInterview: {
          transcript: [
            { role: 'serena', text: 'Hola Valentina, es un gusto saludarte. Para comenzar, me gustaría que me contaras sobre el sistema de diseño que lideraste en Accenture Interactive. ¿Cuál fue el mayor desafío técnico?', timestamp: '10:00' },
            { role: 'candidate', text: 'El mayor desafío fue unificar los componentes de 20 equipos de producto diferentes que trabajaban con tecnologías distintas. Tuvimos que crear una base sólida de Design Tokens que fuera agnostica al framework.', timestamp: '10:02' },
            { role: 'serena', text: 'Entiendo. ¿Y cómo manejaste la resistencia al cambio de los desarrolladores que ya tenían sus propios flujos?', timestamp: '10:05' },
            { role: 'candidate', text: 'Implementamos un sistema de gobernanza donde cada equipo podía proponer mejoras. Hicimos sesiones de pair programming y creamos una documentación extremadamente detallada en Storybook.', timestamp: '10:07' },
            { role: 'serena', text: 'Excelente enfoque. Pasando a accesibilidad, he visto que es una de tus pasiones. ¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', timestamp: '10:10' },
            { role: 'candidate', text: 'Integramos linters de accesibilidad directamente en Figma y realizamos auditorías automáticas en el CI/CD. Pero lo más importante fueron los tests de usabilidad con personas con discapacidad real.', timestamp: '10:12' }
          ],
          questionScores: [
            { 
              objective: 'Evaluar visión sistémica y manejo de retos técnicos complejos.',
              question: '¿Cuál fue el mayor desafío técnico en el sistema de diseño de Accenture?', 
              score: 92,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            },
            { 
              objective: 'Medir habilidades de liderazgo y gestión de cambio organizacional.',
              question: '¿Cómo manejaste la resistencia al cambio de los desarrolladores?', 
              score: 85,
              analysis: 'Se percibe una buena capacidad de gestión y adaptabilidad al cambio, con potencial de crecimiento.'
            },
            { 
              objective: 'Validar conocimientos técnicos profundos en accesibilidad web.',
              question: '¿Cómo aseguras el cumplimiento de WCAG en etapas tempranas?', 
              score: 95,
              analysis: 'Sólidos conocimientos técnicos y metodológicos, demostrando atención al detalle.'
            }
          ],
          overallFeedback: {
            summary: 'Valentina demuestra una madurez excepcional en diseño de producto enterprise. Su capacidad para articular decisiones técnicas complejas con objetivos de negocio es notable.',
            strengths: [
              'Expertise profundo en sistemas de diseño escalables.',
              'Compromiso genuino y metodológico con la accesibilidad digital.',
              'Capacidad de liderazgo y gestión de cambio en equipos grandes.'
            ],
            improvements: [
              'Puede fortalecer la medición de impacto mediante KPIs de negocio más específicos.',
              'Expandir su conocimiento en herramientas de análisis de datos para complementar el research cualitativo.'
            ],
            onboardingStrategy: 'Se sugiere un plan de 30-60-90 días enfocado en inmersión cultural y alineación técnica con el equipo core.',
            leaderRecommendation: 'Avanzar al siguiente paso considerando un acompañamiento inicial en sus primeras semanas.'
          }
        },
        backgroundCheck: {
          status: 'pending',
          completedDate: '2026-04-10',
          recommendation: 'Proceso en curso. Pendiente validación del certificado de Accenture International.',
          details: [
            { category: 'Identidad', result: 'Verificada correctamente.', status: 'pass', records: 6, description: 'Verificada en bases oficiales, sin inconsistencias. Registros encontrados: 6.' },
            { category: 'Historial penal y criminal', result: 'No se registran antecedentes.', status: 'pass', records: 2, description: 'Consultado, no se encontraron antecedentes. Registros encontrados: 2.' },
            { category: 'Historial Crediticio', result: 'En proceso de verificación.', status: 'warning', records: 0, description: 'En proceso de verificación con entidades financieras. Pendiente de respuesta.' },
            { category: 'Referencias Laborales', result: 'Pendiente confirmar certificado de Accenture International.', status: 'warning', records: 0, description: 'Pendiente confirmar certificado de la última empresa internacional (Accenture). Requiere documento adicional.' }
          ]
        }
      }
    ],
    
    // Información personal adicional
    firstName: 'Valentina',
    lastName: 'Herrera Castro',
    identificationNumber: '1023456789',
    identificationType: 'Cédula de Ciudadanía',
    nationality: 'Colombiana',
    linkedin: 'https://www.linkedin.com/in/valentinaherrera',
    birthDate: '22/08/1995',
    
    // Ubicación detallada
    city: 'Bogotá',
    country: 'Colombia',
    willingToRelocate: true,
    interestedLocations: ['Remote (Global)', 'USA', 'Europa'],
    
    // Información laboral adicional
    noticePeriod: '1',
    noticePeriodUnit: 'Mes',
    currency: 'Peso colombiano (COP)',
    
    // Perfil profesional
    description: 'Product Designer Senior con 8 años de experiencia trabajando con equipos globales en Google y Accenture Interactive. Especializada en diseño de sistemas escalables, investigación de usuarios internacional y colaboración cross-cultural. He liderado proyectos de transformación digital para corporaciones Fortune 500 y startups tecnológicas, siempre enfocándome en crear experiencias intuitivas y accesibles. Mi experiencia en consultoría me ha dado una visión estratégica única para resolver problemas complejos de negocio a través del diseño. Apasionada por la accesibilidad digital, las metodologías ágiles y el liderazgo de equipos distribuidos. Certificada en Design Operations y con experiencia trabajando en ambientes altamente colaborativos y de ritmo acelerado.',
    
    experience: [
      {
        company: 'Google (Contractor)',
        position: 'UX Designer',
        duration: 'Ene 2023 - Presente',
        description: 'Diseño de features para productos Google Workspace. Colaboración con equipos internacionales en Mountain View, Londres y Bangalore. Research y testing con usuarios globales de diferentes culturas y contextos.',
        location: 'Remote (USA)',
        startDate: 'Enero 2023',
        endDate: null,
        current: true,
        achievements: [
          'Diseñé 3 features clave para Google Workspace adoptadas por +50M usuarios',
          'Lideré iniciativas de accesibilidad logrando WCAG 2.1 AAA compliance',
          'Colaboré con equipos en 5 países diferentes, optimizando procesos de trabajo remoto',
          'Implementé sistema de componentes reutilizables que redujo tiempo de diseño en 35%',
          'Mentoría a 2 diseñadores contratistas en mejores prácticas de Google'
        ]
      },
      {
        company: 'Accenture Interactive',
        position: 'Senior UX Designer',
        duration: 'Jun 2019 - Dic 2022',
        description: 'Consultoría de diseño estratégico para clientes Fortune 500 en banca, retail y telecomunicaciones. Liderazgo de proyectos end-to-end de transformación digital. Mentoría de diseñadores junior y coordinación con stakeholders C-level.',
        location: 'Bogotá, Colombia',
        startDate: 'Junio 2019',
        endDate: 'Diciembre 2022',
        current: false,
        achievements: [
          'Lideré transformación digital de banco regional con 80% de incremento en usuarios digitales',
          'Diseñé sistema de diseño adoptado por 20+ equipos de producto del cliente',
          'Facilitación de +50 workshops de Design Thinking con stakeholders ejecutivos',
          'Mentoría de equipo de 5 diseñadores junior en metodologías ágiles',
          'Implementé procesos de user research que redujeron tiempo de validación en 40%'
        ]
      },
      {
        company: 'Globant',
        position: 'UX Designer',
        duration: 'Ago 2017 - May 2019',
        description: 'Diseño de productos digitales para clientes de USA y Latam en retail, fintech y media. Trabajo en equipos ágiles internacionales. Especialización en mobile-first y responsive design.',
        location: 'Bogotá, Colombia',
        startDate: 'Agosto 2017',
        endDate: 'Mayo 2019',
        current: false,
        achievements: [
          'Diseñé app fintech que alcanzó 100K descargas en primeros 3 meses',
          'Creé sistema de design tokens adoptado por 3 proyectos del estudio',
          'Colaboré con equipos en Argentina, México y USA en proyectos simultáneos',
          'Lideré iniciativa de UI/UX best practices para todo el equipo de diseño'
        ]
      }
    ],
    education: [
      {
        institution: 'MIT Professional Education',
        degree: 'Digital Transformation: Strategist in AI & Cloud',
        year: '2026',
        current: true,
        description: 'Programa ejecutivo sobre tecnologías emergentes y su impacto estratégico en el diseño de productos.'
      },
      {
        institution: 'Universidad de los Andes',
        degree: 'Diseño',
        year: '2017',
        description: 'Título con distinción en Diseño con énfasis en diseño de interacción y medios digitales. Proyecto de grado sobre accesibilidad en interfaces móviles.'
      },
      {
        institution: 'General Assembly',
        degree: 'UX Design Immersive',
        year: '2018',
        description: 'Bootcamp intensivo de 12 semanas en diseño UX/UI con enfoque en metodologías ágiles, design thinking y prototipado rápido.'
      },
      {
        institution: 'Nielsen Norman Group',
        degree: 'UX Certification',
        year: '2021',
        description: 'Certificación profesional en User Experience del Nielsen Norman Group.'
      }
    ],
    skills: {
      technical: ['Figma', 'Sketch', 'Design Systems', 'Advanced Prototyping', 'User Research', 'Design Ops', 'Accessibility (WCAG)', 'Analytics', 'A/B Testing', 'Maze', 'UserTesting', 'Miro', 'FigJam', 'Design Tokens', 'Component Libraries'],
      soft: ['Liderazgo', 'Comunicación intercultural', 'Pensamiento estratégico', 'Mentoría', 'Adaptabilidad', 'Stakeholder Management', 'Presentaciones ejecutivas', 'Facilitación de workshops', 'Trabajo remoto', 'Inglés fluido (C1)']
    },
    portfolio: {
      url: 'https://valentinaherrera.design',
      projects: [
        {
          name: 'Google Workspace Feature (NDA)',
          description: 'Feature de productividad y colaboración para Google Workspace con enfoque en accesibilidad global',
          impact: 'Adoptado por +50M usuarios en 6 meses. Incremento del 22% en engagement'
        },
        {
          name: 'Banking Digital Transformation - Accenture',
          description: 'Transformación digital completa de banco regional latinoamericano con 5M+ clientes',
          impact: 'Incremento del 80% en usuarios digitales, NPS de 78, reducción del 60% en llamadas a call center'
        },
        {
          name: 'Accenture Design System',
          description: 'Sistema de diseño escalable para cliente enterprise con +20 productos digitales',
          impact: 'Adoptado por 20+ equipos, reducción del 50% en tiempo de diseño a producción'
        },
        {
          name: 'Fintech Mobile App - Globant',
          description: 'App móvil de pagos y transferencias para mercado latinoamericano',
          impact: '100K descargas en 3 meses, rating de 4.7/5 en stores'
        }
      ]
    },
    documents: [
      { id: 'doc-002-1', name: 'Valentina_Herrera_CV.pdf', type: 'PDF', size: '1.5 MB', uploadedDate: '2026-02-12', uploadedBy: 'Valentina Herrera Castro' },
      { id: 'doc-002-2', name: 'Google_UX_Certification.pdf', type: 'PDF', size: '2.1 MB', uploadedDate: '2026-02-12', uploadedBy: 'Valentina Herrera Castro' },
      { id: 'doc-002-3', name: 'Portfolio_Global_2024.pdf', type: 'PDF', size: '32.0 MB', uploadedDate: '2026-02-12', uploadedBy: 'Valentina Herrera Castro' }
    ],
    notes: [
      'Experiencia internacional excepcional - trabajó en Google',
      'Portfolio de alto nivel con proyectos de gran impacto medible',
      'Excelente fit cultural: colaborativa, estratégica y orientada a resultados',
      'Certificaciones de Nielsen Norman Group y General Assembly',
      'Expectativa salarial en el límite superior pero completamente justificada'
    ]
  }

];