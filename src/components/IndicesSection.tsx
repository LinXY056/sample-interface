import React, { useState, useMemo } from 'react';
import { ChevronRight, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { Instrument, TimeFrame, ChartDataPoint } from '../types/market';
import { sp500ChartData } from '../data/mockMarketData';

interface IndicesSectionProps {
  indices: Instrument[];
  selectedIndex: Instrument;
  onSelectIndex: (instrument: Instrument) => void;
  worldIndicesList: Instrument[];
  onOpenGlobalIndices: () => void;
  onSelectWorldIndex: (instrument: Instrument) => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  selectedIndex,
  onSelectIndex,
  worldIndicesList,
  onOpenGlobalIndices,
  onSelectWorldIndex,
}) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1D');
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Timeframe options
  const timeframes: TimeFrame[] = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'ALL'];

  // Current active data points
  const activeData: ChartDataPoint[] = useMemo(() => {
    if (selectedIndex.chartData && selectedIndex.chartData[timeframe]) {
      return selectedIndex.chartData[timeframe];
    }
    // Fallback or scaled from S&P 500
    const ratio = selectedIndex.price / 5864.67;
    return (sp500ChartData[timeframe] || sp500ChartData['1D']).map((pt) => ({
      time: pt.time,
      price: +(pt.price * ratio).toFixed(2),
      volume: pt.volume,
      isUp: pt.isUp,
    }));
  }, [selectedIndex, timeframe]);

  // Compute SVG dimensions & coordinates
  const svgWidth = 700;
  const svgHeight = 260;
  const paddingX = 0;
  const paddingTop = 30;
  const paddingBottom = 60; // Room for volume bars

  const prices = activeData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // Coordinate mapping
  const points = activeData.map((d, i) => {
    const x = paddingX + (i / (activeData.length - 1)) * (svgWidth - paddingX * 2);
    const normalizedPrice = (d.price - minPrice) / priceRange;
    const y = paddingTop + (1 - normalizedPrice) * (svgHeight - paddingTop - paddingBottom);
    return { x, y, ...d };
  });

  // Generate smooth cubic Bézier SVG path
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [points]);

  const areaPath = useMemo(() => {
    if (!linePath || points.length === 0) return '';
    const lastX = points[points.length - 1].x;
    const bottomY = svgHeight - 20;
    return `${linePath} L ${lastX} ${bottomY} L 0 ${bottomY} Z`;
  }, [linePath, points, svgHeight]);

  const hoveredPoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : points[points.length - 1];

  const isCurrentPositive = selectedIndex.change >= 0;

  return (
    <section data-purpose="indices-overview" id="indices-section">
      {/* Section Title & Explorer Link */}
      <div className="flex items-center justify-between mb-4">
        <a
          href="#indices-overview"
          className="group inline-flex items-center text-2xl font-bold tracking-tight text-tv-black hover:text-tv-blue transition-colors"
        >
          <span>Indices</span>
          <ChevronRight className="w-5 h-5 ml-1 stroke-[2.5] text-tv-gray group-hover:text-tv-blue group-hover:translate-x-0.5 transition-all" />
        </a>
        <div className="flex items-center gap-2 text-xs font-semibold text-tv-gray">
          <span className="inline-block w-2 h-2 rounded-full bg-tv-green animate-pulse"></span>
          <span>MARKETS OPEN</span>
        </div>
      </div>

      {/* Quick Ticker Horizontal Bar (S&P 500, Nasdaq 100, Dow 30, US 2000, VIX, DAX 40) */}
      <div className="flex items-center gap-3 overflow-x-auto thin-scrollbar pb-3 mb-6" data-purpose="index-pills-bar">
        {indices.map((item) => {
          const isSelected = selectedIndex.id === item.id;
          const isPositive = item.change >= 0;
          return (
            <div
              key={item.id}
              onClick={() => onSelectIndex(item)}
              role="button"
              tabIndex={0}
              className={`flex items-center gap-3 pl-2 pr-4 py-2 rounded-full cursor-pointer transition-all flex-shrink-0 border select-none ${
                isSelected
                  ? 'bg-[#f0f3fa] border-[#c0c6d4] shadow-sm ring-1 ring-tv-blue/30'
                  : 'bg-white border-[#e0e3eb] hover:bg-[#f8f9fd] hover:border-tv-gray/40'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center tracking-tighter"
                style={{ backgroundColor: item.badgeColor || '#0094ff' }}
              >
                {item.badge}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-tv-black">{item.name}</span>
                  <span className="text-xs text-tv-gray font-mono">{item.symbol}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-tv-black font-mono">
                    {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={`font-medium ${isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dual Grid: Interactive Chart & World Indices Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Chart Widget */}
        <div className="lg:col-span-8 bg-white border border-tv-border rounded-2xl p-5 shadow-card hover:shadow-md transition-shadow">
          {/* Chart Header & Quick Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tv-border/70 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-tv-gray">
                  {selectedIndex.exchange || 'INDEX • S&P DOW JONES INDICES'}
                </span>
                <span className="text-xs bg-[#eef2f9] text-tv-gray px-2 py-0.5 rounded font-mono font-medium">
                  {selectedIndex.currency || 'USD'}
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-extrabold tracking-tight text-tv-black font-mono tabular-nums">
                  {hoveredPoint
                    ? hoveredPoint.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : selectedIndex.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-sm font-bold flex items-center font-mono tabular-nums ${
                    isCurrentPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {isCurrentPositive ? '+' : ''}
                  {selectedIndex.change.toFixed(2)} ({isCurrentPositive ? '+' : ''}
                  {selectedIndex.changePercent.toFixed(2)}%)
                </span>
                <span className="text-xs text-tv-gray font-medium">
                  {hoverIndex !== null && hoveredPoint ? hoveredPoint.time : 'As of 4:00 PM EST'}
                </span>
              </div>
            </div>

            {/* Timeframe & Chart Type Controls */}
            <div className="flex items-center gap-2">
              {/* Line vs Candlestick Toggle */}
              <div className="flex items-center bg-tv-lightGray p-0.5 rounded-lg text-tv-gray">
                <button
                  onClick={() => setChartType('line')}
                  title="Line / Area Chart"
                  className={`p-1.5 rounded transition-colors ${
                    chartType === 'line' ? 'bg-white text-tv-black shadow-sm' : 'hover:text-tv-black'
                  }`}
                >
                  <LineChartIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setChartType('candlestick')}
                  title="Candlestick Chart"
                  className={`p-1.5 rounded transition-colors ${
                    chartType === 'candlestick' ? 'bg-white text-tv-black shadow-sm' : 'hover:text-tv-black'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Timeframe Pills */}
              <div className="flex items-center bg-tv-lightGray p-1 rounded-lg text-xs font-semibold text-tv-gray">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      timeframe === tf ? 'text-tv-black bg-white shadow-sm' : 'hover:text-tv-black'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SVG Financial Area / Candlestick Chart */}
          <div
            className="relative w-full h-[280px] my-3 select-none"
            onMouseLeave={() => setHoverIndex(null)}
          >
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;
                // Find closest point
                let closestIndex = 0;
                let minDist = Infinity;
                points.forEach((pt, i) => {
                  const dist = Math.abs(pt.x - mouseX);
                  if (dist < minDist) {
                    minDist = dist;
                    closestIndex = i;
                  }
                });
                setHoverIndex(closestIndex);
              }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2962ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="volumeGreen" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#089981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#089981" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              <line stroke="#f0f3fa" strokeDasharray="3,3" strokeWidth="1" x1="0" x2={svgWidth} y1="40" y2="40" />
              <line stroke="#f0f3fa" strokeDasharray="3,3" strokeWidth="1" x1="0" x2={svgWidth} y1="90" y2="90" />
              <line stroke="#f0f3fa" strokeDasharray="3,3" strokeWidth="1" x1="0" x2={svgWidth} y1="140" y2="140" />
              <line stroke="#f0f3fa" strokeDasharray="3,3" strokeWidth="1" x1="0" x2={svgWidth} y1="190" y2="190" />

              {/* Volume Bars at Bottom */}
              {points.map((pt, i) => {
                const barHeight = Math.min(50, Math.max(12, pt.volume * 0.8));
                const barY = svgHeight - 20 - barHeight;
                const barColor = pt.isUp ? '#089981' : '#f23645';
                const isHovered = hoverIndex === i;
                return (
                  <rect
                    key={i}
                    x={pt.x - 4}
                    y={barY}
                    width={8}
                    height={barHeight}
                    fill={barColor}
                    opacity={isHovered ? 0.8 : 0.35}
                    rx={1}
                  />
                );
              })}

              {chartType === 'line' ? (
                <>
                  {/* S&P 500 Gradient Fill Area */}
                  {areaPath && <path d={areaPath} fill="url(#chartGradient)" />}

                  {/* Precision Stroke Line */}
                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#2962ff"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                  )}
                </>
              ) : (
                /* Candlestick Rendering */
                points.map((pt, i) => {
                  const candleHeight = Math.max(6, Math.abs(pt.volume * 0.5));
                  const isUp = pt.isUp;
                  const candleY = isUp ? pt.y - candleHeight : pt.y;
                  return (
                    <g key={i}>
                      {/* Wick */}
                      <line
                        x1={pt.x}
                        x2={pt.x}
                        y1={candleY - 8}
                        y2={candleY + candleHeight + 8}
                        stroke={isUp ? '#089981' : '#f23645'}
                        strokeWidth="1.2"
                      />
                      {/* Body */}
                      <rect
                        x={pt.x - 5}
                        y={candleY}
                        width={10}
                        height={candleHeight}
                        fill={isUp ? '#089981' : '#f23645'}
                        rx={1}
                      />
                    </g>
                  );
                })
              )}

              {/* Crosshair on hover */}
              {hoverIndex !== null && hoveredPoint && (
                <g>
                  {/* Vertical Guideline */}
                  <line
                    x1={hoveredPoint.x}
                    x2={hoveredPoint.x}
                    y1={20}
                    y2={svgHeight - 20}
                    stroke="#787b86"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                  />
                  {/* Horizontal Guideline */}
                  <line
                    x1={0}
                    x2={svgWidth}
                    y1={hoveredPoint.y}
                    y2={hoveredPoint.y}
                    stroke="#787b86"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  {/* Pin circle marker */}
                  <circle
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r={5}
                    fill="#2962ff"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                </g>
              )}

              {/* Default Current Price Pin Marker when not hovering */}
              {hoverIndex === null && points.length > 0 && (
                <circle
                  cx={points[points.length - 1].x}
                  cy={points[points.length - 1].y}
                  r={4.5}
                  fill="#2962ff"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              )}
            </svg>

            {/* Time markers across bottom */}
            <div className="flex justify-between text-[11px] text-tv-gray font-mono px-2 pt-1 border-t border-tv-border/50">
              {timeframe === '1D' ? (
                <>
                  <span>09:30 AM</span>
                  <span>11:00 AM</span>
                  <span>01:00 PM</span>
                  <span>03:00 PM</span>
                  <span>04:00 PM</span>
                </>
              ) : timeframe === '5D' ? (
                <>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                </>
              ) : timeframe === '1M' ? (
                <>
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </>
              ) : (
                <>
                  <span>Start</span>
                  <span>Q2</span>
                  <span>Mid</span>
                  <span>Q4</span>
                  <span>Current</span>
                </>
              )}
            </div>
          </div>

          {/* Bottom Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-tv-border/70 text-xs">
            <div>
              <span className="text-tv-gray block">Day's Range</span>
              <span className="font-semibold text-tv-black font-mono">
                {selectedIndex.daysRange
                  ? `${selectedIndex.daysRange[0].toLocaleString(undefined, { minimumFractionDigits: 2 })} — ${selectedIndex.daysRange[1].toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  : '5,855.10 — 5,888.35'}
              </span>
            </div>
            <div>
              <span className="text-tv-gray block">52 Week Range</span>
              <span className="font-semibold text-tv-black font-mono">
                {selectedIndex.fiftyTwoWeekRange
                  ? `${selectedIndex.fiftyTwoWeekRange[0].toLocaleString(undefined, { minimumFractionDigits: 2 })} — ${selectedIndex.fiftyTwoWeekRange[1].toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  : '4,550.20 — 5,910.45'}
              </span>
            </div>
            <div>
              <span className="text-tv-gray block">Previous Close</span>
              <span className="font-semibold text-tv-black font-mono">
                {selectedIndex.previousClose
                  ? selectedIndex.previousClose.toLocaleString(undefined, { minimumFractionDigits: 2 })
                  : '5,873.49'}
              </span>
            </div>
            <div>
              <span className="text-tv-gray block">Open Price</span>
              <span className="font-semibold text-tv-black font-mono">
                {selectedIndex.openPrice
                  ? selectedIndex.openPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })
                  : '5,868.22'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: World Major Indices Table */}
        <div className="lg:col-span-4 bg-white border border-tv-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-tv-border">
            <h3 className="font-bold text-base text-tv-black">World indices</h3>
            <button
              onClick={onOpenGlobalIndices}
              className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer"
            >
              See more
            </button>
          </div>

          {/* Indices List with Sparklines & Change Badges */}
          <div className="divide-y divide-tv-border/60">
            {worldIndicesList.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectWorldIndex(item)}
                  role="button"
                  tabIndex={0}
                  className="py-3 flex items-center justify-between hover:bg-tv-hoverBg rounded-lg px-2 -mx-2 transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold bg-tv-lightGray px-1.5 py-0.5 rounded text-tv-black">
                        {item.flag || 'GL'}
                      </span>
                      <span className="text-sm font-semibold text-tv-black group-hover:text-tv-blue transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs text-tv-gray font-mono">{item.symbol}</span>
                  </div>

                  {/* Mini SVG Sparkline */}
                  <div className="w-16 h-6 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 60 20" fill="none">
                      <path
                        d={
                          isPositive
                            ? 'M0,16 Q15,18 30,8 T60,3'
                            : 'M0,4 Q20,2 35,14 T60,17'
                        }
                        stroke={isPositive ? '#089981' : '#f23645'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-tv-black tabular-nums">
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-semibold font-mono tabular-nums ${
                        isPositive ? 'text-tv-green' : 'text-tv-red'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action */}
          <div className="mt-4 pt-3 border-t border-tv-border text-center">
            <button
              onClick={onOpenGlobalIndices}
              className="w-full py-2 text-xs font-semibold text-tv-blue hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              Explore 85+ Global Indices →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
