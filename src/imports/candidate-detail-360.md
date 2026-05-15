Diseña una pantalla web desktop (1440×900) para el módulo de Reclutamiento de UBITS llamada “Detalle del candidato — Candidate 360°”. Debe estar inspirada en ATS modernos tipo split view: contenido del candidato a la izquierda y panel lateral derecho fijo con tabs (Activity, Comments, To-dos, Interviews, Messages). Estilo SaaS moderno, minimalista, fondo claro, componentes redondeados, sombras sutiles, tipografía sans. Usa Auto Layout en todo, constraints responsive, componentes reutilizables y variantes de estado.

1) Objetivo de la pantalla

Esta vista debe permitir en 10 segundos:

entender fit del candidato y la evidencia

ver qué ha pasado en el proceso end-to-end (timeline 360°)

detectar fallos operativos (correo falló, no show, SLA vencido)

ejecutar acciones sin salir de la pantalla (reintentar, reprogramar, mover etapa, enviar mensaje)

2) Layout general (2 columnas + barra de acciones)
Columna izquierda (≈65%) — “Dossier del candidato” (scroll)

Un layout tipo documento con secciones colapsables, inspirado en los referentes:

2.1 Header del candidato (sticky dentro de la columna izquierda)

Avatar circular + Nombre (ej: “Diana Paola Rodríguez Suárez”)

Ubicación (Medellín, Colombia)

Email + Teléfono

Tags chips (ej: “talentpool”, “swedish”, “marketing automation”)

Un mini indicador de Job match (ej: 78%) + “Confianza: Alta”

CTAs pequeños: Descargar CV, Copiar email, Compartir

2.2 Job cards (aplica a 1 o más vacantes)

Card principal: “Marketing Manager (Applied in London)” + estado (Applied/Sourced) + etapa actual (pill)

Barra de progreso de etapa (10% como en el referente)

Dropdown de etapa (ej: “Entrevista”) + botón “Rechazar”

Card secundaria opcional: “Activo en 1 vacante más” con link “Ver” + “Ocultar otras”

2.3 Secciones tipo acordeón (colapsables)

Crea 5 secciones con títulos y contenido de ejemplo:

Preguntas (Screening): Q&A simple

Job match breakdown: lista de requisitos del rol con ✅/⚠️/❌ y una frase de evidencia

Meetings / Agenda: entrevistas programadas con fecha/hora y botón “Reprogramar”

Interview feedback: resumen + link a scorecards

Resume / CV: visor PDF embebido (toolbar: page 1 of 1, zoom, “View as PDF”)

Barra de acciones flotante (sticky bottom)

Barra horizontal flotante inspirada en el referente con íconos y labels:

Rechazar

Siguiente etapa

Agendar

Comentar

Agregar To-do

Mensaje

Más
Al click “Más”, mostrar dropdown con:

“Agregar entrevista”

“Agregar documento”

“Data & privacy”

“Editar perfil”

“Mover a departamento”

3) Panel derecho (≈35%) — “Activity Hub” fijo con tabs

Panel fijo a la derecha con:

Título: Activity

Tabs: Activity | Comments | To-dos | Interviews | Messages

En la esquina superior derecha: icono “filtro” y “vista compacta”

4) Tab “Activity” (default): Timeline 360° estilo “Flight Recorder”

Diseña un feed vertical con agrupación por día (“Today”, “Yesterday”) y filtros arriba:

Dropdown: “All activity types” (All / Communications / Interviews / Evaluations / System)

Sort: “Most recent”

Search: “Search in activity…”

4.1 Estructura de cada item de Activity

Cada item debe incluir:

Avatar del actor + nombre (Sistema / Recruiter / Candidate / Serena IA / Integración)

Tipo de evento (badge): Trigger / Meeting / Interview / Message / Update / Stage change / System

Timestamp

Badge de estado: ✅ Success / ❌ Failed / ⏳ Pending / ⚠️ Warning

Texto corto (1–2 líneas)

Botón “Expand” para mostrar detalles (metadata) y CTAs contextuales

4.2 Ejemplos de eventos obligatorios (incluye todos)

Crea una lista realista (8–12 items) incluyendo:

✅ Application received (source: LinkedIn)

✅ CV uploaded → ✅ CV parsed by IA (skills detectadas)

✅ Email sent: Interview invite (mostrar subject)

❌ Email failed (SMTP 550) con CTAs: Retry, Switch to WhatsApp, View error

