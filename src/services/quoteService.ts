
import { toast } from "sonner";
import { StockQuote } from "./types";
import { mockQuoteData } from "./mockDataUtils";

// Example API endpoints (kept for future implementation)
const STOCK_API_BASE_URL = "https://financialmodelingprep.com/api/v3";
const API_KEY = "demo";

// Get stock quote data
export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    // In production, use a real API:
    // const response = await fetch(`${STOCK_API_BASE_URL}/quote/${symbol}?apikey=${API_KEY}`);
    
    // For demo purposes, we'll use mock data
    return mockQuoteData(symbol);
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    toast.error("Failed to fetch stock data");
    throw error;
  }
};
