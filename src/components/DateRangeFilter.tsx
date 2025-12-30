'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Filter, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  onQuickFilter: (filter: string) => void;
}

const quickFilters = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisQuarter', label: 'This Quarter' },
  { value: 'lastQuarter', label: 'Last Quarter' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'lastYear', label: 'Last Year' }
];

export default function DateRangeFilter({ onDateRangeChange, onQuickFilter }: DateRangeFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>('');

  const handleDateRangeSelect = (range: DateRange) => {
    setDateRange(range);
    onDateRangeChange(range.from, range.to);
  };

  const handleQuickFilter = (filter: string) => {
    setSelectedQuickFilter(filter);
    
    const today = new Date();
    let startDate: Date;
    let endDate: Date = today;

    switch (filter) {
      case 'today':
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case 'yesterday':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = new Date(startDate);
        break;
      case 'thisWeek':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        break;
      case 'lastWeek':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() - 7);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'thisQuarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), currentQuarter * 3, 1);
        break;
      case 'lastQuarter':
        const lastQuarter = Math.floor(today.getMonth() / 3) - 1;
        startDate = new Date(today.getFullYear(), lastQuarter * 3, 1);
        endDate = new Date(today.getFullYear(), (lastQuarter + 1) * 3, 0);
        break;
      case 'thisYear':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        endDate = new Date(today.getFullYear() - 1, 11, 31);
        break;
      default:
        startDate = today;
        endDate = today;
    }

    const newRange: DateRange = {
      from: startDate,
      to: endDate
    };

    setDateRange(newRange);
    onDateRangeChange(startDate, endDate);
    onQuickFilter(filter);
  };

  const handleReset = () => {
    setDateRange({ from: undefined, to: undefined });
    setSelectedQuickFilter('');
    onDateRangeChange(undefined, undefined);
  };

  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) {
      return 'Select date range';
    }
    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, 'MMM dd, yyyy');
    }
    if (dateRange.from && dateRange.to) {
      if (dateRange.from.getTime() === dateRange.to.getTime()) {
        return format(dateRange.from, 'MMM dd, yyyy');
      }
      return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
    }
    return 'Select date range';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Date Range Filter</CardTitle>
        <Filter className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Filters</label>
          <Select value={selectedQuickFilter} onValueChange={handleQuickFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a quick filter" />
            </SelectTrigger>
            <SelectContent>
              {quickFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Date Range</label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => handleDateRangeSelect({ ...dateRange, from: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => handleDateRangeSelect({ ...dateRange, to: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Date Range Display */}
        {(dateRange.from || dateRange.to) && (
          <div className="rounded-lg bg-muted p-3">
            <div className="text-sm font-medium">Selected Range:</div>
            <div className="text-sm text-muted-foreground">{formatDateRange()}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleReset}
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
