import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  rank: number;
  score: number;
  role: 'batter' | 'bowler';
  keyStats: Array<{ label: string; value: string | number }>;
  evidence: 'IPL + T20I' | 'T20I only';
  onClick?: () => void;
  highlight?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  rank,
  score,
  role,
  keyStats,
  evidence,
  onClick,
  highlight = false,
}) => {
  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isBatter = role === 'batter';

  return (
    <div
      onClick={onClick}
      className={`bg-[#0d1224] rounded-xl p-5 border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
        highlight
          ? isBatter
            ? 'border-[#e91e8c]/50 bg-gradient-to-br from-[#0d1224] to-[#1a1226]'
            : 'border-[#d4a843]/50 bg-gradient-to-br from-[#0d1224] to-[#201b12]'
          : 'border-gray-800/80 hover:border-gray-700 bg-[#0d1224]'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm tracking-wider border shadow-md ${
              isBatter
                ? 'bg-[#e91e8c]/15 text-[#f472b6] border-[#e91e8c]/30'
                : 'bg-[#d4a843]/15 text-[#fbbf24] border-[#d4a843]/30'
            }`}
          >
            {getInitials(name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                #{rank}
              </span>
              <h3 className="font-bold text-white group-hover:text-[#f472b6] transition-colors">
                {name}
              </h3>
            </div>
            <p className="text-xs text-gray-400 capitalize mt-0.5">{role}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-black text-white flex items-center justify-end gap-1">
            {score.toFixed(1)}
            <span className="text-xs text-gray-500 font-normal">/100</span>
          </div>
          <span
            className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              evidence === 'IPL + T20I'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {evidence}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-800/60 bg-[#090d1a]/50 rounded-lg px-2">
        {keyStats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-[10px] uppercase text-gray-400 font-medium tracking-wider">
              {stat.label}
            </p>
            <p className="text-sm font-bold text-gray-200 mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
        <span className="flex items-center gap-1 text-[11px]">
          <Award className="w-3.5 h-3.5 text-gray-500" />
          Reliability Index
        </span>
        <span className="flex items-center gap-0.5 text-[#f472b6] font-medium">
          View Profile <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
