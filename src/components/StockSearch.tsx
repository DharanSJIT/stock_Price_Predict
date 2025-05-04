
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { searchStocks } from '@/services/stockApi';
import { cn } from '@/lib/utils';

interface StockSearchProps {
  onSelectStock: (symbol: string) => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ onSelectStock }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Array<{ symbol: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Search stocks when query changes
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const data = await searchStocks(query);
          setResults(data);
          setIsDropdownOpen(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsDropdownOpen(false);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounce);
  }, [query]);
  
  const handleSelectStock = (symbol: string) => {
    onSelectStock(symbol);
    setQuery("");
    setIsDropdownOpen(false);
  };
  
  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setIsDropdownOpen(false);
  };
  
  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search stocks (e.g., AAPL, MSFT)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-8"
          onFocus={() => query.length >= 2 && setIsDropdownOpen(true)}
        />
        {query && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={handleClearSearch}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isDropdownOpen && (
        <Card className={cn(
          "absolute z-10 mt-1 w-full overflow-hidden shadow-lg transition-all",
          isLoading ? "opacity-70" : "opacity-100"
        )}>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-60 overflow-auto py-1">
              {results.map((stock) => (
                <li 
                  key={stock.symbol}
                  className="px-4 py-2 hover:bg-secondary cursor-pointer flex justify-between"
                  onClick={() => handleSelectStock(stock.symbol)}
                >
                  <span className="font-medium">{stock.symbol}</span>
                  <span className="text-muted-foreground truncate ml-2">{stock.name}</span>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found
            </div>
          ) : null}
        </Card>
      )}
    </div>
  );
};

export default StockSearch;
