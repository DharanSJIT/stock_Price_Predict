
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SVRPredictionProps {
  symbol: string | null;
}

interface PredictionResult {
  date: string;
  price: number;
}

const SVRPrediction: React.FC<SVRPredictionProps> = ({ symbol }) => {
  const [daysToPredict, setDaysToPredict] = useState<number>(7);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionResults, setPredictionResults] = useState<PredictionResult[]>([]);
  const [confidence, setConfidence] = useState<number>(0);
  const [kernelType, setKernelType] = useState<string>('rbf');

  const handlePrediction = () => {
    if (!symbol) {
      toast.error('Please select a stock first');
      return;
    }

    setIsLoading(true);

    // In a real application, this would call a Python backend with the SVR model
    // For now, we'll simulate the prediction with mock data
    setTimeout(() => {
      const mockResults: PredictionResult[] = [];
      const today = new Date();
      const lastPrice = 100 + Math.random() * 50; // Starting price
      
      for (let i = 1; i <= daysToPredict; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        
        // Skip weekends in prediction
        if (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
          continue;
        }
        
        const predictedPrice = lastPrice * (1 + (Math.random() * 0.06 - 0.03) * i);
        
        mockResults.push({
          date: futureDate.toISOString().split('T')[0],
          price: predictedPrice
        });
      }
      
      setPredictionResults(mockResults);
      setConfidence(65 + Math.random() * 20); // Random confidence between 65-85%
      setIsLoading(false);
      toast.success(`Generated SVR prediction for ${symbol}`);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const handleKernelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKernelType(e.target.value);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>SVR Prediction Model</CardTitle>
        <CardDescription>
          Support Vector Regression (SVR) for price prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="days-to-predict" className="mb-2 block">Days to Predict</Label>
              <div className="flex items-center gap-4">
                <Slider 
                  id="days-to-predict"
                  min={1} 
                  max={30} 
                  step={1} 
                  value={[daysToPredict]}
                  onValueChange={(value) => setDaysToPredict(value[0])}
                  className="flex-1"
                />
                <Input 
                  type="number" 
                  min={1} 
                  max={30}
                  value={daysToPredict} 
                  onChange={(e) => setDaysToPredict(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="kernel-type" className="mb-2 block">SVR Kernel</Label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="rbf"
                    name="kernel"
                    value="rbf"
                    checked={kernelType === 'rbf'}
                    onChange={handleKernelChange}
                    className="mr-2"
                  />
                  <Label htmlFor="rbf">RBF</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="linear"
                    name="kernel"
                    value="linear"
                    checked={kernelType === 'linear'}
                    onChange={handleKernelChange}
                    className="mr-2"
                  />
                  <Label htmlFor="linear">Linear</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="poly"
                    name="kernel"
                    value="poly"
                    checked={kernelType === 'poly'}
                    onChange={handleKernelChange}
                    className="mr-2"
                  />
                  <Label htmlFor="poly">Polynomial</Label>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handlePrediction} 
            disabled={isLoading || !symbol}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Generating Prediction...' : 'Generate SVR Prediction'}
          </Button>
          
          {isLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : predictionResults.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-secondary p-3 rounded-md">
                <p className="text-sm font-medium">
                  SVR Model Confidence: <span className="text-primary">{confidence.toFixed(2)}%</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Using {kernelType} kernel with {daysToPredict} days prediction window
                </p>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={predictionResults} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--finance-grid))" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    tick={{ fill: 'hsl(var(--finance-label))' }}
                    axisLine={{ stroke: 'hsl(var(--finance-grid))' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                    tick={{ fill: 'hsl(var(--finance-label))' }}
                    axisLine={{ stroke: 'hsl(var(--finance-grid))' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Predicted Price']}
                    labelFormatter={formatDate}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : symbol ? (
            <div className="text-center py-8 text-muted-foreground">
              Click "Generate SVR Prediction" to see price forecast
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a stock to generate predictions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SVRPrediction;
