# 🔍 AUDITORÍA COMPLETA - DATOS HARDCODEADOS VS DINÁMICOS

## Estado actual de María García (cand-001)

### ✅ **COMPONENTES DINÁMICOS (Ya funcionan con datos de María):**

1. **CandidateHeader** ✅
   - Nombre, email, teléfono, ubicación, edad, cédula
   - **Fuente:** `candidatesData.ts`

2. **GeneralInfoSection** ✅
   - Match Score (92%), confianza (high)
   - Resumen profesional completo
   - Skills técnicas (11) + soft (8)
   - Información de contacto completa
   - Ubicación detallada
   - **Fuente:** `candidatesData.ts`

3. **ExperienceSection** ✅
   - 2 experiencias con achievements (4 cada una)
   - Fechas parseadas (startDate, endDate, current)
   - **Fuente:** `candidatesData.ts`

4. **EducationSection** ✅
   - 1 título universitario con descripción
   - 3 certificaciones (mock, pero genéricas)
   - **Fuente:** `candidatesData.ts`

---

## ❌ **COMPONENTES HARDCODEADOS (Muestran datos de Mateo o genéricos):**

### 1️⃣ **StagesSection** - PARCIALMENTE HARDCODEADO

**Ubicación:** `/src/app/components/sections/StagesSection.tsx`

#### **A. Progress Tracker (líneas 415-509)** ❌ HARDCODEADO
```typescript
// Línea 419
<span className=\"text-xs text-gray-500\">Etapa 1 de 8</span>

// TODO: Debe ser dinámico según currentStage del candidato
// María está en 'seleccionado' → Debería mostrar "Etapa 8 de 8"
```

**Problema:**
- Muestra siempre "Etapa 1 de 8"
- Muestra solo la primera etapa como activa
- Ignora `candidate.currentStage` y `candidate.scores`

**Solución:**
- Crear mapeo de `currentStage` → número de etapa
- Calcular progreso: `currentStageNumber / totalStages`
- Mostrar etapas completadas en verde con checkmark
- Mostrar etapa actual con pulse animation
- Mostrar etapas pendientes en gris

#### **B. StageCards - Estados (líneas 511-650)** ❌ HARDCODEADO
```typescript
// Todas las etapas tienen status hardcodeado
<StageCard
  id="evaluacion-cv"
  status="current" // ❌ Siempre 'current'
  // ...
/>
```

**Problema:**
- Todas las tarjetas tienen `status` fijo
- No reflejan el progreso real del candidato
- María debería tener TODAS las etapas en "completed"

**Solución:**
- Calcular status dinámicamente:
  ```typescript
  function getStageStatus(stageId: string, currentStage: string): StageStatus {
    const stageOrder = ['evaluacion-cv', 'evaluacion-serena', ...];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  }
  ```

#### **C. Scores en cada etapa** ⚠️ PARCIALMENTE DINÁMICO
- ScreeningSection muestra scores de candidatesData ✅
- Pero otras secciones pueden tener scores hardcodeados ❓

---

### 2️⃣ **ActivityHubPanel - Tab Actividad** ❌ TOTALMENTE HARDCODEADO

**Ubicación:** `/src/app/components/ActivityHubPanel.tsx` (líneas 290-358)

```typescript
const activityData = [
  {
    day: 'Hoy',
    events: [
      {
        title: 'Análisis de CV completado',
        description: 'CV Score: 78 • Confianza: Alta', // ❌ Score de Mateo
      },
      {
        title: 'CV procesado por IA',
        description: 'Skills detectadas: Node.js, Python, AWS...', // ❌ Skills de Mateo
      },
      {
        actor: { name: 'Mateo Sánchez' }, // ❌ Nombre hardcodeado
        title: 'CV cargado',
        description: 'Mateo_Sanchez_CV.pdf', // ❌ Archivo hardcodeado
      },
      {
        title: 'Aplicación recibida',
        description: 'Fuente: LinkedIn • Backend Developer (Remoto)', // ❌ Rol hardcodeado
      },
    ],
  },
];
```

**Problema:**
- TODOS los eventos están hardcodeados con datos de Mateo
- No hay sistema para generar actividades dinámicamente
- Ignora `candidate.appliedDate`, `candidate.currentStage`, `candidate.scores`

**Solución:**
- Crear función `generateActivities(candidate: CandidateData)`
- Generar eventos basados en:
  - `appliedDate` → "Aplicación recibida"
  - `scores.cvScore` → "CV Score: 92 • Confianza: Alta"
  - `skills` → "Skills detectadas: Figma, Sketch, Design Systems..."
  - `currentStage` → Eventos de cambio de etapa
  - `status === 'hired'` → "Candidato seleccionado"

