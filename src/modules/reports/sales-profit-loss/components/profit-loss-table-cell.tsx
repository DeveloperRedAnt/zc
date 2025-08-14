import React from 'react';

interface ProfitLossTableCellProps {
  value: string;
  isNegative?: boolean;
}

export function ProfitLossTableCell({ value, isNegative }: ProfitLossTableCellProps) {
  return (
    <span className={`text-sm ${isNegative ? 'text-red-500' : 'text-gray-900'}`}>{value}</span>
  );
}
