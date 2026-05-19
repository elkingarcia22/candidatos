import React from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  LayoutTemplate,
  HelpCircle, 
  Moon 
} from 'lucide-react';
import { cn } from './ui/utils';
import { Tooltip } from './ui/tooltip';

export function MainMenuSidebar() {
  return (
    <div className="w-[68px] h-[calc(100vh-32px)] my-4 ml-4 bg-[#0F1423] rounded-full flex flex-col items-center py-8 shadow-xl flex-shrink-0 z-50">
      {/* Logo Placeholder */}
      <div className="mb-12 cursor-pointer hover:opacity-80 transition-opacity">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UBITS logo */}
          <path d="M 16 15 V 22 A 5 5 0 0 0 26 22 V 7" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 11 15 A 5 5 0 0 1 16 10" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 6 15 A 10 10 0 0 1 16 5" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Top Icons */}
      <div className="flex flex-col gap-7 flex-1 w-full items-center">
        <Tooltip content="Dashboard" side="right">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Vacantes" side="right">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Briefcase className="w-5 h-5" />
          </button>
        </Tooltip>
        
        {/* Active Item - Candidatos */}
        <Tooltip content="Candidatos" side="right">
          <button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_4px_20px_-4px_rgba(37,99,235,0.6)] hover:bg-blue-700 hover:scale-105 transition-all mt-2 mb-2">
            <Users className="w-[22px] h-[22px]" />
          </button>
        </Tooltip>

        <Tooltip content="Plantillas" side="right">
          <button className="text-gray-400 hover:text-white transition-colors">
            <LayoutTemplate className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-7 mt-auto items-center">
        <Tooltip content="Ayuda" side="right">
          <button className="text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Tema" side="right">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Moon className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Perfil" side="right">
          <button className="w-9 h-9 mt-2 rounded-full overflow-hidden border-2 border-[#0F1423] hover:border-white transition-colors ring-2 ring-gray-600/50">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

