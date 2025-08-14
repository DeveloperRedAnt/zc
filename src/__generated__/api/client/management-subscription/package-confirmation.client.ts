import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';
// import { ValidationError, apiClientWithHeaders } from '../base.client';

export const getDataPackage = async (params: DTO.GetSubscriptionPayloadSchema): Promise<DTO.ApiSubscriptionResponse> =>
  getDataFromApi<typeof params, DTO.ApiSubscriptionResponse, DTO.GetSubscriptionPayloadSchema>({
    type: 'get',
    url: '/api/dashboard/subscriptions/package-confirmation',
    injectHeaders: ['x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiSubscriptionResponse
  });

