import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  X,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  ListOrdered,
  Minus,
  MoreVertical,
  Trash2,
  Edit2,
  Check,
  Move,
  User,
  Info,
  Flag,
  Search,
  Filter,
  Lightbulb,
  Download,
  Upload,
  FileUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { cn } from './ui/utils';
import { Task } from './CandidateDetailDrawer';

interface ToDoTabProps {
  isCreatingTask?: boolean;
  onCreatingChange?: (isCreating: boolean) => void;
  focusNameInput?: boolean;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  highlightedTaskId?: string | null;
  setHighlightedTaskId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ToDoTab({ 
  isCreatingTask, 
  onCreatingChange, 
  focusNameInput,
  tasks,
  setTasks,
  highlightedTaskId,
  setHighlightedTaskId
}: ToDoTabProps) {
  const [isCreating, setIsCreating] = useState(isCreatingTask || false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Abrir automáticamente la tarea cuando se resalta desde actividades
  useEffect(() => {
    if (highlightedTaskId) {
      const taskToOpen = tasks.find(t => t.id === highlightedTaskId);
      if (taskToOpen) {
        setSelectedTask(taskToOpen);
        // Cerrar el formulario de creación si estaba abierto
        setIsCreating(false);
      }
    }
  }, [highlightedTaskId, tasks]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPlan, setTaskPlan] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [detailsAccordionOpen, setDetailsAccordionOpen] = useState(true);
  const [userSelectionOpen, setUserSelectionOpen] = useState(false);
  const [assignmentType, setAssignmentType] = useState<'platform' | 'excel'>('platform');
  const [searchUser, setSearchUser] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(2); // March (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2026);
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOrderBy, setFilterOrderBy] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriorityFilter, setFilterPriorityFilter] = useState('');
  const [filterAssignedTo, setFilterAssignedTo] = useState('');
  const [filterCreatedBy, setFilterCreatedBy] = useState('');
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [filterPanelPosition, setFilterPanelPosition] = useState({ top: 0, right: 0 });

  // Calcular posición del panel de filtros
  useEffect(() => {
    if (showFilters && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setFilterPanelPosition({
        top: rect.bottom + 8, // 8px debajo del botón
        right: window.innerWidth - rect.right
      });
    }
  }, [showFilters]);

  // Sincronizar con prop externa
  useEffect(() => {
    if (isCreatingTask !== undefined) {
      setIsCreating(isCreatingTask);
    }
  }, [isCreatingTask]);

  // Focus en el input cuando se abre el formulario
  useEffect(() => {
    if (isCreating && focusNameInput && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isCreating, focusNameInput]);

  const handleIsCreatingChange = (value: boolean) => {
    setIsCreating(value);
    if (onCreatingChange && typeof onCreatingChange === 'function') {
      onCreatingChange(value);
    }
  };

  // Función para calcular el estado automático basado en la fecha y finalización
  const getTaskStatus = (task: Task, isCompleted: boolean): 'por iniciar' | 'vencida' | 'finalizada' => {
    if (isCompleted) {
      return 'finalizada';
    }
    
    if (task.dueDate) {
      // Parse fecha DD/MM/YYYY
      const [day, month, year] = task.dueDate.split('/').map(Number);
      const dueDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        return 'vencida';
      }
    }
    
    return 'por iniciar';
  };

