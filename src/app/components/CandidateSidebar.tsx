import React, { useState, useEffect } from 'react';
import { Layers, ChevronLeft, ChevronRight, Briefcase, GraduationCap, User, FileText, BriefcaseBusiness, History } from 'lucide-react';
import { cn } from './ui/utils';
import { Tooltip } from './ui/tooltip';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface CandidateSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode?: boolean;
  applications?: any[];
  activeApplicationId?: string | null;
  onApplicationChange?: (appId: string) => void;
  isDisabled?: boolean;
  isAndres?: boolean;
}

const generalSections: SidebarItem[] = [
  { id: 'generalInfo', label: 'Información General', icon: User },
  { id: 'experience', label: 'Experiencia Laboral', icon: Briefcase },
  { id: 'education', label: 'Educación', icon: GraduationCap },
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'vacancies', label: 'Vacantes', icon: BriefcaseBusiness },
];

export function CandidateSidebar({ 
  activeSection, 
  onSectionChange, 
  isEditMode,
  applications,
  activeApplicationId,
  onApplicationChange,
  isDisabled = false,
  isAndres = false
}: CandidateSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse after 1.5 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderItem = (item: SidebarItem) => {
    let label = item.label;
    let Icon = item.icon;

    const isActive = activeSection === item.id;
    
    const button = (
      <button
        key={item.id}
        onClick={() => onSectionChange(item.id)}
        disabled={isDisabled}
        className={cn(
          'w-full flex items-center gap-3 py-2 text-sm font-medium rounded-lg transition-all',
          isCollapsed ? 'px-2 justify-center' : 'px-3',
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
          isDisabled && (isActive ? 'opacity-80' : 'opacity-40 cursor-not-allowed')
        )}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-blue-600' : 'text-gray-400')} />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                {item.badge}
              </span>
            )}
          </>
        )}
      </button>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.id} content={label} side="right">
          {button}
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <div 
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out relative',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        disabled={isDisabled}
        className={cn(
          "absolute -right-3 top-6 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm transition-all",
          isDisabled ? "opacity-0 pointer-events-none" : "hover:bg-gray-50"
        )}
        title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
        )}
      </button>

      <div className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
        <div className={cn(isCollapsed ? 'px-2' : 'px-3')}>
          <nav className="space-y-1">
            {generalSections
              .filter((item) => {
                if (isEditMode) {
                  return ['generalInfo', 'experience', 'education'].includes(item.id);
                }
                return true;
              })
              .map(renderItem)}

          </nav>
        </div>
      </div>
    </div>
  );
}