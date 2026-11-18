// Batter data extracted verbatim from RR_SupeRR_Selector_Professional_Research_Report.pdf
// All values are reported figures from the PDF — none are invented or modified.

export interface Batter {
  rank: number;
  name: string;
  score: number;
  pressureRuns: number;
  pressureBalls: number;
  pressureSR: number;
  pressureAvg: number;
  srUplift: number;
  pressureMatches: number;
  consistency: number; // percentage
  medianBattingOrder: number | null;
  nonPressureSR: number; // derived: pressureSR - srUplift
  dotBallPct: number | null; // from scouting notes where mentioned
  evidence: 'IPL + T20I' | 'T20I only';
  scoutingNote: string;
}

export const batters: Batter[] = [
  {
    rank: 1,
    name: 'Babar Azam',
    score: 95.4,
    pressureRuns: 436,
    pressureBalls: 249,
    pressureSR: 175.1,
    pressureAvg: 54.5,
    srUplift: 53.1,
    pressureMatches: 14,
    consistency: 100,
    medianBattingOrder: null,
    nonPressureSR: 175.1 - 53.1, // 122.0
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '436 pressure runs from 249 balls; SR 175.1, average 54.5 and +53.1-point SR uplift. He leads the model with 14 qualifying matches and 100% match-threshold consistency. The combination of high pressure average and scoring rate is the strongest top-order signal in this model. T20I-only evidence in the selected window; IPL transfer remains unproven.',
  },
  {
    rank: 2,
    name: 'Naman Dhir',
    score: 91.2,
    pressureRuns: 597,
    pressureBalls: 316,
    pressureSR: 188.9,
    pressureAvg: 29.9,
    srUplift: 43.7,
    pressureMatches: 26,
    consistency: 88,
    medianBattingOrder: 6,
    nonPressureSR: 188.9 - 43.7, // 145.2
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '597 pressure runs from 316 balls at SR 188.9, +43.7-point uplift and 88.5% consistency across 26 matches. Median batting order 6 indicates middle-order usage in the playing-eleven records. Pressure average 29.9 suggests strong scoring tempo but a less secure dismissal profile than the leading anchors. IPL and T20I evidence present.',
  },
  {
    rank: 3,
    name: 'Reeza Hendricks',
    score: 89.8,
    pressureRuns: 603,
    pressureBalls: 356,
    pressureSR: 169.4,
    pressureAvg: 43.1,
    srUplift: 39.7,
    pressureMatches: 16,
    consistency: 94,
    medianBattingOrder: 2,
    nonPressureSR: 169.4 - 39.7, // 129.7
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '603 pressure runs from 356 balls at SR 169.4, average 43.1 and 93.8% consistency. Median batting order 2 supports a top-order profile. The volume and consistency make the pressure output more convincing than a short hot streak. T20I-only in the selected window.',
  },
  {
    rank: 4,
    name: 'Faf du Plessis',
    score: 89.4,
    pressureRuns: 503,
    pressureBalls: 288,
    pressureSR: 174.7,
    pressureAvg: 33.5,
    srUplift: 39.5,
    pressureMatches: 18,
    consistency: 94,
    medianBattingOrder: 2,
    nonPressureSR: 174.7 - 39.5, // 135.2
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '503 pressure runs from 288 balls at SR 174.7, +39.5-point uplift and 94.4% consistency across 18 qualifying matches. Median batting order 2. Strong historical pressure profile; age, fitness, current availability and 2027 role are not modelled.',
  },
  {
    rank: 5,
    name: 'Virat Kohli',
    score: 89.0,
    pressureRuns: 852,
    pressureBalls: 487,
    pressureSR: 174.9,
    pressureAvg: 42.6,
    srUplift: 37.1,
    pressureMatches: 33,
    consistency: 88,
    medianBattingOrder: 2,
    nonPressureSR: 174.9 - 37.1, // 137.8
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '852 pressure runs from 487 balls at SR 174.9 and average 42.6 across 33 qualifying matches; +37.1-point uplift. The large sample provides stronger evidence of repeatability than most peers. Median batting order 2. IPL and T20I evidence present.',
  },
  {
    rank: 6,
    name: 'Tom Banton',
    score: 88.4,
    pressureRuns: 190,
    pressureBalls: 98,
    pressureSR: 193.9,
    pressureAvg: 47.5,
    srUplift: 53.5,
    pressureMatches: 8,
    consistency: 100,
    medianBattingOrder: null,
    nonPressureSR: 193.9 - 53.5, // 140.4
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '190 pressure runs from 98 balls at SR 193.9, average 47.5 and +53.5-point uplift. Eight qualifying matches meet the minimum but sit exactly at the match-count floor; score confidence is lower than for high-exposure players. T20I-only in this window.',
  },
  {
    rank: 7,
    name: 'Fakhar Zaman',
    score: 87.7,
    pressureRuns: 344,
    pressureBalls: 196,
    pressureSR: 175.5,
    pressureAvg: 28.7,
    srUplift: 57.1,
    pressureMatches: 17,
    consistency: 94,
    medianBattingOrder: null,
    nonPressureSR: 175.5 - 57.1, // 118.4
    dotBallPct: null,
    evidence: 'T20I only',
    scoutingNote:
      '344 pressure runs from 196 balls at SR 175.5 and +57.1-point uplift; 94.1% consistency across 17 qualifying matches. Pressure average 28.7 indicates that the high-tempo output comes with meaningful dismissal risk. T20I-only in this window.',
  },
  {
    rank: 8,
    name: 'Ryan Rickelton',
    score: 86.8,
    pressureRuns: 459,
    pressureBalls: 247,
    pressureSR: 185.8,
    pressureAvg: 35.3,
    srUplift: 39.7,
    pressureMatches: 16,
    consistency: 88,
    medianBattingOrder: 1,
    nonPressureSR: 185.8 - 39.7, // 146.1
    dotBallPct: 34.0,
    evidence: 'IPL + T20I',
    scoutingNote:
      '459 pressure runs from 247 balls at SR 185.8, average 35.3 and +39.7-point uplift. Median batting order 1 points to an opening role. Dot-ball share is 34.0%, so the profile is more consistent with an attacking opener than a low-risk innings stabiliser.',
  },
  {
    rank: 9,
    name: 'David Miller',
    score: 85.7,
    pressureRuns: 1478,
    pressureBalls: 906,
    pressureSR: 163.1,
    pressureAvg: 37.0,
    srUplift: 47.4,
    pressureMatches: 67,
    consistency: 82,
    medianBattingOrder: 5,
    nonPressureSR: 163.1 - 47.4, // 115.7
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '1,478 pressure runs from 906 balls across 67 qualifying matches—the largest pressure batting sample in this top ten. SR 163.1, average 37.0 and +47.4-point uplift. Median batting order 5. The high volume strengthens confidence in the historical evidence.',
  },
  {
    rank: 10,
    name: 'Shashank Singh',
    score: 85.6,
    pressureRuns: 810,
    pressureBalls: 477,
    pressureSR: 169.8,
    pressureAvg: 40.5,
    srUplift: 55.4,
    pressureMatches: 34,
    consistency: 74,
    medianBattingOrder: 6,
    nonPressureSR: 169.8 - 55.4, // 114.4
    dotBallPct: null,
    evidence: 'IPL + T20I',
    scoutingNote:
      '810 pressure runs from 477 balls at SR 169.8, average 40.5 and +55.4-point uplift across 34 qualifying matches. Median batting order 6 indicates middle-order usage. Match-threshold consistency is 73.5%, lower than most top-ten peers; the strong aggregate output should be balanced against greater match-to-match variability.',
  },
];
