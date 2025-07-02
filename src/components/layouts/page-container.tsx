import { ScrollArea } from '@/components/scroll-area/scroll-area';
import React from 'react';
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
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <Header isLoading={isLoading} />
          <div className="flex flex-col p-4">{children}</div>
        </ScrollArea>
      ) : (
        <div className="flex flex-1 p-4 md:px-6">{children}</div>
      )}
    </>
  );
}
