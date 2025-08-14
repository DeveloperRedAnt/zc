import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/management-subscription/management-subscription.dto';

type SubscriptionsHistoriesParams = {
  page?: number;
  per_page?: number;
};

export const getSubscriptionsHistories = async (
  params: SubscriptionsHistoriesParams
): Promise<DTO.SubscriptionsHistoriesResponse> => {
  return getDataFromApi<typeof params, DTO.SubscriptionsHistoriesResponse>({
    type: 'get',
    url: `/api/dashboard/subscriptions/histories`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.SubscriptionsHistoriesResponse,
  });
};

export const getSubscriptionOverview = async (): Promise<DTO.SubscriptionOverviewResponse> => {
  return getDataFromApi<{}, DTO.SubscriptionOverviewResponse>({
    type: 'get',
    url: `/api/dashboard/subscriptions/overview`,
    injectHeaders: ['x-organization-id'],
    transformer: (data) => data as DTO.SubscriptionOverviewResponse,
  });
};

type PackageComparisonParams = {
  page?: number;
  per_page?: number;
};

export const getPackageComparison = async (
  params?: PackageComparisonParams
): Promise<DTO.PackageComparisonResponse> => {
  return getDataFromApi<PackageComparisonParams, DTO.PackageComparisonResponse>({
    type: 'get',
    url: `/api/dashboard/subscriptions/package-comparison`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.PackageComparisonResponse,
  });
};