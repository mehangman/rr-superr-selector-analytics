import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Target,
  Zap,
  AlertTriangle,
  FileDown,
  ArrowRight,
  Sparkles,
  DollarSign,
  Video,
  ClipboardList,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { decisionGates, auctionInterpretation } from '../data/overview';
import { batters } from '../data/batters';
import { bowlers } from '../data/bowlers';

export const AuctionIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const pdfUrl = `${import.meta.env.BASE_URL}RR_SupeRR_Selector_Professional_Research_Report.pdf`;

  const gateIcons = [ClipboardList, Shield, Target, DollarSign, Video];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SectionHeader
        title="Rajasthan Royals Auction Strategy & Decision Gates"
        subtitle="Translating ball-by-ball reliability evidence into actionable auction scouting decisions for IPL 2027. Combining composite score evidence with availability, IPL transferability, role fit, squad economics, and video validation."
        badge="AUCTION DOSSIER"
      />

      {/* Strategic Framing Banner */}
      <div className="bg-gradient-to-r from-[#0d1224] via-[#161c38] to-[#1e1329] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#d4a843] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Core Analytics Axiom
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
            Composite Scores Are Scouting Screens, Not Automatic Bids
          </h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            The objective of this research is to identify players whose output is resilient when match state creates acute pressure—not to claim that the highest composite score is automatically the best purchase. An elite cricket franchise must filter performance evidence through role scarcity, squad balance, purse constraints, and league transferability.
          </p>
        </div>
      </div>

      {/* The 5 Decision Gates Framework */}
      <div className="bg-[#0d1224] p-6 rounded-2xl border border-gray-800/80 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#f472b6]" />
            Rajasthan Royals 5-Gate Validation Framework
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Five sequential filters every shortlisted candidate must pass prior to placing an auction bid
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {decisionGates.map((gate, idx) => {
            const Icon = gateIcons[idx];
            return (
              <div
                key={idx}
                className="bg-[#121830] p-4 rounded-xl border border-gray-800 flex flex-col justify-between relative group hover:border-[#d4a843]/50 transition-all shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-[#e91e8c]/20 text-[#f472b6] font-black text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-gray-500 group-hover:text-[#d4a843] transition-colors" />
                  </div>

                  <h4 className="font-bold text-white text-sm">{gate.gate}</h4>

                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    "{gate.question}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                    Required Evidence:
                  </span>
                  <span className="text-[11px] text-[#fbbf24] mt-0.5 block leading-snug">
                    {gate.evidence}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority Interpretation Shortlists */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-[#fbbf24]" />
          Priority Scouting Categories
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category A: High-Evidence Anchors */}
          <div className="bg-[#0d1224] p-5 rounded-2xl border border-emerald-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  Category A
                </span>
                <span className="text-xs text-emerald-400 font-bold">High Sample Repeatability</span>
              </div>
              <h4 className="text-base font-bold text-white">High-Evidence Anchors</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {auctionInterpretation.highEvidenceAnchors.note}
              </p>

              <div className="mt-4 space-y-2">
                {['David Miller', 'Virat Kohli'].map((name) => {
                  const b = batters.find((p) => p.name === name);
                  return (
                    <div
                      key={name}
                      onClick={() => navigate(`/players/${encodeURIComponent(name)}`)}
                      className="p-3 bg-[#121830] rounded-xl border border-gray-800 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{name}</span>
                        <span className="text-[10px] text-gray-400">
                          {b?.pressureRuns} runs in {b?.pressureMatches} matches • SR {b?.pressureSR}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-[#f472b6]">{b?.score.toFixed(1)}</span>
                    </div>
                  );
                })}

                {['Kuldeep Yadav'].map((name) => {
                  const bw = bowlers.find((p) => p.name === name);
                  return (
                    <div
                      key={name}
                      onClick={() => navigate(`/players/${encodeURIComponent(name)}`)}
                      className="p-3 bg-[#121830] rounded-xl border border-gray-800 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{name}</span>
                        <span className="text-[10px] text-gray-400">
                          {bw?.wickets} wickets in {bw?.pressureMatches} matches • Econ {bw?.pressureEconomy}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-[#fbbf24]">{bw?.score.toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/80 text-[11px] text-emerald-400/90 font-medium">
              Priority: Evaluate availability, purse requirements and squad fit.
            </div>
          </div>

          {/* Category B: Transfer-Risk Leads */}
          <div className="bg-[#0d1224] p-5 rounded-2xl border border-amber-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                  Category B
                </span>
                <span className="text-xs text-amber-400 font-bold">T20I-Only Evidence</span>
              </div>
              <h4 className="text-base font-bold text-white">Transfer-Risk Scouting Leads</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {auctionInterpretation.transferRiskCases.note}
              </p>

              <div className="mt-4 space-y-2">
                {auctionInterpretation.transferRiskCases.players.map((name) => {
                  const b = batters.find((p) => p.name === name);
                  const bw = bowlers.find((p) => p.name === name);
                  const player = b || bw;
                  return (
                    <div
                      key={name}
                      onClick={() => navigate(`/players/${encodeURIComponent(name)}`)}
                      className="p-3 bg-[#121830] rounded-xl border border-gray-800 hover:border-amber-500/50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{name}</span>
                        <span className="text-[10px] text-amber-400">
                          T20I Only • Rank #{player?.rank} ({b ? 'Batter' : 'Bowler'})
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-white">{player?.score.toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/80 text-[11px] text-amber-400/90 font-medium">
              Mandatory: Verify opposition strength, conditions and IPL adaptability.
            </div>
          </div>

          {/* Category C: Role-Relevant Clues */}
          <div className="bg-[#0d1224] p-5 rounded-2xl border border-blue-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  Category C
                </span>
                <span className="text-xs text-blue-400 font-bold">Tactical Matchup Clues</span>
              </div>
              <h4 className="text-base font-bold text-white">Role-Relevant Candidates</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {auctionInterpretation.roleRelevantProfiles.note}
              </p>

              <div className="mt-4 space-y-2">
                {auctionInterpretation.roleRelevantProfiles.players.map((p) => {
                  return (
                    <div
                      key={p.name}
                      onClick={() => navigate(`/players/${encodeURIComponent(p.name)}`)}
                      className="p-3 bg-[#121830] rounded-xl border border-gray-800 hover:border-blue-500/50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-blue-300">{p.note}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/80 text-[11px] text-blue-400/90 font-medium">
              Review RR squad construction to evaluate positional vacancies.
            </div>
          </div>
        </div>
      </div>

      {/* Final Unstop Competition Submission Order from PDF Page 10 */}
      <div className="bg-[#0d1224] p-6 rounded-2xl border border-[#d4a843]/40 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#d4a843] uppercase tracking-wider">
              Official Competition Deliverable
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              Final Unstop Submission Order (1–10)
            </h3>
            <p className="text-xs text-gray-400">
              The exact ordered ranking submitted for Rajasthan Royals SupeRR Selector Season 2
            </p>
          </div>

          <a
            href={pdfUrl}
            download
            className="px-4 py-2 rounded-xl bg-[#d4a843] hover:bg-[#c49635] text-black font-extrabold text-xs flex items-center gap-2 self-start md:self-auto transition-all shadow-md cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Verified PDF Report</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batters 1-10 */}
          <div className="bg-[#121830] p-5 rounded-xl border border-gray-800 space-y-3">
            <h4 className="text-sm font-bold text-[#f472b6] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Shortlisted Batters 1–10
            </h4>
            <div className="space-y-1.5">
              {batters.map((b) => (
                <div
                  key={b.name}
                  onClick={() => navigate(`/players/${encodeURIComponent(b.name)}`)}
                  className="px-3 py-2 bg-[#090d1a] rounded-lg border border-gray-800/80 hover:border-[#f472b6]/40 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-gray-500 font-mono font-bold text-center">
                      {b.rank}.
                    </span>
                    <span className="font-bold text-white">{b.name}</span>
                    <span className="text-[10px] text-gray-500">
                      ({b.evidence})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">SR {b.pressureSR}</span>
                    <span className="font-extrabold text-[#f472b6] w-10 text-right">
                      {b.score.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bowlers 1-10 */}
          <div className="bg-[#121830] p-5 rounded-xl border border-gray-800 space-y-3">
            <h4 className="text-sm font-bold text-[#fbbf24] uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" />
              Shortlisted Bowlers 1–10
            </h4>
            <div className="space-y-1.5">
              {bowlers.map((bw) => (
                <div
                  key={bw.name}
                  onClick={() => navigate(`/players/${encodeURIComponent(bw.name)}`)}
                  className="px-3 py-2 bg-[#090d1a] rounded-lg border border-gray-800/80 hover:border-[#fbbf24]/40 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-gray-500 font-mono font-bold text-center">
                      {bw.rank}.
                    </span>
                    <span className="font-bold text-white">{bw.name}</span>
                    <span className="text-[10px] text-gray-500">
                      ({bw.evidence})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Econ {bw.pressureEconomy}</span>
                    <span className="font-extrabold text-[#fbbf24] w-10 text-right">
                      {bw.score.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Integrity Disclosure */}
      <div className="p-5 bg-[#090d1a] rounded-2xl border border-gray-800 space-y-2 text-xs text-gray-400 leading-relaxed">
        <div className="flex items-center gap-1.5 text-gray-300 font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-[#d4a843]" />
          Methodological Disclosure & Competition Boundaries
        </div>
        <p>
          This dashboard presents an independent participant analysis prepared for the <strong>Rajasthan Royals SupeRR Selector Season 2</strong> competition using the supplied ball-by-ball data pack. It is not an official Rajasthan Royals internal franchise model or commitment to acquire any named player.
        </p>
        <p className="text-[11px] text-gray-500">
          Source: SupeRR Selector Season 2 Round 1 data pack (competitions.csv, matches.csv, ball_by_ball.csv, playing_eleven.csv). Prepared 18 November 2026.
        </p>
      </div>
    </div>
  );
};
