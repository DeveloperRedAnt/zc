import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';
import { ValidationError, apiClientWithHeaders } from '../base.client';

export const listServiceCharge = async (params: DTO.GetServiceChargePayloadSchema): Promise<DTO.ApiServiceChargeResponse> =>
  getDataFromApi<typeof params, DTO.ApiServiceChargeResponse, DTO.GetServiceChargePayloadSchema>({
    type: 'get',
    url: '/api/master-data/service-charges',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiServiceChargeResponse
  });

export const updateServiceCharge = async (
  storeId: string,
  payload: DTO.UpdateServiceChargePayload
): Promise<DTO.UpdateServiceChargeResponse> => {
  try {
    const response = await apiClientWithHeaders.put(
      `/api/master-data/service-charges/${storeId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data as DTO.UpdateServiceChargeResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};