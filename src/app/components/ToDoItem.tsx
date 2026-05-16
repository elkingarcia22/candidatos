import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Avatar } from './ui/avatar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface ToDoItemProps {
  id: string;
  title: string;
  completed: boolean;
  owner: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  onToggle: (id: string) => void;
  onSchedule?: (id: string, date: string) => void;
}

export function ToDoItem({
  id,
  title,
  completed,
  owner,
  dueDate,
  onToggle,
  onSchedule,
}: ToDoItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickScheduleOptions = [
    { label: 'Hoy', value: 'today' },
    { label: 'Mañana', value: 'tomorrow' },
    { label: 'Próximo lunes', value: 'next-monday' },
  ];

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group">
      <Checkbox checked={completed} onCheckedChange={() => onToggle(id)} />

      <div className="flex-1 min-w-0">
        <p className={`text-sm ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {title}
        </p>
        {dueDate && (
          <p className="text-xs text-gray-500 mt-1">Vence: {dueDate}</p>
        )}
      </div>

      <Avatar className="w-6 h-6">
        <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs">
          {owner.name.charAt(0)}
        </div>
      </Avatar>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-7"
          >
            <CalendarIcon className="w-3 h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700 px-2 py-1">Quick schedule</p>
            {quickScheduleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSchedule?.(id, option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded"
              >
                {option.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
