import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Briefcase, MapPin, Calendar, Plus, Trash2, Edit2, X, Check, AlertCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { toast } from 'sonner';
import { DatePicker } from '../ui/date-picker';
import { format, isValid } from 'date-fns';
import { parseFlexibleDate } from '../../utils/dateUtils';

interface Experience {
  id?: string;
  company: string;
  position?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  duration?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
}

interface ExperienceSectionProps {
  experiences?: Experience[];
  isEditMode?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
  onDataChange?: (experiences: Experience[]) => void;
  isValentina?: boolean;
}

const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'UX/UI Designer',
    company: 'Habi',
    location: 'Bogotá, Colombia',
    startDate: '2023-03-01',
    endDate: null,
    current: true,
    description: 'Diseño de interfaces para plataforma de compra-venta de inmuebles. Trabajo en equipo de producto enfocado en optimizar el flujo de búsqueda y cotización de propiedades.',
    achievements: [
      'Rediseñé el flujo de búsqueda de propiedades mejorando la usabilidad',
      'Colaboré con equipos de desarrollo en implementación de nuevas features',
      'Participé en sesiones de user research para validar diseños'
    ]
  },
  {
    id: '2',
    title: 'Diseñador Digital',
    company: 'Estudio Creativo Digital',
    location: 'Bogotá, Colombia',
    startDate: '2022-01-01',
    endDate: '2023-02-28',
    current: false,
    description: 'Diseño de experiencias web y móviles para diversos clientes. Colaboración con desarrolladores y gestores de proyecto en metodología ágil.',
    achievements: [
      'Diseñé más de 10 proyectos web y móviles para diferentes clientes',
      'Implementé flujos de trabajo colaborativos con desarrollo',
      'Aprendí metodología ágil aplicada al diseño'
    ]
  }
];

