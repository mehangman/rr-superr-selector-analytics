import React, { useState } from 'react';
import {
  BarChart3,
  AlertTriangle,
  Scale,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { SectionHeader } from '../components/SectionHeader';
import { sensitivityData } from '../data/overview';

export const SensitivityAnalysis: React.FC = () => {
  const [selectedDefinition, setSelectedDefinition] = useState<'base' | 'looser' | 'stricter'>('base');

  const overlapChartData = [
    {
      role: 'Batting Shortlist',
      looserOverlap: 5,
      stricterOverlap: 4,
      total: 10,
    },
    {
      role: 'Bowling Shortlist',
      looserOverlap: 8,
      stricterOverlap: 6,
      total: 10,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Robustness & Sensitivity Analysis"
        subtitle="A shortlist based on analyst-defined pressure cut-offs must be stress-tested. The same metrics, eligibility rules, and scoring weights were rerun across Looser and Stricter pressure thresholds."
        badge="STRESS TEST"
      />

      {/* Threshold Definition Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Looser */}
        <div
          onClick={() => setSelectedDefinition('looser')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedDefinition === 'looser'
              ? 'bg-[#121830] border-blue-500/60 shadow-xl shadow-blue-500/10'
              : 'bg-[#0d1224] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Variant A
            </span>
            {selectedDefinition === 'looser' && (
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            )}
          </div>
          <h3 className="text-lg font-bold text-white">Looser Pressure Model</h3>
          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            Flags pressure earlier in innings (lower elapsed ball thresholds) and at lower asking run rates (e.g. RRR ≥ 8.5 instead of 10.0).
          </p>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-400">
            <span>Batting Overlap: <strong className="text-white">5/10</strong></span>
            <span>Bowling: <strong className="text-emerald-400">8/10</strong></span>
          </div>
        </div>

        {/* Base (Primary) */}
        <div
          onClick={() => setSelectedDefinition('base')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedDefinition === 'base'
              ? 'bg-[#121830] border-[#e91e8c]/60 shadow-xl shadow-[#e91e8c]/15 ring-1 ring-[#e91e8c]/40'
              : 'bg-[#0d1224] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#f472b6] uppercase tracking-wider">
              Primary Model (Dossier Source)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#e91e8c]/20 text-[#f472b6] text-[10px] font-black">
              BASE
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">Base Pressure Model</h3>
          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            The disclosed baseline: ≥75% balls elapsed, wickets+phase (≥55% & 4+ wkts), collapse (≥40% & 5+ wkts), chase RRR ≥ 10.0, late chase RRR ≥ 8.5.
          </p>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-400">
            <span>Batting Baseline: <strong className="text-white">10/10</strong></span>
            <span>Bowling Baseline: <strong className="text-white">10/10</strong></span>
          </div>
        </div>

        {/* Stricter */}
        <div
          onClick={() => setSelectedDefinition('stricter')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedDefinition === 'stricter'
              ? 'bg-[#121830] border-amber-500/60 shadow-xl shadow-amber-500/10'
              : 'bg-[#0d1224] border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Variant B
            </span>
            {selectedDefinition === 'stricter' && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </div>
          <h3 className="text-lg font-bold text-white">Stricter Pressure Model</h3>
          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            Requires later innings states (e.g. final 4 overs only) and elevated asking rates (e.g. RRR ≥ 11.5+). Isolates extreme crisis overs.
          </p>
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-400">
            <span>Batting Overlap: <strong className="text-rose-400">4/10</strong></span>
            <span>Bowling Overlap: <strong className="text-amber-400">6/10</strong></span>
          </div>
        </div>
      </div>

      {/* Overlap Summary Table from PDF Page 09 */}
      <div className="bg-[#0d1224] rounded-2xl border border-gray-800/80 overflow-hidden shadow-xl">
        <div className="p-4 bg-[#090d1a] border-b border-gray-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#d4a843]" />
            Reported Top-10 Shortlist Overlap (Verbatim Report Audit)
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Exact findings extracted from Section 06 Robustness & Sensitivity Test
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#121830] text-gray-400 border-b border-gray-800 uppercase text-[11px] font-semibold">
                <th className="py-3 px-4">Role Pool</th>
                <th className="py-3 px-4 text-center">Base vs Looser Overlap</th>
                <th className="py-3 px-4 text-center">Base vs Stricter Overlap</th>
                <th className="py-3 px-4">Methodological Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              <tr className="bg-[#0d1224]">
                <td className="py-4 px-4 font-bold text-[#f472b6] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e91e8c]" />
                  Batting Shortlist
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 font-bold text-blue-400">
                    <span>5 / 10</span>
                    <span className="text-[10px] text-gray-400">(50%)</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 font-bold text-rose-400">
                    <span>4 / 10</span>
                    <span className="text-[10px] text-gray-400">(40%)</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {sensitivityData.batting.interpretation}
                </td>
              </tr>
              <tr className="bg-[#0a0f1e]">
                <td className="py-4 px-4 font-bold text-[#fbbf24] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4a843]" />
                  Bowling Shortlist
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-bold text-emerald-400">
                    <span>8 / 10</span>
                    <span className="text-[10px] text-gray-400">(80%)</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-bold text-amber-400">
                    <span>6 / 10</span>
                    <span className="text-[10px] text-gray-400">(60%)</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {sensitivityData.bowling.interpretation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Chart Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overlap Bar Chart */}
        <div className="bg-[#0d1224] p-6 rounded-2xl border border-gray-800/80 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#f472b6]" />
              Shortlist Overlap Fractions (Out of 10)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Comparing retained players when pressure definitions shift
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={overlapChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="role" stroke="#9ca3af" fontSize={12} />
                <YAxis domain={[0, 10]} stroke="#4b5563" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-3 rounded-lg text-xs space-y-1 shadow-xl">
                          <p className="font-bold text-white">{d.role}</p>
                          <p className="text-blue-400">Looser Overlap: {d.looserOverlap}/10 players</p>
                          <p className="text-amber-400">Stricter Overlap: {d.stricterOverlap}/10 players</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10, fontSize: 12 }} />
                <Bar name="Base vs Looser" dataKey="looserOverlap" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar name="Base vs Stricter" dataKey="stricterOverlap" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual Dot Indicators */}
        <div className="bg-[#0d1224] p-6 rounded-2xl border border-gray-800/80 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#d4a843]" />
              Stability Matrix
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Visual representation of member persistence across definitions
            </p>
          </div>

          <div className="space-y-4 my-auto">
            {/* Batting Looser */}
            <div className="bg-[#121830] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Batters: Base vs Looser</span>
                <span className="text-[11px] text-gray-400">5 retained, 5 dropped</span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      i < 5
                        ? 'bg-[#e91e8c] text-white'
                        : 'bg-gray-800 text-gray-600'
                    }`}
                  >
                    {i < 5 ? '✓' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Batting Stricter */}
            <div className="bg-[#121830] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Batters: Base vs Stricter</span>
                <span className="text-[11px] text-gray-400">4 retained, 6 dropped</span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      i < 4
                        ? 'bg-[#e91e8c] text-white'
                        : 'bg-gray-800 text-gray-600'
                    }`}
                  >
                    {i < 4 ? '✓' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Bowling Looser */}
            <div className="bg-[#121830] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Bowlers: Base vs Looser</span>
                <span className="text-[11px] text-gray-400">8 retained, 2 dropped</span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      i < 8
                        ? 'bg-[#d4a843] text-black'
                        : 'bg-gray-800 text-gray-600'
                    }`}
                  >
                    {i < 8 ? '✓' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Bowling Stricter */}
            <div className="bg-[#121830] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Bowlers: Base vs Stricter</span>
                <span className="text-[11px] text-gray-400">6 retained, 4 dropped</span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      i < 6
                        ? 'bg-[#d4a843] text-black'
                        : 'bg-gray-800 text-gray-600'
                    }`}
                  >
                    {i < 6 ? '✓' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 italic text-center">
            Bowling skills exhibit greater durability when definitions fluctuate.
          </p>
        </div>
      </div>

      {/* Methodological Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-[#0d1224] rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Conditional, Not Immutable</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {sensitivityData.summary}
          </p>
        </div>

        <div className="p-5 bg-[#0d1224] rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Recommended Next Validation</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {sensitivityData.nextValidation}
          </p>
        </div>
      </div>
    </div>
  );
};
