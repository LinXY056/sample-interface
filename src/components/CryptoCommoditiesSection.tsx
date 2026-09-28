import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Instrument } from '../types/market';
import { cryptoAssets, commodities } from '../data/mockMarketData';

interface CryptoCommoditiesSectionProps {
  onSelectInstrument: (item: Instrument) => void;
}

export const CryptoCommoditiesSection: React.FC<CryptoCommoditiesSectionProps> = ({
  onSelectInstrument,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-purpose="crypto-commodities-row" id="crypto-commodities-section">
      {/* Crypto Widget */}
      <div className="bg-white border border-tv-border rounded-2xl p-5 shadow-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between pb-3 border-b border-tv-border">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-yellow-100 text-yellow-800 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
              </svg>
            </span>
            <div>
              <a
                href="#crypto"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectInstrument(cryptoAssets[0]);
                }}
                className="font-bold text-lg text-tv-black hover:text-tv-blue flex items-center gap-1 group"
              >
                <span>Crypto</span>
                <ChevronRight className="w-4 h-4 text-tv-gray group-hover:text-tv-blue group-hover:translate-x-0.5 transition-all" />
              </a>
              <span className="text-[11px] text-tv-gray">24h volume &amp; price changes</span>
            </div>
          </div>
          <span className="text-xs font-bold text-tv-green bg-green-50 px-2 py-1 rounded">24/7 Market</span>
        </div>

        <div className="divide-y divide-tv-border/60 mt-2">
          {cryptoAssets.slice(0, 3).map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectInstrument(item)}
                role="button"
                tabIndex={0}
                className="py-3 flex items-center justify-between hover:bg-tv-hoverBg px-2 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs"
                    style={{
                      background:
                        item.badge === 'SOL'
                          ? 'linear-gradient(to right, #a855f7, #6366f1)'
                          : item.badgeColor || '#f7931a',
                    }}
                  >
                    {item.badge}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-tv-black block group-hover:text-tv-blue transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-tv-gray font-mono">{item.symbol} / USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-tv-black block tabular-nums">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-xs font-semibold font-mono tabular-nums ${
                      isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Futures & Commodities Widget */}
      <div className="bg-white border border-tv-border rounded-2xl p-5 shadow-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between pb-3 border-b border-tv-border">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
              </svg>
            </span>
            <div>
              <a
                href="#futures-commodities"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectInstrument(commodities[0]);
                }}
                className="font-bold text-lg text-tv-black hover:text-tv-blue flex items-center gap-1 group"
              >
                <span>Futures &amp; commodities</span>
                <ChevronRight className="w-4 h-4 text-tv-gray group-hover:text-tv-blue group-hover:translate-x-0.5 transition-all" />
              </a>
              <span className="text-[11px] text-tv-gray">Energy, Metals &amp; Agriculture</span>
            </div>
          </div>
          <span className="text-xs font-bold text-tv-gray bg-tv-lightGray px-2 py-1 rounded font-mono">
            NYMEX / COMEX
          </span>
        </div>

        <div className="divide-y divide-tv-border/60 mt-2">
          {commodities.slice(0, 3).map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectInstrument(item)}
                role="button"
                tabIndex={0}
                className="py-3 flex items-center justify-between hover:bg-tv-hoverBg px-2 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.badge === 'Au'
                        ? 'bg-yellow-400 text-yellow-950'
                        : item.badge === 'Oil'
                        ? 'bg-gray-800 text-white'
                        : 'bg-slate-300 text-slate-800'
                    }`}
                  >
                    {item.badge}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-tv-black block group-hover:text-tv-blue transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-tv-gray font-mono">
                      {item.symbol} / {item.exchange}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-tv-black block tabular-nums">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-xs font-semibold font-mono tabular-nums ${
                      isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
