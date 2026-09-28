import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Bell, Star, ExternalLink, BarChart2 } from 'lucide-react';
import { Instrument } from '../types/market';

interface AssetDetailModalProps {
  instrument: Instrument | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  instrument,
  isOpen,
  onClose,
}) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [alertSet, setAlertSet] = useState(false);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  if (!isOpen || !instrument) return null;

  const isPositive = instrument.change >= 0;
  const daysLow = instrument.daysRange ? instrument.daysRange[0] : instrument.price * 0.985;
  const daysHigh = instrument.daysRange ? instrument.daysRange[1] : instrument.price * 1.015;
  const dayPosition = Math.min(100, Math.max(0, ((instrument.price - daysLow) / (daysHigh - daysLow || 1)) * 100));

  const yearLow = instrument.fiftyTwoWeekRange ? instrument.fiftyTwoWeekRange[0] : instrument.price * 0.75;
  const yearHigh = instrument.fiftyTwoWeekRange ? instrument.fiftyTwoWeekRange[1] : instrument.price * 1.25;
  const yearPosition = Math.min(100, Math.max(0, ((instrument.price - yearLow) / (yearHigh - yearLow || 1)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-tv-border">
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl text-white font-bold text-sm flex items-center justify-center shadow-xs"
              style={{ backgroundColor: instrument.badgeColor || '#2962ff' }}
            >
              {instrument.badge || instrument.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-tv-black">{instrument.name}</h2>
                <span className="text-sm font-mono text-tv-gray bg-tv-lightGray px-2 py-0.5 rounded font-medium">
                  {instrument.symbol}
                </span>
                <span className="text-xs text-tv-gray">{instrument.exchange}</span>
              </div>
              <div className="flex items-baseline gap-2.5 mt-1">
                <span className="text-2xl font-black font-mono text-tv-black tabular-nums">
                  ${instrument.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-sm font-bold font-mono flex items-center gap-0.5 tabular-nums ${
                    isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {isPositive ? '+' : ''}
                  {instrument.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {instrument.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'border-tv-border text-tv-gray hover:text-tv-black hover:bg-tv-lightGray'
              }`}
              title="Add to Watchlist"
            >
              <Star className="w-4 h-4" fill={isWatchlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => setAlertSet(!alertSet)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                alertSet
                  ? 'bg-blue-50 border-blue-300 text-tv-blue'
                  : 'border-tv-border text-tv-gray hover:text-tv-black hover:bg-tv-lightGray'
              }`}
              title="Set Price Alert"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-tv-border text-tv-gray hover:text-tv-black hover:bg-tv-lightGray transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 thin-scrollbar">
          {/* Ranges Visualizers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Day's Range */}
            <div className="bg-tv-lightGray/50 p-4 rounded-xl border border-tv-border">
              <div className="flex justify-between text-xs text-tv-gray font-medium mb-1.5">
                <span>Day's Low: ${daysLow.toFixed(2)}</span>
                <span className="font-semibold text-tv-black">Day's Range</span>
                <span>Day's High: ${daysHigh.toFixed(2)}</span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-visible">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-tv-blue rounded-full"
                  style={{ width: `${dayPosition}%` }}
                ></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-tv-black border-2 border-white rounded-full shadow-sm"
                  style={{ left: `calc(${dayPosition}% - 7px)` }}
                ></div>
              </div>
            </div>

            {/* 52-Week Range */}
            <div className="bg-tv-lightGray/50 p-4 rounded-xl border border-tv-border">
              <div className="flex justify-between text-xs text-tv-gray font-medium mb-1.5">
                <span>52W Low: ${yearLow.toFixed(2)}</span>
                <span className="font-semibold text-tv-black">52-Week Range</span>
                <span>52W High: ${yearHigh.toFixed(2)}</span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-visible">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-tv-green rounded-full"
                  style={{ width: `${yearPosition}%` }}
                ></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-tv-black border-2 border-white rounded-full shadow-sm"
                  style={{ left: `calc(${yearPosition}% - 7px)` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Key Fundamentals & Statistics Grid */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-tv-gray mb-3">Key Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-tv-border rounded-lg">
                <span className="text-xs text-tv-gray block">Market Cap</span>
                <span className="font-bold font-mono text-sm text-tv-black mt-0.5 block">
                  {instrument.marketCap || '3.61 T USD'}
                </span>
              </div>
              <div className="p-3 bg-white border border-tv-border rounded-lg">
                <span className="text-xs text-tv-gray block">Volume Today</span>
                <span className="font-bold font-mono text-sm text-tv-black mt-0.5 block">
                  {instrument.volumeToday || '54.8M'}
                </span>
              </div>
              <div className="p-3 bg-white border border-tv-border rounded-lg">
                <span className="text-xs text-tv-gray block">P/E Ratio</span>
                <span className="font-bold font-mono text-sm text-tv-black mt-0.5 block">
                  {instrument.peRatio || '38.4'}
                </span>
              </div>
              <div className="p-3 bg-white border border-tv-border rounded-lg">
                <span className="text-xs text-tv-gray block">1Y Performance</span>
                <span className="font-bold font-mono text-sm text-tv-green mt-0.5 block">+64.8%</span>
              </div>
            </div>
          </div>

          {/* Technical Analysis Summary Bar */}
          <div className="bg-[#fafbfe] border border-tv-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-tv-black uppercase tracking-wider">
                Technical Rating (Oscillators &amp; Moving Averages)
              </span>
              <span className="text-xs font-bold text-tv-green bg-green-50 px-2 py-0.5 rounded">Strong Buy</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold pt-2 border-t border-tv-border/60">
              <div>
                <span className="text-tv-gray block text-[11px]">Sell</span>
                <span className="font-mono text-tv-red font-bold">2</span>
              </div>
              <div>
                <span className="text-tv-gray block text-[11px]">Neutral</span>
                <span className="font-mono text-tv-gray font-bold">7</span>
              </div>
              <div>
                <span className="text-tv-gray block text-[11px]">Buy</span>
                <span className="font-mono text-tv-green font-bold">17</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-tv-border bg-white flex items-center justify-between">
          <div className="text-xs text-tv-gray flex items-center gap-1">
            <span>TradingView Real-Time Data Feed</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-tv-black hover:bg-tv-lightGray rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="tv-btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              Launch Superchart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
