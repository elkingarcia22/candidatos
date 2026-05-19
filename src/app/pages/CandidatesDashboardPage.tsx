import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronRight,
  MoreVertical, 
  Sparkles, 
  Upload, 
  Download, 
  Plus,
  Filter,
  MapPin,
  ExternalLink,
  ArrowRight,
  Layers,
  FastForward,
  Users,
  ShieldCheck,
  Copy,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Printer,
  Trash2,
  X,
  Briefcase,
  Check,
  Edit3,
  FilePlus,
  Eye,
  UserPlus,
  FileUp,
  Table2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';
import { Tooltip } from '../components/ui/tooltip';
import { candidatesData } from '../data/candidatesData';
import { Drawer } from '../components/ui/drawer';
import { CandidateDetailDrawer } from '../components/CandidateDetailDrawer';
import { SerenaIAPanel } from '../components/SerenaIAPanel';
import { MainMenuSidebar } from '../components/MainMenuSidebar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '../components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '../components/ui/command';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../components/ui/popover';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogFooter 
} from '../components/ui/dialog';
import { toast } from 'sonner';

// Configuración de etapas del proceso
const stages = [
  { id: 'screening-talent', name: 'Screening Talent', order: 1 },
  { id: 'evaluacion-cv', name: 'Evaluación CV', order: 2 },
  { id: 'evaluacion-serena', name: 'Serena AI', order: 3 },
  { id: 'evaluacion-psicometrica', name: 'Test Psicométrico', order: 4 },
  { id: 'entrevista-tecnica', name: 'Entrevista Técnica', order: 5 },
  { id: 'entrevista-pm', name: 'Entrevista Product Manager', order: 6 },
  { id: 'entrevista-hiring', name: 'Entrevista Hiring Manager', order: 7 },
  { id: 'antecedentes', name: 'Verificación Antecedentes', order: 8 }
];

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  searchPlaceholder: string;
  emptyText: string;
  icon: React.ReactNode;
}

