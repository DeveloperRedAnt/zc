import { ScrollArea } from '@/components/scroll-area/scroll-area';
import React from 'react';
import AppFooter from './app-footer';
import Header from './header';

export default function PageContainer({
  children,
  scrollable = true,
  isLoading = false,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      {scrollable ? (
        <>
          <ScrollArea className="h-[100vh]">
            <Header isLoading={isLoading} />
            <div className="flex flex-col p-4">{children}</div>
            <AppFooter />
          </ScrollArea>
        </>
      ) : (
        <>
          <div className="flex flex-1 flex-col p-4 md:px-6">{children}</div>
        </>
      )}
    </div>
  );
}
