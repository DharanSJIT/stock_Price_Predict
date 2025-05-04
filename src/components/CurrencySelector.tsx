
import React from 'react';
import { DollarSign, IndianRupee } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type Currency = 'USD' | 'INR';

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  currency, 
  onCurrencyChange 
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle>Currency Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <Select 
          value={currency} 
          onValueChange={(value) => onCurrencyChange(value as Currency)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>US Dollar (USD)</span>
              </div>
            </SelectItem>
            <SelectItem value="INR">
              <div className="flex items-center">
                <IndianRupee className="mr-2 h-4 w-4" />
                <span>Indian Rupee (INR)</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;
