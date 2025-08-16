import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto/variant-options.dto';

export const CheckEditVariant = async (
    params: {
        'id': number,
    }
) =>
getDataFromApi<typeof params, DTO.CheckEditVariantResponse>({
    type: 'get',
    url: `/api/product-variant-combinations/${params.id}`,
    injectHeaders: ['x-device-id', 'x-organization-id', 'x-store-id'],
    params,
    transformer: data => data as unknown as DTO.CheckEditVariantResponse
});

export const CreateVariantOption = async (
  productId: number,
  payload: DTO.CreateVariantOptionRequest
): Promise<DTO.CreateVariantOptionResponse> => {
  return getDataFromApi<{}, DTO.CreateVariantOptionResponse, DTO.CreateVariantOptionRequest>({
    type: 'put',
    url: `/api/variant-attributes/${productId}/options`,
    injectHeaders: ['x-device-id', 'x-organization-id', 'x-store-id'],
    body: payload,
    transformer: (data) => data as unknown as DTO.CreateVariantOptionResponse,
  });
};
