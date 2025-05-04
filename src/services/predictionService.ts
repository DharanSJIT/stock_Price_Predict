
import { toast } from "sonner";
import { StockPrediction } from "./types";
import { generateMockPrediction } from "./mockDataUtils";

// Get price prediction
export const getPricePrediction = async (
  symbol: string,
  days: number = 30
): Promise<StockPrediction[]> => {
  try {
    // In a real app, this would call a Python backend that runs the prediction model
    // const response = await fetch(`${YOUR_BACKEND_URL}/predict/${symbol}?days=${days}`);
    
    // For demo purposes, we'll generate mock prediction data
    return generateMockPrediction(symbol, days);
  } catch (error) {
    console.error("Error fetching prediction data:", error);
    toast.error("Failed to generate price prediction");
    throw error;
  }
};
