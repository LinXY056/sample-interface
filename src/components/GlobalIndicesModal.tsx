import React, { useState } from 'react';
import { X, Search, Globe2, TrendingUp, TrendingDown } from 'lucide-react';
import { Instrument } from '../types/market';
import { expandedGlobalIndices } from '../data/mockMarketData';

interface GlobalIndicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (item: Instrument) => void;
}

export const GlobalIndicesModal: React.FC<GlobalIndicesModalProps> = ({
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const [filterRegion, setFilterRegion] = useState<'All' | 'Americas' | 'Europe' | 'Asia-Pacific'>('All');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = expandedGlobalIndices.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      (item.country && item.country.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterRegion === 'All') return true;
    if (filterRegion === 'Americas') return ['CA', 'US'].includes(item.flag || '');
    if (filterRegion === 'Europe') return ['GB', 'DE', 'FR', 'ES', 'CH'].includes(item.flag || '');
    if (filterRegion === 'Asia-Pacific') return ['JP', 'HK', 'IN', 'CN', 'AU', 'KR'].includes(item.flag || '');
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
            <Globe2 className="w-5 h-5 text-tv-blue" />
            <h2 className="text-xl font-bold text-tv-black">Global Market Indices</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-tv-gray hover:text-tv-black hover:bg-tv-lightGray transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="p-4 border-b border-tv-border bg-[#fafbfe] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-tv-gray absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by country or index name..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-tv-border rounded-lg text-sm text-tv-black focus:outline-hidden focus:border-tv-blue"
            />
          </div>

          <div className="flex items-center gap-1 bg-tv-lightGray p-1 rounded-lg text-xs font-semibold">
            {(['All', 'Americas', 'Europe', 'Asia-Pacific'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setFilterRegion(reg)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  filterRegion === reg ? 'bg-white text-tv-black shadow-sm' : 'text-tv-gray hover:text-tv-black'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Indices Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-tv-border/50 thin-scrollbar">
          <div className="grid grid-cols-12 px-6 py-2.5 bg-tv-lightGray/40 text-[11px] font-bold uppercase tracking-wider text-tv-gray">
            <div className="col-span-5">Index / Country</div>
            <div className="col-span-3 text-right">Price</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {filtered.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-tv-hoverBg transition-colors"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <span className="text-xs font-bold bg-tv-lightGray px-2 py-0.5 rounded text-tv-black font-mono">
                    {item.flag || 'GL'}
                  </span>
                  <div>
                    <span className="font-bold text-sm text-tv-black block">{item.name}</span>
                    <span className="text-xs text-tv-gray font-mono">
                      {item.symbol} • {item.country || 'Global'}
                    </span>
                  </div>
                </div>

                <div className="col-span-3 text-right">
                  <span className="font-bold font-mono text-sm text-tv-black tabular-nums">
                    {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="col-span-2 text-right">
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-bold font-mono tabular-nums ${
                      isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>

                <div className="col-span-2 text-right">
                  <button
                    onClick={() => {
                      onSelectIndex(item);
                      onClose();
                    }}
                    className="text-xs font-semibold text-tv-blue hover:underline bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    View Chart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-tv-border bg-[#fafbfe] text-center text-xs text-tv-gray">
          Showing {filtered.length} major global indices with real-time composite coverage.
        </div>
      </div>
    </div>
  );
};
