import React from 'react';

interface ScorecardScaleProps {
  value: number;
  onChange: (value: number) => void;
}

export function ScorecardScale({ value, onChange }: ScorecardScaleProps) {
  const options = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
            value === option
              ? 'bg-blue-600 text-white scale-110 shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
