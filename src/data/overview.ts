// Overview / summary constants from the PDF
export const overview = {
  projectTitle: 'Reliability Under Pressure',
  subtitle: 'IPL 2027 Auction Intelligence | SupeRR Selector Season 2',
  competitions: 139,
  competitionsDetail: '134 T20I + 5 IPL seasons (2022–2026)',
  matches: 853,
  deliveries: 193988,
  pressureDeliveries: 85872,
  pressurePct: 44.27,
  eligibleBatters: 232,
  eligibleBowlers: 212,
  topBatter: { name: 'Babar Azam', score: 95.4 },
  topBowler: { name: 'Mohammad Nawaz', score: 98.2 },
  batterEligibility: 'At least 60 pressure balls and 8 qualifying pressure matches',
  bowlerEligibility: 'At least 72 legal pressure balls and 8 qualifying pressure matches',
  dataScope:
    'The competition pack contains seven additional T20 competitions beyond the five IPL seasons and 134 T20I competitions; these other T20 competitions are excluded. The analysis therefore reflects the case brief\'s IPL + T20I scope, not all domestic T20 cricket.',
  lastUpdated: '18 November 2026',
  source:
    'SupeRR Selector Season 2 Round 1 data pack supplied for this competition (competitions.csv, matches.csv, ball_by_ball.csv, playing_eleven.csv, with supporting team / player mapping files).',
};

export const battingWeights = [
  { component: 'Pressure Strike Rate', weight: 25, definition: 'Pressure runs per 100 balls faced' },
  { component: 'Strike-Rate Uplift', weight: 20, definition: "Pressure SR minus same player's non-pressure SR" },
  { component: 'Pressure Average', weight: 15, definition: 'Pressure runs per dismissal credited to the striker' },
  { component: 'Dot-Ball Control', weight: 10, definition: 'Lower pressure dot-ball percentage ranks higher' },
  { component: 'Match Consistency', weight: 15, definition: 'Share of qualifying pressure matches with SR ≥ 100' },
  { component: 'Exposure', weight: 15, definition: 'Pressure balls ÷ 240, capped at 100' },
];

export const bowlingWeights = [
  { component: 'Pressure Economy', weight: 25, definition: 'Conceded runs per six legal pressure balls; lower is better' },
  { component: 'Pressure Wicket Rate', weight: 20, definition: 'Bowler-credited wickets per six legal pressure balls' },
  { component: 'Dot-Ball Control', weight: 15, definition: 'Legal pressure balls conceding zero team runs' },
  { component: 'Economy Improvement', weight: 15, definition: 'Non-pressure economy minus pressure economy' },
  { component: 'Match Consistency', weight: 15, definition: 'Share of qualifying pressure matches with economy ≤ 8.5' },
  { component: 'Exposure', weight: 10, definition: 'Legal pressure balls ÷ 240, capped at 100' },
];

export const firstInningsTriggers = [
  {
    trigger: 'Late-innings phase',
    rule: 'At least 75% of scheduled legal balls elapsed',
    rationale: 'Captures end-overs execution and acceleration demand',
  },
  {
    trigger: 'Wickets + phase',
    rule: 'At least 55% elapsed and 4+ wickets lost',
    rationale: 'Captures a damaged platform with overs still remaining',
  },
  {
    trigger: 'Early collapse',
    rule: 'At least 40% elapsed and 5+ wickets lost',
    rationale: 'Captures a severe loss of batting resources',
  },
];

export const secondInningsTriggers = [
  {
    trigger: 'High asking rate',
    rule: 'Required run rate ≥ 10.0',
    rationale: 'A demanding chase rate creates scoring pressure',
  },
  {
    trigger: 'Wickets + time',
    rule: '4+ wickets lost and no more than 75% of scheduled balls remain',
    rationale: 'Combines reduced resources with a shrinking chase window',
  },
  {
    trigger: 'Late chase',
    rule: 'No more than 25% of scheduled balls remain and RRR ≥ 8.5',
    rationale: 'Captures the end-game when the asking rate remains material',
  },
];

