import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Users,
  GitCompare,
  TrendingDown,
  Shield,
  Search,
  Filter,
  BarChart2,
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
  Cell,
} from 'recharts';
import { SectionHeader } from '../components/SectionHeader';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { ComparisonModal } from '../components/ComparisonModal';
import type { ComparisonMetric } from '../components/ComparisonModal';
import { StatCard } from '../components/StatCard';
import { bowlers } from '../data/bowlers';
import type { Bowler } from '../data/bowlers';

export const BowlerAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [evidenceFilter, setEvidenceFilter] = useState<'All' | 'IPL + T20I' | 'T20I only'>('All');
  const [activeTab, setActiveTab] = useState<'ranking' | 'economy' | 'wickets' | 'improvement' | 'dotball'>('ranking');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Filtered dataset
  const filteredBowlers = useMemo(() => {
    return bowlers.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchesEvidence = evidenceFilter === 'All' || b.evidence === evidenceFilter;
      return matchesSearch && matchesEvidence;
    });
  }, [search, evidenceFilter]);

  // Aggregate stats
  const totalWickets = useMemo(
    () => bowlers.reduce((acc, b) => acc + b.wickets, 0),
    []
  );
  const avgPressureEcon = useMemo(
    () => (bowlers.reduce((acc, b) => acc + b.pressureEconomy, 0) / bowlers.length).toFixed(2),
    []
  );

  // Table columns definition
  const columns: Column<Bowler>[] = [
    {
      key: 'rank',
      label: 'Rank',
      align: 'center',
      render: (b) => (
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold ${
            b.rank === 1
              ? 'bg-[#d4a843] text-black font-extrabold'
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
          <span className="font-bold text-white hover:text-[#fbbf24] transition-colors">
            {b.name}
          </span>
          <span className="block text-[10px] text-gray-500">
            {b.evidence}
          </span>
        </div>
      ),
    },
    {
      key: 'score',
      label: 'Reliability Score',
      align: 'right',
      render: (b) => (
        <span className="font-extrabold text-[#fbbf24] text-sm md:text-base">
          {b.score.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'runsConceded',
      label: 'Conceded',
      align: 'right',
      getValue: (b) => b.runsConceded,
    },
    {
      key: 'legalPressureBalls',
      label: 'Legal Balls',
      align: 'right',
      getValue: (b) => b.legalPressureBalls,
    },
    {
      key: 'wickets',
      label: 'Wkts',
      align: 'right',
      render: (b) => <span className="font-bold text-white">{b.wickets}</span>,
      getValue: (b) => b.wickets,
    },
    {
      key: 'pressureEconomy',
      label: 'P-Econ',
      align: 'right',
      render: (b) => (
        <span
          className={`font-bold ${
            b.pressureEconomy <= 6.0
              ? 'text-emerald-400'
              : b.pressureEconomy <= 7.0
              ? 'text-blue-400'
              : 'text-gray-300'
          }`}
        >
          {b.pressureEconomy.toFixed(2)}
        </span>
      ),
      getValue: (b) => b.pressureEconomy,
    },
    {
      key: 'nonPressureEconomy',
      label: 'Non-P Econ',
      align: 'right',
      render: (b) => (
        <span className="text-gray-400">{b.nonPressureEconomy.toFixed(2)}</span>
      ),
      getValue: (b) => b.nonPressureEconomy,
    },
    {
      key: 'wicketsPer6',
      label: 'Wkts/6',
      align: 'right',
      render: (b) => (
        <span className="font-semibold text-gray-200">{b.wicketsPer6.toFixed(2)}</span>
      ),
      getValue: (b) => b.wicketsPer6,
    },
    {
      key: 'economyImprovement',
      label: 'Econ Δ',
      align: 'right',
      render: (b) => (
        <span className="font-bold text-emerald-400">
          +{b.economyImprovement.toFixed(2)}
        </span>
      ),
      getValue: (b) => b.economyImprovement,
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
      label: 'Evidence',
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
    },
  ];

  const handleSelectRow = (bowler: Bowler, isSelected: boolean) => {
    if (isSelected) {
      setSelectedNames((prev) => [...prev, bowler.name]);
    } else {
      setSelectedNames((prev) => prev.filter((n) => n !== bowler.name));
    }
  };

  const selectedPlayersList = useMemo(() => {
    return bowlers.filter((b) => selectedNames.includes(b.name));
  }, [selectedNames]);

  const comparisonMetrics: ComparisonMetric[] = [
    { key: 'score', label: 'Overall Reliability Score', higherIsBetter: true },
    { key: 'pressureEconomy', label: 'Pressure Economy (Lower is Better)', higherIsBetter: false },
    { key: 'wicketsPer6', label: 'Wickets per 6 Legal Balls', higherIsBetter: true },
    { key: 'economyImprovement', label: 'Economy Improvement (+Δ)', higherIsBetter: true, format: (v) => `+${v}` },
    { key: 'consistency', label: 'Consistency (Econ ≤ 8.5)', higherIsBetter: true, format: (v) => `${v}%` },
    { key: 'wickets', label: 'Total Wickets', higherIsBetter: true },
    { key: 'pressureMatches', label: 'Qualifying Pressure Matches', higherIsBetter: true },
  ];

  // Visualizations data
  const chartData = useMemo(() => {
    return filteredBowlers.map((b) => ({
      name: b.name,
      score: b.score,
      econ: b.pressureEconomy,
      npEcon: Number(b.nonPressureEconomy.toFixed(2)),
      wkts6: b.wicketsPer6,
      improvement: b.economyImprovement,
      wickets: b.wickets,
      consistency: b.consistency,
      matches: b.pressureMatches,
      dotBall: b.dotBallPct,
    }));
  }, [filteredBowlers]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Bowler Analytics Shortlist"
        subtitle="Ranked Bowler 1–10 evaluated under the Base Pressure Model. Scored across Pressure Economy (25%), Wicket Rate (20%), Dot-Ball Control (15%), Economy Improvement (15%), Consistency (15%), and Exposure (10%)."
        badge="TOP 10 BOWLERS"
      />

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Shortlisted Bowlers"
          value="10"
          subtitle="From 212 eligible bowlers"
          icon={Users}
          accent="gold"
        />
        <StatCard
          title="Total Pressure Wickets"
          value={totalWickets}
          subtitle="Across 2,695 legal pressure balls"
          icon={Target}
          accent="gold"
        />
        <StatCard
          title="Mean Pressure Econ"
          value={avgPressureEcon}
          subtitle="Sub-8.0 control under stress"
          icon={TrendingDown}
          accent="green"
        />
        <StatCard
          title="High Exposure Anchor"
          value="Kuldeep Yadav"
          subtitle="68 wickets in 67 matches"
          icon={Shield}
          accent="blue"
        />
      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bowler..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-xs md:text-sm text-gray-200 focus:outline-none focus:border-[#d4a843]"
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
                    ? 'bg-[#d4a843] text-black font-bold shadow-sm'
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4a843] to-[#b45309] text-black text-xs font-extrabold shadow-lg shadow-[#d4a843]/20 hover:opacity-95 transition-all cursor-pointer animate-pulse"
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
          <span className="text-gray-500">Exact figures from Research Report Page 07</span>
        </div>

        <DataTable
          data={filteredBowlers}
          columns={columns}
          highlightFirst={true}
          exportFilename="RR_Bowling_Reliability_Shortlist.csv"
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
              <BarChart2 className="w-5 h-5 text-[#fbbf24]" />
              Bowling Visual Analytics
            </h3>
            <p className="text-xs text-gray-400">
              Comparative analysis across economy control, wicket-taking and consistency
            </p>
          </div>

          {/* Chart View Switcher */}
          <div className="flex flex-wrap gap-1 bg-gray-900 p-1 rounded-xl border border-gray-800 text-xs">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'ranking'
                  ? 'bg-[#d4a843] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Reliability Score
            </button>
            <button
              onClick={() => setActiveTab('economy')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'economy'
                  ? 'bg-[#d4a843] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pressure Economy
            </button>
            <button
              onClick={() => setActiveTab('wickets')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'wickets'
                  ? 'bg-[#d4a843] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Wicket Rate (Wkts/6)
            </button>
            <button
              onClick={() => setActiveTab('improvement')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'improvement'
                  ? 'bg-[#d4a843] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Economy vs Non-Pressure
            </button>
            <button
              onClick={() => setActiveTab('dotball')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'dotball'
                  ? 'bg-[#d4a843] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Dot-Ball %
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
                margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
              >
                <XAxis type="number" domain={[80, 100]} stroke="#4b5563" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={120} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#fbbf24] font-semibold">Score: {d.score}/100</p>
                          <p className="text-gray-400">P-Econ: {d.econ} • Wkts/6: {d.wkts6}</p>
                          <p className="text-emerald-400">Improvement: +{d.improvement}</p>
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
                      fill={entry.name === 'Mohammad Nawaz' ? '#d4a843' : '#b45309'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'economy' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="#4b5563" domain={[4, 9]} fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg text-xs">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#fbbf24] font-bold mt-1">Pressure Economy: {d.econ}</p>
                          <p className="text-gray-400">Lower is better • Economy Δ: +{d.improvement}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="econ" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.econ <= 6.0
                          ? '#10b981'
                          : entry.econ <= 7.0
                          ? '#d4a843'
                          : '#f97316'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'wickets' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="#4b5563" domain={[0.3, 0.9]} fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg text-xs">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-emerald-400 font-bold mt-1">Wickets/6: {d.wkts6}</p>
                          <p className="text-gray-400">Total Wickets: {d.wickets} in {d.matches} matches</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="wkts6" fill="#10b981" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === 'Matthew Humphreys' ? '#22c55e' : '#059669'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'improvement' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} interval={0} angle={-30} textAnchor="end" />
                <YAxis stroke="#4b5563" domain={[5, 11]} fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-3 rounded-lg text-xs space-y-1">
                          <p className="font-bold text-white">{d.name}</p>
                          <p className="text-[#fbbf24]">Pressure Economy: <strong>{d.econ}</strong></p>
                          <p className="text-gray-400">Non-Pressure Economy: <strong>{d.npEcon}</strong></p>
                          <p className="text-emerald-400 font-bold">Econ Improvement: +{d.improvement}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10, fontSize: 12 }} />
                <Bar name="Pressure Econ (Lower is better)" dataKey="econ" fill="#d4a843" radius={[4, 4, 0, 0]} />
                <Bar name="Non-Pressure Econ" dataKey="npEcon" fill="#4b5563" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'dotball' && (
            <div className="h-full flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
                <div className="bg-[#121830] p-6 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Top Dot-Ball Controller
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-1">Sufiyan Muqeem</h4>
                  <div className="text-4xl font-black text-emerald-400 mt-3">55.4%</div>
                  <p className="text-xs text-gray-400 mt-2">
                    Reported dot-ball share across 186 legal pressure balls
                  </p>
                </div>

                <div className="bg-[#121830] p-6 rounded-2xl border border-gray-800 text-center">
                  <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest">
                    High-Volume Dot Controller
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-1">Abrar Ahmed</h4>
                  <div className="text-4xl font-black text-[#fbbf24] mt-3">45.7%</div>
                  <p className="text-xs text-gray-400 mt-2">
                    Reported dot-ball share across 392 legal pressure balls
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#090d1a] rounded-xl border border-gray-800 text-xs text-gray-400 flex items-center justify-between">
                <span>
                  <strong>Data Integrity Note:</strong> Only Sufiyan Muqeem (55.4%) and Abrar Ahmed (45.7%) have exact dot-ball percentages explicitly highlighted in the scouting notes.
                </span>
                <span className="text-gray-500 font-mono">Others: Component of 15% model weight</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        players={selectedPlayersList}
        metrics={comparisonMetrics}
        title="Bowler Head-to-Head Comparison"
      />
    </div>
  );
};
