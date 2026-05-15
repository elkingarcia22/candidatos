import React from 'react';
import { MapPin, Mail, Phone, Download, Copy, Share2, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface JobCardProps {
  candidate: {
    name: string;
    location: string;
    email: string;
    phone: string;
    tags?: string[];
    matchScore?: number;
    confidence?: 'high' | 'medium' | 'low';
    avatar?: string;
  };
  job: {
    title: string;
    location: string;
    status: 'applied' | 'sourced';
    stage: string;
    stageProgress: number;
  };
  otherJobsCount?: number;
}

const confidenceLabels = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export function JobCard({ candidate, job, otherJobsCount }: JobCardProps) {
  return (
    <div className="space-y-4">
      {/* Job Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
              <Badge variant="outline" className="text-xs">
                {job.status === 'applied' ? 'Aplicado' : 'Sourced'}
              </Badge>
              <Badge className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-100">
                {job.stage}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{job.location}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progreso de etapa</span>
            <span className="font-medium text-gray-900">{job.stageProgress}%</span>
          </div>
          <Progress value={job.stageProgress} className="h-2" />
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue={job.stage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Screening con Talent Acquisition">Screening con Talent Acquisition</SelectItem>
              <SelectItem value="Evaluación CV">Evaluación CV</SelectItem>
              <SelectItem value="Serena AI">Serena AI</SelectItem>
              <SelectItem value="Psicométrico">Psicométrico</SelectItem>
              <SelectItem value="Entrevista - Caso product sense">Entrevista - Caso product sense</SelectItem>
              <SelectItem value="Entrevista Hiring Manager">Entrevista Hiring Manager</SelectItem>
              <SelectItem value="Antecedentes Judiciales">Antecedentes Judiciales</SelectItem>
              <SelectItem value="Seleccionado">Seleccionado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            Descartar
          </Button>
        </div>

        {otherJobsCount && otherJobsCount > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Activo en {otherJobsCount} vacante{otherJobsCount > 1 ? 's' : ''} más
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}