import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Users,
  GitCompare,
  TrendingUp,
  BarChart2,
  Search,
  Filter,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  ZAxis,
  Legend,
  Cell,
} from 'recharts';
import { SectionHeader } from '../components/SectionHeader';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { ComparisonModal } from '../components/ComparisonModal';
import type { ComparisonMetric } from '../components/ComparisonModal';
import { StatCard } from '../components/StatCard';
import { batters } from '../data/batters';
import type { Batter } from '../data/batters';

export const BatterAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [evidenceFilter, setEvidenceFilter] = useState<'All' | 'IPL + T20I' | 'T20I only'>('All');
  const [activeTab, setActiveTab] = useState<'ranking' | 'psr' | 'comparison' | 'consistency' | 'scatter'>('ranking');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Filtered dataset
  const filteredBatters = useMemo(() => {
    return batters.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchesEvidence = evidenceFilter === 'All' || b.evidence === evidenceFilter;
      return matchesSearch && matchesEvidence;
    });
  }, [search, evidenceFilter]);

  // Aggregate stats
  const totalPressureRuns = useMemo(
    () => batters.reduce((acc, b) => acc + b.pressureRuns, 0),
    []
  );
  const avgPressureSR = useMemo(
    () => (batters.reduce((acc, b) => acc + b.pressureSR, 0) / batters.length).toFixed(1),
    []
  );

  // Table columns definition
  const columns: Column<Batter>[] = [
    {
      key: 'rank',
      label: 'Rank',
      align: 'center',
      render: (b) => (
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold ${
            b.rank === 1
              ? 'bg-[#e91e8c] text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          #{b.rank}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Player',
      render: (b) => (
        <div>
          <span className="font-bold text-white hover:text-[#f472b6] transition-colors">
            {b.name}
          </span>
          <span className="block text-[10px] text-gray-500">
            Median Order: {b.medianBattingOrder ? `#${b.medianBattingOrder}` : 'N/A'}
          </span>
        </div>
      ),
    },
    {
      key: 'score',
      label: 'Reliability Score',
      align: 'right',
      render: (b) => (
        <span className="font-extrabold text-[#f472b6] text-sm md:text-base">
          {b.score.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'pressureRuns',
      label: 'P-Runs',
      align: 'right',
      getValue: (b) => b.pressureRuns,
    },
    {
      key: 'pressureBalls',
      label: 'P-Balls',
      align: 'right',
      getValue: (b) => b.pressureBalls,
    },
    {
      key: 'pressureSR',
      label: 'P-SR',
      align: 'right',
      render: (b) => (
        <span className="font-bold text-gray-200">{b.pressureSR.toFixed(1)}</span>
      ),
      getValue: (b) => b.pressureSR,
    },
    {
      key: 'nonPressureSR',
      label: 'Non-P SR',
      align: 'right',
      render: (b) => (
        <span className="text-gray-400">{b.nonPressureSR.toFixed(1)}</span>
      ),
      getValue: (b) => b.nonPressureSR,
    },
    {
      key: 'srUplift',
      label: 'SR Uplift (Δ)',
      align: 'right',
      render: (b) => (
        <span className="font-bold text-emerald-400">+{b.srUplift.toFixed(1)}</span>
      ),
      getValue: (b) => b.srUplift,
    },
    {
      key: 'pressureAvg',
      label: 'P-Avg',
      align: 'right',
      render: (b) => <span>{b.pressureAvg.toFixed(1)}</span>,
      getValue: (b) => b.pressureAvg,
    },
    {
      key: 'pressureMatches',
      label: 'P-Matches',
      align: 'center',
      getValue: (b) => b.pressureMatches,
    },
    {
      key: 'consistency',
      label: 'Consistency',
      align: 'right',
      render: (b) => (
        <span className="font-semibold text-gray-300">{b.consistency}%</span>
      ),
      getValue: (b) => b.consistency,
    },
    {
      key: 'evidence',
      label: 'Evidence Scope',
      align: 'center',
      render: (b) => (
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${
            b.evidence === 'IPL + T20I'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
        >
          {b.evidence}
        </span>
      ),
      getValue: (b) => b.evidence,
    },
  ];

  // Multi-select handler
  const handleSelectRow = (batter: Batter, isSelected: boolean) => {
    if (isSelected) {
      setSelectedNames((prev) => [...prev, batter.name]);
    } else {
      setSelectedNames((prev) => prev.filter((n) => n !== batter.name));
    }
  };

  const selectedPlayersList = useMemo(() => {
    return batters.filter((b) => selectedNames.includes(b.name));
  }, [selectedNames]);

  const comparisonMetrics: ComparisonMetric[] = [
    { key: 'score', label: 'Overall Reliability Score', higherIsBetter: true },
    { key: 'pressureSR', label: 'Pressure Strike Rate', higherIsBetter: true },
    { key: 'srUplift', label: 'Strike Rate Uplift (+Δ)', higherIsBetter: true, format: (v) => `+${v}` },
    { key: 'pressureAvg', label: 'Pressure Batting Average', higherIsBetter: true },
    { key: 'consistency', label: 'Match Consistency (SR ≥ 100)', higherIsBetter: true, format: (v) => `${v}%` },
    { key: 'pressureRuns', label: 'Total Pressure Runs', higherIsBetter: true },
    { key: 'pressureMatches', label: 'Qualifying Pressure Matches', higherIsBetter: true },
  ];

  // Visualizations data
  const chartData = useMemo(() => {
    return filteredBatters.map((b) => ({
      name: b.name,
      score: b.score,
      pSR: b.pressureSR,
      npSR: Number(b.nonPressureSR.toFixed(1)),
      uplift: b.srUplift,
      pAvg: b.pressureAvg,
      runs: b.pressureRuns,
      balls: b.pressureBalls,
      consistency: b.consistency,
      matches: b.pressureMatches,
    }));
  }, [filteredBatters]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Batter Analytics Shortlist"
        subtitle="Ranked Batsman 1–10 evaluated under the Base Pressure Model. Scored across Pressure Strike Rate (25%), SR Uplift (20%), Pressure Average (15%), Consistency (15%), Exposure (15%), and Dot-Ball Control (10%)."
        badge="TOP 10 BATTERS"
      />

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Shortlisted Batters"
          value="10"
          subtitle="From 232 eligible batters"
          icon={Users}
          accent="pink"
        />
        <StatCard
          title="Combined Pressure Runs"
          value={totalPressureRuns.toLocaleString()}
          subtitle="Across 3,366 pressure balls"
          icon={TrendingUp}
          accent="pink"
        />
        <StatCard
          title="Avg Pressure SR"
          value={avgPressureSR}
          subtitle="Vs avg non-pressure ~130"
          icon={Zap}
          accent="blue"
        />
        <StatCard
          title="Sample Anchor"
          value="David Miller"
          subtitle="1,478 runs in 67 matches"
          icon={BarChart2}
          accent="green"
        />
      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search batter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-xs md:text-sm text-gray-200 focus:outline-none focus:border-[#e91e8c]"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-lg border border-gray-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-gray-400 ml-1.5" />
            {(['All', 'IPL + T20I', 'T20I only'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setEvidenceFilter(opt)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  evidenceFilter === opt
                    ? 'bg-[#e91e8c] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {selectedNames.length >= 2 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#e91e8c] to-[#c2185b] text-white text-xs font-bold shadow-lg shadow-[#e91e8c]/20 hover:opacity-95 transition-all cursor-pointer animate-pulse"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare ({selectedNames.length}) Selected</span>
            </button>
          )}

          {selectedNames.length > 0 && selectedNames.length < 2 && (
            <span className="text-xs text-amber-400 flex items-center gap-1">
              Select 1 more to compare
            </span>
          )}
        </div>
      </div>

      {/* Main Sortable Table */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Click any row to view individual scouting profile • Select checkboxes to compare</span>
          <span className="text-gray-500">Exact figures from Research Report Page 05</span>
        </div>

        <DataTable
          data={filteredBatters}
          columns={columns}
          highlightFirst={true}
          exportFilename="RR_Batting_Reliability_Shortlist.csv"
          onRowClick={(b) => navigate(`/players/${encodeURIComponent(b.name)}`)}
          onSelectRow={handleSelectRow}
          selectedIds={selectedNames}
          getRowId={(b) => b.name}
        />
      </div>

      {/* Interactive Visualizations Section */}
      <div className="bg-[#0d1224] p-5 md:p-6 rounded-2xl border border-gray-800/80 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-4 gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#f472b6]" />
              Batting Visual Analytics
            </h3>
            <p className="text-xs text-gray-400">
              Interactive comparative breakdowns across pressure indicators
            </p>
          </div>

          {/* Chart View Switcher */}
          <div className="flex flex-wrap gap-1 bg-gray-900 p-1 rounded-xl border border-gray-800 text-xs">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'ranking'
                  ? 'bg-[#e91e8c] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reliability Score
            </button>
            <button
              onClick={() => setActiveTab('psr')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'psr'
                  ? 'bg-[#e91e8c] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pressure SR
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'comparison'
                  ? 'bg-[#e91e8c] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              P-SR vs Non-P SR (Uplift)
            </button>
            <button
              onClick={() => setActiveTab('consistency')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'consistency'
                  ? 'bg-[#e91e8c] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Consistency %
            </button>
            <button
              onClick={() => setActiveTab('scatter')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'scatter'
                  ? 'bg-[#e91e8c] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Runs vs Balls Scatter
            </button>
          </div>
        </div>

        {/* Chart View Content */}
        <div className="h-80 md:h-96 w-full pt-2">
          {activeTab === 'ranking' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 70, bottom: 10 }}
              >
                <XAxis type="number" domain={[80, 100]} stroke="#4b5563" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={110} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#f472b6] font-semibold">Reliability Score: {d.score}/100</p>
                          <p className="text-gray-400">Pressure SR: {d.pSR} • Avg: {d.pAvg}</p>
                          <p className="text-emerald-400">SR Uplift: +{d.uplift}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === 'Babar Azam' ? '#e91e8c' : '#c2185b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'psr' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="#4b5563" domain={[140, 210]} fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg text-xs">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#f472b6] font-bold mt-1">Pressure SR: {d.pSR}</p>
                          <p className="text-gray-400">{d.runs} runs off {d.balls} balls</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="pSR" fill="#e91e8c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'comparison' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="#4b5563" domain={[100, 210]} fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-3 rounded-lg text-xs space-y-1">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#f472b6]">Pressure SR: <strong>{d.pSR}</strong></p>
                          <p className="text-gray-400">Non-Pressure SR: <strong>{d.npSR}</strong></p>
                          <p className="text-emerald-400 font-bold">Uplift: +{d.uplift} pts</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ paddingBottom: 10, fontSize: 12 }}
                />
                <Bar name="Pressure SR" dataKey="pSR" fill="#e91e8c" radius={[4, 4, 0, 0]} />
                <Bar name="Non-Pressure SR" dataKey="npSR" fill="#4b5563" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'consistency' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="#4b5563" domain={[60, 105]} fontSize={11} unit="%" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg text-xs">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-emerald-400 font-bold mt-1">Consistency: {d.consistency}%</p>
                          <p className="text-gray-400">Matches with SR ≥ 100: {d.matches} total P-matches</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="consistency" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.consistency >= 95
                          ? '#10b981'
                          : entry.consistency >= 85
                          ? '#3b82f6'
                          : '#f59e0b'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'scatter' && (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  type="number"
                  dataKey="balls"
                  name="Pressure Balls"
                  stroke="#9ca3af"
                  fontSize={11}
                  unit=" balls"
                />
                <YAxis
                  type="number"
                  dataKey="runs"
                  name="Pressure Runs"
                  stroke="#9ca3af"
                  fontSize={11}
                  unit=" runs"
                />
                <ZAxis type="number" dataKey="score" range={[60, 200]} name="Score" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-3 rounded-xl text-xs space-y-1">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#f472b6]">Runs: {d.runs} | Balls: {d.balls}</p>
                          <p className="text-gray-300">P-SR: {d.pSR} | Matches: {d.matches}</p>
                          <p className="text-emerald-400 font-semibold">Score: {d.score}/100</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Batters" data={chartData} fill="#e91e8c" />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        players={selectedPlayersList}
        metrics={comparisonMetrics}
        title="Batter Head-to-Head Comparison"
      />
    </div>
  );
};
