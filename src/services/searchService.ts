
import { toast } from "sonner";
import { mockSearchResults } from "./mockDataUtils";

// Example API endpoints (kept for future implementation)
const STOCK_API_BASE_URL = "https://financialmodelingprep.com/api/v3";
const API_KEY = "demo";

// Search for stocks
export const searchStocks = async (query: string): Promise<{ symbol: string; name: string }[]> => {
  try {
    // In production, use a real API:
    // const response = await fetch(`${STOCK_API_BASE_URL}/search?query=${query}&limit=10&apikey=${API_KEY}`);
    
    // For demo purposes, we'll use mock data
    return mockSearchResults(query);
  } catch (error) {
    console.error("Error searching stocks:", error);
    toast.error("Failed to search stocks");
    throw error;
  }
};
