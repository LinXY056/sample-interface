import { useState, useEffect } from 'react';
import { Instrument } from '../types/market';
import { initialIndices, worldIndices, megacapStocks } from '../data/mockMarketData';

export function useLiveMarket() {
  const [isLive, setIsLive] = useState(true);
  const [indices, setIndices] = useState<Instrument[]>(initialIndices);
  const [worldList, setWorldList] = useState<Instrument[]>(worldIndices);
  const [stocks, setStocks] = useState<Instrument[]>(megacapStocks);
  const [lastUpdatedId, setLastUpdatedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Pick random category to update
      const roll = Math.random();
      if (roll < 0.4) {
        // Update index
        const idx = Math.floor(Math.random() * indices.length);
        const target = indices[idx];
        const tick = (Math.random() - 0.48) * (target.price * 0.0004);
        const newPrice = +(target.price + tick).toFixed(2);
        const newChange = +(target.change + tick).toFixed(2);
        const newChangePercent = +(newChange / (target.previousClose || 5800) * 100).toFixed(2);

        setIndices((prev) =>
          prev.map((item, i) =>
            i === idx
              ? { ...item, price: newPrice, change: newChange, changePercent: newChangePercent }
              : item
          )
        );
        setLastUpdatedId(target.id);
      } else if (roll < 0.7) {
        // Update stock
        const idx = Math.floor(Math.random() * stocks.length);
        const target = stocks[idx];
        const tick = (Math.random() - 0.48) * (target.price * 0.001);
        const newPrice = +(target.price + tick).toFixed(2);
        const newChange = +(target.change + tick).toFixed(2);
        const newChangePercent = +(newChange / (target.previousClose || 100) * 100).toFixed(2);

        setStocks((prev) =>
          prev.map((item, i) =>
            i === idx
              ? { ...item, price: newPrice, change: newChange, changePercent: newChangePercent }
              : item
          )
        );
        setLastUpdatedId(target.id);
      } else {
        // Update world index
        const idx = Math.floor(Math.random() * worldList.length);
        const target = worldList[idx];
        const tick = (Math.random() - 0.48) * (target.price * 0.0003);
        const newPrice = +(target.price + tick).toFixed(2);
        const newChange = +(target.change + tick).toFixed(2);
        const newChangePercent = +(target.changePercent + (Math.random() - 0.48) * 0.02).toFixed(2);

        setWorldList((prev) =>
          prev.map((item, i) =>
            i === idx
              ? { ...item, price: newPrice, change: newChange, changePercent: newChangePercent }
              : item
          )
        );
        setLastUpdatedId(target.id);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isLive, indices, stocks, worldList]);

  return {
    isLive,
    toggleLive: () => setIsLive((prev) => !prev),
    indices,
    worldList,
    stocks,
    lastUpdatedId,
  };
}
