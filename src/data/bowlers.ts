// Bowler data extracted verbatim from RR_SupeRR_Selector_Professional_Research_Report.pdf
// All values are reported figures from the PDF — none are invented or modified.

export interface Bowler {
  rank: number;
  name: string;
  score: number;
  runsConceded: number;
  legalPressureBalls: number;
  wickets: number;
  pressureEconomy: number;
  wicketsPer6: number;
  economyImprovement: number; // Econ Δ: non-pressure economy minus pressure economy (positive = improved)
  pressureMatches: number;
  consistency: number; // percentage
  nonPressureEconomy: number; // derived: pressureEconomy + economyImprovement
  dotBallPct: number | null; // from scouting notes where mentioned
  evidence: 'IPL + T20I' | 'T20I only';
  scoutingNote: string;
}

export const bowlers: Bowler[] = [
  {
    rank: 1,
    name: 'Mohammad Nawaz',
    score: 98.2,
    runsConceded: 329,
    legalPressureBalls: 337,
    wickets: 34,
    pressureEconomy: 5.86,
    wicketsPer6: 0.61,
    economyImprovement: 1.91,
    pressureMatches: 24,
    consistency: 75,
    nonPressureEconomy: 5.86 + 1.91, // 7.77
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '34 wickets from 337 legal pressure balls at economy 5.86 and 0.61 wickets per six; economy improves by 1.91 against baseline. 75.0% consistency across 24 matches. The leading combination of control and wicket-taking in the model. T20I-only evidence in this window; IPL transfer must be tested.',
  },
  {
    rank: 2,
    name: 'Sufiyan Muqeem',
    score: 96.0,
    runsConceded: 175,
    legalPressureBalls: 186,
    wickets: 17,
    pressureEconomy: 5.65,
    wicketsPer6: 0.55,
    economyImprovement: 1.84,
    pressureMatches: 12,
    consistency: 83,
    nonPressureEconomy: 5.65 + 1.84, // 7.49
    dotBallPct: 55.4,
    evidence: 'T20I only',
    scoutingNote:
      'Pressure economy 5.65, 55.4% dot balls and 17 wickets from 186 balls. Consistency 83.3% across 12 matches. Excellent pressure control, but the sample is materially smaller than high-volume candidates; T20I-only.',
  },
  {
    rank: 3,
    name: 'Hasan Mahmud',
    score: 93.8,
    runsConceded: 180,
    legalPressureBalls: 159,
    wickets: 15,
    pressureEconomy: 6.79,
    wicketsPer6: 0.57,
    economyImprovement: 1.69,
    pressureMatches: 12,
    consistency: 75,
    nonPressureEconomy: 6.79 + 1.69, // 8.48
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '15 wickets from 159 pressure balls at economy 6.79; economy improves by 1.69 and consistency is 75.0% across 12 matches. Pace profile in the source\'s bowling-style field. T20I-only; IPL adaptation is unproven.',
  },
  {
    rank: 4,
    name: 'Abrar Ahmed',
    score: 93.3,
    runsConceded: 366,
    legalPressureBalls: 392,
    wickets: 29,
    pressureEconomy: 5.60,
    wicketsPer6: 0.44,
    economyImprovement: 2.22,
    pressureMatches: 27,
    consistency: 74,
    nonPressureEconomy: 5.60 + 2.22, // 7.82
    dotBallPct: 45.7,
    evidence: 'T20I only',
    scoutingNote:
      '29 wickets from 392 pressure balls at economy 5.60, +2.22 economy improvement and 45.7% dot balls. Consistency 74.1% across 27 matches. Strong pressure-control evidence with a substantial sample. T20I-only in this window.',
  },
  {
    rank: 5,
    name: 'Jamie Overton',
    score: 92.9,
    runsConceded: 353,
    legalPressureBalls: 275,
    wickets: 25,
    pressureEconomy: 7.70,
    wicketsPer6: 0.55,
    economyImprovement: 2.09,
    pressureMatches: 20,
    consistency: 65,
    nonPressureEconomy: 7.70 + 2.09, // 9.79
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '25 wickets from 275 pressure balls; economy 7.70, 0.55 wickets per six and +2.09 economy improvement. Consistency 65.0% across 20 matches. Offers a pace/all-round profile in the source data; economy is higher than the leading spin options. IPL and T20I evidence present.',
  },
  {
    rank: 6,
    name: 'Matthew Humphreys',
    score: 91.2,
    runsConceded: 115,
    legalPressureBalls: 109,
    wickets: 14,
    pressureEconomy: 6.33,
    wicketsPer6: 0.77,
    economyImprovement: 1.26,
    pressureMatches: 8,
    consistency: 75,
    nonPressureEconomy: 6.33 + 1.26, // 7.59
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '14 wickets from 109 pressure balls at economy 6.33 and 0.77 wickets per six—the highest wicket rate in this top ten. Eight qualifying matches place him at the minimum sample threshold, so this is a high-upside but lower-confidence result. T20I-only.',
  },
  {
    rank: 7,
    name: 'George Linde',
    score: 88.9,
    runsConceded: 112,
    legalPressureBalls: 91,
    wickets: 11,
    pressureEconomy: 7.38,
    wicketsPer6: 0.73,
    economyImprovement: 0.87,
    pressureMatches: 8,
    consistency: 75,
    nonPressureEconomy: 7.38 + 0.87, // 8.25
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '11 wickets from 91 pressure balls at economy 7.38 and 0.73 wickets per six; 75.0% consistency across eight matches. Sample size is close to the minimum, so the score should be treated cautiously. Limited IPL evidence in this pack.',
  },
  {
    rank: 8,
    name: 'Imad Wasim',
    score: 88.2,
    runsConceded: 96,
    legalPressureBalls: 96,
    wickets: 9,
    pressureEconomy: 6.00,
    wicketsPer6: 0.56,
    economyImprovement: 0.24,
    pressureMatches: 9,
    consistency: 78,
    nonPressureEconomy: 6.00 + 0.24, // 6.24
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      'Nine wickets from 96 pressure balls at economy 6.00 and 77.8% consistency across nine matches. Economy improvement is only +0.24, meaning his model position is driven more by absolute pressure control and wicket rate than by a large baseline uplift. T20I-only.',
  },
  {
    rank: 9,
    name: 'Kuldeep Yadav',
    score: 87.6,
    runsConceded: 1095,
    legalPressureBalls: 874,
    wickets: 68,
    pressureEconomy: 7.52,
    wicketsPer6: 0.47,
    economyImprovement: 0.92,
    pressureMatches: 67,
    consistency: 67,
    nonPressureEconomy: 7.52 + 0.92, // 8.44
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '68 wickets from 874 legal pressure balls across 67 qualifying matches. Economy 7.52, 0.47 wickets per six, +0.92 economy improvement and 67.2% consistency. His high exposure gives the historical result a stronger evidence base than several smaller-sample peers. IPL and T20I evidence present.',
  },
  {
    rank: 10,
    name: 'Benjamin Sears',
    score: 86.5,
    runsConceded: 254,
    legalPressureBalls: 198,
    wickets: 17,
    pressureEconomy: 7.70,
    wicketsPer6: 0.52,
    economyImprovement: 0.75,
    pressureMatches: 15,
    consistency: 67,
    nonPressureEconomy: 7.70 + 0.75, // 8.45
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '17 wickets from 198 pressure balls at economy 7.70 and +0.75 economy improvement; consistency 66.7% across 15 matches. A pace option by bowling-style data, but current availability and IPL adaptation are not established by the pack. T20I-only.',
  },
];
