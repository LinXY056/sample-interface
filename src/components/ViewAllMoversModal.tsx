import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Instrument } from '../types/market';

interface ViewAllMoversModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[];
  onSelectInstrument: (item: Instrument) => void;
}

export const ViewAllMoversModal: React.FC<ViewAllMoversModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
  onSelectInstrument,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-tv-border">
          <h2 className="text-xl font-bold text-tv-black">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-tv-gray hover:text-tv-black hover:bg-tv-lightGray transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-tv-border/50 thin-scrollbar">
          {data.map((item, idx) => {
            const isPositive = (item.changePercent ?? 0) >= 0;
            return (
              <div
                key={item.symbol || idx}
                onClick={() => {
                  onSelectInstrument({
                    id: (item.symbol || 'sym').toLowerCase(),
                    symbol: item.symbol || 'SYM',
                    name: item.name || item.symbol,
                    category: 'US stocks',
                    exchange: 'NASDAQ',
                    price: item.price || 100,
                    change: 1.25,
                    changePercent: item.changePercent || 0,
                    volumeToday: item.volume,
                    marketCap: item.marketCap,
                  });
                  onClose();
                }}
                className="px-6 py-3.5 flex items-center justify-between hover:bg-tv-hoverBg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-tv-gray w-5">{item.rank || idx + 1}</span>
                  <div>
                    <span className="font-bold text-tv-black group-hover:text-tv-blue transition-colors block">
                      {item.symbol || item.name}
                    </span>
                    <span className="text-xs text-tv-gray">{item.name}</span>
                  </div>
                </div>

                <div className="text-right">
                  {item.price && (
                    <span className="font-bold font-mono text-sm text-tv-black block tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                  {item.marketCap && (
                    <span className="font-bold font-mono text-sm text-tv-black block tabular-nums">
                      {item.marketCap} {item.currency || 'USD'}
                    </span>
                  )}
                  {item.volume && (
                    <span className="text-xs text-tv-gray font-mono block tabular-nums">
                      Vol: {item.volume}
                    </span>
                  )}
                  {item.changePercent !== undefined && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-semibold font-mono tabular-nums ${
                        isPositive ? 'text-tv-green' : 'text-tv-red'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-tv-border bg-[#fafbfe] text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-tv-black text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
