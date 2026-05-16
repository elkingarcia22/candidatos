import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, Plus, Trash2, Edit2, X, Check, AlertCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { toast } from 'sonner';
import { DatePicker } from '../ui/date-picker';
import { YearPicker } from '../ui/year-picker';
import { format, isValid } from 'date-fns';
import { parseFlexibleDate } from '../../utils/dateUtils';

interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  gpa?: string;
  honors?: string;
  description?: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  endDate?: string | null;
  current?: boolean;
  credentialId?: string;
  url?: string;
}

interface EducationSectionProps {
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
    current?: boolean;
    description?: string;
  }>;
  certificates?: Certificate[];
  isEditMode?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
  onDataChange?: (data: { education: Education[], certificates: Certificate[] }) => void;
  isValentina?: boolean;
}

const mockEducation: Education[] = [
  {
    id: '1',
    degree: 'Diseño Gráfico',
    institution: 'Universidad Nacional de Colombia',
    field: 'Diseño Visual',
    startDate: '2017',
    endDate: '2021',
    current: false,
    gpa: '3.8/5.0',
    description: 'Formación en diseño gráfico y digital.'
  }
];

const mockCertificates: Certificate[] = [
  {
    id: '1',
    name: 'Curso de UX/UI Design',
    issuer: 'Platzi',
    date: '2022-05-01',
    endDate: '2024-05-01',
    current: false,
    credentialId: 'PLTZ-UX-2022-4567'
  }
];

