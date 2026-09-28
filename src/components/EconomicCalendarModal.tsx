import React, { useState } from 'react';
import { X, Calendar, AlertCircle, Filter } from 'lucide-react';
import { upcomingEconomicEvents } from '../data/mockMarketData';
import { EconomicEvent } from '../types/market';

interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EconomicCalendarModal: React.FC<EconomicCalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [impactFilter, setImpactFilter] = useState<'All' | 'High' | 'Medium'>('All');

  if (!isOpen) return null;

  const filtered = upcomingEconomicEvents.filter((ev) => {
    if (impactFilter === 'All') return true;
    if (impactFilter === 'High') return ev.impact === 'high';
    if (impactFilter === 'Medium') return ev.impact === 'medium';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-tv-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-tv-blue" />
            <div>
              <h2 className="text-xl font-bold text-tv-black">Economic Calendar</h2>
              <p className="text-xs text-tv-gray">Real-time global macro indicators and central bank releases</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-tv-gray hover:text-tv-black hover:bg-tv-lightGray transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-tv-border bg-[#fafbfe] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-tv-gray">
            <Filter className="w-3.5 h-3.5" />
            <span>Impact:</span>
            {(['All', 'High', 'Medium'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setImpactFilter(lvl)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  impactFilter === lvl
                    ? 'bg-tv-black text-white'
                    : 'bg-tv-lightGray text-tv-black hover:bg-gray-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="text-xs text-tv-gray font-mono">Timezone: America/New_York (EST)</div>
        </div>

        {/* Calendar Events Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-tv-border/50 thin-scrollbar">
          <div className="grid grid-cols-12 px-6 py-2.5 bg-tv-lightGray/40 text-[11px] font-bold uppercase tracking-wider text-tv-gray">
            <div className="col-span-3">Time (EST)</div>
            <div className="col-span-1">Impact</div>
            <div className="col-span-4">Event</div>
            <div className="col-span-4 grid grid-cols-3 text-right">
              <span>Actual</span>
              <span>Forecast</span>
              <span>Prior</span>
            </div>
          </div>

          {filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-tv-hoverBg transition-colors text-sm"
            >
              <div className="col-span-3">
                <span className="font-semibold text-xs text-tv-black block">{item.date}</span>
                <span className="text-xs text-tv-gray font-mono">{item.time}</span>
              </div>

              <div className="col-span-1">
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.impact === 'high'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.impact}
                </span>
              </div>

              <div className="col-span-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold bg-tv-lightGray px-1.5 py-0.2 rounded font-mono">
                    {item.countryCode}
                  </span>
                  <span className="font-semibold text-tv-black text-xs sm:text-sm">{item.event}</span>
                </div>
              </div>

              <div className="col-span-4 grid grid-cols-3 text-right font-mono text-xs">
                <span className="font-bold text-tv-black tabular-nums">{item.actual}</span>
                <span className="text-tv-gray tabular-nums">{item.forecast}</span>
                <span className="text-tv-gray tabular-nums">{item.previous}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-tv-border bg-[#fafbfe] flex items-center justify-between text-xs text-tv-gray">
          <span>Real-time release alert enabled</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-tv-black text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
