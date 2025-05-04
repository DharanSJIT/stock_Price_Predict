
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import StockSearch from '@/components/StockSearch';
import StockOverview from '@/components/StockOverview';
import StockChart from '@/components/StockChart';
import PredictionMetrics from '@/components/PredictionMetrics';
import DateRangeSelector from '@/components/DateRangeSelector';
import SVRPrediction from '@/components/SVRPrediction';
import CurrencySelector, { Currency } from '@/components/CurrencySelector';
import { toast } from 'sonner';
import { getStockQuote, StockQuote } from '@/services/stockApi';

const Index = () => {
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockQuote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>('USD');
  
  // Load initial stock data
  useEffect(() => {
    const defaultSymbol = 'AAPL';
    setCurrentSymbol(defaultSymbol);
    loadStockData(defaultSymbol);
  }, []);
  
  const handleSelectStock = (symbol: string) => {
    setCurrentSymbol(symbol);
    loadStockData(symbol);
  };
  
  const loadStockData = async (symbol: string) => {
    setIsLoading(true);
    try {
      const data = await getStockQuote(symbol);
      setStockData(data);
      toast.success(`Loaded data for ${data.name}`);
    } catch (error) {
      console.error("Error loading stock data:", error);
      toast.error(`Failed to load data for ${symbol}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    
    if (start && end && currentSymbol) {
      toast.info(`Custom date range set for ${currentSymbol}: ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`);
      // In a real application, you would fetch historical data for this date range
      // For now, we'll just show the toast message
    }
  };
  
  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    toast.info(`Currency changed to ${newCurrency === 'USD' ? 'US Dollar' : 'Indian Rupee'}`);
  };
  
  return (
    <MainLayout>
      <div className="mb-6 flex justify-center">
        <StockSearch onSelectStock={handleSelectStock} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CurrencySelector 
          currency={currency} 
          onCurrencyChange={handleCurrencyChange} 
        />
        <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
      </div>
      
      <StockOverview 
        stockData={stockData} 
        isLoading={isLoading} 
        currency={currency}
      />
      
      <StockChart symbol={currentSymbol} />
      
      <SVRPrediction symbol={currentSymbol} />
      
      <PredictionMetrics symbol={currentSymbol} />
      
      <div className="p-4 bg-secondary rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-2">About StockGaze Forecast Hub</h2>
        <p className="text-muted-foreground mb-4">
          StockGaze Forecast Hub is a demonstration project showcasing how to build a stock price visualization and forecasting application using React for the frontend and simulated data for demonstration purposes.
        </p>
        <p className="text-muted-foreground mb-2">
          In a production environment, this application would connect to real financial APIs for data and use Python-based machine learning models for predictions. The current visualization is simulated for educational purposes.
        </p>
        <div className="bg-card border border-border rounded-md p-3 mt-4">
          <p className="text-sm font-medium mb-1">SVR Model Implementation Note:</p>
          <p className="text-xs text-muted-foreground">
             In a production setup, the SVR model would be implemented in Python using scikit-learn with a FastAPI backend. The SVR model could be trained on historical price data with features like moving averages, trading volume, and technical indicators. The React frontend would send requests to the Python backend API endpoints for predictions.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
