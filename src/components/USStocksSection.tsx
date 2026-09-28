import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Instrument } from '../types/market';
import {
  highestVolumeStocks,
  topGainersStocks,
  largestCompanies,
} from '../data/mockMarketData';

interface USStocksSectionProps {
  stocks: Instrument[];
  onSelectStock: (stock: Instrument) => void;
  onViewAllMovers: (title: string, data: any[]) => void;
}

export const USStocksSection: React.FC<USStocksSectionProps> = ({
  stocks,
  onSelectStock,
  onViewAllMovers,
}) => {
  const [capFilter, setCapFilter] = useState<'large' | 'mid' | 'small'>('large');

  // Filter stocks or mock variations based on cap
  const filteredStocks = stocks.slice(0, 6);

  return (
    <section data-purpose="market-movers-and-stocks" id="us-stocks-section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <a
            href="#us-stocks"
            className="group inline-flex items-center text-2xl font-bold tracking-tight text-tv-black hover:text-tv-blue transition-colors"
          >
            <span>US stocks</span>
            <ChevronRight className="w-5 h-5 ml-1 stroke-[2.5] text-tv-gray group-hover:text-tv-blue group-hover:translate-x-0.5 transition-all" />
          </a>
          <p className="text-xs text-tv-gray mt-0.5">High volume, most active &amp; megacap equities</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-tv-lightGray p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setCapFilter('large')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              capFilter === 'large' ? 'bg-white text-tv-black shadow-sm' : 'text-tv-gray hover:text-tv-black'
            }`}
          >
            Large cap
          </button>
          <button
            onClick={() => setCapFilter('mid')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              capFilter === 'mid' ? 'bg-white text-tv-black shadow-sm' : 'text-tv-gray hover:text-tv-black'
            }`}
          >
            Mid cap
          </button>
          <button
            onClick={() => setCapFilter('small')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              capFilter === 'small' ? 'bg-white text-tv-black shadow-sm' : 'text-tv-gray hover:text-tv-black'
            }`}
          >
            Small cap
          </button>
        </div>
      </div>

      {/* Quick Ticker Horizontal Cards (NVDA, AAPL, AMZN, MSFT, TSLA, GOOGL) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {filteredStocks.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              role="button"
              tabIndex={0}
              className="p-3 bg-white border border-tv-border hover:border-tv-gray/50 rounded-xl transition-all hover:shadow-sm cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-6 h-6 rounded text-white flex items-center justify-center font-bold text-[10px]"
                  style={{ backgroundColor: stock.badgeColor || '#000000' }}
                >
                  {stock.badge}
                </span>
                <span
                  className={`text-xs font-bold font-mono tabular-nums ${
                    isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%
                </span>
              </div>
              <span className="font-bold text-sm text-tv-black block group-hover:text-tv-blue transition-colors">
                {stock.name}
              </span>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-xs text-tv-gray font-mono">{stock.symbol}</span>
                <span className="text-xs font-semibold text-tv-black font-mono tabular-nums">
                  ${stock.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tri-Column Market Movers Tables (Volume, Gainers, Market Cap Leaders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Most Active / Highest Volume */}
        <div className="bg-white border border-tv-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-tv-border">
            <div>
              <h3 className="font-bold text-base text-tv-black">Highest volume</h3>
              <p className="text-[11px] text-tv-gray">Shares traded today</p>
            </div>
            <button
              onClick={() => onViewAllMovers('Highest Volume Equities', highestVolumeStocks)}
              className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-tv-border/50 text-sm">
            {highestVolumeStocks.slice(0, 5).map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() =>
                    onSelectStock({
                      id: item.symbol.toLowerCase(),
                      symbol: item.symbol,
                      name: item.name,
                      category: 'US stocks',
                      exchange: 'NASDAQ',
                      price: item.price,
                      change: +(item.price * (item.changePercent / 100)).toFixed(2),
                      changePercent: item.changePercent,
                      volumeToday: item.volume,
                    })
                  }
                  role="button"
                  tabIndex={0}
                  className="py-2.5 flex items-center justify-between hover:bg-tv-hoverBg px-1 rounded transition-colors cursor-pointer group"
                >
                  <div>
                    <span className="font-bold text-tv-black block group-hover:text-tv-blue transition-colors">
                      {item.symbol}
                    </span>
                    <span className="text-xs text-tv-gray">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-tv-black block tabular-nums">{item.volume}</span>
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

        {/* Column 2: Top Gainers */}
        <div className="bg-white border border-tv-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-tv-border">
            <div>
              <h3 className="font-bold text-base text-tv-black">Top gainers</h3>
              <p className="text-[11px] text-tv-gray">US market regular session</p>
            </div>
            <button
              onClick={() => onViewAllMovers('Top Market Gainers', topGainersStocks)}
              className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-tv-border/50 text-sm">
            {topGainersStocks.slice(0, 5).map((item) => (
              <div
                key={item.symbol}
                onClick={() =>
                  onSelectStock({
                    id: item.symbol.toLowerCase(),
                    symbol: item.symbol,
                    name: item.name,
                    category: 'US stocks',
                    exchange: 'NASDAQ',
                    price: item.price,
                    change: +(item.price * (item.changePercent / 100)).toFixed(2),
                    changePercent: item.changePercent,
                  })
                }
                role="button"
                tabIndex={0}
                className="py-2.5 flex items-center justify-between hover:bg-tv-hoverBg px-1 rounded transition-colors cursor-pointer group"
              >
                <div>
                  <span className="font-bold text-tv-black block group-hover:text-tv-blue transition-colors">
                    {item.symbol}
                  </span>
                  <span className="text-xs text-tv-gray">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-tv-black block tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-tv-green font-mono bg-green-50 px-1.5 py-0.5 rounded tabular-nums">
                    +{item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: World's Largest Market Caps */}
        <div className="bg-white border border-tv-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-tv-border">
            <div>
              <h3 className="font-bold text-base text-tv-black">World largest companies</h3>
              <p className="text-[11px] text-tv-gray">By total market capitalization</p>
            </div>
            <button
              onClick={() => onViewAllMovers('World Largest Companies by Market Cap', largestCompanies)}
              className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-tv-border/50 text-sm">
            {largestCompanies.slice(0, 5).map((item) => (
              <div
                key={item.symbol}
                onClick={() =>
                  onSelectStock({
                    id: item.symbol.toLowerCase(),
                    symbol: item.symbol,
                    name: item.name,
                    category: 'US stocks',
                    exchange: 'NASDAQ',
                    price: item.price,
                    change: 1.5,
                    changePercent: 0.8,
                    marketCap: item.marketCap,
                  })
                }
                role="button"
                tabIndex={0}
                className="py-2.5 flex items-center justify-between hover:bg-tv-hoverBg px-1 rounded transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-tv-gray w-3">{item.rank}</span>
                  <div>
                    <span className="font-bold text-tv-black block group-hover:text-tv-blue transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-tv-gray font-mono">{item.symbol}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-tv-black block tabular-nums">
                    {item.marketCap}
                  </span>
                  <span className="text-[11px] text-tv-gray font-mono font-medium">
                    {item.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
