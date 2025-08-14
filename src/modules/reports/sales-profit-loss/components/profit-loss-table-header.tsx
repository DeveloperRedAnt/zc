import React from 'react';
import { SortableHeader } from '../shared-components/sortable-header';

interface ProfitLossTableHeaderProps {
  columnId: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (columnId: string) => void;
  children: React.ReactNode;
}

export function ProfitLossTableHeader({
  columnId,
  sortBy,
  sortDirection,
  onSort,
  children,
}: ProfitLossTableHeaderProps) {
  return (
    <SortableHeader
      columnId={columnId}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={onSort}
    >
      {children}
    </SortableHeader>
  );
}