export function EducationSection({ 
  education, 
  certificates,
  isEditMode = false,
  onEditingChange,
  onDataChange,
  isValentina = false
}: EducationSectionProps) {
  
  const convertedEducation: Education[] = useMemo(() => {
    if (education === undefined) return mockEducation;
    if (!education || education.length === 0) return [];
    
    return education.map((edu, index) => ({
      id: `edu-${index}`,
      degree: edu.degree || '',
      institution: edu.institution || '',
      field: edu.degree || '', 
      startDate: edu.year?.split(' - ')[0] || edu.year || '',
      endDate: edu.year?.split(' - ')[1] || null,
      current: edu.current || false,
      description: edu.description || ''
    }));
  }, [education]);

  const safeCertificates = Array.isArray(certificates) ? certificates : (certificates === undefined ? mockCertificates : []);
  
  const [educationList, setEducationList] = useState<Education[]>(convertedEducation);
  const [certificateList, setCertificateList] = useState<Certificate[]>(safeCertificates);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editEduForm, setEditEduForm] = useState<Education | null>(null);
  const [editCertForm, setEditCertForm] = useState<Certificate | null>(null);

  useEffect(() => { setEducationList(convertedEducation); }, [convertedEducation]);
  useEffect(() => { setCertificateList(safeCertificates); }, [safeCertificates]);

  const notifyChange = (newEdu: Education[], newCert: Certificate[]) => {
    onDataChange?.({ education: newEdu, certificates: newCert });
  };

  useEffect(() => {
    onEditingChange?.(editingEduId !== null || editingCertId !== null);
  }, [editingEduId, editingCertId, onEditingChange]);

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: `new-edu-${Date.now()}`,
      degree: '', institution: '', field: '', startDate: '', endDate: null, current: false, description: ''
    };
    setEducationList(prev => [...prev, newEdu]);
    setEditingEduId(newEdu.id);
    setEditEduForm(newEdu);
  };

  const handleSaveEducation = () => {
    if (!editEduForm) return;
    if (!editEduForm.degree || !editEduForm.institution || !editEduForm.startDate) {
      toast.error('Completa los campos obligatorios *');
      return;
    }
    const newList = educationList.map(edu => edu.id === editEduForm.id ? editEduForm : edu);
    setEducationList(newList);
    notifyChange(newList, certificateList);
    setEditingEduId(null);
    setEditEduForm(null);
    toast.success('Formación guardada');
  };

  const handleAddCert = () => {
    const newCert: Certificate = {
      id: `new-cert-${Date.now()}`,
      name: '', issuer: '', date: '', endDate: null, current: false
    };
    setCertificateList(prev => [...prev, newCert]);
    setEditingCertId(newCert.id);
    setEditCertForm(newCert);
  };

  const handleSaveCert = () => {
    if (!editCertForm) return;
    if (!editCertForm.name || !editCertForm.issuer || !editCertForm.date) {
      toast.error('Completa los campos obligatorios *');
      return;
    }
    const newList = certificateList.map(c => c.id === editCertForm.id ? editCertForm : c);
    setCertificateList(newList);
    notifyChange(educationList, newList);
    setEditingCertId(null);
    setEditCertForm(null);
    toast.success('Certificado guardado');
  };

  return (
    <div className="space-y-6 min-h-[400px]">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Educación y Certificaciones</h2>
            <p className="text-sm text-gray-600">{educationList.length} títulos • {certificateList.length} certificados</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Formación Académica</h3>
        {educationList.map((edu) => (
          <div key={edu.id} className={cn("bg-white rounded-lg border p-6 transition-all", editingEduId === edu.id ? "border-blue-400 shadow-xl ring-1 ring-blue-100" : "border-gray-200 hover:shadow-md")}>
            {editingEduId === edu.id && editEduForm ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <h4 className="text-xs font-bold text-blue-900 uppercase">Nueva Formación</h4>
                  <div className="flex gap-2">
                    <button onClick={handleSaveEducation} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Guardar</button>
                    <button onClick={() => {
                      setEducationList(prev => prev.filter(e => e.id !== edu.id));
                      setEditingEduId(null);
                    }} className="px-3 py-1.5 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200">Cancelar</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={editEduForm.degree || ''} placeholder="Título *" onChange={e => setEditEduForm({...editEduForm, degree: e.target.value})} className="col-span-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={editEduForm.institution || ''} placeholder="Institución *" onChange={e => setEditEduForm({...editEduForm, institution: e.target.value})} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Año Inicio *</label>
                    <YearPicker value={editEduForm.startDate || ''} onChange={val => setEditEduForm({...editEduForm, startDate: val})} className="w-full" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-600 italic">{edu.institution}</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">{edu.startDate} - {edu.current ? 'Presente' : (edu.endDate || 'N/A')}</p>
                </div>
                {isEditMode && (
                  <button onClick={() => { setEditEduForm({...edu}); setEditingEduId(edu.id); }} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        ))}
        {isEditMode && !editingEduId && !editingCertId && (
          <button onClick={handleAddEducation} className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border transition-colors shadow-sm"><Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" /></div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-widest">Agregar formación</span>
          </button>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Certificaciones</h3>
        {certificateList.map((cert) => (
          <div key={cert.id} className={cn("bg-white rounded-lg border p-6 transition-all", editingCertId === cert.id ? "border-blue-400 shadow-xl ring-1 ring-blue-100" : "border-gray-200 hover:shadow-md")}>
            {editingCertId === cert.id && editCertForm ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <h4 className="text-xs font-bold text-blue-900 uppercase">Nueva Certificación</h4>
                  <div className="flex gap-2">
                    <button onClick={handleSaveCert} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Guardar</button>
                    <button onClick={() => {
                      setCertificateList(prev => prev.filter(c => c.id !== cert.id));
                      setEditingCertId(null);
                    }} className="px-3 py-1.5 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200">Cancelar</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={editCertForm.name || ''} placeholder="Nombre Certificación *" onChange={e => setEditCertForm({...editCertForm, name: e.target.value})} className="col-span-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={editCertForm.issuer || ''} placeholder="Emisor *" onChange={e => setEditCertForm({...editCertForm, issuer: e.target.value})} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Fecha de obtención *</label>
                    <DatePicker 
                      date={parseFlexibleDate(editCertForm.date)} 
                      onChange={date => date && isValid(date) && setEditCertForm({...editCertForm, date: format(date, 'yyyy-MM-dd')})} 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">{cert.date} - {cert.current ? 'Presente' : (cert.endDate || 'N/A')}</p>
                </div>
                {isEditMode && (
                  <button onClick={() => { setEditCertForm({...cert}); setEditingCertId(cert.id); }} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        ))}
        {isEditMode && !editingCertId && !editingEduId && (
          <button onClick={handleAddCert} className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border transition-colors shadow-sm"><Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" /></div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-widest">Agregar certificación</span>
          </button>
        )}
      </div>
    </div>
  );
}