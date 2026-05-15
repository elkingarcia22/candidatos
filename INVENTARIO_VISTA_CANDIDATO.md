# 📋 INVENTARIO COMPLETO - VISTA DE DETALLE DEL CANDIDATO

## 🎯 OBJETIVO
Este documento mapea TODA la información que se muestra en la vista del candidato, identificando qué datos están hardcodeados vs dinámicos, para crear una plantilla y reemplazar candidato por candidato.

---

## 📂 ESTRUCTURA DE COMPONENTES

```
CandidateDetailDrawer (Principal)
├── CandidateHeader
├── CandidateSidebar
├── Secciones de Contenido:
│   ├── GeneralInfoSection
│   ├── ApplicationSection
│   ├── StagesSection
│   ├── ExperienceSection
│   ├── EducationSection
│   └── DocumentsSection
├── FloatingActionBar / EditModeBar
└── ActivityHubPanel
    ├── Tab Serena
    ├── Tab Actividad
    ├── Tab Comentarios
    ├── Tab To-Dos
    ├── Tab Entrevistas
    └── Tab Mensajes
```

---

## 🔍 INVENTARIO DETALLADO POR COMPONENTE

### 1️⃣ **CandidateHeader.tsx**
**Ubicación:** `/src/app/components/CandidateHeader.tsx`

**Datos que muestra:**
- ✅ Avatar (iniciales del nombre)
- ✅ Nombre completo
- ✅ Ubicación
- ✅ Edad
- ✅ Número de identificación (cédula)
- ✅ Teléfono
- ✅ Email

**Estado actual:**
- ✅ **DINÁMICO** - Recibe datos del prop `candidate`

**Datos en candidatesData.ts:**
```typescript
{
  name: string;           // ✅ Existe
  location: string;       // ✅ Existe
  email: string;          // ✅ Existe
  phone: string;          // ✅ Existe
  age: number;            // ✅ Existe
  // ❌ FALTA: identificationNumber
}
```

**✅ ACCIÓN NECESARIA:**
- Agregar campo `identificationNumber` a candidatesData.ts para cada candidato

---

### 2️⃣ **GeneralInfoSection.tsx**
**Ubicación:** `/src/app/components/sections/GeneralInfoSection.tsx`

**Datos que muestra:**

#### **A. Match con la Vacante**
- Match Score (%)
- Nivel de confianza (Alta/Media/Baja)
- Descripción del match

**Estado actual:** ❌ **HARDCODEADO** en mockCandidate dentro del componente

**Datos en candidatesData.ts:**
```typescript
// ❌ NO EXISTE - Necesitamos mapear desde scores.cvScore
```

#### **B. Resumen Profesional**
- Descripción del candidato (párrafo largo)

**Estado actual:** ❌ **HARDCODEADO** en mockCandidate

**Datos en candidatesData.ts:**
```typescript
// ❌ NO EXISTE - Necesitamos agregar campo 'description'
```

#### **C. Habilidades**
- Lista de skills técnicas y soft

**Estado actual:** ❌ **HARDCODEADO** en mockCandidate

**Datos en candidatesData.ts:**
```typescript
{
  skills: {
    technical: string[];  // ✅ Existe
    soft: string[];       // ✅ Existe
  }
}
```

#### **D. Información de Contacto**
- Nombre
- Apellido
- Email
- Teléfono
- Nacionalidad
- Tipo de identificación
- Número de identificación
- LinkedIn

**Estado actual:** ❌ **HARDCODEADO** en mockCandidate

**Datos en candidatesData.ts:**
```typescript
{
  name: string;           // ✅ Existe (nombre completo)
  email: string;          // ✅ Existe
  phone: string;          // ✅ Existe
  // ❌ FALTAN: firstName, lastName, nationality, identificationType, identificationNumber, linkedin
}
```

#### **E. Ubicación**
- Ciudad
- País
- Disponible para reubicarse
- Ubicaciones de interés

**Estado actual:** ❌ **HARDCODEADO** en mockCandidate

**Datos en candidatesData.ts:**
```typescript
{
  location: string;       // ✅ Existe (formato "Ciudad, País")
  // ❌ FALTAN: country, city, willingToRelocate, interestedLocations
}
```

#### **F. Información Adicional**
- Fecha de nacimiento
- Años de experiencia
- Disponibilidad
- Preaviso
- Salario esperado
- Moneda

**Estado actual:** ❌ **HARDCODEADO** en mockCandidate

**Datos en candidatesData.ts:**
```typescript
{
  yearsExperience: number;    // ✅ Existe
  expectedSalary: string;     // ✅ Existe
  availability: string;       // ✅ Existe
  age: number;                // ✅ Existe
  // ❌ FALTAN: birthDate, noticePeriod, noticePeriodUnit, currency
}
```

