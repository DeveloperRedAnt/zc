import * as DTO from '@/__generated__/api/dto/reports/sales-variant.dto';
import { getDataFromApi } from '../../../../utils/url';

export const getReportSalesVariant = async (
  params: DTO.SalesVariantApiParams
): Promise<DTO.SalesVariantResponse> => {
  // Clean up params - remove empty or default values
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => {
      if (key === 'product_id' && value === 'all-product-filter') return false;
      if (key === 'store_id' && value === 'all-store-filter') return false;
      if (key === 'product_variant_id' && value === 'all-product-variant-filter') return false;
      if (value === undefined || value === null || value === '') return false;
      return true;
    })
  );

  return getDataFromApi<typeof cleanParams, DTO.SalesVariantResponse>({
    type: 'get',
    url: '/api/reports/sales-per-product-variant',
    injectHeaders: ['x-organization-id'],
    params: cleanParams,
    withPagination: true,
    transformer: (data) => data as unknown as DTO.SalesVariantResponse,
  });
};

type VariantProductListParams = {
  page?: number;
  per_page?: number;
};

export const getVariantProductDropdown = async (
  params: VariantProductListParams
): Promise<DTO.VariantReportProductListResponse> => {
  const raw = await getDataFromApi<typeof params, any>({
    type: 'get',
    url: `/api/master-data/product-variants`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
  });

  const { current_page, last_page, per_page, total, data } = raw.data;

  return {
    data: data.map((item: any) => ({
      id: item.id,
      product_name: item.product_name ?? '',
      product_brand: item.product_brand ?? '',
      product_id: item.product_id ?? 0,
      variant_name: item.variant_name ?? '',
    })),
    pagination: {
      current_page,
      last_page,
      per_page,
      total,
    },
  };
};
