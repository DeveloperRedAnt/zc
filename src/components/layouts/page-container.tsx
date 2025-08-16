'use client';

import { ScrollArea } from '@/components/scroll-area/scroll-area';
import { useStoreFilter } from '@/hooks/use-store-filter/use-store-filter';
import { useStoreSelectorPopupStore } from '@/stores/store-selector-popup';
import React, { useCallback } from 'react';
import NoSSR from '../no-ssr/no-ssr';
import StoreSelectorPopup from '../store-selector-popup/store-selector-popup';
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
  const { isOpen, pendingAction, closePopup } = useStoreSelectorPopupStore();
  const { selectedStore } = useStoreFilter();

  // Handle store selection completion with navigation
  const handleStorePopupClose = useCallback(() => {
    // Check if there's a pending action and store is now selected
    if (pendingAction && selectedStore) {
      if (pendingAction.type === 'add') {
        window.location.href = '/dashboard/products/add';
      } else if (pendingAction.type === 'edit' && pendingAction.targetPath) {
        window.location.href = pendingAction.targetPath;
      }
    }

    // Always close popup
    closePopup();
  }, [pendingAction, selectedStore, closePopup]);
  return (
    <div className="flex h-full flex-col">
      {scrollable ? (
        <>
          <ScrollArea className="h-[100vh]">
            <Header isLoading={isLoading} />
            <div className="flex flex-col p-4">{children}</div>
            <AppFooter />
            <NoSSR>
              <StoreSelectorPopup isOpen={isOpen} onClose={handleStorePopupClose} />
            </NoSSR>
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
