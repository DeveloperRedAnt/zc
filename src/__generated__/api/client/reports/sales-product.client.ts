import * as DTO from '@/__generated__/api/dto/reports/sales-product.dto';
import { getDataFromApi } from '../../../../utils/url';

export const getReportSalesProduct = async (
  params: DTO.SalesProductApiParams
): Promise<DTO.SalesProductResponse> => {
  // Clean up params - remove empty or default values
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => {
      if (key === 'product_id' && value === 'all-product-filter') return false;
      if (key === 'store_id' && value === 'all-store-filter') return false;
      if (value === undefined || value === null || value === '') return false;
      return true;
    })
  );

  return getDataFromApi<typeof cleanParams, DTO.SalesProductResponse>({
    type: 'get',
    url: '/api/reports/sales-per-product',
    injectHeaders: ['x-organization-id'],
    params: cleanParams,
    withPagination: true,
    transformer: (data) => data as unknown as DTO.SalesProductResponse,
  });
};