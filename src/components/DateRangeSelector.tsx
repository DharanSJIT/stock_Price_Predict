
import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface DateRangeSelectorProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    onDateRangeChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    onDateRangeChange(startDate, date);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle>Custom Date Range</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-auto">
            <Label htmlFor="start-date" className="mb-2 block">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Select start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                  disabled={(date) => endDate ? date > endDate : false}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full sm:w-auto">
            <Label htmlFor="end-date" className="mb-2 block">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Select end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                  disabled={(date) => startDate ? date < startDate : false}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateRangeSelector;
