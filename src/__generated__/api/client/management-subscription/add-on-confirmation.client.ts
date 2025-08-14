import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';

export const getAddOnConfirmation = async (params: DTO.GetAddOnConfirmationPayloadSchema): Promise<DTO.ApiAddOnConfirmationResponse> =>
  getDataFromApi<typeof params, DTO.ApiAddOnConfirmationResponse, DTO.GetAddOnConfirmationPayloadSchema>({
    type: 'get',
    url: '/api/dashboard/subscriptions/add-on-confirmation',
    injectHeaders: ['x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => {
      console.log('Raw API Response:', data);
      return data as DTO.ApiAddOnConfirmationResponse;
    }
  });