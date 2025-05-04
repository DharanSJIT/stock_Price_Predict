
import React from 'react';
import { GithubIcon, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary mr-1">StockGaze</div>
            <span className="text-muted-foreground">Forecast Hub</span>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <InfoIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Demo app - not financial advice</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button variant="outline" size="icon" asChild>
              <a 
                href="https://github.com/yourusername/stock-gaze-forecast-hub" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-card border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            StockGaze Forecast Hub &copy; {new Date().getFullYear()} - 
            For demonstration purposes only. Not financial advice.
          </p>
          <p className="text-xs mt-1">
            Created with React, Python and AI - Data is simulated for demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
