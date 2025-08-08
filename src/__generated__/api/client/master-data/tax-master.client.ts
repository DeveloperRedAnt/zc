import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';
import { ValidationError, apiClientWithHeaders } from '../base.client';

export const listTaxMaster = async (params: DTO.GetTaxMasterPayloadSchema): Promise<DTO.ApiTaxMasterResponse> =>
  getDataFromApi<typeof params, DTO.ApiTaxMasterResponse, DTO.GetTaxMasterPayloadSchema>({
    type: 'get',
    url: '/api/master-data/taxes',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiTaxMasterResponse
  });

export const updateTaxMaster = async (
  storeId: string,
  payload: DTO.UpdateTaxMasterPayload
): Promise<DTO.UpdateTaxMasterResponse> => {
  try {
    const response = await apiClientWithHeaders.put(
      `/api/master-data/taxes/${storeId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data as DTO.UpdateTaxMasterResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};