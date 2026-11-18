import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Layers,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Scale,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { PlayerCard } from '../components/PlayerCard';
import { overview } from '../data/overview';
import { batters } from '../data/batters';
import { bowlers } from '../data/bowlers';

export const Overview: React.FC = () => {
  const navigate = useNavigate();

  const top5Batters = batters.slice(0, 5).map((b) => ({
    name: b.name,
    score: b.score,
    pSR: b.pressureSR,
    rank: b.rank,
  }));

  const top5Bowlers = bowlers.slice(0, 5).map((b) => ({
    name: b.name,
    score: b.score,
    econ: b.pressureEconomy,
    rank: b.rank,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-r from-[#0d1224] via-[#151c36] to-[#1a1226] border border-gray-800/80 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e91e8c]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#d4a843]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e91e8c]/15 text-[#f472b6] text-xs font-bold border border-[#e91e8c]/30">
            <Flame className="w-3.5 h-3.5 text-[#f472b6]" />
            Rajasthan Royals SupeRR Selector Season 2 • Round 1
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Reliability <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f472b6] to-[#e91e8c]">Under Pressure</span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            A ball-by-ball evaluation of batting and bowling reliability across the 2022–2026 IPL and T20I dataset.
            Features a pre-delivery pressure-state model, role-specific composite scoring, player-level evidence, and threshold sensitivity testing for IPL 2027 auction intelligence.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/auction')}
              className="px-4 py-2 rounded-xl bg-[#e91e8c] hover:bg-[#d81b60] text-white text-xs md:text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#e91e8c]/25 cursor-pointer"
            >
              <span>Explore RR Auction Framework</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/methodology')}
              className="px-4 py-2 rounded-xl bg-[#121830] hover:bg-[#182040] text-gray-200 border border-gray-700/80 text-xs md:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>View Pressure Model</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Scope Numbers */}
      <div>
        <SectionHeader
          title="Analytical Scope & Audit"
          subtitle="Strict ball-by-ball joined dataset across 5 IPL seasons (2022–2026) and 134 T20I tournaments. Other domestic leagues excluded per brief."
          badge="DATA AUDIT"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <StatCard
            title="Competitions"
            value={overview.competitions}
            subtitle="134 T20I + 5 IPL"
            icon={Layers}
            accent="blue"
          />
          <StatCard
            title="Matches Analysed"
            value={overview.matches}
            subtitle="Innings 1 & 2"
            icon={Activity}
            accent="blue"
          />
          <StatCard
            title="Deliveries"
            value={overview.deliveries.toLocaleString()}
            subtitle="Super overs excluded"
            icon={Scale}
            accent="default"
          />
          <StatCard
            title="Pressure Deliveries"
            value={overview.pressureDeliveries.toLocaleString()}
            subtitle="44.27% of match balls"
            icon={Flame}
            accent="pink"
          />
          <StatCard
            title="Eligible Batters"
            value={overview.eligibleBatters}
            subtitle="≥60 balls & ≥8 matches"
            icon={Zap}
            accent="pink"
          />
          <StatCard
            title="Eligible Bowlers"
            value={overview.eligibleBowlers}
            subtitle="≥72 legal balls & ≥8 matches"
            icon={Target}
            accent="gold"
          />
        </div>
      </div>

      {/* Model Leaders Spotlight */}
      <div>
        <SectionHeader
          title="Model Leaders — Composite Index #1"
          subtitle="Top-ranked players from the base model relative composite index (0–100). Babar Azam leads batters; Mohammad Nawaz leads bowlers."
          badge="TOP PERFORMERS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#f472b6] tracking-wider uppercase flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Top-Ranked Batter
              </span>
              <button
                onClick={() => navigate('/batters')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                View all 10 batters <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <PlayerCard
              name={batters[0].name}
              rank={batters[0].rank}
              score={batters[0].score}
              role="batter"
              evidence={batters[0].evidence}
              highlight={true}
              onClick={() => navigate(`/players/${encodeURIComponent(batters[0].name)}`)}
              keyStats={[
                { label: 'Pressure SR', value: batters[0].pressureSR },
                { label: 'Pressure Avg', value: batters[0].pressureAvg },
                { label: 'SR Uplift', value: `+${batters[0].srUplift}` },
              ]}
            />
            <p className="text-xs text-gray-400 italic bg-[#0d1224] p-3 rounded-xl border border-gray-800">
              "{batters[0].scoutingNote}"
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#fbbf24] tracking-wider uppercase flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Top-Ranked Bowler
              </span>
              <button
                onClick={() => navigate('/bowlers')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                View all 10 bowlers <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <PlayerCard
              name={bowlers[0].name}
              rank={bowlers[0].rank}
              score={bowlers[0].score}
              role="bowler"
              evidence={bowlers[0].evidence}
              highlight={true}
              onClick={() => navigate(`/players/${encodeURIComponent(bowlers[0].name)}`)}
              keyStats={[
                { label: 'Pressure Econ', value: bowlers[0].pressureEconomy },
                { label: 'Wkts/6 Balls', value: bowlers[0].wicketsPer6 },
                { label: 'Econ Improvement', value: `+${bowlers[0].economyImprovement}` },
              ]}
            />
            <p className="text-xs text-gray-400 italic bg-[#0d1224] p-3 rounded-xl border border-gray-800">
              "{bowlers[0].scoutingNote}"
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Previews Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batters Mini Leaderboard */}
        <div className="bg-[#0d1224] p-5 rounded-2xl border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#f472b6]" />
                Batting Reliability Top 5
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Composite Score (0–100) based on 6 weighted components
              </p>
            </div>
            <button
              onClick={() => navigate('/batters')}
              className="text-xs text-[#f472b6] hover:underline font-semibold"
            >
              Full Batting Board →
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top5Batters}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" domain={[80, 100]} stroke="#4b5563" textAnchor="end" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={90} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg shadow-xl text-xs">
                          <p className="font-bold text-white">#{data.rank} {data.name}</p>
                          <p className="text-[#f472b6] font-semibold mt-1">Score: {data.score}/100</p>
                          <p className="text-gray-400">Pressure SR: {data.pSR}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {top5Batters.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#e91e8c' : '#c2185b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bowlers Mini Leaderboard */}
        <div className="bg-[#0d1224] p-5 rounded-2xl border border-gray-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#fbbf24]" />
                Bowling Reliability Top 5
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Composite Score (0–100) based on 6 weighted components
              </p>
            </div>
            <button
              onClick={() => navigate('/bowlers')}
              className="text-xs text-[#fbbf24] hover:underline font-semibold"
            >
              Full Bowling Board →
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top5Bowlers}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" domain={[80, 100]} stroke="#4b5563" textAnchor="end" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={100} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg shadow-xl text-xs">
                          <p className="font-bold text-white">#{data.rank} {data.name}</p>
                          <p className="text-[#fbbf24] font-semibold mt-1">Score: {data.score}/100</p>
                          <p className="text-gray-400">Pressure Economy: {data.econ}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {top5Bowlers.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#d4a843' : '#b45309'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Analytical Findings */}
      <div>
        <SectionHeader
          title="Key Analytical Findings & Integrity Disclosures"
          subtitle="Core conclusions derived from ball-by-ball analysis, robustness tests, and transferability checks."
          badge="FINDINGS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0d1224] p-5 rounded-xl border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Batting List is Sensitive</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Base batting shortlist retains only <strong className="text-white">5/10</strong> overlap with a looser definition and <strong className="text-white">4/10</strong> with a stricter definition. Rankings are conditional on cut-offs.
            </p>
          </div>

          <div className="bg-[#0d1224] p-5 rounded-xl border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Bowling More Stable</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Bowling shortlist retains <strong className="text-white">8/10</strong> overlap under looser thresholds and <strong className="text-white">6/10</strong> under stricter thresholds, indicating greater structural stability under pressure.
            </p>
          </div>

          <div className="bg-[#0d1224] p-5 rounded-xl border border-blue-500/30 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>IPL Transfer Risk</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Key leaders (Babar, Hendricks, Nawaz, Muqeem, Abrar) have <strong className="text-white">T20I-only evidence</strong> in the window. Must be treated as scouting leads, not immediate IPL certainty.
            </p>
          </div>

          <div className="bg-[#0d1224] p-5 rounded-xl border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Composite Indices, Not Prices</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Scores represent relative percentiles within eligible pools—not calibrated win probabilities, auction price models, or official Rajasthan Royals ratings.
            </p>
          </div>
        </div>
      </div>

      {/* Executive Recommendation Card */}
      <div className="bg-gradient-to-r from-[#121830] to-[#181d38] p-6 rounded-2xl border border-gray-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <span className="text-[11px] font-bold text-[#d4a843] tracking-widest uppercase">
            Executive Scouting Guidance
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white">
            How RR Management & Analytics Should Use This Research
          </h3>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Use these rankings as a rigorous <strong>first-stage performance screen</strong> to identify high-pressure performers. Before auction bids, filter candidates through Rajasthan Royals' 5-gate validation framework: Eligibility & Availability, IPL Transferability, Role Fit, Squad Economics, and Video Validation.
          </p>
        </div>
        <button
          onClick={() => navigate('/auction')}
          className="px-5 py-3 rounded-xl bg-[#d4a843] hover:bg-[#c49635] text-black font-extrabold text-xs md:text-sm whitespace-nowrap transition-all shadow-lg cursor-pointer"
        >
          View Decision Gates →
        </button>
      </div>
    </div>
  );
};
