
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StockQuote } from '@/services/stockApi';
import { TrendingUpIcon, TrendingDownIcon, DollarSign, IndianRupee } from 'lucide-react';
import { Currency } from './CurrencySelector';

interface StockOverviewProps {
  stockData: StockQuote | null;
  isLoading: boolean;
  currency: Currency;
}

// Exchange rate (fixed for demo purposes)
const USD_TO_INR = 83.25;

const StockOverview: React.FC<StockOverviewProps> = ({ stockData, isLoading, currency }) => {
  if (isLoading) {
    return <StockOverviewSkeleton />;
  }
  
  if (!stockData) {
    return null;
  }
  
  const isPositive = stockData.change >= 0;
  const changeClass = isPositive ? 'stock-up' : 'stock-down';
  const changeIcon = isPositive ? <TrendingUpIcon className="h-5 w-5" /> : <TrendingDownIcon className="h-5 w-5" />;
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  const formatCurrency = (num: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    } else {
      // Convert USD to INR
      const inrValue = num * USD_TO_INR;
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(inrValue);
    }
  };
  
  const formatPercent = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num / 100);
  };
  
  const formatMarketCap = (num: number) => {
    const value = currency === 'USD' ? num : num * USD_TO_INR;
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  const CurrencyIcon = currency === 'USD' ? DollarSign : IndianRupee;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">{stockData.symbol}</p>
              <CardTitle className="text-2xl">{stockData.name}</CardTitle>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <CurrencyIcon className="h-4 w-4 mr-1" />
                <p className="text-3xl font-bold">{formatCurrency(stockData.price)}</p>
              </div>
              <div className={`flex items-center justify-end gap-1 ${changeClass}`}>
                {changeIcon}
                <span className="font-medium">{formatCurrency(stockData.change)} ({formatPercent(stockData.changePercent)})</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Previous Close</p>
              <p className="font-medium">{formatCurrency(stockData.previousClose)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Open</p>
              <p className="font-medium">{formatCurrency(stockData.open)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day High</p>
              <p className="font-medium">{formatCurrency(stockData.dayHigh)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day Low</p>
              <p className="font-medium">{formatCurrency(stockData.dayLow)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-medium">{formatNumber(stockData.volume)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-medium">{formatMarketCap(stockData.marketCap)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">52W High</p>
              <p className="font-medium">{formatCurrency(stockData.dayHigh * 1.1)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">52W Low</p>
              <p className="font-medium">{formatCurrency(stockData.dayLow * 0.9)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StockOverviewSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="text-right">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-24 ml-auto" />
          </div>
        </div>
      </CardHeader>
    </Card>
    
    {[0, 1].map((i) => (
      <Card key={i}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((j) => (
              <div key={j}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default StockOverview;
