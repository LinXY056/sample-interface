import React from 'react';
import { economicIndicators } from '../data/mockMarketData';

interface EconomicCalendarSectionProps {
  onOpenFullCalendar: () => void;
}

export const EconomicCalendarSection: React.FC<EconomicCalendarSectionProps> = ({
  onOpenFullCalendar,
}) => {
  return (
    <section
      className="bg-tv-lightGray/60 border border-tv-border rounded-2xl p-6"
      data-purpose="economic-indicators-calendar"
      id="economic-calendar-section"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-bold text-tv-black">Economic calendar &amp; key macro data</h2>
          <p className="text-xs text-tv-gray">Major indicators impacting global equity and bond yields</p>
        </div>
        <button
          onClick={onOpenFullCalendar}
          className="text-xs font-semibold text-tv-blue hover:underline self-start sm:self-auto cursor-pointer"
        >
          Full Calendar →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {economicIndicators.map((item) => (
          <div
            key={item.id}
            onClick={onOpenFullCalendar}
            role="button"
            tabIndex={0}
            className="bg-white p-4 rounded-xl border border-tv-border hover:border-tv-gray/40 hover:shadow-sm transition-all cursor-pointer group"
          >
            <span className="text-xs text-tv-gray font-medium block">{item.title}</span>
            <span className="text-2xl font-bold font-mono text-tv-black mt-1 block tabular-nums group-hover:text-tv-blue transition-colors">
              {item.value}
            </span>
            <span
              className={`text-[11px] font-medium mt-1 block ${
                item.subtextColor === 'green'
                  ? 'text-tv-green'
                  : item.subtextColor === 'red'
                  ? 'text-tv-red'
                  : 'text-tv-gray'
              }`}
            >
              {item.subtext}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