export const sensitivityData = {
  batting: {
    baseVsLooserOverlap: '5/10',
    baseVsStricterOverlap: '4/10',
    interpretation:
      'Moderate-to-low membership stability; batter shortlist is sensitive to pressure definition.',
  },
  bowling: {
    baseVsLooserOverlap: '8/10',
    baseVsStricterOverlap: '6/10',
    interpretation:
      'Higher stability under looser thresholds; still changes under stricter thresholds.',
  },
  summary:
    'Batting top-ten membership changes materially when pressure is redefined (5/10 overlap with the looser version; 4/10 with the stricter version). Bowling membership is more stable under the looser version (8/10) but less so under the stricter version (6/10). The rankings should therefore be interpreted as conditional on the stated pressure definition—not as an immutable list.',
  nextValidation:
    'Before treating the batting list as an auction shortlist, inspect rank movement, sample sizes and match footage for candidates appearing only under one threshold set. For bowlers, validate the role and overs in which the pressure balls occurred.',
  uncertaintyNote:
    'Minimum exposure thresholds reduce very small-sample noise but do not eliminate it. Scores near the eligibility floor (for example, eight qualifying matches) are less secure than those supported by dozens of matches. A formal confidence interval / hierarchical shrinkage model would be a useful next iteration.',
};

export const decisionGates = [
  {
    gate: 'Eligibility & availability',
    question: 'Is the player eligible, available and likely to register for IPL 2027?',
    evidence: 'Official auction list, board / league status, availability updates',
  },
  {
    gate: 'IPL transfer',
    question: 'Does the pressure skill translate from T20I / other conditions to IPL?',
    evidence: 'IPL sample, opposition quality, venue and role-specific performance',
  },
  {
    gate: 'Role fit',
    question: "What exact role does the player fill in RR's XI?",
    evidence: 'Batting position, bowling type, phase usage, fielding and balance',
  },
  {
    gate: 'Squad economics',
    question: 'Does expected price justify the marginal value?',
    evidence: 'Auction purse, replacement options, overseas slots, squad gaps',
  },
  {
    gate: 'Video / scouting',
    question: 'Are the underlying skills repeatable and technically sound?',
    evidence: 'Video review, injury history, adaptability, matchup plans',
  },
];

export const auctionInterpretation = {
  highEvidenceAnchors: {
    batting: ['David Miller', 'Virat Kohli'],
    bowling: ['Kuldeep Yadav'],
    note: 'Have particularly large pressure samples in this top-ten set. Their volume supports confidence in the historical record, though price, role and 2027 availability remain separate questions.',
  },
  transferRiskCases: {
    players: ['Babar Azam', 'Reeza Hendricks', 'Mohammad Nawaz', 'Sufiyan Muqeem', 'Abrar Ahmed'],
    note: 'Lead or rank highly on the supplied combined IPL/T20I data but have T20I-only pressure evidence in the selected window. Their performance should be treated as a scouting lead requiring IPL transfer validation.',
  },
  roleRelevantProfiles: {
    players: [
      { name: 'Naman Dhir', note: 'Middle-order usage signals in the batting-order data' },
      { name: 'Shashank Singh', note: 'Middle-order usage signals in the batting-order data' },
      { name: 'Jamie Overton', note: 'Combines pace and all-round attributes in the source fields' },
      { name: 'Kuldeep Yadav', note: 'High-volume spin option' },
    ],
    note: 'These are role clues, not complete tactical evaluations.',
  },
  conclusion:
    'The analysis identifies a defensible first-pass set of pressure performers using ball-by-ball evidence, transparent thresholds and separate batting / bowling scoring. It also shows where confidence is strongest and where conclusions remain sensitive to assumptions. The correct auction use is to advance candidates to role, availability, transferability and price validation—not to convert a statistical ranking directly into a bid.',
};