function Combobox({ value, onValueChange, options, placeholder, searchPlaceholder, emptyText, icon }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between rounded-xl border-gray-200 bg-gray-50 hover:bg-white transition-all font-semibold text-gray-600 text-xs px-3"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex-shrink-0">{icon}</span>
            <span className="truncate">
              {value === "all" ? placeholder : options.find((opt) => opt.value === value)?.label}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[352px] p-0 rounded-xl border-gray-100 shadow-2xl bg-white" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-10 text-xs font-semibold" />
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="text-[11px] font-bold text-gray-400 py-6">{emptyText}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  onValueChange("all");
                  setOpen(false);
                }}
                className="text-xs font-semibold text-gray-600 rounded-lg p-2"
              >
                <Check className={cn("mr-2 h-3.5 w-3.5", value === "all" ? "opacity-100" : "opacity-0")} />
                {placeholder}
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "all" : currentValue);
                    setOpen(false);
                  }}
                  className="text-xs font-semibold text-gray-600 rounded-lg p-2"
                >
                  <Check className={cn("mr-2 h-3.5 w-3.5", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function CandidatesDashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | undefined>(undefined);
  const [candidatesList, setCandidatesList] = useState(candidatesData);
  
  // Estados de filtros
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterOrigin, setFilterOrigin] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterHasVacancies, setFilterHasVacancies] = useState('all');

  // Estados de importación
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{name: string, size: string} | null>(null);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Enriquecer datos de candidatos
  const [isSerenaOpen, setIsSerenaOpen] = useState(false);
  const [serenaMode, setSerenaMode] = useState<'global' | 'search'>('global');
  const [searchTrigger, setSearchTrigger] = useState(0);

  const enrichedCandidates = useMemo(() => {
    return candidatesList.map((c, idx) => {
      const mainApp = c.applications?.[0];
      const stageIndex = stages.findIndex(s => s.id === mainApp?.currentStage);
      const stageNumber = stageIndex !== -1 ? stageIndex + 1 : 0;
      const totalStages = stages.length;
      
      // Info de vacantes
      const activeVacanciesCount = c.applications?.filter(app => app.status === 'active').length || 0;
      const totalVacanciesCount = c.applications?.length || 0;
      
      const vacanciesList = c.applications?.map(app => ({
        id: app.id,
        jobTitle: app.jobTitle,
        stage: stages.find(s => s.id === app.currentStage)?.name || 'Sourcing',
        status: app.status,
        blocker: app.blocker
      })) || [];
      
      const hasActionRequired = vacanciesList.some(app => app.blocker?.priority === 'high');

      let statusLabel = 'En proceso';
      let statusColor = 'text-blue-600';
      let dotColor = 'bg-blue-600';
      let statusKey = 'active';
      
      if (hasActionRequired || (idx % 4 === 0 && !mainApp)) { 
        statusLabel = 'Acción requerida';
        statusColor = 'text-orange-500';
        dotColor = 'bg-orange-500';
        statusKey = 'action_required';
      } else if (mainApp?.status === 'hired') {
        statusLabel = 'Contratado';
        statusColor = 'text-green-600';
        dotColor = 'bg-green-600';
        statusKey = 'hired';
      } else if (mainApp?.status === 'rejected') {
        statusLabel = 'Descartado';
        statusColor = 'text-red-600';
        dotColor = 'bg-red-600';
        statusKey = 'rejected';
      }

      // Origen simulado basado en el índice para variedad
      const origins = ['serena', 'vacante', 'cv', 'linkedin'];
      const simulatedOrigin = c.origin || origins[idx % origins.length];
      
      const originLabels: Record<string, string> = {
        serena: 'Serena IA',
        vacante: 'Vacante',
        cv: 'Importado por CV',
        linkedin: 'LinkedIn',
        manual: 'Creado manualmente'
      };

      // Actividad
      const lastActivityDate = mainApp?.appliedDate ? new Date(mainApp.appliedDate).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '15/05/2026';
      const isRecentlyCreated = c.id.startsWith('new-');

      return {
        ...c,
        displayStatus: statusLabel,
        statusColor,
        dotColor,
        statusKey,
        displayStage: stages[stageIndex]?.name || 'Sourcing',
        stageNumber,
        totalStages,
        activeVacanciesCount,
        totalVacanciesCount,
        vacanciesList,
        hasActionRequired,
        lastActivity: isRecentlyCreated ? 'Recién creado' : lastActivityDate,
        cedula: c.identificationNumber || `1.023.456.78${idx}`,
        location: c.location || `${c.city || 'Ciudad'}, ${c.country || 'País'}`,
        origin: simulatedOrigin,
        originLabel: originLabels[simulatedOrigin] || simulatedOrigin,
        mainJobTitle: mainApp?.jobTitle || 'Sin vacante',
        role: c.experience?.[0]?.position || mainApp?.jobTitle || 'Profesional'
      };
    });
  }, [candidatesList]);

  // Opciones dinámicas para Autocomplete
  const locationOptions = useMemo(() => {
    return Array.from(new Set(enrichedCandidates.map(c => (c.location || '').split(',')[0])))
      .filter(Boolean)
      .sort()
      .map(loc => ({ value: loc, label: loc }));
  }, [enrichedCandidates]);

  const roleOptions = useMemo(() => {
    return Array.from(new Set(enrichedCandidates.map(c => c.mainJobTitle)))
      .filter(Boolean)
      .sort()
      .map(role => ({ value: role, label: role }));
  }, [enrichedCandidates]);

  const stageOptions = stages.map(s => ({ value: s.id, label: s.name }));

  // Filtro lógico
  const filteredCandidates = useMemo(() => {
    return enrichedCandidates.filter(candidate => {
      const candidateName = candidate.name || '';
      const candidateEmail = candidate.email || '';
      const matchesSearch = candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (candidate.role || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesOrigin = filterOrigin === 'all' || 
                           (filterOrigin === 'serena' && candidate.origin === 'Serena IA') ||
                           (filterOrigin === 'vacante' && candidate.origin === 'Vacante') ||
                           (filterOrigin === 'cv' && candidate.origin === 'Importado por CV') ||
                           (filterOrigin === 'manual' && candidate.origin === 'Creado manualmente');

      const matchesStage = filterStage === 'all' || 
                          candidate.displayStage === stages.find(s => s.id === filterStage)?.name;

      const matchesStatus = filterStatus === 'all' || candidate.statusKey === filterStatus;

      const matchesLocation = filterLocation === 'all' || (candidate.location || '').includes(filterLocation);
      const matchesRole = filterRole === 'all' || candidate.role === filterRole || candidate.mainJobTitle === filterRole;
      
      const hasVacancies = candidate.applications && candidate.applications.length > 0;
      const matchesHasVacancies = filterHasVacancies === 'all' || 
                                 (filterHasVacancies === 'with' && hasVacancies) ||
                                 (filterHasVacancies === 'without' && !hasVacancies);

      return matchesSearch && matchesOrigin && matchesStage && matchesStatus && matchesLocation && matchesRole && matchesHasVacancies;
    });
  }, [enrichedCandidates, searchQuery, filterOrigin, filterStage, filterStatus, filterLocation, filterRole, filterHasVacancies]);

  const activeFiltersCount = [
    filterOrigin !== 'all',
    filterStage !== 'all',
    filterStatus !== 'all',
    filterLocation !== 'all',
    filterRole !== 'all',
    filterHasVacancies !== 'all'
  ].filter(Boolean).length;

  const stats = [
    { id: 'all', label: 'TOTAL CANDIDATOS', value: enrichedCandidates.length.toString(), color: 'text-gray-900', activeColor: 'bg-gray-50 border-gray-300 ring-2 ring-gray-100' },
    { id: 'active', label: 'EN PROCESO', value: enrichedCandidates.filter(c => c.statusKey === 'active').length.toString(), color: 'text-blue-600', activeColor: 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/10' },
    { id: 'hired', label: 'CONTRATADOS', value: enrichedCandidates.filter(c => c.statusKey === 'hired').length.toString(), color: 'text-gray-900', activeColor: 'bg-gray-50 border-gray-300 ring-2 ring-gray-100' },
    { id: 'rejected', label: 'DESCARTADOS', value: enrichedCandidates.filter(c => c.statusKey === 'rejected').length.toString(), color: 'text-red-500', activeColor: 'bg-red-50 border-red-200 ring-2 ring-red-500/10' },
    { id: 'action_required', label: 'ACCIÓN REQUERIDA', value: enrichedCandidates.filter(c => c.statusKey === 'action_required').length.toString(), color: 'text-orange-500', activeColor: 'bg-orange-50 border-orange-200 ring-2 ring-orange-500/10' },
  ];

  // Handlers para el Drawer
  const handleCandidateClick = (id: string, initialApplicationId?: string) => {
    setSelectedCandidateId(id);
    setSelectedApplicationId(initialApplicationId);
  };
  const handleCloseDrawer = () => {
    setSelectedCandidateId(null);
    setSelectedApplicationId(undefined);
  };
  
  const currentCandidateIndex = enrichedCandidates.findIndex(c => c.id === selectedCandidateId);
  const handlePrevious = () => {
    if (currentCandidateIndex > 0) {
      setSelectedCandidateId(enrichedCandidates[currentCandidateIndex - 1].id);
    }
  };
  const handleNext = () => {
    if (currentCandidateIndex < enrichedCandidates.length - 1) {
      setSelectedCandidateId(enrichedCandidates[currentCandidateIndex + 1].id);
    }
  };

  const handleCandidateCreate = (newCandidate: any) => {
    setCandidatesList(prev => [newCandidate, ...prev]);
  };

  const handleStartImport = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setIsUploading(true);
    setTimeout(() => {
      toast.success('Candidato importado exitosamente');
      setIsProcessing(false);
      setIsUploading(false);
      setSelectedFile(null);
      setHasAcceptedTerms(false);
      setIsImportModalOpen(false);
    }, 2000);
  };

  const handleStartBulkImport = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setTimeout(() => {
      toast.success('Base de datos importada exitosamente');
      setIsProcessing(false);
      setSelectedFile(null);
      setHasAcceptedTerms(false);
      setIsBulkImportModalOpen(false);
    }, 2500);
  };

  return (
    <div className="h-screen bg-gray-50 font-sans overflow-hidden text-gray-900 flex flex-row">
      <MainMenuSidebar />
      {/* Centered Wrapper for the entire dashboard content */}
      <div className="flex-1 max-w-[1600px] mx-auto h-full flex flex-row p-6 lg:p-10 gap-6 lg:gap-10 overflow-hidden relative">
        {/* Main Content Area */}
        <div className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out h-full overflow-hidden",
          isSerenaOpen ? "opacity-95" : "opacity-100"
        )}>


        {/* Scrollable Body Section */}
        <main className="flex-1 flex flex-col min-h-0 relative">
          <div className="flex flex-col flex-1 min-h-0 space-y-8 pb-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-5 gap-4 shrink-0">
              {stats.map((stat) => (
                <button 
                  key={stat.id} 
                  onClick={() => setFilterStatus(stat.id)}
                  className={cn(
                    "bg-white border p-5 rounded-[22px] shadow-sm hover:shadow-md transition-all text-left group border-gray-100",
                    filterStatus === stat.id ? stat.activeColor : "hover:border-blue-100"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-500 transition-colors">
                      {stat.label}
                    </span>
                    {filterStatus === stat.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className={cn("text-3xl font-bold tracking-tight transition-transform group-hover:scale-105 origin-left", stat.color)}>
                    {stat.value}
                  </div>
                </button>
              ))}
            </div>

            {/* Unified Dashboard Block (Filters + Table) */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm flex flex-col flex-1 min-h-0 relative">
              {/* Sticky Filter Bar */}
              <div className="shrink-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 rounded-t-[32px]">
                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
                  {/* Left Side: Title and count */}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Mis candidatos</h2>
                    <p className="text-[13px] text-gray-500 font-medium">{filteredCandidates.length} candidatos encontrados</p>
                  </div>

                  {/* Right Side: Tools & Actions */}
                  <div className="flex items-center gap-3">
                    {/* Search Input */}
                    <div className={cn("relative transition-all duration-300 ease-in-out flex items-center justify-end", isSearchExpanded ? "w-[260px]" : "w-9")}>
                      {!isSearchExpanded ? (
                        <Tooltip content="Buscar candidatos">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setIsSearchExpanded(true)}
                            className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 transition-all shrink-0"
                          >
                            <Search className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      ) : (
                        <div className="relative w-full">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="Buscar candidatos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => { if (!searchQuery) setIsSearchExpanded(false); }}
                            autoFocus
                            className="w-full pl-9 pr-8 py-2 bg-gray-50/50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all hover:bg-gray-100/50"
                          />
                          <button 
                            onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    {/* Filter Icon Button */}
                    <Tooltip content="Filtros">
                      <Button 
                        onClick={() => setIsFilterDrawerOpen(true)}
                        variant="ghost" 
                        size="icon"
                        className={cn(
                          "h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 transition-all relative",
                          isFilterDrawerOpen && "bg-gray-100 text-gray-900",
                          activeFiltersCount > 0 && "text-blue-600 bg-blue-50"
                        )}
                      >
                        <Filter className="w-4 h-4" />
                        {activeFiltersCount > 0 && (
                          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full border border-white" />
                        )}
                      </Button>
                    </Tooltip>

                    {/* Export Button */}
                    <Tooltip content="Exportar">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 transition-all">
                        <Download className="w-4 h-4" />
                      </Button>
                    </Tooltip>

                    {/* Serena IA Button */}
                    <Button 
                      onClick={() => {
                        setSerenaMode('global');
                        setIsSerenaOpen(!isSerenaOpen);
                      }}
                      className="h-9 px-4 rounded-full font-semibold text-[13px] transition-all flex items-center gap-2 shadow-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white hover:scale-105"
                    >
                      <Sparkles className={cn("w-3.5 h-3.5", !isSerenaOpen && "animate-pulse")} />
                      Serena IA
                    </Button>

                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    {/* Agregar Candidato */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full flex items-center gap-2 shadow-sm transition-all text-[13px]"
                        >
                          Agregar candidato
                          <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-gray-100 bg-white">
                        <DropdownMenuItem
                          onClick={() => setSelectedCandidateId('new')}
                          className="flex items-start gap-3.5 p-3.5 cursor-pointer rounded-xl hover:bg-gray-50 transition-all group outline-none"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                            <UserPlus className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-gray-900">Creación manual</span>
                            <p className="text-[10px] text-gray-500 font-medium">Registra un perfil individualmente.</p>
                          </div>
                        </DropdownMenuItem>

                        <div className="h-px bg-gray-100 my-1.5 mx-2" />

                        <DropdownMenuItem
                          onClick={() => setIsImportModalOpen(true)}
                          className="flex items-start gap-3.5 p-3.5 cursor-pointer rounded-xl hover:bg-gray-50 transition-all group outline-none"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                            <FileUp className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-gray-900">Importar CV</span>
                            <p className="text-[10px] text-gray-500 font-medium">Extrae datos de CVs con nuestra IA.</p>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setIsBulkImportModalOpen(true)}
                          className="flex items-start gap-3.5 p-3.5 cursor-pointer rounded-xl hover:bg-gray-50 transition-all group outline-none"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                            <Table2 className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-gray-900">Importar CSV o XLMS</span>
                            <p className="text-[10px] text-gray-500 font-medium">Carga masiva desde hojas de cálculo.</p>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="flex-1 overflow-auto custom-scrollbar rounded-b-[32px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Candidato</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Cédula</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Correo</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 text-center border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Vacantes activas</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 text-center border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Total de vacantes</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 text-center border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Origen</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Última actividad</th>
                      <th className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm px-6 py-4 text-[13px] font-semibold text-gray-700 text-right border-b border-gray-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <Users className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm font-semibold">No se encontraron candidatos</p>
                            <p className="text-xs">Prueba ajustando tus filtros de búsqueda</p>
                            <Button 
                              variant="link" 
                              onClick={() => {
                                setFilterStatus('all');
                                setSearchQuery('');
                                setFilterOrigin('all');
                                setFilterStage('all');
                                setFilterLocation('all');
                                setFilterRole('all');
                                setFilterHasVacancies('all');
                              }}
                              className="mt-4 text-blue-600 font-bold"
                            >
                              Limpiar todos los filtros
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredCandidates.map((candidate) => (
                        <tr 
                          key={candidate.id} 
                          onClick={() => handleCandidateClick(candidate.id)}
                          className="hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 bg-blue-600")}>
                                {candidate.avatar}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{candidate.name}</span>
                                <span className="text-[11px] text-gray-500 font-medium">{candidate.role}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-semibold text-gray-500">{candidate.cedula}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-semibold text-gray-500">{candidate.email}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div 
                                  onClick={(e) => e.stopPropagation()}
                                  className={cn(
                                    "inline-flex items-center justify-center min-w-[32px] h-8 rounded-lg font-bold text-sm border cursor-pointer transition-all relative",
                                    candidate.hasActionRequired 
                                      ? "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100" 
                                      : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                                  )}
                                >
                                  {candidate.activeVacanciesCount}
                                  {candidate.hasActionRequired && (
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                    </span>
                                  )}
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-0" align="center" side="bottom" onClick={(e) => e.stopPropagation()}>
                                <div className="flex flex-col p-2">
                                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2 px-1">Aplicaciones por vacante</p>
                                  {candidate.vacanciesList.length > 0 ? candidate.vacanciesList.map((app: any, i: number) => (
                                    <div 
                                      key={i} 
                                      className={cn(
                                        "flex flex-col gap-1 p-2 rounded-xl cursor-pointer transition-colors border border-transparent",
                                        app.blocker?.priority === 'high' ? "bg-orange-50/50 hover:bg-orange-50 hover:border-orange-200" : "hover:bg-gray-50"
                                      )}
                                      onClick={() => {
                                        handleCandidateClick(candidate.id, app.id);
                                      }}
                                    >
                                      <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", app.blocker?.priority === 'high' ? "bg-orange-500" : "bg-gray-400")} />
                                          <span className="font-bold text-sm truncate text-left text-gray-800" title={app.jobTitle}>{app.jobTitle}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-500 whitespace-nowrap font-medium px-2 bg-white rounded-md border border-gray-100 py-0.5">
                                          {app.stage}
                                        </span>
                                      </div>
                                      {app.blocker?.priority === 'high' && (
                                        <div className="pl-3.5 flex items-center gap-1.5 mt-0.5">
                                          <AlertCircle className="w-3 h-3 text-orange-500" />
                                          <span className="text-[10px] font-semibold text-orange-600">{app.blocker.reason}</span>
                                        </div>
                                      )}
                                    </div>
                                  )) : <span className="text-gray-500 italic px-2">Sin vacantes</span>}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                              {candidate.totalVacanciesCount}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <Badge 
                              className={cn(
                                "text-[10px] px-2 py-0.5 border-none font-semibold rounded-lg",
                                candidate.origin === 'serena' ? "bg-indigo-50 text-indigo-600" : "bg-gray-100 text-gray-600"
                              )}
                            >
                              {candidate.origin === 'serena' && <Sparkles className="w-3 h-3 mr-1 inline" />}
                              {candidate.originLabel}
                            </Badge>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-semibold text-gray-500">{candidate.lastActivity}</span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-gray-100 bg-white/95 backdrop-blur-sm">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCandidateClick(candidate.id);
                                  }}
                                  className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl hover:bg-blue-50 transition-colors group"
                                >
                                  <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                  <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600">Ver detalle</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl hover:bg-blue-50 transition-colors group">
                                  <Edit3 className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                  <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600">Editar candidato</span>
                                </DropdownMenuItem>
                              
                                <div className="my-1 h-px bg-gray-100" />
                                
                                {[
                                  { icon: Phone, label: 'Llamar' },
                                  { icon: Mail, label: 'Enviar email' },
                                  { icon: FilePlus, label: 'Agregar documento' },
                                ].map((item, idx) => (
                                  <DropdownMenuItem key={idx} onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-gray-50">
                                    <item.icon className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                                  </DropdownMenuItem>
                                ))}

                                <div className="my-1 h-px bg-gray-100" />

                                {[
                                  { icon: Eye, label: 'Ver CV' },
                                  { icon: Download, label: 'Descargar CV' },
                                  { icon: Printer, label: 'Imprimir CV' },
                                ].map((item, idx) => (
                                  <DropdownMenuItem key={idx} onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-gray-50">
                                    <item.icon className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                                  </DropdownMenuItem>
                                ))}

                                <div className="my-1 h-px bg-gray-100" />

                                <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl hover:bg-rose-50 transition-colors group">
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-rose-600" />
                                  <span className="text-xs font-semibold text-gray-600 group-hover:text-rose-600">Eliminar candidato</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Serena IA Panel - Moved to the right side */}
      <aside className={cn(
        "flex-shrink-0 transition-all duration-500 ease-in-out h-full",
        isSerenaOpen ? "w-[484px] opacity-100" : "w-0 overflow-hidden opacity-0"
      )}>
        <div className="h-full bg-white rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative">
          <SerenaIAPanel 
            isOpen={isSerenaOpen} 
            onClose={() => setIsSerenaOpen(false)}
            mode={serenaMode}
            allCandidates={enrichedCandidates}
            searchTrigger={searchTrigger}
          />
        </div>
      </aside>
    </div>

      {/* Candidate Detail Drawer */}
      {selectedCandidateId && (
        <Drawer
          open={!!selectedCandidateId}
          onClose={handleCloseDrawer}
          width="90%"
        >
          <CandidateDetailDrawer
            candidateId={selectedCandidateId}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onClose={handleCloseDrawer}
            totalCandidates={enrichedCandidates.length}
            currentIndex={currentCandidateIndex + 1}
            customCandidates={enrichedCandidates}
            onCreate={handleCandidateCreate}
            isInsideVacancy={false}
            initialApplicationId={selectedApplicationId}
          />
        </Drawer>
      )}

      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent className="import-modal-content max-w-2xl p-0 overflow-hidden rounded-[32px] border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-white">
          <div className="relative p-12 bg-gradient-to-b from-blue-50/50 to-white">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white text-blue-600 hover:bg-gray-50 border border-gray-200 transition-all shadow-sm flex items-center justify-center z-10"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100 group">
                <Upload className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">Importar Candidatos</DialogTitle>
              <p className="text-gray-500 mt-2 text-sm max-w-[360px] mx-auto leading-relaxed">
                Nuestra IA procesará tus archivos PDF o ZIP automáticamente para extraer perfiles completos.
              </p>
            </div>

            {!selectedFile ? (
              <div
                className="relative group cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onClick={() => {
                  setSelectedFile({
                    name: 'CV_Alejandro_Martinez.pdf',
                    size: '2.4 MB'
                  });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setSelectedFile({
                    name: 'CV_Alejandro_Martinez.pdf',
                    size: '2.4 MB'
                  });
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[32px] blur-md opacity-10 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative border-2 border-dashed border-gray-200 rounded-[32px] p-12 bg-white flex flex-col items-center group-hover:border-blue-400 group-hover:bg-blue-50/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Selecciona o arrastra tus archivos</h3>
                  <p className="text-sm text-gray-500 font-medium text-center">
                    PDF, DOCX o archivos ZIP comprimidos
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start gap-4">
                    {/* File Icon */}
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-blue-600" />
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {selectedFile.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          PDF
                        </span>
                        <span>{selectedFile.size}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        Documento listo para ser procesado. Haz clic en "Comenzar Importación" abajo para extraer el perfil automáticamente.
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Remover documento"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-[24px] border border-gray-100 text-left w-full transition-all hover:shadow-sm">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    id="terms"
                    className="sr-only peer"
                    checked={hasAcceptedTerms}
                    onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                    {hasAcceptedTerms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                  </div>
                </div>
                <div className="flex-1">
                  <label htmlFor="terms" className="text-[11px] text-gray-500 leading-relaxed font-medium cursor-pointer block">
                    “Al cargar información en el módulo de reclutamiento, el Cliente declara contar con las autorizaciones necesarias para el tratamiento de los datos suministrados, actuando como Responsable del tratamiento. UBITS actúa como Encargado, tratando dicha información conforme a las instrucciones del Cliente 
                    <span className="text-blue-600 font-bold ml-1 hover:underline underline-offset-2">Política de Tratamiento de Datos y los Términos y Condiciones de UBITS.</span>”
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-12 py-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsImportModalOpen(false)}
              className="h-[52px] px-10 rounded-2xl border-gray-200 text-gray-500 font-bold hover:bg-white hover:text-gray-700 hover:border-gray-300 transition-all bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              disabled={!hasAcceptedTerms || !selectedFile}
              onClick={handleStartImport}
              className={cn(
                "px-14 h-[52px] rounded-2xl font-bold transition-all text-sm shadow-xl flex items-center justify-center gap-2",
                hasAcceptedTerms && selectedFile
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200"
              )}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </>
              ) : (
                'Comenzar Importación'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Modal (CSV/XLSX) */}
      <Dialog open={isBulkImportModalOpen} onOpenChange={setIsBulkImportModalOpen}>
        <DialogContent className="import-modal-content max-w-2xl p-0 overflow-hidden rounded-[32px] border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-white">
          <div className="relative p-12 bg-gradient-to-b from-blue-50/50 to-white">
            <button
              onClick={() => setIsBulkImportModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white text-blue-600 hover:bg-gray-50 border border-gray-200 transition-all shadow-sm flex items-center justify-center z-10"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100 group">
                <Table2 className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">Carga Masiva de Candidatos</DialogTitle>
              <p className="text-gray-500 mt-2 text-sm max-w-[400px] mx-auto leading-relaxed">
                Utiliza nuestra plantilla oficial para cargar grandes volúmenes de candidatos de forma rápida y segura.
              </p>
            </div>

            {/* Template Section */}
            <div className="mb-8 p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <FilePlus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Plantilla de importación</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Descarga el formato oficial para cargar candidatos</p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl h-10 px-5 font-bold text-xs gap-2 shadow-sm border-2"
                onClick={() => toast.success('Descargando plantilla...')}
              >
                <Download className="w-4 h-4" />
                Descargar Plantilla
              </Button>
            </div>

            {!selectedFile ? (
              <div
                className="relative group cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onClick={() => {
                  setSelectedFile({
                    name: 'Base_Candidatos_Q2.xlsx',
                    size: '1.2 MB'
                  });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setSelectedFile({
                    name: 'Base_Candidatos_Q2.xlsx',
                    size: '1.2 MB'
                  });
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[32px] blur-md opacity-10 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative border-2 border-dashed border-gray-200 rounded-[32px] p-12 bg-white flex flex-col items-center group-hover:border-blue-400 group-hover:bg-blue-50/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Carga tu archivo completado</h3>
                  <p className="text-sm text-gray-500 font-medium text-center">
                    Solo archivos .csv o .xlsx
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Table2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {selectedFile.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-bold text-[10px]">
                          EXCEL / CSV
                        </span>
                        <span>{selectedFile.size}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        Archivo listo para procesar. Se validarán automáticamente los formatos de correo y teléfono.
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-[24px] border border-gray-100 text-left w-full transition-all hover:shadow-sm">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    id="bulk-terms"
                    className="sr-only peer"
                    checked={hasAcceptedTerms}
                    onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                    {hasAcceptedTerms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                  </div>
                </div>
                <div className="flex-1">
                  <label htmlFor="bulk-terms" className="text-[11px] text-gray-500 leading-relaxed font-medium cursor-pointer block">
                    Confirmo que la información cargada cumple con las políticas de privacidad y cuento con el consentimiento expreso de los candidatos para el tratamiento de sus datos personales.
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-12 py-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsBulkImportModalOpen(false)}
              className="h-[52px] px-10 rounded-2xl border-gray-200 text-gray-500 font-bold hover:bg-white hover:text-gray-700 transition-all bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              disabled={!hasAcceptedTerms || !selectedFile}
              onClick={handleStartBulkImport}
              className={cn(
                "px-14 h-[52px] rounded-2xl font-bold transition-all text-sm shadow-xl flex items-center justify-center gap-2",
                hasAcceptedTerms && selectedFile
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200"
              )}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando Base...
                </>
              ) : (
                'Iniciar Carga Masiva'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Drawer */}
      <Drawer 
        open={isFilterDrawerOpen} 
        onClose={() => setIsFilterDrawerOpen(false)} 
        width="400px"
      >
        <div className="flex flex-col h-full bg-white font-sans">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Filtros Avanzados</h2>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-tight">REFINA TU BÚSQUEDA</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="rounded-full hover:bg-gray-100 h-10 w-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Estado */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Estado
              </label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all font-semibold text-gray-600 text-xs">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl p-2">
                  <SelectItem value="all" className="rounded-lg font-semibold text-gray-600 text-xs">Todos los estados</SelectItem>
                  <SelectItem value="active" className="rounded-lg font-semibold text-gray-600 text-xs">Activo</SelectItem>
                  <SelectItem value="hired" className="rounded-lg font-semibold text-gray-600 text-xs">Contratado</SelectItem>
                  <SelectItem value="rejected" className="rounded-lg font-semibold text-gray-600 text-xs">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ubicación */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> Ubicación
              </label>
              <Combobox 
                value={filterLocation} 
                onValueChange={setFilterLocation} 
                options={locationOptions}
                placeholder="Todas las ubicaciones"
                searchPlaceholder="Buscar ubicación..."
                emptyText="No se encontraron ubicaciones"
                icon={<MapPin className="w-3.5 h-3.5" />}
              />
            </div>

            {/* Cargo/Rol */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" /> Cargo / Rol
              </label>
              <Combobox 
                value={filterRole} 
                onValueChange={setFilterRole} 
                options={roleOptions}
                placeholder="Todos los cargos"
                searchPlaceholder="Buscar cargo..."
                emptyText="No se encontraron cargos"
                icon={<Briefcase className="w-3.5 h-3.5" />}
              />
            </div>

            {/* Etapa actual */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> Etapa actual
              </label>
              <Combobox 
                value={filterStage} 
                onValueChange={setFilterStage} 
                options={stageOptions}
                placeholder="Todas las etapas"
                searchPlaceholder="Buscar etapa..."
                emptyText="No se encontraron etapas"
                icon={<Layers className="w-3.5 h-3.5" />}
              />
            </div>

            {/* Aplicaciones activas */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                <Copy className="w-3.5 h-3.5" /> Aplicaciones activas
              </label>
              <Select value={filterHasVacancies} onValueChange={setFilterHasVacancies}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all font-semibold text-gray-600 text-xs">
                  <SelectValue placeholder="Filtrar por aplicaciones" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl p-2">
                  <SelectItem value="all" className="rounded-lg font-semibold text-gray-600 text-xs">Todos los candidatos</SelectItem>
                  <SelectItem value="with" className="rounded-lg font-semibold text-gray-600 text-xs">Con vacantes asignadas</SelectItem>
                  <SelectItem value="without" className="rounded-lg font-semibold text-gray-600 text-xs">Sin vacantes asignadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Origen Serena */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Origen Serena
              </label>
              <Select value={filterOrigin} onValueChange={setFilterOrigin}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all font-semibold text-gray-600 text-xs">
                  <SelectValue placeholder="Seleccionar origen" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl p-2">
                  <SelectItem value="all" className="rounded-lg font-semibold text-gray-600 text-xs">Cualquier origen</SelectItem>
                  <SelectItem value="serena" className="rounded-lg font-semibold text-gray-600 text-xs">Serena IA</SelectItem>
                  <SelectItem value="vacante" className="rounded-lg font-semibold text-gray-600 text-xs">Vacante / Web</SelectItem>
                  <SelectItem value="cv" className="rounded-lg font-semibold text-gray-600 text-xs">Importado por CV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-12 rounded-xl border-gray-200 font-bold text-gray-600 text-xs hover:bg-white transition-all uppercase tracking-wide"
              onClick={() => {
                setFilterOrigin('all');
                setFilterStage('all');
                setFilterStatus('all');
                setFilterLocation('all');
                setFilterRole('all');
                setFilterHasVacancies('all');
                setSearchQuery('');
              }}
            >
              Limpiar
            </Button>
            <Button 
              className="flex-[2] h-12 px-8 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase tracking-wide"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              Aplicar Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
