import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Instrument } from '../types/market';
import {
  initialIndices,
  worldIndices,
  megacapStocks,
  cryptoAssets,
  commodities,
} from '../data/mockMarketData';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstrument: (item: Instrument) => void;
}

type FilterCategory = 'All' | 'Stocks' | 'Indices' | 'Crypto' | 'Futures';

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectInstrument,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterCategory>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  // Pool all instruments
  const allInstruments: Instrument[] = [
    ...initialIndices,
    ...worldIndices,
    ...megacapStocks,
    ...cryptoAssets,
    ...commodities,
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter instruments
  const filtered = allInstruments.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchange.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;

    if (activeTab === 'All') return true;
    if (activeTab === 'Stocks') return item.category === 'US stocks';
    if (activeTab === 'Indices') return item.category === 'Indices' || item.category === 'World stocks';
    if (activeTab === 'Crypto') return item.category === 'Crypto';
    if (activeTab === 'Futures') return item.category === 'Futures & commodities';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-tv-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-tv-border bg-white">
          <Search className="w-5 h-5 text-tv-gray mr-3 stroke-[2.2]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, index, crypto..."
            className="w-full text-base font-medium text-tv-black placeholder-tv-gray bg-transparent border-0 outline-hidden focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-tv-gray hover:text-tv-black hover:bg-tv-lightGray mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-tv-gray hover:text-tv-black bg-tv-lightGray rounded-md cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-tv-border/70 bg-[#fafbfe] text-xs font-semibold overflow-x-auto no-scrollbar">
          {(['All', 'Stocks', 'Indices', 'Crypto', 'Futures'] as FilterCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-tv-black text-white'
                  : 'text-tv-gray hover:text-tv-black hover:bg-tv-lightGray'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-tv-border/50 thin-scrollbar">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectInstrument(item);
                    onClose();
                  }}
                  className="px-4 py-3 flex items-center justify-between hover:bg-tv-hoverBg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-md text-white font-bold text-xs flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.badgeColor || '#0052ff' }}
                    >
                      {item.badge || item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-tv-black group-hover:text-tv-blue transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-xs text-tv-gray font-mono">{item.exchange}</span>
                        <span className="text-[11px] bg-tv-lightGray text-tv-gray px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-xs text-tv-gray">{item.name}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold font-mono text-tv-black tabular-nums">
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-semibold font-mono flex items-center justify-end gap-0.5 tabular-nums ${
                        isPositive ? 'text-tv-green' : 'text-tv-red'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-tv-gray">
              <p className="text-sm font-semibold">No symbols found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for AAPL, S&P 500, BTC, Gold, or Nikkei</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-tv-lightGray/70 border-t border-tv-border text-[11px] text-tv-gray flex items-center justify-between">
          <span>Search 1,000,000+ assets across global exchanges</span>
          <span className="flex items-center gap-1">
            <span>Press</span>
            <kbd className="bg-white px-1.5 py-0.5 rounded border border-tv-border font-mono text-tv-black">Enter</kbd>
            <span>to select</span>
          </span>
        </div>
      </div>
    </div>
  );
};
