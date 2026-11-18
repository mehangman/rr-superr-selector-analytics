import React, { useState } from 'react';
import {
  Layers,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SectionHeader } from '../components/SectionHeader';
import {
  battingWeights,
  bowlingWeights,
  firstInningsTriggers,
  secondInningsTriggers,
} from '../data/overview';

export const Methodology: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    triggers: true,
    scoring: true,
    attribution: true,
    limitations: true,
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const battingPieColors = ['#e91e8c', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d'];
  const bowlingPieColors = ['#d4a843', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Pressure Model & Scoring Methodology"
        subtitle="A transparent, reproducible, ball-by-ball framework for quantifying cricket reliability under acute game pressure without hindsight bias."
        badge="REPRODUCIBILITY"
      />

      {/* Core Principle: Pre-Delivery Assignment */}
      <div className="bg-[#0d1224] p-6 rounded-2xl border border-[#e91e8c]/30 shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#e91e8c]/15 text-[#f472b6] border border-[#e91e8c]/30 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#f472b6] uppercase tracking-wider">
              Core Methodological Rule
            </span>
            <h3 className="text-xl font-bold text-white">
              Pre-Delivery Match-State Assignment (No Hindsight Bias)
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Pressure is evaluated <strong>immediately before the delivery</strong> using the live game state—never from the outcome of the delivery itself. This eliminates post-hoc rationalisation: a ball is not deemed high-pressure simply because a wicket fell or a six was struck on that ball. The model evaluates whether the batter and bowler were subjected to acute match pressure before the ball was bowled.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Pressure Triggers */}
      <div className="bg-[#0d1224] rounded-2xl border border-gray-800/80 overflow-hidden shadow-xl">
        <div
          onClick={() => toggleSection('triggers')}
          className="p-5 bg-[#090d1a] border-b border-gray-800 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#d4a843]" />
            <div>
              <h3 className="text-base font-bold text-white">
                01. Operational Pressure Triggers (Innings 1 & Innings 2)
              </h3>
              <p className="text-xs text-gray-400">
                Any delivery satisfying any single trigger is labelled a Pressure Ball (OR logic).
              </p>
            </div>
          </div>
          {openSections.triggers ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {openSections.triggers && (
          <div className="p-6 space-y-6">
            {/* First Innings Triggers */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f472b6] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#e91e8c]" />
                First Innings Pressure Triggers
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {firstInningsTriggers.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121830] p-4 rounded-xl border border-gray-800 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Trigger {idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{t.trigger}</h4>
                      <div className="mt-2 p-2 bg-[#090d1a] rounded-lg border border-gray-800 font-mono text-xs text-[#f472b6] font-semibold">
                        {t.rule}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{t.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Innings Triggers */}
            <div className="space-y-3 pt-4 border-t border-gray-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-[#fbbf24] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#d4a843]" />
                Second Innings (Chase) Pressure Triggers
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {secondInningsTriggers.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121830] p-4 rounded-xl border border-gray-800 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Trigger {idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{t.trigger}</h4>
                      <div className="mt-2 p-2 bg-[#090d1a] rounded-lg border border-gray-800 font-mono text-xs text-[#fbbf24] font-semibold">
                        {t.rule}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{t.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RRR Formula Note */}
            <div className="p-4 bg-[#090d1a] rounded-xl border border-gray-800 text-xs text-gray-300 space-y-1">
              <span className="font-bold text-white">Required Run Rate Formula:</span>
              <p className="font-mono text-gray-400">
                RRR = (Target − Runs Scored before delivery) × 6 ÷ Legal Balls Remaining
              </p>
              <p className="text-gray-500 text-[11px]">
                Target = Recorded revised target where present, otherwise (First Innings Total + 1). Innings scaled to scheduled legal balls where revised overs exist.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Composite Reliability Index Scoring */}
      <div className="bg-[#0d1224] rounded-2xl border border-gray-800/80 overflow-hidden shadow-xl">
        <div
          onClick={() => toggleSection('scoring')}
          className="p-5 bg-[#090d1a] border-b border-gray-800 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-[#f472b6]" />
            <div>
              <h3 className="text-base font-bold text-white">
                02. Composite Scoring Weights & Role Indices
              </h3>
              <p className="text-xs text-gray-400">
                Batters and bowlers scored in separate eligible pools via weighted within-role percentiles (0–100 scale).
              </p>
            </div>
          </div>
          {openSections.scoring ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {openSections.scoring && (
          <div className="p-6 space-y-8">
            {/* Batting Reliability Index Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#f472b6]" />
                  Batting Reliability Index (100% Total Weight)
                </h4>
                <span className="text-xs text-gray-400">
                  Eligibility Floor: ≥60 Pressure Balls & ≥8 Qualifying Matches
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={battingWeights}
                        dataKey="weight"
                        nameKey="component"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {battingWeights.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={battingPieColors[index % battingPieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg text-xs shadow-xl">
                                <p className="font-bold text-white">{d.component}</p>
                                <p className="text-[#f472b6] font-semibold">{d.weight}% weight</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {battingWeights.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121830] rounded-xl border border-gray-800 flex items-start gap-3"
                    >
                      <span className="px-2 py-1 rounded bg-[#e91e8c]/20 text-[#f472b6] font-extrabold text-xs">
                        {w.weight}%
                      </span>
                      <div>
                        <h5 className="font-bold text-white text-xs">{w.component}</h5>
                        <p className="text-[11px] text-gray-400 mt-0.5">{w.definition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bowling Reliability Index Breakdown */}
            <div className="space-y-4 pt-6 border-t border-gray-800/80">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#fbbf24]" />
                  Bowling Reliability Index (100% Total Weight)
                </h4>
                <span className="text-xs text-gray-400">
                  Eligibility Floor: ≥72 Legal Pressure Balls & ≥8 Qualifying Matches
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bowlingWeights}
                        dataKey="weight"
                        nameKey="component"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {bowlingWeights.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={bowlingPieColors[index % bowlingPieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-[#090d1a] border border-gray-700 p-2.5 rounded-lg text-xs shadow-xl">
                                <p className="font-bold text-white">{d.component}</p>
                                <p className="text-[#fbbf24] font-semibold">{d.weight}% weight</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bowlingWeights.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121830] rounded-xl border border-gray-800 flex items-start gap-3"
                    >
                      <span className="px-2 py-1 rounded bg-[#d4a843]/20 text-[#fbbf24] font-extrabold text-xs">
                        {w.weight}%
                      </span>
                      <div>
                        <h5 className="font-bold text-white text-xs">{w.component}</h5>
                        <p className="text-[11px] text-gray-400 mt-0.5">{w.definition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Attribution Rules & Consistency Denominators */}
      <div className="bg-[#0d1224] rounded-2xl border border-gray-800/80 overflow-hidden shadow-xl">
        <div
          onClick={() => toggleSection('attribution')}
          className="p-5 bg-[#090d1a] border-b border-gray-800 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                03. Attribution Rules & Denominators
              </h3>
              <p className="text-xs text-gray-400">
                Rigorous handling of legal deliveries, extras, dismissals and consistency denominators.
              </p>
            </div>
          </div>
          {openSections.attribution ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {openSections.attribution && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Dismissal & Wicket Rules
              </h5>
              <p className="text-xs text-gray-300 leading-relaxed">
                • <strong>Batter dismissal</strong> is credited only when <code>dismissed_player_id</code> matches <code>striker_id</code>.
                <br />
                • <strong>Bowler wickets</strong> exclude run-outs, retired-out, and obstructing-the-field.
              </p>
            </div>

            <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Runs & Legal Delivery Counting
              </h5>
              <p className="text-xs text-gray-300 leading-relaxed">
                • <strong>Bowler-conceded runs</strong> include batter runs plus wides and no-ball extras; byes and leg-byes are excluded.
                <br />
                • <strong>Legal balls</strong> exclude wides and no-balls. Batter balls faced exclude wides; no-balls count as balls faced.
              </p>
            </div>

            <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Consistency & Exposure
              </h5>
              <p className="text-xs text-gray-300 leading-relaxed">
                • <strong>Batter consistency:</strong> Matches with ≥3 pressure balls faced where match SR ≥ 100.
                <br />
                • <strong>Bowler consistency:</strong> Matches with ≥6 legal pressure balls where economy ≤ 8.5.
                <br />
                • <strong>Exposure term:</strong> Legal pressure balls ÷ 240, capped at 100 (capped volume proxy).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Model Limitations Disclosure */}
      <div className="bg-[#0d1224] rounded-2xl border border-gray-800/80 overflow-hidden shadow-xl">
        <div
          onClick={() => toggleSection('limitations')}
          className="p-5 bg-[#090d1a] border-b border-gray-800 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                04. Methodological Limitations & Transparency Disclosures
              </h3>
              <p className="text-xs text-gray-400">
                Acknowledged data boundaries and proxy constraints in the research report.
              </p>
            </div>
          </div>
          {openSections.limitations ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {openSections.limitations && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Missing Contextual Variables
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The supplied dataset lacks win-probability leverage indices, pitch condition metrics, boundary dimensions, weather adjustments, and explicit matchup intent. The model quantifies match-state pressure, not psychological resilience or tactical nuance.
                </p>
              </div>

              <div className="p-4 bg-[#121830] rounded-xl border border-gray-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Sample-Size & Shrinkage Boundaries
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Minimum exposure thresholds reduce small-sample noise but do not eliminate it. Scores near the eligibility floor (e.g., eight qualifying matches) carry greater statistical uncertainty than players with dozens of matches. Formal Bayesian shrinkage would be a valuable next iteration.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#090d1a] rounded-xl border border-gray-800 text-xs text-gray-400 italic">
              <strong>Report Attribution Note:</strong> All player metrics are derived directly from the supplied competition data pack. Interpretations and model definitions are analyst-defined for the Rajasthan Royals SupeRR Selector Season 2 competition submission.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