**✅ ACCIÓN NECESARIA:**
- Pasar los datos de candidatesData a GeneralInfoSection
- Mapear todos los campos faltantes
- Crear función para dividir nombre completo en firstName/lastName
- Parsear location "Ciudad, País" en city/country

---

### 3️⃣ **ApplicationSection.tsx**
**Ubicación:** `/src/app/components/sections/ApplicationSection.tsx`

**Datos que muestra:**
- ❓ **REVISAR** - No revisado aún

**✅ ACCIÓN NECESARIA:**
- Revisar este componente

---

### 4️⃣ **StagesSection.tsx**
**Ubicación:** `/src/app/components/sections/StagesSection.tsx`

**Datos que muestra:**
- Estado actual del candidato (etapa)
- Progress tracker (1 de 8)
- Timeline de etapas con scores

**Estado actual:** ❌ **HARDCODEADO** - Timeline con etapas fijas

**Datos en candidatesData.ts:**
```typescript
{
  currentStage: string;   // ✅ Existe
  status: string;         // ✅ Existe ('active', 'rejected', 'hired')
  scores: {               // ✅ Existe
    cvScore?: number;
    psychometricScore?: number;
    serenaScore?: number;
    technicalScore?: number;
    productManagerScore?: number;
    hiringManagerScore?: number;
  }
}
```

**✅ ACCIÓN NECESARIA:**
- Mapear currentStage a las etapas del timeline
- Mostrar solo scores disponibles según la etapa actual
- Calcular progreso dinámicamente

---

### 5️⃣ **ExperienceSection.tsx**
**Ubicación:** `/src/app/components/sections/ExperienceSection.tsx`

**Datos que muestra:**
- Lista de experiencias laborales:
  - Título del puesto
  - Empresa
  - Ubicación
  - Fecha inicio/fin
  - Si es trabajo actual
  - Descripción
  - Logros (achievements)

**Estado actual:** ❌ **HARDCODEADO** en mockExperiences

**Datos en candidatesData.ts:**
```typescript
{
  experience: Array<{
    company: string;      // ✅ Existe
    position: string;     // ✅ Existe (usar como 'title')
    duration: string;     // ✅ Existe (ej: "Ene 2024 - Presente")
    description: string;  // ✅ Existe
    // ❌ FALTAN: location, startDate, endDate, current, achievements
  }>
}
```

**✅ ACCIÓN NECESARIA:**
- Parsear el campo `duration` para extraer startDate y endDate
- Detectar si es "Presente" para marcar current = true
- Agregar campo `achievements` a candidatesData (opcional)
- Inferir ubicación de la ciudad del candidato si no existe

---

### 6️⃣ **EducationSection.tsx**
**Ubicación:** `/src/app/components/sections/EducationSection.tsx`

**Datos que muestra:**
- Lista de educación:
  - Institución
  - Título/grado
  - Año
  - Descripción (opcional)

**Estado actual:** ❓ **REVISAR**

**Datos en candidatesData.ts:**
```typescript
{
  education: Array<{
    institution: string;  // ✅ Existe
    degree: string;       // ✅ Existe
    year: string;         // ✅ Existe
    // ❌ FALTA: description (opcional)
  }>
}
```

**✅ ACCIÓN NECESARIA:**
- Mapear datos de education a EducationSection

---

### 7️⃣ **DocumentsSection.tsx**
**Ubicación:** `/src/app/components/sections/DocumentsSection.tsx`

**Datos que muestra:**
- Lista de documentos:
  - Nombre del documento
  - Tipo
  - Tamaño
  - Fecha de subida
  - Subido por

**Estado actual:** ❌ **HARDCODEADO** con documentos de Mateo

**Datos en candidatesData.ts:**
```typescript
// ❌ NO EXISTE - No hay campo 'documents' en candidatesData
```

**✅ ACCIÓN NECESARIA:**
- Crear estructura de documentos mock por candidato
- O mantener documentos genéricos pero con nombre dinámico del candidato

---

### 8️⃣ **ActivityHubPanel.tsx**
**Ubicación:** `/src/app/components/ActivityHubPanel.tsx`

#### **Tab: Serena AI Copilot**
**Datos que muestra:**
- Conversación con IA sobre el candidato
- Respuestas contextuales

**Estado actual:** ❌ **HARDCODEADO** con información de Mateo (Backend Developer)

**Datos en candidatesData.ts:**
- Necesita acceso a TODA la información del candidato para generar respuestas coherentes

