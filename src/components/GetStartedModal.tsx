import React from 'react';
import { X, CheckCircle2, Shield, Zap, TrendingUp } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-tv-border overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with TV geometric pattern */}
        <div className="p-6 bg-gradient-to-r from-[#0052ff] to-[#8522ff] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-8 mb-3 fill-current">
            <svg className="w-full h-full" viewBox="0 0 36 28" fill="none">
              <path d="M8.5 0H0v28h8.5V0zM17.5 7H26v21h-8.5V7z" fill="white" />
              <path d="M26 14h8.5v14H26V14z" fill="white" />
              <path d="M8.5 0H17v7H8.5V0z" fill="white" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Join 60 Million Traders</h2>
          <p className="text-sm text-white/80 mt-1">
            Supercharged charts, real-time quotes, and global community ideas.
          </p>
        </div>

        {/* Value props */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-tv-blue shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-tv-black">Unmatched Financial Charts</h4>
              <p className="text-xs text-tv-gray">100+ pre-built technical indicators, 50+ smart drawing tools.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-tv-green shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-tv-black">Live Exchange Tick Data</h4>
              <p className="text-xs text-tv-gray">Direct market data feeds from NYSE, NASDAQ, CME, LSE, and crypto.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-tv-black">Paper Trading Simulator</h4>
              <p className="text-xs text-tv-gray">Test your strategies risk-free with $100,000 in virtual funds.</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-4 space-y-2">
            <button
              onClick={onClose}
              className="w-full tv-btn-gradient text-white py-3 rounded-xl font-bold text-sm shadow-md cursor-pointer transition-transform active:scale-98"
            >
              Start Free 30-Day Trial
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-tv-lightGray hover:bg-[#e2e7f3] text-tv-black font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Continue as Guest / Explore Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