  // Actualizar estados automáticamente cuando cambian las tareas
  useEffect(() => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      status: getTaskStatus(task, task.status === 'finalizada')
    }));
    
    // Solo actualizar si hay cambios
    if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
      setTasks(updatedTasks);
    }
  }, []);  // Solo ejecutar al montar

  const mockUsers = [
    'Julián Melo',
    'Julio Rafael Escobar Montes',
    'Juan Camilo Restrepo',
    'Leonardo Segura Vásquez',
    'Daniela Roa Díaz',
    'Angélica Altamirano Santa',
    'Edison Fabian Avila Reina',
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.toLowerCase().includes(searchUser.toLowerCase())
  );

  const taskStats = {
    porIniciar: tasks.filter(t => t.status === 'por iniciar').length,
    vencidas: tasks.filter(t => t.status === 'vencida').length,
    finalizadas: tasks.filter(t => t.status === 'finalizada').length,
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    
    // Días vacíos del mes anterior
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 10 && selectedMonth === 2 && selectedYear === 2026;
      days.push(
        <button
          key={day}
          onClick={() => {
            const dateStr = `${String(day).padStart(2, '0')}/${String(selectedMonth + 1).padStart(2, '0')}/${selectedYear}`;
            setTaskDueDate(dateStr);
            setShowDatePicker(false);
          }}
          className={cn(
            'p-2 text-sm rounded hover:bg-blue-50 transition-colors relative',
            isToday && 'font-bold'
          )}
        >
          {day}
          {isToday && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
          )}
        </button>
      );
    }
    
    return days;
  };

  const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  // Función para descargar plantilla de usuarios
  const handleDownloadTemplate = () => {
    const csvContent = `Nombre,Email,Departamento\nJuan Pérez,juan.perez@ejemplo.com,Tecnología\nMaría García,maria.garcia@ejemplo.com,Recursos Humanos\nCarlos López,carlos.lopez@ejemplo.com,Ventas`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_usuarios.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para manejar la selección de archivos
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        alert('Por favor selecciona un archivo CSV o Excel');
        return;
      }
      
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo no puede superar los 5MB');
        return;
      }
      
      setSelectedFile(file);
      // Aquí podrías procesar el archivo y extraer los usuarios
      console.log('Archivo seleccionado:', file.name);
    }
  };

  // Función para manejar drag & drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        alert('Por favor selecciona un archivo CSV o Excel');
        return;
      }
      
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo no puede superar los 5MB');
        return;
      }
      
      setSelectedFile(file);
      console.log('Archivo cargado:', file.name);
    }
  };

  const handleCreateTask = () => {
    if (!taskName.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      status: 'por iniciar',
      dueDate: taskDueDate || undefined,
      assignee: selectedUsers.length > 0 ? { name: selectedUsers[0] } : undefined,
    };

    setTasks([...tasks, newTask]);
    
    // Reset form
    setTaskName('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPlan('');
    setSelectedPriority('');
    setSelectedUsers([]);
    setSearchUser('');
    handleIsCreatingChange(false);
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      {selectedTask ? (
        // Detalle de la tarea
        <div className="flex flex-col h-full min-h-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Header */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900">Detalle de la tarea</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedTask(null);
                    if (setHighlightedTaskId) {
                      setHighlightedTaskId(null);
                    }
                  }}
                  className="h-8 w-8 p-0 rounded-md border border-gray-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Si haces algún cambio, quedará aplicado inmediatamente
              </p>
            </div>

            {/* Estado - Badge informativo (no editable) */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">Estado:</span>
              <div className={cn(
                "px-3 py-1 text-sm font-medium rounded-md flex items-center gap-1.5",
                selectedTask.status === 'por iniciar' && "bg-blue-50 text-blue-700 border border-blue-200",
                selectedTask.status === 'vencida' && "bg-red-50 text-red-700 border border-red-200",
                selectedTask.status === 'finalizada' && "bg-green-50 text-green-700 border border-green-200"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  selectedTask.status === 'por iniciar' && "bg-blue-600",
                  selectedTask.status === 'vencida' && "bg-red-600",
                  selectedTask.status === 'finalizada' && "bg-green-600"
                )} />
                {selectedTask.status === 'por iniciar' ? 'Por iniciar' : 
                 selectedTask.status === 'vencida' ? 'Vencida' : 'Finalizada'}
              </div>
            </div>

            {/* Prioridad */}
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
              <Flag className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Prioridad Baja</span>
            </button>

            {/* Colaborador */}
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Colaborador</span>
            </button>

            {/* Comentarios y evidencias */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  Comentarios y evidencias
                </h4>
                <p className="text-sm text-gray-500">
                  Mira el historial de esta tarea
                </p>
              </div>

              {/* Botón agregar comentarios */}
              <button 
                onClick={() => setShowCommentInput(true)}
                className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar comentarios
              </button>

              {/* Modal de agregar/editar comentario */}
              {showCommentInput && (
                <div className="space-y-2">
                  <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    className="w-full min-h-[80px]"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowCommentInput(false);
                        setCommentText('');
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (commentText.trim()) {
                          // Guardar el comentario
                          const taskIndex = tasks.findIndex(t => t.id === selectedTask.id);
                          if (taskIndex !== -1) {
                            const newTasks = [...tasks];
                            const newComment = {
                              id: Date.now().toString(),
                              text: commentText,
                              author: 'Usuario Actual',
                              date: new Date().toLocaleString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            };
                            
                            if (!newTasks[taskIndex].comments) {
                              newTasks[taskIndex].comments = [];
                            }
                            newTasks[taskIndex].comments!.push(newComment);
                            setTasks(newTasks);
                            
                            // Actualizar la tarea seleccionada
                            setSelectedTask(newTasks[taskIndex]);
                          }
                        }
                        setShowCommentInput(false);
                        setCommentText('');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              )}

              {/* Lista de comentarios */}
              <div className="space-y-3">
                {selectedTask.comments && selectedTask.comments.length > 0 ? (
                  selectedTask.comments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onEdit={(commentId) => {
                        const commentToEdit = selectedTask.comments?.find(c => c.id === commentId);
                        if (commentToEdit) {
                          setCommentText(commentToEdit.text);
                          setShowCommentInput(true);
                          // Aquí podrías agregar lógica para editar en lugar de crear
                        }
                      }}
                      onDelete={(commentId) => {
                        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                          const taskIndex = tasks.findIndex(t => t.id === selectedTask.id);
                          if (taskIndex !== -1) {
                            const newTasks = [...tasks];
                            newTasks[taskIndex].comments = newTasks[taskIndex].comments?.filter(c => c.id !== commentId);
                            setTasks(newTasks);
                            setSelectedTask(newTasks[taskIndex]);
                          }
                        }
                      }}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-8">No hay comentarios aún</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions - Pegado al fondo */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
            <button 
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                  setTasks(tasks.filter(t => t.id !== selectedTask.id));
                  setSelectedTask(null);
                  if (setHighlightedTaskId) {
                    setHighlightedTaskId(null);
                  }
                }
              }}
              className="p-2 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
            <Button
              onClick={() => {
                const taskIndex = tasks.findIndex(t => t.id === selectedTask.id);
                if (taskIndex !== -1) {
                  const newTasks = [...tasks];
                  newTasks[taskIndex].status = 'finalizada';
                  setTasks(newTasks);
                  setSelectedTask(null);
                  if (setHighlightedTaskId) {
                    setHighlightedTaskId(null);
                  }
                }
              }}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Finalizar tarea
            </Button>
          </div>
        </div>
      ) : isCreating ? (
        // Formulario de creación
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header fijo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
            <h3 className="font-semibold text-gray-900">Nueva tarea</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleIsCreatingChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Sección 1: Detalle de la tarea */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setDetailsAccordionOpen(!detailsAccordionOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">1 Detalle de la tarea</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Selecciona el enfoque de creación que te resulte más práctico para avanzar más rápido.
                  </p>
                </div>
                {detailsAccordionOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {detailsAccordionOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <Input
                      ref={nameInputRef}
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value.slice(0, 250))}
                      placeholder="Escribe un título breve"
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Máximo de caracteres</span>
                      <span className="text-gray-500">{taskName.length}/250</span>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900">Descripción</label>
                    <div className="border border-gray-300 rounded-md">
                      <Textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Agrega un texto claro y conciso"
                        className="border-0 resize-none min-h-[100px] focus-visible:ring-0"
                        rows={4}
                      />
                      {/* Toolbar */}
                      <div className="border-t border-gray-200 px-2 py-1.5 flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <Bold className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <Italic className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <Underline className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <AlignLeft className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <List className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <ListOrdered className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Fecha de finalización */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900">Fecha de finalización</label>
                    <div className="relative">
                      <Input
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                        placeholder="día/mes/año"
                        className="w-full pr-9"
                        onFocus={() => setShowDatePicker(true)}
                      />
                      <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>

                      {/* Date Picker Popup */}
                      {showDatePicker && (
                        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-72">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <button
                              onClick={() => {
                                if (selectedMonth === 0) {
                                  setSelectedMonth(11);
                                  setSelectedYear(selectedYear - 1);
                                } else {
                                  setSelectedMonth(selectedMonth - 1);
                                }
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ChevronDown className="w-4 h-4 rotate-90" />
                            </button>
                            
                            <div className="flex items-center gap-1.5">
                              <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                className="px-1.5 py-1 border border-gray-200 rounded text-xs font-medium"
                              >
                                {monthNames.map((month, idx) => (
                                  <option key={month} value={idx}>{month}</option>
                                ))}
                              </select>
                              <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="px-1.5 py-1 border border-gray-200 rounded text-xs font-medium"
                              >
                                {[2024, 2025, 2026, 2027, 2028].map(year => (
                                  <option key={year} value={year}>{year}</option>
                                ))}
                              </select>
                            </div>

                            <button
                              onClick={() => {
                                if (selectedMonth === 11) {
                                  setSelectedMonth(0);
                                  setSelectedYear(selectedYear + 1);
                                } else {
                                  setSelectedMonth(selectedMonth + 1);
                                }
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                          </div>

                          {/* Calendar Grid */}
                          <div className="grid grid-cols-7 gap-0.5 text-center mb-1.5">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                              <div key={day} className="text-xs font-medium text-gray-600 p-1.5">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-0.5">
                            {renderCalendar()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Plan de asignación */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <label className="text-sm font-medium text-gray-900">¿A qué plan quieres asignarlo?</label>
                      <Info className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <select
                      value={taskPlan}
                      onChange={(e) => setTaskPlan(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona un plan existente</option>
                      <option value="plan1">Plan de onboarding</option>
                      <option value="plan2">Plan de evaluación técnica</option>
                      <option value="plan3">Plan de cultura organizacional</option>
                    </select>
                  </div>

                  {/* Prioridad */}
                  <div className="relative space-y-1.5">
                    <label className="text-sm font-medium text-gray-900">Prioridad</label>
                    <button
                      type="button"
                      onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                        showPriorityDropdown 
                          ? "bg-blue-50 text-blue-600 border border-blue-200" 
                          : "bg-white text-blue-600 border border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      <Flag className="w-4 h-4" />
                      {selectedPriority 
                        ? selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1)
                        : 'Elegir una prioridad'}
                    </button>
                    
                    {showPriorityDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                        <button
                          type="button"
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSelectedPriority('alta');
                            setShowPriorityDropdown(false);
                          }}
                        >
                          <ChevronUp className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-900">Alta</span>
                        </button>
                        <button
                          type="button"
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSelectedPriority('media');
                            setShowPriorityDropdown(false);
                          }}
                        >
                          <ChevronUp className="w-4 h-4 text-gray-600 rotate-90" />
                          <span className="text-gray-900">Media</span>
                        </button>
                        <button
                          type="button"
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSelectedPriority('baja');
                            setShowPriorityDropdown(false);
                          }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-900">Baja</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sección 2: Selección de usuarios */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setUserSelectionOpen(!userSelectionOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">2 Selección de usuarios</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Determina la forma de asignar participantes: uno a uno o carga desde Excel.
                  </p>
                </div>
                {userSelectionOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {userSelectionOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                  {/* Tipo de asignación */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                      ¿Cómo quieres asignar los usuarios? (Obligatorio)
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            checked={assignmentType === 'platform'}
                            onChange={() => setAssignmentType('platform')}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-white transition-all flex items-center justify-center">
                            {assignmentType === 'platform' && (
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 flex items-center gap-1.5 group-hover:text-gray-900">
                          Desde la plataforma
                          <Info className="w-3.5 h-3.5 text-gray-400" />
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            checked={assignmentType === 'excel'}
                            onChange={() => setAssignmentType('excel')}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-white transition-all flex items-center justify-center">
                            {assignmentType === 'excel' && (
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 flex items-center gap-1.5 group-hover:text-gray-900">
                          Desde un excel
                          <Info className="w-3.5 h-3.5 text-gray-400" />
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Búsqueda de usuarios */}
                  {assignmentType === 'platform' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                        ¿A quién se lo quieres asignar?
                        <Info className="w-3.5 h-3.5 text-gray-400" />
                      </label>
                      <Input
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        placeholder="Escribe un nombre o correo"
                        className="w-full"
                      />
                      
                      {/* Lista de usuarios */}
                      <div className="border border-gray-200 rounded-md max-h-[200px] overflow-y-auto">
                        {filteredUsers.map(user => (
                          <label
                            key={user}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors group"
                          >
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsers([...selectedUsers, user]);
                                  } else {
                                    setSelectedUsers(selectedUsers.filter(u => u !== user));
                                  }
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                                {selectedUsers.includes(user) && (
                                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{user}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Carga desde Excel */}
                  {assignmentType === 'excel' && (
                    <div className="space-y-3">
                      {/* Botón de descarga de plantilla */}
                      <button
                        type="button"
                        onClick={handleDownloadTemplate}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Descargar plantilla de ejemplo de usuarios
                      </button>

                      {/* Zona de carga de archivos */}
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 bg-white transition-colors",
                          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
                          selectedFile && "border-green-500 bg-green-50"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        {!selectedFile ? (
                          <div className="flex flex-col items-center justify-center text-center space-y-3">
                            {/* Ícono de archivo */}
                            <div className={cn(
                              "w-12 h-12 rounded-full border-2 flex items-center justify-center",
                              isDragging ? "border-blue-500" : "border-gray-300"
                            )}>
                              <FileUp className={cn(
                                "w-6 h-6",
                                isDragging ? "text-blue-500" : "text-gray-400"
                              )} />
                            </div>
                            
                            {/* Texto principal */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-1">
                                {isDragging ? "Suelta el archivo aquí" : "Subir archivos"}
                              </h4>
                              <p className="text-xs text-gray-500">
                                Elige o suelta un archivo CSV
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Máx. 1 archivos · Hasta 5 MB
                              </p>
                            </div>

                            {/* Botón de selección */}
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileSelect}
                              accept=".csv,.xlsx,.xls"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                              Seleccionar archivos
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center space-y-3">
                            {/* Ícono de éxito */}
                            <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                              <Check className="w-6 h-6 text-green-600" strokeWidth={3} />
                            </div>
                            
                            {/* Información del archivo */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-1">
                                Archivo cargado correctamente
                              </h4>
                              <p className="text-xs text-gray-700">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {(selectedFile.size / 1024).toFixed(2)} KB
                              </p>
                            </div>

                            {/* Botón para cambiar archivo */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = '';
                                }
                              }}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Cambiar archivo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer fijo con botones - MOVIDO FUERA DEL SCROLL */}
          <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => handleIsCreatingChange(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateTask}
                disabled={!taskName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Crear tarea
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Lista de tareas
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="p-4 border-b border-gray-200">
            {/* Search Bar y Filtros */}
            <div className="flex items-center justify-end gap-2 mb-4 relative">
              {/* Barra de búsqueda expandible */}
              <div className={cn(
                "flex items-center gap-2 transition-all duration-200",
                showSearchBar ? "flex-1" : ""
              )}>
                {showSearchBar && (
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busca tus tareas"
                    className="flex-1"
                    autoFocus
                  />
                )}
                <button 
                  onClick={() => {
                    setShowSearchBar(!showSearchBar);
                    if (showSearchBar) {
                      setSearchQuery('');
                    }
                  }}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    showSearchBar ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-100"
                  )}
                >
                  {showSearchBar ? (
                    <X className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>

              {/* Botón de filtros con dropdown */}
              <div className="relative">
                <button 
                  ref={filterButtonRef}
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    showFilters ? "bg-gray-200" : "hover:bg-gray-100"
                  )}
                >
                  <Filter className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-gray-900">{taskStats.porIniciar}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="font-medium text-gray-900">{taskStats.vencidas}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="font-medium text-gray-900">{taskStats.finalizadas}</span>
              </div>
            </div>
          </div>

          {/* Panel desplegable de filtros - FUERA del contenedor con overflow */}
          {showFilters && (
            <>
              {/* Overlay invisible para cerrar al hacer clic fuera */}
              <div 
                className="fixed inset-0 z-[100]"
                onClick={() => setShowFilters(false)}
              />
              
              {/* Panel de filtros - fixed para evitar que se corte */}
              <div 
                className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-[101] w-96 max-h-[calc(100vh-120px)] overflow-y-auto"
                style={{
                  top: `${filterPanelPosition.top}px`,
                  right: `${filterPanelPosition.right}px`
                }}
              >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Seleccionar filtros</h3>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-6">
                        Usa los filtros para encontrar rápidamente las tareas que necesitas gestionar.
                      </p>

                      <div className="space-y-4">
                        {/* Ordenar por */}
                        <div>
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            Ordenar por:
                          </label>
                          <select
                            value={filterOrderBy}
                            onChange={(e) => setFilterOrderBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Selecciona el orden que prefieras</option>
                            <option value="fecha">Fecha de creación</option>
                            <option value="nombre">Nombre</option>
                            <option value="prioridad">Prioridad</option>
                          </select>
                        </div>

                        {/* Estado de la tarea */}
                        <div>
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            Estado de la tarea:
                          </label>
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Selecciona un estado</option>
                            <option value="por iniciar">Por iniciar</option>
                            <option value="vencida">Vencida</option>
                            <option value="finalizada">Finalizada</option>
                          </select>
                        </div>

                        {/* Tipo de prioridad */}
                        <div>
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            Tipo de prioridad:
                          </label>
                          <select
                            value={filterPriorityFilter}
                            onChange={(e) => setFilterPriorityFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Selecciona una prioridad</option>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                          </select>
                        </div>

                        {/* Asignada a */}
                        <div>
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            Asignada a:
                          </label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              value={filterAssignedTo}
                              onChange={(e) => setFilterAssignedTo(e.target.value)}
                              placeholder="Busca a la persona asociada a la tarea"
                              className="pl-9"
                            />
                          </div>
                        </div>

                        {/* Creada por */}
                        <div>
                          <label className="text-sm font-medium text-gray-900 block mb-2">
                            Creada por:
                          </label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              value={filterCreatedBy}
                              onChange={(e) => setFilterCreatedBy(e.target.value)}
                              placeholder="Busca a la persona que creó la tarea"
                              className="pl-9"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setFilterOrderBy('');
                            setFilterStatus('');
                            setFilterPriorityFilter('');
                            setFilterAssignedTo('');
                            setFilterCreatedBy('');
                          }}
                          className="flex-1"
                        >
                          Limpiar filtros
                        </Button>
                        <Button
                          onClick={() => {
                            // Aplicar filtros
                            setShowFilters(false);
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Aplicar filtros
                        </Button>
                      </div>
                </div>
              </>
            )}

          {/* Task List */}
          <div className="flex-1 overflow-y-auto">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 last:border-b-0",
                  highlightedTaskId === task.id && "bg-blue-50 ring-2 ring-blue-400 ring-inset"
                )}
              >
                {/* Custom Checkbox */}
                <label className="flex-shrink-0 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={task.status === 'finalizada'}
                    onChange={() => {
                      const newTasks = [...tasks];
                      newTasks[index].status = task.status === 'finalizada' ? 'por iniciar' : 'finalizada';
                      setTasks(newTasks);
                    }}
                  />
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                    {task.status === 'finalizada' && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                </label>
                
                <span className={cn(
                  "flex-1 text-sm text-gray-700",
                  task.status === 'finalizada' && "line-through text-gray-500"
                )}>
                  {task.name}
                </span>

                {/* Indicador de estado */}
                {task.status === 'finalizada' ? (
                  <button className="p-1.5 border-2 border-green-500 bg-green-50 rounded-md hover:bg-green-100 transition-colors flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={2.5} />
                  </button>
                ) : task.status === 'vencida' ? (
                  <button className="p-1.5 border-2 border-red-500 bg-red-50 rounded-md hover:bg-red-100 transition-colors flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-600" strokeWidth={2.5} />
                  </button>
                ) : (
                  <button className="p-1.5 border-2 border-blue-500 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors flex-shrink-0">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                )}

                <button 
                  className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                  onClick={() => {
                    setSelectedTask(task);
                    if (setHighlightedTaskId) {
                      setHighlightedTaskId(null);
                    }
                  }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer con botón primario - Pegado al fondo */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <Button
              onClick={() => handleIsCreatingChange(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar tarea
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para mostrar comentarios
interface CommentCardProps {
  comment: {
    id: string;
    text: string;
    author: string;
    date: string;
  };
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
}

function CommentCard({ comment, onEdit, onDelete }: CommentCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Obtener las iniciales del autor
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0);
    }
    return name.charAt(0);
  };

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200 relative">
      <div className="flex items-start gap-3">
        {/* Avatar con gradiente */}
        <Avatar className="w-10 h-10">
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white text-sm font-medium">
            {getInitials(comment.author)}
          </div>
        </Avatar>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-900">{comment.author}</span>
            
            {/* Botón de menú de tres puntos */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 hover:bg-blue-50 rounded-md transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>

              {/* Menú desplegable */}
              {showMenu && (
                <>
                  {/* Overlay para cerrar el menú */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowMenu(false)}
                  ></div>
                  
                  {/* Menú */}
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[140px]">
                    <button
                      onClick={() => {
                        onEdit(comment.id);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        onDelete(comment.id);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mb-2">
            Actualizado el {comment.date}
          </p>
          
          <p className="text-sm text-gray-900">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}