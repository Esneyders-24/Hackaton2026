import React from 'react';

interface EstadoBadgeProps {
  estado: string;
  size?: 'sm' | 'md' | 'lg';
}

const estadoConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  'EN PROCESO': {
    bg: 'bg-amber-50 border border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'En Proceso',
  },
  'DOCUMENTO REGISTRADO': {
    bg: 'bg-blue-50 border border-blue-200',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    label: 'Registrado',
  },
  'SE EMITIÓ RESPUESTA': {
    bg: 'bg-green-50 border border-green-200',
    text: 'text-green-700',
    dot: 'bg-green-500',
    label: 'Respuesta Emitida',
  },
  'CERRADO': {
    bg: 'bg-gray-100 border border-gray-200',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
    label: 'Cerrado',
  },
};

const EstadoBadge: React.FC<EstadoBadgeProps> = ({ estado, size = 'md' }) => {
  const config = estadoConfig[estado] ?? {
    bg: 'bg-gray-100 border border-gray-200',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
    label: estado,
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-1.5 text-sm gap-2',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} />
      {config.label}
    </span>
  );
};

export default EstadoBadge;