const formatDateString = (dateStr: string | null | undefined) => {
  if (!dateStr) return '';
  try {
    const [year, month] = dateStr.split('-');
    if (!month) return year;
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[parseInt(month) - 1]} ${year}`;
  } catch (e) {
    return dateStr;
  }
};

export function ExperienceSection({ experiences, isEditMode = false, onEditingChange, onDataChange, isValentina = false }: ExperienceSectionProps) {
  const safeExperiences = Array.isArray(experiences) ? experiences : (experiences === undefined ? mockExperiences : []);
  
  const experiencesWithIds = useMemo(() => safeExperiences.map((exp, index) => ({
    ...exp,
    id: exp.id || `exp-${index}`
  })), [safeExperiences]);
  
  const [experienceList, setExperienceList] = useState<Experience[]>(experiencesWithIds);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Experience | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const editingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExperienceList(experiencesWithIds);
  }, [experiencesWithIds]);

  const updateExperiences = (newList: Experience[]) => {
    setExperienceList(newList);
    onDataChange?.(newList);
  };

  useEffect(() => {
    if (editingId && editingRef.current) {
      const timer = setTimeout(() => {
        editingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [editingId]);

  useEffect(() => {
    onEditingChange?.(editingId !== null);
  }, [editingId, onEditingChange]);

  const handleEdit = (exp: Experience) => {
    if (isValentina) {
      toast.error('Error al editar información laboral.');
      return;
    }
    setEditingId(exp.id!);
    setEditForm({ ...exp });
    setFormErrors([]);
    setIsCreatingNew(false);
  };

  const handleCancelEdit = () => {
    if (isCreatingNew && editForm) {
      setExperienceList(prev => prev.filter(exp => exp.id !== editForm.id));
    }
    setEditingId(null);
    setEditForm(null);
    setFormErrors([]);
    setIsCreatingNew(false);
  };

  const handleSaveEdit = () => {
    if (!editForm) return;

    const mandatoryFields = ['title', 'company', 'location', 'startDate'];
    if (!editForm.current) mandatoryFields.push('endDate');

    const errors = mandatoryFields.filter(field => {
      const val = (editForm as any)[field];
      return !val || val.toString().trim() === '';
    });

    if (errors.length > 0) {
      setFormErrors(errors);
      toast.error('Completa los campos obligatorios *');
      return;
    }

    const newList = experienceList.map(exp => exp.id === editForm.id ? editForm : exp);
    updateExperiences(newList);
    setEditingId(null);
    setEditForm(null);
    setFormErrors([]);
    setIsCreatingNew(false);
    toast.success('Experiencia guardada');
  };

  const handleAdd = () => {
    if (isValentina) {
      toast.error('Creación deshabilitada temporalmente.');
      return;
    }
    const newExp: Experience = {
      id: `new-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: null,
      current: false,
      description: '',
      achievements: []
    };
    setExperienceList(prev => [...prev, newExp]);
    setEditingId(newExp.id!);
    setEditForm(newExp);
    setFormErrors([]);
    setIsCreatingNew(true);
  };

  const updateEditForm = (field: keyof Experience, value: any) => {
    setEditForm(prev => prev ? ({ ...prev, [field]: value }) : null);
    if (formErrors.includes(field)) {
      setFormErrors(prev => prev.filter(f => f !== field));
    }
  };

  return (
    <div className="space-y-6 min-h-[400px]">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Experiencia Laboral</h2>
            <p className="text-sm text-gray-600">{experienceList.length} posiciones</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {experienceList.map((exp) => (
          <div
            key={exp.id}
            className={cn(
              "bg-white rounded-lg border p-6 transition-all",
              deletingId === exp.id ? 'border-red-300 bg-red-50' : 
              editingId === exp.id ? 'border-blue-400 bg-white shadow-xl ring-1 ring-blue-100' : 
              'border-gray-200 hover:shadow-md'
            )}
          >
            {editingId === exp.id && editForm ? (
              <div className="space-y-4" ref={editingRef}>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest">
                    {isCreatingNew ? 'Nueva Experiencia' : 'Editar Experiencia'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={handleSaveEdit} className="px-3 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">Guardar</button>
                    <button onClick={handleCancelEdit} className="px-3 py-1.5 bg-white text-gray-700 text-sm font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Cancelar</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Cargo *</label>
                    <input
                      type="text"
                      value={editForm.title || editForm.position || ''}
                      onChange={(e) => updateEditForm('title', e.target.value)}
                      className={cn("w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2", formErrors.includes('title') ? "border-red-500" : "border-gray-300 focus:ring-blue-500")}
                      placeholder="ej. Senior Product Designer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Empresa *</label>
                    <input
                      type="text"
                      value={editForm.company || ''}
                      onChange={(e) => updateEditForm('company', e.target.value)}
                      className={cn("w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2", formErrors.includes('company') ? "border-red-500" : "border-gray-300 focus:ring-blue-500")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Ubicación *</label>
                  <input
                    type="text"
                    value={editForm.location || ''}
                    onChange={(e) => updateEditForm('location', e.target.value)}
                    className={cn("w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2", formErrors.includes('location') ? "border-red-500" : "border-gray-300 focus:ring-blue-500")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Fecha Inicio *</label>
                    <DatePicker
                      date={parseFlexibleDate(editForm.startDate)}
                      onChange={(date) => date && isValid(date) && updateEditForm('startDate', format(date, 'yyyy-MM-dd'))}
                      error={formErrors.includes('startDate')}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Fecha Fin {!editForm.current && '*'}</label>
                    <DatePicker
                      date={parseFlexibleDate(editForm.endDate)}
                      onChange={(date) => updateEditForm('endDate', (date && isValid(date)) ? format(date, 'yyyy-MM-dd') : null)}
                      disabled={editForm.current}
                      error={!editForm.current && formErrors.includes('endDate')}
                    />
                  </div>
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <input type="checkbox" checked={editForm.current} onChange={e => updateEditForm('current', e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Actualmente trabajo aquí</span>
                </label>

                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => updateEditForm('description', e.target.value)}
                  placeholder="Descripción de responsabilidades..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                />
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.position || exp.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 font-medium">{exp.company} {exp.current && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Actual</span>}</p>
                  <div className="flex gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {exp.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {formatDateString(exp.startDate)} - {exp.current ? 'Presente' : formatDateString(exp.endDate)}</span>
                  </div>
                  {exp.description && <p className="mt-3 text-sm text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
                {isEditMode && (
                  <button onClick={() => handleEdit(exp)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        ))}
        
        {isEditMode && !editingId && (
          <button onClick={handleAdd} className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border transition-colors shadow-sm"><Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" /></div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-[0.2em]">Agregar experiencia laboral</span>
          </button>
        )}
      </div>
    </div>
  );
}