export type TimeFrame = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';

export type MarketCategory =
  | 'Indices'
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures & commodities'
  | 'Forex & currencies'
  | 'Government bonds'
  | 'ETFs'
  | 'Economy';

export interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
  isUp?: boolean;
}

export interface CandleDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  badge?: string;
  badgeColor?: string;
  currency?: string;
  country?: string;
  flag?: string;
  daysRange?: [number, number];
  fiftyTwoWeekRange?: [number, number];
  previousClose?: number;
  openPrice?: number;
  volumeToday?: string;
  marketCap?: string;
  peRatio?: number;
  sparkline?: number[];
  chartData?: Record<TimeFrame, ChartDataPoint[]>;
}

export interface EconomicIndicator {
  id: string;
  title: string;
  value: string;
  subtext: string;
  subtextColor?: 'green' | 'red' | 'gray';
}

export interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  country: string;
  countryCode: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  actual: string;
  forecast: string;
  previous: string;
}
