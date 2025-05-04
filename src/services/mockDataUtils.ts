
import { StockHistoricalData, StockPrediction, StockQuote, TimePeriod } from './types';

// Mock company data
const companies: {[key: string]: string} = {
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'GOOGL': 'Alphabet Inc.',
  'AMZN': 'Amazon.com Inc.',
  'META': 'Meta Platforms Inc.',
  'TSLA': 'Tesla Inc.',
  'NVDA': 'NVIDIA Corporation',
  'JPM': 'JPMorgan Chase & Co.',
  'BAC': 'Bank of America Corporation',
  'WMT': 'Walmart Inc.',
  'DIS': 'The Walt Disney Company',
  'NFLX': 'Netflix Inc.',
  'V': 'Visa Inc.',
  'JNJ': 'Johnson & Johnson',
  'PG': 'Procter & Gamble Co.'
};

// Stock search mock data
export const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'BAC', name: 'Bank of America Corporation' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'DIS', name: 'The Walt Disney Company' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'PG', name: 'Procter & Gamble Co.' }
];

// Get company name from symbol
export const getCompanyName = (symbol: string): string => {
  return companies[symbol.toUpperCase()] || `${symbol.toUpperCase()} Inc.`;
};

// Generate mock stock quote data
export const mockQuoteData = (symbol: string): StockQuote => {
  // Generate consistent data based on symbol's character codes
  const charSum = symbol.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const basePrice = 100 + (charSum % 400);
  const change = (charSum % 20) - 10;
  const changePercent = change / basePrice * 100;
  
  return {
    symbol: symbol.toUpperCase(),
    name: getCompanyName(symbol),
    price: basePrice,
    change: change,
    changePercent: changePercent,
    previousClose: basePrice - change,
    open: basePrice - (change / 2),
    dayHigh: basePrice + (Math.abs(change) * 0.5),
    dayLow: basePrice - (Math.abs(change) * 0.5),
    volume: 1000000 + (charSum * 10000),
    marketCap: (basePrice * (10000000 + charSum * 100000))
  };
};

// Generate mock historical data
export const generateMockHistoricalData = (symbol: string, period: TimePeriod): StockHistoricalData[] => {
  const charSum = symbol.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const basePrice = 100 + (charSum % 400);
  
  let days = 0;
  switch(period) {
    case '1D': days = 1; break;
    case '1W': days = 7; break;
    case '1M': days = 30; break;
    case '3M': days = 90; break;
    case '6M': days = 180; break;
    case '1Y': days = 365; break;
    case '5Y': days = 365 * 5; break;
    default: days = 30;
  }
  
  const data: StockHistoricalData[] = [];
  let currentDate = new Date();
  let currentPrice = basePrice;
  
  // For intraday data (1D), generate hourly data points
  if (period === '1D') {
    currentDate.setHours(9, 30, 0, 0); // Market opening at 9:30 AM
    const endTime = new Date(currentDate);
    endTime.setHours(16, 0, 0, 0); // Market closing at 4:00 PM
    
    while (currentDate <= endTime) {
      const volatility = (Math.random() - 0.5) * 2 * (basePrice * 0.01);
      currentPrice += volatility;
      
      data.push({
        date: currentDate.toISOString(),
        open: currentPrice - (volatility / 2),
        high: currentPrice + Math.abs(volatility * 0.3),
        low: currentPrice - Math.abs(volatility * 0.3),
        close: currentPrice,
        volume: Math.floor(1000000 * Math.random())
      });
      
      currentDate = new Date(currentDate.getTime() + 30 * 60000); // 30 minute intervals
    }
  } else {
    // Generate daily data for other time periods
    for (let i = 0; i < days; i++) {
      // Create a deterministic but seemingly random price movement
      const seed = currentDate.getTime() + charSum;
      const pseudoRandom = (Math.sin(seed) + 1) / 2; // Value between 0 and 1
      
      const dailyChange = (pseudoRandom - 0.5) * 2 * (basePrice * 0.02);
      currentPrice += dailyChange;
      
      // Ensure price doesn't go negative
      if (currentPrice < 1) currentPrice = 1;
      
      data.unshift({
        date: new Date(currentDate).toISOString().split('T')[0],
        open: currentPrice - (dailyChange / 2),
        high: currentPrice + Math.abs(dailyChange * 0.3),
        low: currentPrice - Math.abs(dailyChange * 0.3),
        close: currentPrice,
        volume: Math.floor(1000000 * pseudoRandom) + 500000
      });
      
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }
  
  return data;
};

// Generate mock prediction data
export const generateMockPrediction = (symbol: string, days: number): StockPrediction[] => {
  const historicalData = generateMockHistoricalData(symbol, '1M');
  const lastPrice = historicalData[historicalData.length - 1].close;
  
  const charSum = symbol.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const volatility = 0.01 + (charSum % 10) * 0.001;
  
  const predictions: StockPrediction[] = [];
  let currentDate = new Date();
  let predictedPrice = lastPrice;
  
  for (let i = 1; i <= days; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    // Skip weekends
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      i--;
      continue;
    }
    
    // Use a simplistic model for demo purposes
    const dailyChange = (Math.random() - 0.45) * 2 * (predictedPrice * volatility);
    predictedPrice += dailyChange;
    
    // Ensure price doesn't go negative
    if (predictedPrice < 1) predictedPrice = 1;
    
    // Add increasing uncertainty over time
    const uncertainty = 0.01 * i;
    
    predictions.push({
      date: new Date(currentDate).toISOString().split('T')[0],
      predictedPrice: predictedPrice,
      lowerBound: predictedPrice * (1 - uncertainty),
      upperBound: predictedPrice * (1 + uncertainty)
    });
  }
  
  return predictions;
};

// Filter stocks based on search query
export const mockSearchResults = (query: string): { symbol: string; name: string }[] => {
  if (!query) return [];
  
  query = query.toLowerCase();
  return mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(query) || 
    stock.name.toLowerCase().includes(query)
  );
};
