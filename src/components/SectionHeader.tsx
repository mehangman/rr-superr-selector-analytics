import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  action,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-gray-800/80 gap-3">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            {title}
          </h2>
          {badge && (
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#e91e8c]/15 text-[#f472b6] border border-[#e91e8c]/30 tracking-wider">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