⏳ Serena IA interview scheduled con CTAs: Reschedule, Send reminder

⚠️ No show detected con CTAs: Re-invite, Mark unreachable

✅ Serena IA interview completed con CTAs: View highlights, Open transcript, Play audio

✅ Serena IA feedback generated (Score + confianza) con CTA Open evaluation

✅ Stage changed: Screening → Technical (by recruiter)

✅ To-do created: Send technical test (link al tab To-dos)

4.3 Stacked events (UX fuera de la caja)

Agrupa eventos relacionados en un mismo item expandible:

“Email: Sent → Delivered → Opened → Clicked”

“Serena: Scheduled → Started → Completed → Scored”
Cuando está colapsado, mostrar solo el resumen. Al expandir, mostrar la secuencia.

5) Card IA fijo en el panel derecho: “Serena Copilot”

Encima de los tabs (o fijo dentro del tab Activity, siempre visible) crea un card:

Serena IA — Resumen + Próxima acción

Título + indicador “Updated 2m ago”

Confidence: High/Medium/Low

5 bullets: fortalezas, gaps, riesgo principal

Sección “Evidence” con links:

“CV excerpt: Marketing Automation”

“Interview highlight 03:21”

Next Best Action:

Botón principal: “Send WhatsApp reminder”

Alternativas: “Move to next stage”, “Request availability”

Botones secundarios: “Generate feedback”, “Draft message”

Guardrails: link “Why this?” y “Report error”

6) Otros tabs del panel derecho (contenido realista)
Tab “Comments”

Lista tipo chat con @mentions (ej: “@sarah should we invite her to a case interview?”)

Input “Write a comment…” + toggle “Private”

Reacciones rápidas (👍 ✅)

Tab “To-dos”

Lista con checkboxes, dueño (avatar), due date

Un To-do ejemplo: “Book case interview in July!”

Popover “Quick schedule” con opciones: Today / Tomorrow / Next Monday + mini calendario

Tab “Interviews”

Lista: Interview 1, Skill/Scorecard

Botones: “Leave feedback”, “Edit feedback”

Al seleccionar, mostrar formulario de scorecard:

secciones por competencia (chips)

escala 1–5 como pills

campo Comments

botones: Cancel / Save draft / Save

Tab “Messages”

Thread con un mensaje destacado y metadata (estado: sent/delivered/opened)

Composer abajo con placeholder “Write a message…”

Botón “Templates” + adjuntar

7) Componentes a construir (obligatorio)

Crea componentes con variantes:

ActivityItem

Variantes: status (success/failed/pending/warning), type (email/interview/system/note/stage/todo)

Estado expand/collapse

StatusBadge (4 variantes)

TabBar (active/inactive)

FloatingActionBar

JobCard (single job / multi job)

SerenaCopilotCard

ScorecardScale 1–5

ToDoItem

8) Variantes de pantalla (3 frames)

Genera 3 frames:

Default: candidato con actividad completa y algunos success

Failure scenario: al menos 2 eventos failed (email failed, no show) con CTAs visibles

Empty state: sin CV + sin activity (mostrar empty states útiles: “No activity yet”, “Upload CV”)

9) Microcopy en español (consistente)

Textos ejemplo:

“Correo enviado”, “Entregado”, “Abierto”, “Clic en enlace”

“Fallo SMTP 550”, “Reintentar”, “Cambiar a WhatsApp”, “Ver error”

“Entrevista Serena programada”, “No show”, “Enviar recordatorio”

“Feedback generado por Serena IA”, “Ver transcripción”, “Ver highlights”

“Mover a etapa”, “Rechazar”, “Agregar To-do”, “Mensaje”

10) Estilo visual

Layout limpio, mucho espacio en blanco

Badges suaves y legibles

Íconos consistentes

Cards con border radius 12–16

Usar sistema de grilla y espaciado 8px

No usar colores chillones; priorizar neutrales + acentos

Entrega final: Frame principal + 2 variantes + set de componentes en una sección “Components”.

Si quieres que salga aún más “fuera de la caja”

Pega esta línea adicional al final (opcional):

“Agrega un mini indicador ‘Journey Health’ (Healthy/At risk/Stalled) cerca del título Activity, calculado por IA según fallos/SLA, y muestra sugerencias automáticas como chips accionables (Ej: ‘Reintentar email’, ‘Reagendar’, ‘Solicitar disponibilidad’).”