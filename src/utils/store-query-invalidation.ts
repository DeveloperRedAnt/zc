import { QueryClient } from '@tanstack/react-query';

/**
 * List of all store-dependent query keys that should be invalidated when store changes
 */
export const STORE_DEPENDENT_QUERIES = [
  'getEmployee',
  'getEmployeeDetail',
  'getMember',
  'getVoucher',
  'listProducts',
  'getProductDetail',
  'listProductStockOpnames',
  'getProductStockHistories',
  'product-tags',
] as const;

/**
 * Utility function to handle store change invalidation for all store-dependent queries
 * @param queryClient - React Query client instance
 * @param newStoreId - The new store ID that was selected
 */
export function invalidateStoreQueries(queryClient: QueryClient, newStoreId?: string) {
  // Remove all cached queries for store-dependent data
  for (const queryKey of STORE_DEPENDENT_QUERIES) {
    queryClient.removeQueries({
      queryKey: [queryKey],
    });
  }

  // Invalidate active queries to trigger refetch
  for (const queryKey of STORE_DEPENDENT_QUERIES) {
    queryClient.invalidateQueries({
      queryKey: [queryKey],
      refetchType: 'active',
    });
  }

  // Dispatch custom event with store ID for components that need to react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('storeIdChanged', {
        detail: { storeId: newStoreId || '1' },
      })
    );
  }
}

/**
 * Reset page to 1 when store changes - useful for pagination
 * @param searchParams - URL search params from nuqs
 * @param setSearchParams - Setter from nuqs
 */
export function resetPageOnStoreChange(
  searchParams: URLSearchParams,
  setSearchParams: (params: Record<string, string | null>) => void
) {
  const currentPage = searchParams.get('page');
  if (currentPage && currentPage !== '1') {
    setSearchParams({ page: '1' });
  }
}

/**
 * Combined utility function that handles both query invalidation and page reset
 * @param queryClient - React Query client instance
 * @param newStoreId - The new store ID that was selected
 * @param searchParams - URL search params from nuqs (optional)
 * @param setSearchParams - Setter from nuqs (optional)
 */
export function handleStoreChange(
  queryClient: QueryClient,
  newStoreId?: string,
  searchParams?: URLSearchParams,
  setSearchParams?: (params: Record<string, string | null>) => void
) {
  // Invalidate all store-dependent queries
  invalidateStoreQueries(queryClient, newStoreId);

  // Reset page to 1 if URL params are provided
  if (searchParams && setSearchParams) {
    resetPageOnStoreChange(searchParams, setSearchParams);
  }
}
