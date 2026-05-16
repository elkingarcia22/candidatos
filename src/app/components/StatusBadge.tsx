import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

type StatusType = 'success' | 'failed' | 'pending' | 'warning';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    className: 'bg-green-50 text-green-700 border-green-200',
    iconClassName: 'text-green-600',
  },
  failed: {
    icon: XCircle,
    className: 'bg-red-50 text-red-700 border-red-200',
    iconClassName: 'text-red-600',
  },
  pending: {
    icon: Clock,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    iconClassName: 'text-blue-600',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    iconClassName: 'text-amber-600',
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      <Icon className={`w-3 h-3 ${config.iconClassName}`} />
      {label && <span>{label}</span>}
    </span>
  );
}
