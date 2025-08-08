import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/master-data/tags-product.dto';

type TagsProductListParams = {
  page?: number;
  per_page?: number;
};

export const getTagsProductList = async (
  params: TagsProductListParams
): Promise<DTO.TagsProductListResponse> => {
  return getDataFromApi<typeof params, DTO.TagsProductListResponse>({
    type: 'get',
    url: `/api/tags`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.TagsProductListResponse,
  });
};

export const createTagsProductMasterData = async (
  payload: DTO.TagsProductPayload
): Promise<DTO.TagsProductResponse> => {
  return getDataFromApi<typeof payload, DTO.TagsProductResponse>({
    type: 'post',
    url: `/api/tags`,
    injectHeaders: ['x-organization-id', 'x-device-id', 'x-store-id'],
    params: payload,
    transformer: (data) => data as DTO.TagsProductResponse,
  });
};

export const updateTagsProductMasterData = async (
  params: { id: number } & DTO.TagsProductPayload
): Promise<DTO.TagsProductResponse> => {
  const { id, ...payload } = params;
  return getDataFromApi<typeof payload, DTO.TagsProductResponse>({
    type: 'put',
    url: `/api/tags/${id}`,
    injectHeaders: ['x-organization-id'],
    params: payload,
    transformer: (data) => data as DTO.TagsProductResponse,
  });
};
