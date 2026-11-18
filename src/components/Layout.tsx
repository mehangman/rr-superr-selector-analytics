import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Zap,
  Target,
  Users,
  BookOpen,
  BarChart3,
  TrendingUp,
  FileDown,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Batter Analytics', path: '/batters', icon: Zap },
    { name: 'Bowler Analytics', path: '/bowlers', icon: Target },
    { name: 'Player Profiles', path: '/players', icon: Users },
    { name: 'Pressure Model & Methodology', path: '/methodology', icon: BookOpen },
    { name: 'Sensitivity Analysis', path: '/sensitivity', icon: BarChart3 },
    { name: 'Auction Intelligence', path: '/auction', icon: TrendingUp },
  ];

  const pdfUrl = `${import.meta.env.BASE_URL}RR_SupeRR_Selector_Professional_Research_Report.pdf`;

  return (
    <div className="min-h-screen flex bg-[#070a14] text-gray-100">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a0e1e] border-r border-gray-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-gray-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#e91e8c] shadow-[0_0_12px_#e91e8c]" />
              <h1 className="font-extrabold text-base tracking-wider text-white">
                SUPERR SELECTOR
              </h1>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#e91e8c] text-white">
                S2
              </span>
            </div>
            <p className="text-[11px] text-[#d4a843] font-semibold tracking-wide uppercase mt-1">
              Rajasthan Royals Analytics
            </p>
            <p className="text-[10px] text-gray-500 font-medium">
              IPL 2027 Auction Intelligence
            </p>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Analytics Platform
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#e91e8c]/15 text-[#f472b6] border border-[#e91e8c]/30 shadow-[0_0_15px_-3px_rgba(233,30,140,0.25)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#f472b6]' : 'text-gray-400'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 px-3">
            <p className="pb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Research Dossier
            </p>
            <a
              href={pdfUrl}
              download="RR_SupeRR_Selector_Professional_Research_Report.pdf"
              className="mt-1 flex items-center justify-between w-full p-2.5 rounded-xl bg-[#121830] border border-gray-800 hover:border-[#d4a843]/50 text-gray-300 hover:text-white text-xs font-semibold transition-all group"
            >
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-[#d4a843] group-hover:scale-110 transition-transform" />
                <span>Original Research PDF</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300" />
            </a>
          </div>
        </nav>

        {/* Footer Meta */}
        <div className="p-4 border-t border-gray-800/80 bg-[#070a14]/60 text-[11px] text-gray-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Ball-by-Ball Data</span>
          </div>
          <p className="text-gray-500 text-[10px]">
            853 Matches • 193,988 Deliveries
          </p>
          <div className="pt-2 flex justify-between items-center text-[10px] text-gray-500 border-t border-gray-800/40">
            <span>Round 1 Analytics</span>
            <span>18 Nov 2026</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0a0e1e]/90 backdrop-blur-md border-b border-gray-800/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e91e8c]" />
            <span className="font-extrabold text-sm text-white tracking-wider">
              SUPERR SELECTOR S2
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800/80 bg-[#090d1a] py-6 px-4 md:px-8 text-center md:text-left text-xs text-gray-400">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-300">
                Rajasthan Royals SupeRR Selector Season 2 — Reliability Under Pressure
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Independent Participant Analysis | 18 November 2026 | Prepared from official competition data pack.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a
                href={pdfUrl}
                download
                className="text-[#f472b6] hover:underline flex items-center gap-1 font-medium"
              >
                <FileDown className="w-3.5 h-3.5" />
                Download Report PDF
              </a>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500">IPL 2027 Scouting Tool</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