**✅ ACCIÓN NECESARIA:**
- Crear sistema de respuestas dinámicas basado en:
  - experience
  - skills
  - yearsExperience
  - currentStage
  - scores

#### **Tab: Actividad**
**Datos que muestra:**
- Timeline de eventos:
  - Aplicación recibida
  - CV evaluado
  - Etapa cambiada
  - Comentarios añadidos
  - etc.

**Estado actual:** ❌ **HARDCODEADO** con actividades de Mateo

**Datos en candidatesData.ts:**
```typescript
{
  appliedDate: string;    // ✅ Existe
  currentStage: string;   // ✅ Existe
  // ❌ FALTA: Array de actividades/eventos
}
```

**✅ ACCIÓN NECESARIA:**
- Crear sistema de actividades dinámicas basado en:
  - Fecha de aplicación
  - Etapa actual
  - Scores disponibles
  - Estado (active/rejected/hired)

#### **Tab: Comentarios**
**Datos que muestra:**
- Lista de comentarios por etapa
- Autor, fecha, texto, etapa

**Estado actual:** ❌ **HARDCODEADO** en CandidateDetailDrawer

**Datos en candidatesData.ts:**
```typescript
{
  notes: string[];        // ✅ Existe (pero son strings simples)
  // ❌ FALTA: Estructura completa de comentarios con autor, fecha, etapa
}
```

**✅ ACCIÓN NECESARIA:**
- Convertir `notes` en comentarios con estructura completa
- O crear comentarios mock basados en las notes existentes

#### **Tab: To-Dos**
**Datos que muestra:**
- Lista de tareas pendientes
- Asignado a, fecha límite, estado

**Estado actual:** ❌ **HARDCODEADO** en CandidateDetailDrawer

**Datos en candidatesData.ts:**
```typescript
// ❌ NO EXISTE - No hay campo 'tasks' o 'todos'
```

**✅ ACCIÓN NECESARIA:**
- Crear tareas genéricas basadas en la etapa actual del candidato
- Por ejemplo, si está en "evaluacion-cv" → "Revisar CV completo"

#### **Tab: Entrevistas**
**Datos que muestra:**
- Lista de entrevistas programadas/realizadas

**Estado actual:** ❓ **REVISAR**

**Datos en candidatesData.ts:**
```typescript
// ❌ NO EXISTE - No hay campo 'interviews'
```

#### **Tab: Mensajes**
**Datos que muestra:**
- Historial de mensajes con el candidato

**Estado actual:** ❓ **REVISAR**

**Datos en candidatesData.ts:**
```typescript
// ❌ NO EXISTE - No hay campo 'messages'
```

---

## 📊 RESUMEN DE DATOS FALTANTES EN `candidatesData.ts`

### ✅ Campos que YA EXISTEN:
- `id`
- `name`
- `email`
- `phone`
- `age`
- `location`
- `avatar`
- `currentStage`
- `status`
- `appliedDate`
- `expectedSalary`
- `availability`
- `yearsExperience`
- `experience` (company, position, duration, description)
- `education` (institution, degree, year)
- `skills` (technical, soft)
- `portfolio`
- `scores`
- `notes`
- `rejectionReason` (opcional)

### ❌ Campos que FALTAN (necesarios para la vista completa):

#### **Información Personal:**
- `firstName` (extraer de name)
- `lastName` (extraer de name)
- `identificationNumber` (cédula)
- `identificationType` (ej: "Cédula de Ciudadanía")
- `nationality` (ej: "Colombiana")
- `linkedin` (URL del perfil)
- `birthDate` (ej: "15/03/1992")

#### **Ubicación:**
- `country` (extraer de location)
- `city` (extraer de location)
- `willingToRelocate` (boolean)
- `interestedLocations` (array, opcional)

#### **Información Laboral:**
- `noticePeriod` (ej: "2")
- `noticePeriodUnit` (ej: "Semanas")
- `currency` (ej: "Peso colombiano (COP)")

#### **Perfil:**
- `description` (resumen profesional largo)
- `matchScore` (% de match con vacante)
- `confidence` ("high" | "medium" | "low")

#### **Experiencia (mejorar estructura):**
- `location` por cada trabajo
- `startDate` y `endDate` (parsear de duration)
- `current` (boolean)
- `achievements` (array, opcional)

#### **Documentos:**
- `documents` (array de documentos subidos)

#### **Actividad:**
- `activities` (timeline de eventos)
- `comments` (estructura completa vs notes simples)
- `tasks` (to-dos)
- `interviews` (entrevistas)
- `messages` (mensajes)

---

## 🎯 PLAN DE ACCIÓN PARA MARÍA GARCÍA

