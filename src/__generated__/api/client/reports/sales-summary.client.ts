// sales-summary.client.ts
import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';

export const listSalesSummary = async (
  params: DTO.GetSalesSummaryPayloadSchema
): Promise<DTO.ApiSalesSummaryResponse> => {
  // Handle null store_ids - don't send store_ids parameter if null
  let apiParams: any = {
    period_type: params.period_type,
    period_start: params.period_start,
    period_end: params.period_end,
    sort_by: params.sort_by,
    sort_direction: params.sort_direction,
    page: params.page,
  };

  // Only add store_ids if it's not null and has items
  if (params.store_ids && Array.isArray(params.store_ids) && params.store_ids.length > 0) {
    // Use store_ids[] format for Laravel backend
    apiParams['store_ids[]'] = params.store_ids;
  }

  console.log('API params for sales summary:', apiParams);

return getDataFromApi<
    typeof apiParams,
    DTO.ApiSalesSummaryResponse,
    DTO.GetSalesSummaryPayloadSchema
>({
    type: 'get',
    url: '/api/reports/sales-summary',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params: apiParams,
    withPagination: true,
    transformer: (data: unknown) => {
      return data as DTO.ApiSalesSummaryResponse;
    },
});
};

export const listSalesSummaryChart = async (
  params: DTO.GetSalesSummaryChartPayloadSchema
): Promise<DTO.ApiSalesSummaryChartData[]> => {
  // Handle null store_ids - don't send store_ids parameter if null
  let apiParams: any = {
    period_type: params.period_type,
    period_start: params.period_start,
    period_end: params.period_end,
  };

  // Only add store_ids if it's not null and has items
  if (params.store_ids && Array.isArray(params.store_ids) && params.store_ids.length > 0) {
    // Use store_ids[] format for Laravel backend
    apiParams['store_ids[]'] = params.store_ids;
  }

  console.log('API params for sales summary chart:', apiParams);

  return getDataFromApi<
    typeof apiParams,
    DTO.ApiSalesSummaryChartData[],
    DTO.GetSalesSummaryChartPayloadSchema
  >({
    type: 'get',
    url: '/api/reports/sales-summary/chart',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params: apiParams,
    transformer: (res: Record<string, unknown>) => {
      console.log('Sales summary chart response:', res);
      
      // Handle different response structures
      if (res.data && Array.isArray(res.data)) {
        return res.data as DTO.ApiSalesSummaryChartData[];
      }
      
      if (Array.isArray(res)) {
        return res as DTO.ApiSalesSummaryChartData[];
      }
      
      // Fallback to empty array if structure is unexpected
      console.warn('Unexpected response structure for sales summary chart:', res);
      return [] as DTO.ApiSalesSummaryChartData[];
    },
  });
};

export const listStoreDropDown = async (
  params?: DTO.GetStorePayloadSchema
): Promise<DTO.ApiStoreDropdownResponse> => {
  return getDataFromApi<
    DTO.GetStorePayloadSchema,
    DTO.ApiStoreDropdownResponse,
    DTO.GetStorePayloadSchema
  >({
    type: 'get',
    url: '/api/stores/selection',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) =>
      data as DTO.ApiStoreDropdownResponse,
  });
};