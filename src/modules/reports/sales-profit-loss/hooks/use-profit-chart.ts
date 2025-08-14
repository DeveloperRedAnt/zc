import { useState } from 'react';

interface UseProfitChartParams {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
  initialHppValue?: string;
  initialRevenueValue?: string;
  presentaseHpp?: number;
  presentaseRevenue?: number;
}

interface UseProfitChartResult {
  startDate: Date | null;
  endDate: Date | null;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  hppValue: string;
  revenueValue: string;
  hppPercentage: number;
  revenuePercentage: number;
  labeldateRange: string;
  presentaseHpp?: number;
  presentaseRevenue?: number;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setHppValue: (value: string) => void;
  setRevenueValue: (value: string) => void;
  setlabeldateRange: (value: string) => void;
  setpresentaseHpp: (value: number) => void;
  setPresentaseRevenue: (value: number) => void;
}

// Helper to extract numeric value from string
function extractNumericValue(value: string): number {
  const numeric = value.replace(/[^\d.-]/g, '');
  return Number(numeric) || 0;
}

export const useProfitChart = ({
  initialStartDate = null,
  initialEndDate = null,
  initialSortBy = '',
  initialSortOrder = 'asc',
  initialHppValue = '',
  initialRevenueValue = '',
}: UseProfitChartParams = {}): UseProfitChartResult => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  const [hppValue, setHppValue] = useState<string>(initialHppValue);
  const [revenueValue, setRevenueValue] = useState<string>(initialRevenueValue);

  const [labeldateRange, setlabeldateRange] = useState('');
  const [presentaseHpp, setpresentaseHpp] = useState<number>(0);
  const [presentaseRevenue, setPresentaseRevenue] = useState<number>(0);

  const hppNumeric = extractNumericValue(hppValue);
  const revenueNumeric = extractNumericValue(revenueValue);
  const maxValue = Math.max(hppNumeric, revenueNumeric);

  const hppPercentage = maxValue > 0 ? (hppNumeric / maxValue) * 100 : 0;
  const revenuePercentage = maxValue > 0 ? (revenueNumeric / maxValue) * 100 : 0;

  return {
    startDate,
    endDate,
    sortBy,
    sortOrder,
    hppValue,
    revenueValue,
    hppPercentage,
    revenuePercentage,
    labeldateRange,
    presentaseHpp,
    presentaseRevenue,
    setStartDate,
    setEndDate,
    setSortBy,
    setSortOrder,
    setHppValue,
    setRevenueValue,
    setlabeldateRange,
    setpresentaseHpp,
    setPresentaseRevenue,
  };
};
