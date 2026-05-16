import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '../ui/utils';

interface StepData {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  date?: string;
  content: React.ReactNode;
}

interface ProcessStepSectionProps {
  title: string;
  description: string;
  steps: StepData[];
}

export function ProcessStepSection({ title, description, steps }: ProcessStepSectionProps) {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(['0']));

  const toggleAccordion = (id: string) => {
    const newOpen = new Set(openAccordions);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenAccordions(newOpen);
  };

  const getStatusIcon = (status: StepData['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: StepData['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-white border-gray-200 shadow-sm';
      case 'in-progress':
        return 'bg-blue-50/30 border-blue-200';
      case 'failed':
        return 'bg-white border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Accordion Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isOpen = openAccordions.has(index.toString());
          
          return (
            <div
              key={step.id}
              className={cn(
                'bg-white rounded-lg border transition-all',
                getStatusColor(step.status)
              )}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index.toString())}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(step.status)}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{step.title}</h4>
                    {step.date && (
                      <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-400 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-6 pb-4 pt-0 border-t border-gray-200">
                  <div className="mt-4">
                    {step.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
