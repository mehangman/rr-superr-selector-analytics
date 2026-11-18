import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    neutral?: boolean;
  };
  accent?: 'pink' | 'gold' | 'blue' | 'green' | 'default';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = 'default',
  className = '',
}) => {
  const accentStyles = {
    pink: 'border-[#e91e8c]/30 hover:border-[#e91e8c]/60 shadow-[0_0_20px_-10px_rgba(233,30,140,0.2)]',
    gold: 'border-[#d4a843]/30 hover:border-[#d4a843]/60 shadow-[0_0_20px_-10px_rgba(212,168,67,0.2)]',
    blue: 'border-blue-500/30 hover:border-blue-500/60 shadow-[0_0_20px_-10px_rgba(59,130,246,0.2)]',
    green: 'border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_20px_-10px_rgba(16,185,129,0.2)]',
    default: 'border-gray-800/80 hover:border-gray-700/80',
  };

  const iconColors = {
    pink: 'text-[#f472b6] bg-[#e91e8c]/10 border border-[#e91e8c]/20',
    gold: 'text-[#fbbf24] bg-[#d4a843]/10 border border-[#d4a843]/20',
    blue: 'text-blue-400 bg-blue-500/10 border border-blue-500/20',
    green: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
    default: 'text-gray-400 bg-gray-800/50 border border-gray-700/50',
  };

  return (
    <div
      className={`bg-[#0d1224] rounded-xl p-5 border transition-all duration-200 relative overflow-hidden group ${accentStyles[accent]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${iconColors[accent]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold flex items-center gap-1 ${
                trend.neutral
                  ? 'text-gray-400'
                  : trend.isPositive
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
