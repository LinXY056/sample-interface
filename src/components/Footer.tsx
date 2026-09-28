import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-tv-border bg-white mt-12 py-10" data-purpose="tradingview-footer">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo & Copyright */}
          <div className="flex items-center gap-4">
            <svg className="h-6 w-9 fill-current text-tv-black" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 0H0v28h8.5V0zM17.5 7H26v21h-8.5V7z" fill="currentColor" />
              <path d="M26 14h8.5v14H26V14z" fill="currentColor" />
              <path d="M8.5 0H17v7H8.5V0z" fill="currentColor" />
            </svg>
            <span className="text-xs text-tv-gray">
              © 2025 TradingView. Look first / Then leap. Real-time market data provider.
            </span>
          </div>

          {/* Center / Right: Quick Legal Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-tv-gray">
            <a href="#privacy" className="hover:text-tv-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-tv-blue transition-colors">
              Terms of Service
            </a>
            <a href="#disclaimer" className="hover:text-tv-blue transition-colors">
              Disclaimer
            </a>
            <a href="#help" className="hover:text-tv-blue transition-colors">
              Help Center
            </a>
            <a href="#apps" className="hover:text-tv-blue transition-colors">
              Mobile Apps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
