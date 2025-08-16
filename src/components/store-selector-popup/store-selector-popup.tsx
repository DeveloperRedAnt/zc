'use client';

import { listStore } from '@/__generated__/api/client';
import type { StoreItem } from '@/__generated__/api/dto';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog/dialog';
import { type StoreOptionType, useStoreFilter } from '@/hooks/use-store-filter/use-store-filter';
import { zeroPad } from '@/utils/pad-start';
import { Search } from '@icon-park/react';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useState } from 'react';

export type StoreSelectorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  disabled?: boolean;
};

export default function StoreSelectorPopup({ isOpen, onClose, disabled }: StoreSelectorPopupProps) {
  const { setSelectedStore, selectedStore } = useStoreFilter();

  // Use nuqs for URL query state management
  const [_page, _setPage] = useQueryState('page', { defaultValue: '1' });

  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [_totalPages, setTotalPages] = useState(1);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load stores from API
  const loadStores = useCallback(
    async (search?: string, page = 1, append = false) => {
      if (!isMounted) return;

      if (page === 1) {
        setIsLoading(true);
        setCurrentPage(1);
        setHasMore(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const response = await listStore({
          page,
          per_page: 20,
          search: search || undefined,
          sort_by: 'name',
          sort_direction: 'asc' as const,
        });

        let storeData: StoreItem[];
        let metaData: {
          last_page?: number;
          current_page?: number;
          per_page?: number;
          total?: number;
        } | null = null;

        if (Array.isArray(response)) {
          storeData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          storeData = response.data;
          metaData = response.meta;
        } else {
          storeData = [];
        }

        if (append && page > 1) {
          setStores((prev) => [...prev, ...storeData]);
        } else {
          setStores(storeData);
        }

        // Update pagination info
        if (metaData) {
          setTotalPages(metaData.last_page || 1);
          setHasMore(page < (metaData.last_page || 1));
        } else {
          setHasMore(false);
        }

        setCurrentPage(page);
      } catch (error) {
        console.error('Error loading stores:', error);
        if (!append) {
          setStores([]);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [isMounted]
  );

  // Load stores when popup opens
  useEffect(() => {
    if (isOpen) {
      loadStores();
    }
  }, [isOpen, loadStores]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        loadStores(searchTerm, 1, false); // Reset to page 1 on search
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, isOpen, loadStores]);

  // Load more stores function
  const loadMoreStores = useCallback(() => {
    if (hasMore && !isLoadingMore && !isLoading) {
      loadStores(searchTerm, currentPage + 1, true);
    }
  }, [hasMore, isLoadingMore, isLoading, searchTerm, currentPage, loadStores]);

  // Intersection Observer for infinite scroll
  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasMore) {
            loadMoreStores();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [isLoading, isLoadingMore, hasMore, loadMoreStores]
  );

  // Handle store selection
  const handleSelectStore = useCallback(
    (store: StoreItem | null) => {
      if (!isMounted) return;

      let storeOption: StoreOptionType | null = null;
      let storeId = '1';

      if (store) {
        // Handle regular store
        storeOption = {
          label: `#${zeroPad(store.id, 4)} - ${store.name}`,
          value: store.id,
          data: store,
        };
        storeId = store.id.toString();
      }

      // Update store selection
      setSelectedStore(storeOption);

      // Set in localStorage and cookies
      localStorage.setItem('x-store-id', storeId);
      document.cookie = `x-store-id=${storeId}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days

      // Close popup
      onClose();
    },
    [isMounted, setSelectedStore, onClose]
  );

  // Use stores directly without "Semua Toko" option
  const storeList = stores;

  // Get currently selected store for highlighting
  const currentSelectedId = selectedStore?.value || null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-md max-h-[420px] flex flex-col p-0 overflow-hidden"
        hideCloseButton={false}
      >
        <DialogHeader className="p-6 border-b border-gray-100">
          <DialogTitle className="text-base font-medium">
            Silahkan pilih toko terlebih dahulu
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="search toko"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={disabled || isLoading}
            />
          </div>
        </div>

        {/* Store List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-pulse space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ) : storeList.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">Tidak ada toko ditemukan</div>
          ) : (
            <div className="py-2">
              {storeList.map((store, _index) => (
                <button
                  type="button"
                  key={store.id}
                  onClick={() => handleSelectStore(store)}
                  disabled={disabled}
                  className={`w-full text-left px-6 py-4 hover:bg-blue-50 transition-colors flex items-center justify-between group ${
                    currentSelectedId === store.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-medium text-sm truncate ${
                        currentSelectedId === store.id
                          ? 'text-blue-700'
                          : 'text-gray-900 group-hover:text-blue-700'
                      }`}
                    >
                      {`#${zeroPad(store.id, 4)} - ${store.name}`}
                    </div>
                  </div>
                  {currentSelectedId === store.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-3" />
                  )}
                </button>
              ))}

              {/* Infinite scroll observer target */}
              {hasMore && <div ref={observerRef} className="h-4 w-full" />}

              {/* Loading more indicator */}
              {isLoadingMore && (
                <div className="p-4 text-center">
                  <div className="animate-pulse space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              )}

              {/* End of list indicator */}
              {!hasMore && storeList.length > 20 && (
                <div className="p-4 text-center text-xs text-gray-500">Semua toko telah dimuat</div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