**Ejemplo para María:**
```typescript
{
  day: '10 Feb 2026', // candidate.appliedDate
  events: [
    {
      title: 'Candidato seleccionado ✨',
      description: 'María García López ha sido seleccionada para Product Designer Senior',
      status: 'success',
    },
    {
      title: 'Verificación de antecedentes completada',
      description: 'Score: 100 • Sin observaciones',
    },
    {
      title: 'Entrevista con Hiring Manager',
      description: 'Score: 93 • Excelente fit cultural',
    },
    // ... más eventos según scores y etapas
    {
      title: 'Análisis de CV completado',
      description: 'CV Score: 92 • Confianza: Alta', // De candidate.scores.cvScore
    },
    {
      title: 'CV procesado por IA',
      description: 'Skills detectadas: Figma, Sketch, Design Systems, Prototyping...', // De candidate.skills
    },
    {
      title: 'CV cargado',
      description: 'Maria_Garcia_CV.pdf (287 KB)', // De candidate.name
    },
    {
      title: 'Aplicación recibida',
      description: 'Fuente: LinkedIn • Product Designer Senior (Remoto)',
    },
  ],
}
```

---

### 3️⃣ **SerenaCopilotCard** ❌ TOTALMENTE HARDCODEADO

**Ubicación:** `/src/app/components/SerenaCopilotCard.tsx` (líneas 20-29)

```typescript
insights = [
  'Candidato con 3 años de experiencia en desarrollo backend (Node.js, Python)', // ❌
  'Perfil junior-mid con conocimientos sólidos en AWS y microservicios', // ❌
  'Buena progresión técnica en sus empleos anteriores', // ❌
  'Expectativa salarial alineada con el rango del rol' // ❌
],
```

**Problema:**
- Insights hardcodeados para Backend Developer
- No usa datos del candidato actual
- Confianza y updatedAgo son genéricos

**Solución:**
- Crear función `generateSerenaInsights(candidate: CandidateData)`
- Generar insights basados en:
  - `yearsExperience` + `experience[0].position`
  - `skills.technical` (primeras 3-4)
  - `matchScore` + `confidence`
  - `expectedSalary` vs rango del rol
  - `currentStage` + `status`

**Ejemplo para María:**
```typescript
insights: [
  'Candidata con 5 años de experiencia como Product Designer en Rappi y Platzi',
  'Perfil senior con expertise en Figma, Design Systems y User Research',
  'Excelente match (92%) con requisitos de la vacante',
  'Portfolio con casos de impacto medible (+10M usuarios en Rappi)',
  'Candidata SELECCIONADA - Todos los scores son excelentes (88-94)',
],
updatedAgo: 'Hace 1 día', // Calcular desde appliedDate
confidence: 'high', // Desde candidate.confidence
```

---

### 4️⃣ **ActivityHubPanel - Tab Serena (Chat)** ⚠️ SEMI-DINÁMICO

**Ubicación:** `/src/app/components/ActivityHubPanel.tsx` (líneas 440+)

**Estado actual:**
- El chat es interactivo ✅
- Pero las respuestas de IA probablemente usan datos hardcodeados ❓

**Solución:**
- Pasar `candidate` como contexto al chat
- Respuestas deben basarse en datos reales del candidato

---

### 5️⃣ **Comments Tab** ⚠️ SEMI-DINÁMICO

**Estado actual:**
- Recibe `comments` como prop ✅
- Pero los comentarios se crean desde `CandidateDetailDrawer` con datos mock ❓

**Solución:**
- Convertir `candidate.notes` en comentarios estructurados:
```typescript
function notesToComments(candidate: CandidateData): Comment[] {
  return candidate.notes.map((note, index) => ({
    id: `comment-${candidate.id}-${index}`,
    text: note,
    author: 'Evaluador ATS',
    authorInitials: 'EA',
    timestamp: new Date(candidate.appliedDate).getTime() + (index * 24 * 60 * 60 * 1000), // 1 día después por cada nota
    stageId: getStageForNote(index, candidate.currentStage),
    stageName: getStageName(getStageForNote(index, candidate.currentStage)),
    isPrivate: false,
  }));
}
```

**Para María:**
```typescript
comments: [
  {
    text: 'Excelente portfolio con casos de estudio detallados',
    stageId: 'evaluacion-cv',
    stageName: 'Evaluación de CV',
  },
  {
    text: 'Experiencia relevante en startups tech colombianas',
    stageId: 'evaluacion-tecnica',
    stageName: 'Evaluación Técnica',
  },
  // ... resto de sus 5 notes
]
```

---

