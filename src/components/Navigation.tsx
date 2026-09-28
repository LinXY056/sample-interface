import React, { useState } from 'react';
import { Search, Globe, User, Radio, ChevronDown, Sparkles } from 'lucide-react';

interface NavigationProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  isLiveUpdating: boolean;
  onToggleLive: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  isLiveUpdating,
  onToggleLive,
}) => {
  const [activeNav, setActiveNav] = useState('Markets');
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-tv-border" data-purpose="main-navigation">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left side: TV logo, Search and nav links */}
        <div className="flex items-center gap-5">
          {/* TradingView iconic geometric logo */}
          <a
            href="#"
            className="flex items-center text-tv-black hover:opacity-85 transition-opacity"
            title="TradingView Home"
            aria-label="TradingView Home"
          >
            <svg className="h-6 w-9 fill-current" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 0H0v28h8.5V0zM17.5 7H26v21h-8.5V7z" fill="currentColor" />
              <path d="M26 14h8.5v14H26V14z" fill="currentColor" />
              <path d="M8.5 0H17v7H8.5V0z" fill="currentColor" />
            </svg>
          </a>

          {/* Search Bar with pill shape & shortcut */}
          <div
            onClick={onOpenSearch}
            className="hidden sm:flex items-center relative w-60 md:w-72 lg:w-80 cursor-pointer group"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-tv-gray group-hover:text-tv-black transition-colors">
              <Search className="w-4 h-4 stroke-[2.2]" />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search (Ctrl+K)"
              className="w-full bg-[#f0f3fa] group-hover:bg-[#e7ecf5] text-sm text-tv-black placeholder-tv-gray pl-10 pr-12 py-1.5 rounded-full border-0 focus:ring-2 focus:ring-tv-blue cursor-pointer transition-colors"
            />
            <span className="absolute right-3 text-[11px] font-mono text-tv-gray bg-white/80 px-1.5 py-0.5 rounded border border-tv-border/80">
              ⌘K
            </span>
          </div>

          {/* Primary Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center space-x-6 text-[14.5px] font-medium text-tv-black relative">
            {/* Products dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProductsMenu(!showProductsMenu)}
                onMouseEnter={() => setShowProductsMenu(true)}
                className="hover:text-tv-blue flex items-center gap-1 transition-colors py-1"
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-tv-gray mt-0.5" />
              </button>

              {showProductsMenu && (
                <div
                  onMouseLeave={() => setShowProductsMenu(false)}
                  className="absolute left-0 top-8 w-56 bg-white border border-tv-border rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <a href="#supercharts" onClick={() => setShowProductsMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Supercharts Pro
                  </a>
                  <a href="#screener" onClick={() => setShowProductsMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Stock Screener
                  </a>
                  <a href="#heatmaps" onClick={() => setShowProductsMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Market Heatmaps
                  </a>
                  <a href="#calendar" onClick={() => setShowProductsMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Economic Calendar
                  </a>
                </div>
              )}
            </div>

            {/* Community link */}
            <a
              href="#community"
              onClick={() => setActiveNav('Community')}
              className={`hover:text-tv-blue transition-colors py-1 ${activeNav === 'Community' ? 'text-tv-blue font-semibold' : ''}`}
            >
              Community
            </a>

            {/* Active Markets tab with blue color indicator and exact baseline underline */}
            <a
              href="#markets"
              onClick={() => setActiveNav('Markets')}
              className="text-tv-blue font-semibold border-b-2 border-tv-blue py-4 -mb-[18px]"
            >
              Markets
            </a>

            {/* Brokers link */}
            <a
              href="#brokers"
              onClick={() => setActiveNav('Brokers')}
              className={`hover:text-tv-blue transition-colors py-1 ${activeNav === 'Brokers' ? 'text-tv-blue font-semibold' : ''}`}
            >
              Brokers
            </a>

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                onMouseEnter={() => setShowMoreMenu(true)}
                className="hover:text-tv-blue flex items-center gap-1 transition-colors py-1"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-tv-gray mt-0.5" />
              </button>

              {showMoreMenu && (
                <div
                  onMouseLeave={() => setShowMoreMenu(false)}
                  className="absolute left-0 top-8 w-48 bg-white border border-tv-border rounded-xl shadow-lg p-2 z-50"
                >
                  <a href="#features" onClick={() => setShowMoreMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Platform Features
                  </a>
                  <a href="#pricing" onClick={() => setShowMoreMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Pricing Plans
                  </a>
                  <a href="#mobile" onClick={() => setShowMoreMenu(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-tv-lightGray hover:text-tv-blue">
                    Desktop & Mobile Apps
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side Actions: Live Feed status, Language, User Profile, CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 text-tv-black hover:text-tv-blue rounded-full hover:bg-tv-lightGray transition-colors"
            title="Search symbols"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Live Market Simulation Toggle */}
          <button
            onClick={onToggleLive}
            title={isLiveUpdating ? "Live market ticking active (Click to pause)" : "Live market paused (Click to start)"}
            className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors ${
              isLiveUpdating
                ? 'bg-emerald-50 text-tv-green border border-emerald-200 hover:bg-emerald-100'
                : 'bg-gray-100 text-tv-gray border border-gray-200 hover:bg-gray-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveUpdating ? 'bg-tv-green animate-pulse' : 'bg-gray-400'}`}></span>
            <span>{isLiveUpdating ? 'LIVE FEED' : 'PAUSED'}</span>
          </button>

          {/* Language selector */}
          <button
            aria-label="Change language"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-tv-black hover:text-tv-blue px-2.5 py-1.5 rounded-md hover:bg-tv-lightGray transition-colors"
          >
            <Globe className="w-4 h-4 text-tv-gray" />
            <span className="font-semibold text-xs tracking-wider">EN</span>
          </button>

          {/* User Profile icon */}
          <button
            onClick={onOpenGetStarted}
            aria-label="User account"
            className="p-1.5 text-tv-black hover:text-tv-blue rounded-full hover:bg-tv-lightGray transition-colors"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Vibrant Gradient CTA Button */}
          <button
            onClick={onOpenGetStarted}
            className="tv-btn-gradient text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow transition-all inline-flex items-center justify-center cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
