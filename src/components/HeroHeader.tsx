import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { MarketCategory } from '../types/market';

interface HeroHeaderProps {
  activeCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

const CATEGORIES: MarketCategory[] = [
  'Indices',
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures & commodities',
  'Forex & currencies',
  'Government bonds',
  'ETFs',
  'Economy',
];

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="pt-9 pb-6 text-center border-b border-tv-border bg-white" data-purpose="hero-market-title">
      <div className="max-w-[1440px] mx-auto px-4 relative">
        {/* Title with category dropdown caret as seen in screenshot */}
        <div className="relative inline-block">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center justify-center cursor-pointer group select-none transition-transform active:scale-98"
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-tv-black group-hover:text-tv-blue transition-colors">
              Markets, everywhere
            </h1>
            <ChevronDown
              className={`w-7 h-7 md:w-8 md:h-8 ml-2 mt-1 stroke-[3] text-tv-black group-hover:text-tv-blue transition-all ${
                isDropdownOpen ? 'rotate-180 text-tv-blue' : ''
              }`}
            />
          </div>

          {/* Category Dropdown Menu */}
          {isDropdownOpen && (
            <div
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-tv-border rounded-2xl shadow-xl p-2 z-30 text-left animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-tv-gray">
                Market Segments
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-colors ${
                    activeCategory === cat
                      ? 'bg-tv-lightGray font-semibold text-tv-blue'
                      : 'text-tv-black hover:bg-tv-lightGray'
                  }`}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && <Check className="w-4 h-4 text-tv-blue" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal Market Segment Scrollable Navigation Pills matching screenshot */}
        <div
          className="mt-7 flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar gap-2 px-2 pb-1"
          data-purpose="market-category-tabs"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full flex-shrink-0 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-tv-black text-white shadow-sm scale-100'
                    : 'bg-tv-lightGray text-tv-black hover:bg-[#e4e9f3] active:scale-95'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