### **FASE 1: Preparar datos base (30 min)**
1. ✅ Revisar datos actuales de María en candidatesData.ts (línea 67-135)
2. ❌ Agregar campos faltantes a su registro:
   - Separar nombre en firstName/lastName
   - Extraer city/country de location
   - Agregar identificationNumber
   - Agregar linkedin
   - Agregar description (resumen profesional)
   - Mapear cvScore → matchScore
   - Parsear experience duration → startDate/endDate/current

### **FASE 2: Modificar componentes para recibir datos (1 hora)**
1. ❌ `CandidateDetailDrawer.tsx`:
   - Buscar candidato en candidatesData por ID
   - Pasar datos a todos los componentes hijos

2. ❌ `GeneralInfoSection.tsx`:
   - Remover mockCandidate
   - Recibir datos como prop
   - Mapear todos los campos

3. ❌ `ExperienceSection.tsx`:
   - Remover mockExperiences
   - Recibir datos como prop
   - Parsear duration

4. ❌ `EducationSection.tsx`:
   - Pasar datos de education

5. ❌ `StagesSection.tsx`:
   - Recibir currentStage y scores
   - Calcular progreso dinámicamente

6. ❌ `ActivityHubPanel.tsx`:
   - Generar actividades basadas en appliedDate y currentStage
   - Convertir notes en comentarios
   - Crear tareas basadas en etapa

7. ❌ `DocumentsSection.tsx`:
   - Usar nombre del candidato en documentos mock

### **FASE 3: Probar con María (30 min)**
1. ❌ Navegar a María García
2. ❌ Verificar que TODA la información se muestra correctamente
3. ❌ Verificar que NO queda nada de Mateo

### **FASE 4: Crear template reutilizable**
1. ❌ Documentar el proceso
2. ❌ Crear helper functions para parsear datos
3. ❌ Preparar para replicar en otros candidatos

---

## 🔧 HELPERS NECESARIOS

```typescript
// utils/candidateHelpers.ts

// Dividir nombre completo
export function splitFullName(fullName: string) {
  const parts = fullName.split(' ');
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ')
  };
}

// Extraer ciudad y país
export function parseLocation(location: string) {
  const [city, country] = location.split(',').map(s => s.trim());
  return { city, country };
}

// Parsear duración a fechas
export function parseDuration(duration: string) {
  // "Ene 2024 - Presente" → { startDate: "Enero 2024", endDate: null, current: true }
  // "Mar 2022 - Dic 2023" → { startDate: "Marzo 2022", endDate: "Diciembre 2023", current: false }
  const [start, end] = duration.split(' - ').map(s => s.trim());
  return {
    startDate: start,
    endDate: end === 'Presente' ? null : end,
    current: end === 'Presente'
  };
}

// Generar actividades basadas en datos del candidato
export function generateActivities(candidate: CandidateData) {
  const activities = [];
  // Agregar actividad de aplicación
  // Agregar actividades según etapa actual
  // etc.
  return activities;
}

// Convertir notes en comentarios
export function notesToComments(notes: string[], candidate: CandidateData) {
  return notes.map((note, index) => ({
    id: `comment-${index}`,
    text: note,
    author: 'Evaluador',
    authorInitials: 'EV',
    timestamp: new Date(),
    stageId: candidate.currentStage,
    stageName: getStageLabel(candidate.currentStage),
    isPrivate: false
  }));
}
```

---

## 📌 NOTAS IMPORTANTES

1. **NO tocar la estructura de candidatesData.ts todavía** - Solo agregar campos a registros individuales
2. **Hacer cambios incrementales** - Componente por componente
3. **Probar cada cambio** - Ver que María se ve bien antes de seguir
4. **Mantener compatibilidad** - Los otros candidatos deben seguir funcionando
5. **Documentar todo** - Para poder replicar en los 21 candidatos restantes

---

## ✅ CHECKLIST FINAL

- [ ] Completar datos de María García en candidatesData.ts
- [ ] CandidateHeader recibe datos dinámicos
- [ ] GeneralInfoSection recibe datos dinámicos
- [ ] ExperienceSection recibe datos dinámicos
- [ ] EducationSection recibe datos dinámicos
- [ ] StagesSection recibe datos dinámicos
- [ ] DocumentsSection usa nombre dinámico
- [ ] ActivityHubPanel - Tab Serena responde según candidato
- [ ] ActivityHubPanel - Tab Actividad generado dinámicamente
- [ ] ActivityHubPanel - Tab Comentarios desde notes
- [ ] ActivityHubPanel - Tab To-Dos según etapa
- [ ] Probar navegación María → Mateo → María
- [ ] Verificar que no hay información cruzada
- [ ] Documentar proceso para siguiente candidato
