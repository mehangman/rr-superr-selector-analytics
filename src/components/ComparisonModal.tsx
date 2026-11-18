import React from 'react';
import { X, Trophy } from 'lucide-react';

export interface ComparisonMetric {
  key: string;
  label: string;
  higherIsBetter?: boolean;
  format?: (val: any) => string;
}

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: any[];
  metrics: ComparisonMetric[];
  title: string;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  players,
  metrics,
  title,
}) => {
  if (!isOpen || players.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0d1224] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#090d1a]">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#d4a843]" />
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Side-by-side metric comparison across {players.length} selected players
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Player Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {players.map((p) => (
              <div
                key={p.name}
                className="bg-[#121830] p-4 rounded-xl border border-gray-800 text-center relative overflow-hidden"
              >
                <div className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-400 inline-block mb-2">
                  #{p.rank} in Shortlist
                </div>
                <h4 className="font-bold text-white text-base truncate">{p.name}</h4>
                <div className="mt-2 text-2xl font-black text-[#f472b6]">
                  {p.score.toFixed(1)}
                  <span className="text-xs text-gray-500 font-normal">/100</span>
                </div>
                <span
                  className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    p.evidence === 'IPL + T20I'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {p.evidence}
                </span>
              </div>
            ))}
          </div>

          {/* Metrics Comparison Rows */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Metric Breakdown
            </h4>

            {metrics.map((m) => {
              const values = players.map((p) => Number(p[m.key]));
              const higherBetter = m.higherIsBetter !== false;
              const bestVal = higherBetter
                ? Math.max(...values.filter((v) => !isNaN(v)))
                : Math.min(...values.filter((v) => !isNaN(v)));
              const maxForBar = Math.max(...values.filter((v) => !isNaN(v)), 1);

              return (
                <div
                  key={m.key}
                  className="bg-[#090d1a] p-4 rounded-xl border border-gray-800/80"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-300">
                      {m.label}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {higherBetter ? 'Higher is better' : 'Lower is better'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {players.map((p) => {
                      const val = Number(p[m.key]);
                      const isBest = val === bestVal;
                      const displayVal = m.format
                        ? m.format(p[m.key])
                        : isNaN(val)
                        ? 'N/A'
                        : val;

                      const pct = Math.max(10, Math.min(100, (val / maxForBar) * 100));

                      return (
                        <div
                          key={p.name}
                          className={`p-3 rounded-lg border transition-all ${
                            isBest
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                              : 'bg-[#121830]/50 border-gray-800 text-gray-300'
                          }`}
                        >
                          <div className="flex justify-between text-xs mb-1.5 font-medium">
                            <span className="truncate pr-1 text-gray-400">
                              {p.name.split(' ')[0]}
                            </span>
                            <span
                              className={`font-bold ${
                                isBest ? 'text-emerald-400' : 'text-white'
                              }`}
                            >
                              {displayVal}
                              {isBest && ' ★'}
                            </span>
                          </div>
                          {!isNaN(val) && (
                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  isBest ? 'bg-emerald-400' : 'bg-[#e91e8c]'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#090d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
