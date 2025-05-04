
// Stock data interfaces
export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
}

export interface StockHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockPrediction {
  date: string;
  predictedPrice: number;
  lowerBound: number;
  upperBound: number;
}

// Time periods for historical data
export type TimePeriod = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y';
