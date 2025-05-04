
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircleIcon, InfoIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PredictionMetricsProps {
  symbol: string | null;
}

const PredictionMetrics: React.FC<PredictionMetricsProps> = ({ symbol }) => {
  if (!symbol) return null;
  
  // For a real app, these would come from the backend model
  const metrics = {
    accuracy: 78.5,  // Percentage accuracy of the model
    confidence: 82.3, // Confidence score
    rmse: 3.42,       // Root Mean Square Error
    algorithm: "Ensemble (LSTM + XGBoost)",
    features: [
      "Historical Prices",
      "Volume Trends",
      "Market Sentiment",
      "Sector Performance",
      "Technical Indicators"
    ]
  };
  
  const recommendations = {
    shortTerm: {
      action: "Hold",
      confidence: 64
    },
    mediumTerm: {
      action: "Buy",
      confidence: 72
    },
    longTerm: {
      action: "Buy",
      confidence: 85
    }
  };
  
  // Determine color based on confidence
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-finance-up";
    if (confidence >= 60) return "text-amber-500";
    return "text-finance-down";
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Prediction Model Metrics</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="max-w-sm">
                <div className="space-y-2">
                  <p className="font-medium">About the Prediction Model</p>
                  <p className="text-sm text-muted-foreground">
                    This model uses a combination of machine learning algorithms including LSTM neural networks and XGBoost to predict stock prices based on historical data and market factors.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    RMSE (Root Mean Square Error) measures the average magnitude of errors in predictions.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
              <p className="font-medium text-finance-up">{metrics.accuracy}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confidence Score</p>
              <p className="font-medium text-amber-500">{metrics.confidence}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">RMSE</p>
              <p className="font-medium">{metrics.rmse}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Algorithm</p>
              <p className="font-medium text-xs">{metrics.algorithm}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Key Features Used</p>
            <div className="flex flex-wrap gap-1">
              {metrics.features.map((feature, index) => (
                <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Trading Recommendations</CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground">
            Not financial advice. For demonstration purposes only.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Short Term (7 days)</p>
                <p className={`font-bold ${getConfidenceColor(recommendations.shortTerm.confidence)}`}>
                  {recommendations.shortTerm.action}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getConfidenceColor(recommendations.shortTerm.confidence)}`}
                  style={{ width: `${recommendations.shortTerm.confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-muted-foreground">
                {recommendations.shortTerm.confidence}% confidence
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Medium Term (30 days)</p>
                <p className={`font-bold ${getConfidenceColor(recommendations.mediumTerm.confidence)}`}>
                  {recommendations.mediumTerm.action}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getConfidenceColor(recommendations.mediumTerm.confidence)}`}
                  style={{ width: `${recommendations.mediumTerm.confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-muted-foreground">
                {recommendations.mediumTerm.confidence}% confidence
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Long Term (90+ days)</p>
                <p className={`font-bold ${getConfidenceColor(recommendations.longTerm.confidence)}`}>
                  {recommendations.longTerm.action}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getConfidenceColor(recommendations.longTerm.confidence)}`}
                  style={{ width: `${recommendations.longTerm.confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-muted-foreground">
                {recommendations.longTerm.confidence}% confidence
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionMetrics;
