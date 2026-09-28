/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MarketCategory, Instrument } from './types/market';
import { Navigation } from './components/Navigation';
import { HeroHeader } from './components/HeroHeader';
import { IndicesSection } from './components/IndicesSection';
import { USStocksSection } from './components/USStocksSection';
import { CryptoCommoditiesSection } from './components/CryptoCommoditiesSection';
import { EconomicCalendarSection } from './components/EconomicCalendarSection';
import { Footer } from './components/Footer';

import { SymbolSearchModal } from './components/SymbolSearchModal';
import { GlobalIndicesModal } from './components/GlobalIndicesModal';
import { EconomicCalendarModal } from './components/EconomicCalendarModal';
import { ViewAllMoversModal } from './components/ViewAllMoversModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { GetStartedModal } from './components/GetStartedModal';
import { useLiveMarket } from './hooks/useLiveMarket';

export default function App() {
  const { isLive, toggleLive, indices, worldList, stocks } = useLiveMarket();

  // Active category tab in Hero
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('Indices');

  // Active selected index shown in the interactive main chart
  const [selectedIndex, setSelectedIndex] = useState<Instrument>(indices[0]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGlobalIndicesOpen, setIsGlobalIndicesOpen] = useState(false);
  const [isEconomicCalendarOpen, setIsEconomicCalendarOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // View All Movers Modal state
  const [moversModalData, setMoversModalData] = useState<{
    isOpen: boolean;
    title: string;
    data: any[];
  }>({
    isOpen: false,
    title: '',
    data: [],
  });

  // Asset detail modal
  const [inspectedAsset, setInspectedAsset] = useState<Instrument | null>(null);

  // Category navigation handler
  const handleSelectCategory = (category: MarketCategory) => {
    setActiveCategory(category);
    if (category === 'Indices' || category === 'World stocks') {
      document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'US stocks') {
      document.getElementById('us-stocks-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Crypto' || category === 'Futures & commodities') {
      document.getElementById('crypto-commodities-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Economy' || category === 'Government bonds') {
      document.getElementById('economic-calendar-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // For ETFs and Forex, open search modal for quick discovery
      setIsSearchOpen(true);
    }
  };

  // Open asset detail inspection
  const handleOpenAssetDetail = (instrument: Instrument) => {
    setInspectedAsset(instrument);
  };

  // Open "View all" list modal
  const handleViewAllMovers = (title: string, data: any[]) => {
    setMoversModalData({
      isOpen: true,
      title,
      data,
    });
  };

  return (
    <div className="font-sans text-tv-black bg-white min-h-screen flex flex-col selection:bg-tv-blue selection:text-white">
      {/* 1. Top Navigation Bar */}
      <Navigation
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        isLiveUpdating={isLive}
        onToggleLive={toggleLive}
      />

      {/* 2. Hero Header with "Markets, everywhere" dropdown title and category pills */}
      <HeroHeader
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Main Content Grid */}
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-6 space-y-10">
        {/* Indices Section: Pill bar, interactive S&P 500 area chart, World Indices table */}
        <IndicesSection
          indices={indices}
          selectedIndex={selectedIndex}
          onSelectIndex={(item) => setSelectedIndex(item)}
          worldIndicesList={worldList}
          onOpenGlobalIndices={() => setIsGlobalIndicesOpen(true)}
          onSelectWorldIndex={(item) => handleOpenAssetDetail(item)}
        />

        {/* US Stocks Section: Cap pills, 6 megacap stock cards, Tri-column movers tables */}
        <USStocksSection
          stocks={stocks}
          onSelectStock={(stock) => handleOpenAssetDetail(stock)}
          onViewAllMovers={handleViewAllMovers}
        />

        {/* Crypto & Commodities Row */}
        <CryptoCommoditiesSection
          onSelectInstrument={(item) => handleOpenAssetDetail(item)}
        />

        {/* Economic Calendar & Key Macro Data */}
        <EconomicCalendarSection
          onOpenFullCalendar={() => setIsEconomicCalendarOpen(true)}
        />
      </main>

      {/* 4. Footer with TradingView Branding */}
      <Footer />

      {/* 5. Modals & Dialogs */}
      {/* Search Modal (Ctrl+K) */}
      <SymbolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectInstrument={(item) => {
          if (item.category === 'Indices') {
            setSelectedIndex(item);
            document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            handleOpenAssetDetail(item);
          }
        }}
      />

      {/* Explore 85+ Global Indices Modal */}
      <GlobalIndicesModal
        isOpen={isGlobalIndicesOpen}
        onClose={() => setIsGlobalIndicesOpen(false)}
        onSelectIndex={(item) => {
          setSelectedIndex(item);
          document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Economic Calendar Full Modal */}
      <EconomicCalendarModal
        isOpen={isEconomicCalendarOpen}
        onClose={() => setIsEconomicCalendarOpen(false)}
      />

      {/* View All Movers Modal (Highest volume, Top gainers, World largest) */}
      <ViewAllMoversModal
        isOpen={moversModalData.isOpen}
        title={moversModalData.title}
        data={moversModalData.data}
        onClose={() => setMoversModalData({ isOpen: false, title: '', data: [] })}
        onSelectInstrument={(item) => handleOpenAssetDetail(item)}
      />

      {/* Asset Deep Inspection Modal */}
      <AssetDetailModal
        instrument={inspectedAsset}
        isOpen={!!inspectedAsset}
        onClose={() => setInspectedAsset(null)}
      />

      {/* Get Started / Onboarding Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
