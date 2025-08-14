import React from 'react';

interface ProfitLossTableEmptyRowProps {
  colSpan: number;
}

export function ProfitLossTableEmptyRow({ colSpan }: ProfitLossTableEmptyRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="h-24 text-center">
        No results.
      </td>
    </tr>
  );
}
