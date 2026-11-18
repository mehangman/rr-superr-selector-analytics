# Rajasthan Royals — SupeRR Selector Season 2
## Reliability Under Pressure | IPL 2027 Auction Intelligence

[![Deploy to GitHub Pages](https://github.com/mehangman/rr-superr-selector-analytics/actions/workflows/deploy.yml/badge.svg)](https://github.com/mehangman/rr-superr-selector-analytics/actions/workflows/deploy.yml)
[![Live Analytics Dashboard](https://img.shields.io/badge/Live_Dashboard-GitHub_Pages-e91e8c?style=flat&logo=react)](https://mehangman.github.io/rr-superr-selector-analytics/)
[![Competition](https://img.shields.io/badge/Rajasthan_Royals-SupeRR_Selector_S2-d4a843)](https://mehangman.github.io/rr-superr-selector-analytics/)

An enterprise-grade, interactive cricket analytics scouting dashboard developed for **Rajasthan Royals SupeRR Selector Season 2 (Round 1)**.

The platform visualizes ball-by-ball empirical research across **139 competitions** (5 IPL seasons 2022–2026 + 134 T20Is), evaluating **193,988 deliveries** and isolating **85,872 pressure-state deliveries (44.27%)** using an objective pre-delivery trigger model.

---

## 🎯 Analytical Objective

Identify 10 batters and 10 bowlers whose performance is strongest, most repeatable, and statistically resilient when match state creates acute game pressure.

The framework scores players through separate, role-specific composite reliability indices (0–100 percentile scale) and subjects results to threshold sensitivity testing and a 5-gate auction decision framework.

---

## 📊 Shortlist Summary

### Top 10 Shortlisted Batters

| Rank | Batter | Reliability Score | P-Runs | P-Balls | Pressure SR | P-Avg | SR Uplift (Δ) | P-Matches | Consistency | Evidence Scope |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **Babar Azam** | **95.4** | 436 | 249 | 175.1 | 54.5 | +53.1 | 14 | 100% | T20I only |
| **2** | **Naman Dhir** | **91.2** | 597 | 316 | 188.9 | 29.9 | +43.7 | 26 | 88% | IPL + T20I |
| **3** | **Reeza Hendricks** | **89.8** | 603 | 356 | 169.4 | 43.1 | +39.7 | 16 | 94% | T20I only |
| **4** | **Faf du Plessis** | **89.4** | 503 | 288 | 174.7 | 33.5 | +39.5 | 18 | 94% | IPL + T20I |
| **5** | **Virat Kohli** | **89.0** | 852 | 487 | 174.9 | 42.6 | +37.1 | 33 | 88% | IPL + T20I |
| **6** | **Tom Banton** | **88.4** | 190 | 98 | 193.9 | 47.5 | +53.5 | 8 | 100% | T20I only |
| **7** | **Fakhar Zaman** | **87.7** | 344 | 196 | 175.5 | 28.7 | +57.1 | 17 | 94% | T20I only |
| **8** | **Ryan Rickelton** | **86.8** | 459 | 247 | 185.8 | 35.3 | +39.7 | 16 | 88% | IPL + T20I |
| **9** | **David Miller** | **85.7** | 1478 | 906 | 163.1 | 37.0 | +47.4 | 67 | 82% | IPL + T20I |
| **10** | **Shashank Singh** | **85.6** | 810 | 477 | 169.8 | 40.5 | +55.4 | 34 | 74% | IPL + T20I |

### Top 10 Shortlisted Bowlers

| Rank | Bowler | Reliability Score | Conceded | Legal Balls | Wickets | Pressure Econ | Wkts / 6 | Econ Δ | P-Matches | Consistency | Evidence Scope |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **Mohammad Nawaz** | **98.2** | 329 | 337 | 34 | 5.86 | 0.61 | +1.91 | 24 | 75% | T20I only |
| **2** | **Sufiyan Muqeem** | **96.0** | 175 | 186 | 17 | 5.65 | 0.55 | +1.84 | 12 | 83% | T20I only |
| **3** | **Hasan Mahmud** | **93.8** | 180 | 159 | 15 | 6.79 | 0.57 | +1.69 | 12 | 75% | T20I only |
| **4** | **Abrar Ahmed** | **93.3** | 366 | 392 | 29 | 5.60 | 0.44 | +2.22 | 27 | 74% | T20I only |
| **5** | **Jamie Overton** | **92.9** | 353 | 275 | 25 | 7.70 | 0.55 | +2.09 | 20 | 65% | IPL + T20I |
| **6** | **Matthew Humphreys** | **91.2** | 115 | 109 | 14 | 6.33 | 0.77 | +1.26 | 8 | 75% | T20I only |
| **7** | **George Linde** | **88.9** | 112 | 91 | 11 | 7.38 | 0.73 | +0.87 | 8 | 75% | T20I only |
| **8** | **Imad Wasim** | **88.2** | 96 | 96 | 9 | 6.00 | 0.56 | +0.24 | 9 | 78% | T20I only |
| **9** | **Kuldeep Yadav** | **87.6** | 1095 | 874 | 68 | 7.52 | 0.47 | +0.92 | 67 | 67% | IPL + T20I |
| **10** | **Benjamin Sears** | **86.5** | 254 | 198 | 17 | 7.70 | 0.52 | +0.75 | 15 | 67% | T20I only |

---

## 🔬 Methodology & Scoring Breakdown

### 1. Pre-Delivery Assignment (No Hindsight Bias)
Pressure is evaluated strictly immediately before the ball is bowled:
- **First Innings Triggers (OR logic):**
  - Late-innings: ≥75% of scheduled legal balls elapsed
  - Wickets + phase: ≥55% elapsed and 4+ wickets lost
  - Early collapse: ≥40% elapsed and 5+ wickets lost
- **Second Innings Triggers (OR logic):**
  - High asking rate: Required run rate ≥ 10.0
  - Wickets + time: 4+ wickets lost and ≤75% scheduled balls remain
  - Late chase: ≤25% scheduled balls remain and RRR ≥ 8.5

### 2. Component Weights
- **Batting:** Pressure Strike Rate (25%), Strike-Rate Uplift (20%), Pressure Average (15%), Consistency (15%), Exposure (15%), Dot-Ball Control (10%).
- **Bowling:** Pressure Economy (25%), Pressure Wicket Rate (20%), Dot-Ball Control (15%), Economy Improvement (15%), Match Consistency (15%), Exposure (10%).

---

## 🏛️ Rajasthan Royals 5-Gate Auction Framework

1. **Eligibility & Availability:** Verified registration and NOC status for IPL 2027.
2. **IPL Transferability:** Empirical testing of T20I pressure skills in Indian conditions and opposition quality.
3. **Role Fit:** Exact tactical alignment with Rajasthan Royals XI (e.g. middle-order acceleration, death-overs spin).
4. **Squad Economics:** Price-to-marginal-value justification against purse constraints.
5. **Video & Technical Validation:** Biomechanics, pitch adaptability, matchup resilience.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 (Custom Rajasthan Royals dark navy `#070a14` & pink `#e91e8c` / gold `#d4a843` theme)
- **Data Visualizations:** Recharts (Horizontal bar charts, radar charts, grouped comparative charts, scatter plots)
- **Icons:** Lucide React
- **Hosting & CI/CD:** GitHub Pages via GitHub Actions

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/mehangman/rr-superr-selector-analytics.git

# Enter project directory
cd rr-superr-selector-analytics

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 Source Attribution & Disclosures

- **Source:** SupeRR Selector Season 2 Round 1 data pack (`competitions.csv`, `matches.csv`, `ball_by_ball.csv`, `playing_eleven.csv`).
- **Research Report Date:** 18 November 2026.
- **Independence Notice:** This is an independent participant analysis prepared for the competition submission and is not an official publication of the Rajasthan Royals franchise.
