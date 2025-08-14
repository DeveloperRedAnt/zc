import { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as api from '../../client';
import * as DTO from '../../dto/management-subscription/management-subscription.dto';

type SubscriptionsHistoriesParams = {
  page?: number;
  per_page?: number;
};

export function useSubscriptionsHistories(
  params: SubscriptionsHistoriesParams,
  options?: UseQueryOptions<DTO.SubscriptionsHistoriesResponse>
) {
  return useQuery<DTO.SubscriptionsHistoriesResponse>({
    queryKey: ['getSubscriptionsHistories', params],
    queryFn: () => api.getSubscriptionsHistories(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useSubscriptionOverview(
  options?: UseQueryOptions<DTO.SubscriptionOverviewResponse>
) {
  return useQuery<DTO.SubscriptionOverviewResponse>({
    queryKey: ['getSubscriptionOverview'],
    queryFn: () => api.getSubscriptionOverview(),
    ...options,
  });
}

type PackageComparisonParams = {
  page?: number;
  per_page?: number;
};

export function useInfinitePackageComparison(
  params: Omit<PackageComparisonParams, 'page'> = {},
  options?: Omit<
    UseInfiniteQueryOptions<
      DTO.PackageComparisonResponse,                        // TQueryFnData
      Error,                                                 // TError
      InfiniteData<DTO.PackageComparisonResponse, number>,   // TData
      [string, Omit<PackageComparisonParams, 'page'>],       // TQueryKey
      number                                                  // TPageParam
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) {
  return useInfiniteQuery<
    DTO.PackageComparisonResponse,
    Error,
    InfiniteData<DTO.PackageComparisonResponse, number>,
    [string, Omit<PackageComparisonParams, 'page'>],
    number
  >({
    queryKey: ['getInfinitePackageComparison', params],
    queryFn: ({ pageParam = 1 }) =>
      api.getPackageComparison({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination) return undefined;
      const { current_page, last_page } = lastPage.pagination;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    ...options,
  });
}


export function usePackageComparison(
  params?: PackageComparisonParams,
  options?: UseQueryOptions<DTO.PackageComparisonResponse>
) {
  return useQuery<DTO.PackageComparisonResponse>({
    queryKey: ['getPackageComparison', params],
    queryFn: () => api.getPackageComparison(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}