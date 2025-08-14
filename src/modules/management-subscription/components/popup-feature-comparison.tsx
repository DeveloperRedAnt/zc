import * as DTO from '@/__generated__/api/dto/management-subscription/management-subscription.dto';
import { useInfinitePackageComparison } from '@/__generated__/api/hooks/management-subscription/management-subscription.hooks';
import { Button } from '@/components/button/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog/dialog';
import { CheckOne, CloseOne } from '@icon-park/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef } from 'react';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import Zycasmaxlogo from './../../../../public/assets/images/zycasmax-logo.svg';

type Package = {
  id: number | string;
  name: string;
  amount?: string;
  price?: string;
  end_date?: string;
  next_renewal_at?: string;
  renewal_status?: string;
  badge_link?: string | null;
  strip_link?: string;
  description?: string[];
};

interface FeatureComparisonModalProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages?: Package[];
}

export function FeatureComparisonModal({
  title,
  open,
  onOpenChange,
  packages,
}: FeatureComparisonModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch package comparison data with infinite query
  const {
    data: comparisonData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePackageComparison(
    {
      per_page: 10, // Load 10 items per page
    },
    {
      enabled: open, // Only fetch when modal is open
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: false, // Only fetch when enabled
    }
  ); // Type assertion to bypass strict typing

  const packageData = packages || [];

  // Find packages by name for easier access
  const gratisPackage = packageData.find((pkg) => pkg.name.toLowerCase().includes('gratis'));
  const bisnisPackage = packageData.find((pkg) => pkg.name.toLowerCase().includes('bisnis'));
  const enterprisePackage = packageData.find((pkg) =>
    pkg.name.toLowerCase().includes('enterprise')
  );

  // Flatten all pages data
  const allFeatures = comparisonData?.pages.flatMap((page) => page.data) || [];

  const features = allFeatures.length > 0 ? allFeatures : [];

  // Get package logo helper
  const getPackageLogo = (pkg?: Package) => {
    if (!pkg) return null;

    if (pkg.badge_link) return pkg.badge_link;

    if (pkg.name.toLowerCase().includes('enterprise')) {
      return Zycasmaxlogo;
    }
    if (pkg.name.toLowerCase().includes('bisnis')) {
      return ZycasPlusLogo;
    }
    return null;
  };

  // Format price helper
  const formatPrice = (pkg?: Package) => {
    if (!pkg) return '-';
    const price = pkg.price || pkg.amount;
    if (!price || price === 'Rp 0') return 'GRATIS';
    return `${price} per Bulan`;
  };

  // Helper function to get feature value for specific package
  const getFeatureValue = (permission: DTO.Permission, packageName: string) => {
    const packageComparison = permission.compare_to_package?.find((pkg) =>
      pkg.name.toLowerCase().includes(packageName.toLowerCase())
    );

    if (!packageComparison) return false;

    if (!packageComparison.is_available) return false;

    if (packageComparison.message) {
      return packageComparison.message;
    }

    return packageComparison.is_available;
  };

  // Improved scroll handler for infinite loading
  const handleScroll = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !hasNextPage || isFetchingNextPage || isLoading) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const threshold = 100;

    // Trigger fetch when user scrolls near bottom
    if (scrollHeight - (scrollTop + clientHeight) <= threshold) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  // Attach scroll listener with proper cleanup
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !open) return; // Don't attach listener if modal is closed

    // Use passive listener for better performance
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, open]);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Handle case where entries might be empty or first entry might be undefined
        if (entries.length === 0) return;

        const entry = entries[0];
        if (entry?.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: scrollRef.current,
        rootMargin: '100px', // Start loading 100px before sentinel comes into view
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  // Reset scroll position when modal opens
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[950px] max-h-[98vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 flex-shrink-0">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 !-mt-[0.8rem]"
          style={{
            // Ensure proper scrolling behavior
            overflowY: 'auto',
            height: '100%',
            maxHeight: 'calc(98vh - 120px)', // Account for header height
          }}
        >
          {/* Pricing Header */}
          <div className="grid grid-cols-4 gap-4 sticky top-0 bg-background z-10 pb-4 -mt-[10px]">
            <div />

            {/* Gratis Package */}
            <div className="text-left">
              <div className="text-gray-600 py-1 text-sm font-medium mb-2 uppercase">
                {gratisPackage?.name || 'GRATIS'}
              </div>
            </div>

            {/* Bisnis Package */}
            <div className="text-left">
              <div className="text-xs text-gray-500 capitalize mb-2">
                {bisnisPackage?.name || 'Paket Bisnis'}
              </div>
              {getPackageLogo(bisnisPackage) ? (
                typeof getPackageLogo(bisnisPackage) === 'string' &&
                getPackageLogo(bisnisPackage)!.startsWith('http') ? (
                  <img
                    src={getPackageLogo(bisnisPackage)!}
                    alt={bisnisPackage?.name || 'Bisnis Package'}
                    className="w-[107px] h-[32px] object-contain ml-[-19px]"
                  />
                ) : (
                  <Image
                    src={getPackageLogo(bisnisPackage)!}
                    alt={bisnisPackage?.name || 'Bisnis Package'}
                    className="w-[107px] h-[32px] object-contain ml-[-19px]"
                  />
                )
              ) : null}
              <div className="text-xs font-medium mt-2">{formatPrice(bisnisPackage)}</div>
            </div>

            {/* Enterprise Package */}
            <div className="text-left gap-2">
              <div className="text-xs text-gray-500 capitalize mb-2">
                {enterprisePackage?.name || 'Paket Enterprise'}
              </div>
              {getPackageLogo(enterprisePackage) ? (
                typeof getPackageLogo(enterprisePackage) === 'string' &&
                getPackageLogo(enterprisePackage)!.startsWith('http') ? (
                  <img
                    src={getPackageLogo(enterprisePackage)!}
                    alt={enterprisePackage?.name || 'Enterprise Package'}
                    className="w-[107px] h-[32px] object-contain"
                  />
                ) : (
                  <Image
                    src={getPackageLogo(enterprisePackage)!}
                    alt={enterprisePackage?.name || 'Enterprise Package'}
                    className="w-[107px] h-[32px] object-contain"
                  />
                )
              ) : null}
              <div className="text-xs font-medium mt-2">{formatPrice(enterprisePackage)}</div>
            </div>
          </div>

          {/* Features List */}
          {features.map((category, categoryIndex) => (
            <div key={`${category.name}-${categoryIndex}`} className="space-y-3">
              <h3 className="font-medium text-gray-900 bg-gray-50 py-2 border-t border-b border-gray-100 px-6">
                {category.name}
              </h3>

              {category.permissions?.map((permission, permissionIndex) => (
                <div
                  key={`${category.name}-${permission.name}-${permissionIndex}`}
                  className="grid grid-cols-4 gap-4 py-2"
                >
                  <div className="text-sm text-gray-700 font-medium px-6">{permission.name}</div>

                  {/* Gratis Column */}
                  <div className="text-left">
                    {(() => {
                      const value = getFeatureValue(permission, 'gratis');
                      if (typeof value === 'boolean') {
                        return value ? (
                          <CheckOne
                            theme="filled"
                            fill="#0FA6C1"
                            size="1.5rem"
                            className="mx-auto"
                          />
                        ) : (
                          <CloseOne
                            theme="filled"
                            fill="#F08181"
                            size="1.5rem"
                            className="mx-auto"
                          />
                        );
                      }
                      return (
                        <span className="text-[0.8rem] text-gray-600 whitespace-pre-line">
                          {typeof value === 'string' ? highlightText(value) : null}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Bisnis Column */}
                  <div className="text-left">
                    {(() => {
                      const value = getFeatureValue(permission, 'bisnis');
                      if (typeof value === 'boolean') {
                        return value ? (
                          <CheckOne
                            theme="filled"
                            fill="#0FA6C1"
                            size="1.5rem"
                            className="mx-auto"
                          />
                        ) : (
                          <CloseOne
                            theme="filled"
                            fill="#F08181"
                            size="1.5rem"
                            className="mx-auto"
                          />
                        );
                      }
                      return (
                        <span className="text-[0.8rem] text-gray-600 whitespace-pre-line">
                          {typeof value === 'string' ? highlightText(value) : null}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Enterprise Column */}
                  <div className="text-left">
                    {(() => {
                      const value = getFeatureValue(permission, 'enterprise');
                      if (typeof value === 'boolean') {
                        return value ? (
                          <CheckOne
                            theme="filled"
                            fill="#0FA6C1"
                            size="1.5rem"
                            className="mx-auto"
                          />
                        ) : (
                          <CloseOne
                            theme="filled"
                            fill="#F08181"
                            size="1.5rem"
                            className="mx-auto"
                          />
                        );
                      }
                      return (
                        <span className="text-[0.8rem] text-gray-600 whitespace-pre-line">
                          {typeof value === 'string' ? highlightText(value) : null}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Sentinel element for Intersection Observer */}
          {hasNextPage && !isFetchingNextPage && <div ref={sentinelRef} className="h-4" />}

          {/* Loading indicator */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          )}

          {/* No more data indicator */}
          {!hasNextPage && allFeatures.length > 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">Semua data telah dimuat</div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-4 text-red-500 text-sm">
              Terjadi kesalahan saat memuat data
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                className="ml-2 text-blue-500 hover:underline"
              >
                Coba lagi
              </Button>
            </div>
          )}

          {/* Initial loading state */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function highlightText(text: string): React.JSX.Element {
  const highlightWords = ['2 toko', '3 toko', 'Multi user', '5 akun', '10 akun'];

  const parts = text.split(new RegExp(`(${highlightWords.join('|')})`, 'gi'));

  const keyCountMap = new Map<string, number>();

  return (
    <>
      {parts.map((part) => {
        const count = keyCountMap.get(part) || 0;
        keyCountMap.set(part, count + 1);
        const uniqueKey = `${part}-${count}`;

        const isHighlighted = highlightWords.some(
          (word) => word.toLowerCase() === part.toLowerCase()
        );

        return (
          <span key={uniqueKey} className={isHighlighted ? 'font-semibold' : ''}>
            {part}
          </span>
        );
      })}
    </>
  );
}
