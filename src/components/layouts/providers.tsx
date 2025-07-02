'use client';
import { queryClient } from '@/__generated__/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';

export default function Providers({
  activeThemeValue,
  children,
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ActiveThemeProvider initialTheme={activeThemeValue}>{children}</ActiveThemeProvider>
    </QueryClientProvider>
  );
}
