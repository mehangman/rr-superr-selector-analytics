import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { BatterAnalytics } from './pages/BatterAnalytics';
import { BowlerAnalytics } from './pages/BowlerAnalytics';
import { PlayerProfiles } from './pages/PlayerProfiles';
import { Methodology } from './pages/Methodology';
import { SensitivityAnalysis } from './pages/SensitivityAnalysis';
import { AuctionIntelligence } from './pages/AuctionIntelligence';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/batters" element={<BatterAnalytics />} />
        <Route path="/bowlers" element={<BowlerAnalytics />} />
        <Route path="/players" element={<PlayerProfiles />} />
        <Route path="/players/:playerName" element={<PlayerProfiles />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/sensitivity" element={<SensitivityAnalysis />} />
        <Route path="/auction" element={<AuctionIntelligence />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