### 6️⃣ **To-Dos Tab** ⚠️ SEMI-DINÁMICO

**Estado actual:**
- Las tareas se pasan como prop `tasks` ✅
- Pero se crean en `CandidateDetailDrawer` con datos mock ❓

**Solución:**
- Generar tareas basadas en `currentStage` y `status`:

```typescript
function generateTasks(candidate: CandidateData): Task[] {
  const tasks: Task[] = [];
  
  if (candidate.status === 'hired') {
    tasks.push({
      id: `task-onboarding-${candidate.id}`,
      name: `Preparar onboarding para ${candidate.name.split(' ')[0]}`,
      assignee: 'HR',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 días
      priority: 'high',
      completed: false,
    });
  } else if (candidate.currentStage === 'evaluacion-cv') {
    tasks.push({
      id: `task-review-cv-${candidate.id}`,
      name: `Revisar CV completo de ${candidate.name.split(' ')[0]}`,
      assignee: 'Recruiter',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // +2 días
      priority: 'medium',
      completed: false,
    });
  }
  
  return tasks;
}
```

**Para María (hired):**
```typescript
tasks: [
  {
    name: 'Preparar onboarding para María',
    assignee: 'HR Manager',
    dueDate: '18 Mar 2026',
    priority: 'high',
  },
  {
    name: 'Enviar oferta formal a María García',
    assignee: 'Talent Acquisition',
    dueDate: '15 Mar 2026',
    priority: 'high',
    completed: true, // Ya seleccionada
  },
]
```

---

### 7️⃣ **DocumentsSection** ❌ HARDCODEADO

**Ubicación:** `/src/app/components/sections/DocumentsSection.tsx`

**Problema:**
- Documentos mock con nombres hardcodeados de Mateo

**Solución:**
- Usar `candidate.name` para generar nombres de documentos dinámicamente:
```typescript
const mockDocuments = [
  {
    name: `${candidate.name.replace(' ', '_')}_CV.pdf`,
    type: 'CV',
    size: '287 KB',
    uploadedBy: 'Sistema',
    uploadedAt: candidate.appliedDate,
  },
];
```

---

## 📊 **RESUMEN DE TAREAS:**

### **CRÍTICO (Impacto alto en experiencia):**
1. ❌ **StagesSection - Progress Tracker** → Mostrar etapa 8 de 8 para María
2. ❌ **ActivityHubPanel - activityData** → Generar eventos dinámicos
3. ❌ **SerenaCopilotCard - insights** → Insights personalizados para María

### **IMPORTANTE (Funcionalidad):**
4. ⚠️ **StagesSection - StageCard status** → completed/current/pending según progreso
5. ⚠️ **Comments** → Convertir `notes` en comentarios estructurados
6. ⚠️ **To-Dos** → Generar tareas según etapa/status

### **MENOR (Detalles):**
7. ❌ **DocumentsSection** → Usar nombre del candidato
8. ⚠️ **Serena Chat** → Verificar que usa datos del candidato

---

## 🎯 **PLAN DE ACCIÓN PARA MARÍA:**

### **FASE 2A: StagesSection dinámico (45 min)**
1. Crear helper `getStageMappings()`
2. Calcular progreso dinámico
3. Asignar status a cada StageCard
4. Mostrar scores reales en cada sección

### **FASE 2B: ActivityHub dinámico (1 hora)**
1. Crear `generateActivities(candidate)`
2. Crear `generateSerenaInsights(candidate)`
3. Crear `notesToComments(candidate)`
4. Crear `generateTasks(candidate)`

### **FASE 2C: Ajustes finales (30 min)**
1. DocumentsSection con nombre dinámico
2. Verificar Serena Chat
3. Testing completo María → Mateo → María

---

## ✅ **RESULTADO ESPERADO:**

Cuando navegues a **María García** (cand-001):
- ✅ Header con su info personal
- ✅ GeneralInfo con su match, skills, experiencias
- ✅ **Stages mostrará: "Etapa 8 de 8 - SELECCIONADO"**
- ✅ **Todas las etapas anteriores en verde (completed)**
- ✅ **Actividad con eventos de María (aplicación, CV, scores, selección)**
- ✅ **Serena dirá: "Candidata senior en Rappi/Platzi, Figma expert, 92% match"**
- ✅ **Comentarios desde sus 5 notes**
- ✅ **Tareas: "Preparar onboarding para María"**
- ✅ **Documentos: "Maria_Garcia_CV.pdf"**

---

## 📝 **NOTAS:**
- Todo debe basarse en `candidatesData.ts`
- Mantener compatibilidad con los otros 21 candidatos
- Cada función helper debe ser reutilizable
- Documentar para poder replicar en otros candidatos
