import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SectionHeader } from '../components/SectionHeader';
import { batters } from '../data/batters';
import { bowlers } from '../data/bowlers';

export const PlayerProfiles: React.FC = () => {
  const { playerName } = useParams<{ playerName?: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Batters' | 'Bowlers'>('All');

  // Combine both pools into 20 players
  const allPlayers = useMemo(() => {
    const bList = batters.map((b) => ({
      ...b,
      role: 'batter' as const,
      id: b.name.toLowerCase().replace(/\s+/g, '-'),
    }));
    const bwList = bowlers.map((bw) => ({
      ...bw,
      role: 'bowler' as const,
      id: bw.name.toLowerCase().replace(/\s+/g, '-'),
    }));
    return [...bList, ...bwList];
  }, []);

  // Filtered players for directory
  const filteredDirectory = useMemo(() => {
    return allPlayers.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole =
        roleFilter === 'All'
          ? true
          : roleFilter === 'Batters'
          ? p.role === 'batter'
          : p.role === 'bowler';
      return matchSearch && matchRole;
    });
  }, [allPlayers, searchTerm, roleFilter]);

  // Selected player logic
  const selectedPlayer = useMemo(() => {
    if (!playerName) return null;
    const decoded = decodeURIComponent(playerName).toLowerCase().replace(/\s+/g, '-');
    return allPlayers.find((p) => p.id === decoded || p.name.toLowerCase() === decodeURIComponent(playerName).toLowerCase());
  }, [playerName, allPlayers]);

  const getInitials = (n: string) =>
    n
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  // If a specific player is selected, show their full dossier
  if (selectedPlayer) {
    const isBatter = selectedPlayer.role === 'batter';
    const b = isBatter ? (selectedPlayer as any) : null;
    const bw = !isBatter ? (selectedPlayer as any) : null;

    // Radar chart normalized metrics (0-100 scale)
    const radarData = isBatter
      ? [
          { subject: 'Pressure SR', value: Math.min(100, (b.pressureSR / 200) * 100), fullMark: 100 },
          { subject: 'SR Uplift', value: Math.min(100, (b.srUplift / 60) * 100), fullMark: 100 },
          { subject: 'Pressure Avg', value: Math.min(100, (b.pressureAvg / 55) * 100), fullMark: 100 },
          { subject: 'Consistency', value: b.consistency, fullMark: 100 },
          { subject: 'Exposure', value: Math.min(100, (b.pressureMatches / 67) * 100), fullMark: 100 },
        ]
      : [
          { subject: 'Econ Control', value: Math.max(10, Math.min(100, ((10 - bw.pressureEconomy) / 5) * 100)), fullMark: 100 },
          { subject: 'Wickets/6', value: Math.min(100, (bw.wicketsPer6 / 0.8) * 100), fullMark: 100 },
          { subject: 'Econ Δ', value: Math.min(100, (bw.economyImprovement / 2.5) * 100), fullMark: 100 },
          { subject: 'Consistency', value: bw.consistency, fullMark: 100 },
          { subject: 'Exposure', value: Math.min(100, (bw.pressureMatches / 67) * 100), fullMark: 100 },
        ];

    // Transferability assessment derived from PDF evidence field
    const isTransferRisk = selectedPlayer.evidence === 'T20I only';
    const isAnchor =
      selectedPlayer.name === 'David Miller' ||
      selectedPlayer.name === 'Virat Kohli' ||
      selectedPlayer.name === 'Kuldeep Yadav';
    const isRoleSpecific =
      selectedPlayer.name === 'Naman Dhir' ||
      selectedPlayer.name === 'Shashank Singh' ||
      selectedPlayer.name === 'Jamie Overton';

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/players')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-xs text-gray-300 hover:text-white transition-colors border border-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#e91e8c]" />
            <span>Back to All 20 Profiles</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">Player Dossier:</span>
            <span className="font-bold text-white">{selectedPlayer.name}</span>
          </div>
        </div>

        {/* Player Header Banner */}
        <div className="bg-[#0d1224] p-6 md:p-8 rounded-2xl border border-gray-800/80 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center font-black text-2xl md:text-3xl tracking-widest border-2 shadow-2xl ${
                  isBatter
                    ? 'bg-[#e91e8c]/15 text-[#f472b6] border-[#e91e8c]/40'
                    : 'bg-[#d4a843]/15 text-[#fbbf24] border-[#d4a843]/40'
                }`}
              >
                {getInitials(selectedPlayer.name)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-300">
                    RANK #{selectedPlayer.rank}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                      isBatter
                        ? 'bg-[#e91e8c]/20 text-[#f472b6]'
                        : 'bg-[#d4a843]/20 text-[#fbbf24]'
                    }`}
                  >
                    {selectedPlayer.role}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${
                      selectedPlayer.evidence === 'IPL + T20I'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {selectedPlayer.evidence}
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-white">
                  {selectedPlayer.name}
                </h1>

                {isBatter && b.medianBattingOrder && (
                  <p className="text-xs text-gray-400">
                    Playing-XI Median Batting Position: <strong>#{b.medianBattingOrder}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Score Pill */}
            <div className="bg-[#090d1a] px-6 py-4 rounded-xl border border-gray-800 text-center min-w-[160px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Reliability Score
              </span>
              <div className="text-3xl md:text-4xl font-black text-white mt-0.5 flex items-center justify-center gap-1">
                <span className={isBatter ? 'text-[#f472b6]' : 'text-[#fbbf24]'}>
                  {selectedPlayer.score.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 font-normal">/100</span>
              </div>
              <span className="text-[10px] text-gray-500 block mt-1">
                Within-role percentile composite
              </span>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {isBatter ? (
            <>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Pressure Runs</span>
                <span className="text-xl font-bold text-white mt-1 block">{b.pressureRuns}</span>
                <span className="text-[10px] text-gray-500">{b.pressureBalls} balls</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Pressure SR</span>
                <span className="text-xl font-bold text-[#f472b6] mt-1 block">{b.pressureSR.toFixed(1)}</span>
                <span className="text-[10px] text-gray-500">Non-P: {b.nonPressureSR.toFixed(1)}</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">SR Uplift (Δ)</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">+{b.srUplift.toFixed(1)}</span>
                <span className="text-[10px] text-gray-500">Percentage points</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Pressure Avg</span>
                <span className="text-xl font-bold text-white mt-1 block">{b.pressureAvg.toFixed(1)}</span>
                <span className="text-[10px] text-gray-500">Runs / dismissal</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Consistency</span>
                <span className="text-xl font-bold text-blue-400 mt-1 block">{b.consistency}%</span>
                <span className="text-[10px] text-gray-500">Matches with SR ≥ 100</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">P-Matches</span>
                <span className="text-xl font-bold text-gray-200 mt-1 block">{b.pressureMatches}</span>
                <span className="text-[10px] text-gray-500">≥3 pressure balls</span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Pressure Wickets</span>
                <span className="text-xl font-bold text-white mt-1 block">{bw.wickets}</span>
                <span className="text-[10px] text-gray-500">{bw.legalPressureBalls} legal balls</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Pressure Economy</span>
                <span className="text-xl font-bold text-[#fbbf24] mt-1 block">{bw.pressureEconomy.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500">Non-P: {bw.nonPressureEconomy.toFixed(2)}</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Econ Improvement</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">+{bw.economyImprovement.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500">Runs saved / 6 balls</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Wkts / 6 Balls</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">{bw.wicketsPer6.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500">Wicket strike rate</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">Consistency</span>
                <span className="text-xl font-bold text-blue-400 mt-1 block">{bw.consistency}%</span>
                <span className="text-[10px] text-gray-500">Matches Econ ≤ 8.5</span>
              </div>
              <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800 text-center">
                <span className="text-[10px] uppercase text-gray-400 font-semibold block">P-Matches</span>
                <span className="text-xl font-bold text-gray-200 mt-1 block">{bw.pressureMatches}</span>
                <span className="text-[10px] text-gray-500">≥6 legal balls</span>
              </div>
            </>
          )}
        </div>

        {/* Scouting Notes & Radar Chart Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scouting Assessment Dossier */}
          <div className="lg:col-span-2 bg-[#0d1224] p-6 rounded-2xl border border-gray-800/80 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#d4a843]" />
                Official Scouting Dossier
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Verbatim analytical assessment from Round 1 Research Report
              </p>
            </div>

            <div className="p-4 bg-[#090d1a] rounded-xl border border-gray-800/80 text-sm text-gray-200 leading-relaxed italic border-l-4 border-l-[#e91e8c]">
              "{selectedPlayer.scoutingNote}"
            </div>

            {/* Structured Breakdown: Strengths, Concerns, Transferability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Data-Supported Strengths</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {isBatter ? (
                    <>
                      <li>High pressure strike rate ({b.pressureSR.toFixed(1)}) under acute match strain</li>
                      <li>Proven strike rate uplift (+{b.srUplift.toFixed(1)} points over baseline)</li>
                      <li>{b.consistency}% match consistency maintaining SR ≥ 100 in pressure states</li>
                      {b.pressureMatches >= 25 && <li>High-volume historical exposure ({b.pressureMatches} qualifying matches)</li>}
                    </>
                  ) : (
                    <>
                      <li>Strong economy suppression ({bw.pressureEconomy.toFixed(2)}) in pressure overs</li>
                      <li>Significant baseline improvement (+{bw.economyImprovement.toFixed(2)} runs saved)</li>
                      <li>High wicket rate ({bw.wicketsPer6.toFixed(2)} wickets per 6 legal balls)</li>
                      {bw.pressureMatches >= 20 && <li>Substantial sample exposure ({bw.pressureMatches} qualifying matches)</li>}
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Statistical Limitations & Risks</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {isTransferRisk ? (
                    <li className="text-amber-300 font-medium">
                      <strong>T20I-Only Data:</strong> Lacks IPL-specific pressure evidence in 2022–2026 window.
                    </li>
                  ) : (
                    <li>Dual IPL + T20I sample present in competition data pack.</li>
                  )}
                  {selectedPlayer.pressureMatches <= 10 && (
                    <li className="text-amber-300">
                      <strong>Floor Sample:</strong> At minimum match threshold ({selectedPlayer.pressureMatches} matches); less score certainty.
                    </li>
                  )}
                  {isBatter && b.pressureAvg < 30 && (
                    <li>Dismissal risk: Pressure average ({b.pressureAvg.toFixed(1)}) reflects aggressive role.</li>
                  )}
                  {isBatter && b.consistency < 80 && (
                    <li>Match consistency ({b.consistency}%) shows higher variance across games.</li>
                  )}
                  {!isBatter && bw.pressureEconomy > 7.5 && (
                    <li>Economy ({bw.pressureEconomy.toFixed(2)}) higher than spin specialists.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Auction Recommendation Card */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isAnchor
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : isTransferRisk
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : isRoleSpecific
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                  : 'bg-gray-800/60 border-gray-700 text-gray-200'
              }`}
            >
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider block">
                  Auction Scouting Recommendation
                </span>
                <p className="leading-relaxed">
                  {isAnchor && (
                    <strong>High-Evidence Anchor: Large sample provides high historical repeatability. Recommended for priority squad core evaluation. Validate auction purse, expected price, and 2027 availability.</strong>
                  )}
                  {isTransferRisk && (
                    <strong>Scouting Lead with Transfer Risk: Demonstrates elite pressure capability, but evidence is restricted to T20I conditions. Advance to video scouting and opposition quality validation before placing an IPL bid.</strong>
                  )}
                  {isRoleSpecific && (
                    <strong>Role-Fit Candidate: Clear role signals in the source data. Evaluate tactical fit for Rajasthan Royals' XI requirements and middle-order/pace composition.</strong>
                  )}
                  {!isAnchor && !isTransferRisk && !isRoleSpecific && (
                    <span>Advance candidate to role, availability, and video review validation before converting into an active auction target.</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-[#0d1224] p-5 rounded-2xl border border-gray-800/80 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#f472b6]" />
                Pressure Metric Profile
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Normalized 0–100 percentile profile across 5 model dimensions
              </p>
            </div>

            <div className="h-64 w-full my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#1f2937" />
                  <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#374151" fontSize={9} />
                  <Radar
                    name={selectedPlayer.name}
                    dataKey="value"
                    stroke={isBatter ? '#e91e8c' : '#d4a843'}
                    fill={isBatter ? '#e91e8c' : '#d4a843'}
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#090d1a] border border-gray-700 p-2 rounded-lg text-xs">
                            <span className="text-white font-bold">{payload[0].name}: </span>
                            <span className="text-[#f472b6] font-semibold">{Math.round(Number(payload[0].value))}/100</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-[#090d1a] rounded-xl border border-gray-800/80 text-[11px] text-gray-400 text-center">
              Scores are normalized relative percentiles within eligible role pool.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DIRECTORY VIEW: Show all 20 players with search and role filters
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <SectionHeader
        title="Shortlisted Player Scouting Profiles"
        subtitle="Individual profiles for all 20 shortlisted candidates (10 Batters and 10 Bowlers). Filter by role or search by player name to inspect ball-by-ball evidence, scouting notes, and transferability assessments."
        badge="20 PLAYERS"
      />

      {/* Directory Search & Filters */}
      <div className="bg-[#0d1224] p-4 rounded-xl border border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs md:text-sm text-gray-200 focus:outline-none focus:border-[#e91e8c]"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-xl border border-gray-800 text-xs w-full md:w-auto justify-center">
          {(['All', 'Batters', 'Bowlers'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                roleFilter === r
                  ? 'bg-[#e91e8c] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {r} {r === 'All' ? '(20)' : '(10)'}
            </button>
          ))}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDirectory.map((player) => {
          const isBatter = player.role === 'batter';
          const p = player as any;

          return (
            <div
              key={player.name}
              onClick={() => navigate(`/players/${encodeURIComponent(player.name)}`)}
              className="bg-[#0d1224] p-5 rounded-xl border border-gray-800/80 hover:border-gray-700 hover:bg-[#121830] transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                      #{player.rank}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isBatter
                          ? 'bg-[#e91e8c]/20 text-[#f472b6]'
                          : 'bg-[#d4a843]/20 text-[#fbbf24]'
                      }`}
                    >
                      {player.role}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      player.evidence === 'IPL + T20I'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {player.evidence}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base tracking-wider border shadow-md flex-shrink-0 ${
                      isBatter
                        ? 'bg-[#e91e8c]/15 text-[#f472b6] border-[#e91e8c]/30'
                        : 'bg-[#d4a843]/15 text-[#fbbf24] border-[#d4a843]/30'
                    }`}
                  >
                    {getInitials(player.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-base truncate group-hover:text-[#f472b6] transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-xs text-[#f472b6] font-semibold">
                      Reliability Index: {player.score.toFixed(1)}/100
                    </p>
                  </div>
                </div>

                {/* Key stats row */}
                <div className="mt-4 pt-3 border-t border-gray-800/80 grid grid-cols-2 gap-2 text-xs">
                  {isBatter ? (
                    <>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Pressure SR</span>
                        <span className="font-bold text-gray-200">{p.pressureSR.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">SR Uplift (Δ)</span>
                        <span className="font-bold text-emerald-400">+{p.srUplift.toFixed(1)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Pressure Econ</span>
                        <span className="font-bold text-gray-200">{p.pressureEconomy.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">Econ Δ</span>
                        <span className="font-bold text-emerald-400">+{p.economyImprovement.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-[#f472b6] font-semibold">
                <span>View Full Dossier</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
