import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/master-data/unit-product.dto';

type UnitProductListParams = {
  page?: number;
  per_page?: number;
};

export const getUnitProductList = async (
  params: UnitProductListParams
): Promise<DTO.UnitProductListResponse> => {
  return getDataFromApi<typeof params, DTO.UnitProductListResponse>({
    type: 'get',
    url: `/api/product-units`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.UnitProductListResponse,
  });
};

export const createUnitProductMasterData = async (
  payload: DTO.UnitProductPayload
): Promise<DTO.UnitProductResponse> => {
  return getDataFromApi<typeof payload, DTO.UnitProductResponse>({
    type: 'post',
    url: `/api/product-units`,
    injectHeaders: ['x-organization-id', 'x-device-id', 'x-store-id'],
    params: payload,
    transformer: (data) => data as DTO.UnitProductResponse,
  });
};

export const updateUnitProductMasterData = async (
  params: { id: number } & DTO.UnitProductPayload
): Promise<DTO.UnitProductResponse> => {
  const { id, ...payload } = params;
  return getDataFromApi<typeof payload, DTO.UnitProductResponse>({
    type: 'put',
    url: `/api/product-units/${id}`,
    injectHeaders: ['x-organization-id'],
    params: payload,
    transformer: (data) => data as DTO.UnitProductResponse,
  });
};
