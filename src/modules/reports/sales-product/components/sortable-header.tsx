'use client';

import { SortAmountDown, SortAmountUp, SortThree } from '@icon-park/react';
import React from 'react';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSortColumn?: string;
  currentSortDirection?: 'asc' | 'desc';
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SortableHeader({
  label,
  sortKey,
  currentSortColumn,
  currentSortDirection,
  onSort,
  className = '',
  align = 'left',
}: SortableHeaderProps) {
  const isActive = currentSortColumn === sortKey;
  const isAsc = isActive && currentSortDirection === 'asc';
  const isDesc = isActive && currentSortDirection === 'desc';

  const handleClick = () => {
    if (!isActive) {
      // Jika column belum aktif, mulai dengan asc
      onSort(sortKey, 'asc');
    } else if (isAsc) {
      // Jika sedang asc, ubah ke desc
      onSort(sortKey, 'desc');
    } else {
      // Jika sedang desc, reset sorting
      onSort('', 'asc');
    }
  };

  const getAlignmentClass = () => {
    switch (align) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  const getSortIcon = () => {
    if (isAsc) {
      return <SortAmountUp theme="outline" size="16" fill="#4F46E5" />;
    }
    if (isDesc) {
      return <SortAmountDown theme="outline" size="16" fill="#4F46E5" />;
    }
    return <SortThree theme="outline" size="16" fill="#9CA3AF" />;
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center gap-2 font-semibold hover:bg-gray-50 
        px-2 py-1 rounded transition-colors cursor-pointer
        ${getAlignmentClass()}
        ${isActive ? 'text-indigo-600' : 'text-gray-900'}
        ${className}
      `}
      type="button"
      title={`Sort by ${label}`}
    >
      <span>{label}</span>
      {getSortIcon()}
    </button>
  );
}
