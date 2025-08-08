import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/master-data/variant-product.dto';

type VariantProductListParams = {
  page?: number;
  per_page?: number;
};

export const getVariantProductList = async (
  params: VariantProductListParams
): Promise<DTO.VariantProductListResponse> => {
  return getDataFromApi<typeof params, DTO.VariantProductListResponse>({
    type: 'get',
    url: `/api/variant-attributes`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.VariantProductListResponse,
  });
};

export const createVariantProductMasterData = async (
  payload: DTO.VariantProductPayload
): Promise<DTO.VariantProductResponse> => {
  return getDataFromApi<typeof payload, DTO.VariantProductResponse>({
    type: 'post',
    url: `/api/variant-attributes`,
    injectHeaders: ['x-organization-id', 'x-device-id', 'x-store-id'],
    params: payload,
    transformer: (data) => data as DTO.VariantProductResponse,
  });
};

export const updateVariantProductMasterData = async (
  params: { id: number } & DTO.VariantProductPayload
): Promise<DTO.VariantProductResponse> => {
  const { id, ...payload } = params;
  return getDataFromApi<typeof payload, DTO.VariantProductResponse>({
    type: 'put',
    url: `/api/variant-attributes/${id}`,
    injectHeaders: ['x-organization-id'],
    params: payload,
    transformer: (data) => data as DTO.VariantProductResponse,
  });
};
