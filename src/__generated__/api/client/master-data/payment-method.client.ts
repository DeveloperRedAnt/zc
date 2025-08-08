import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';
import { ValidationError, apiClientWithHeadersWithoutContentType} from '.././base.client';

export const listPaymentMethod = async (params: DTO.GetPaymentPayloadSchema): Promise<DTO.ApiResponsePaymentMethod> =>
  getDataFromApi<typeof params, DTO.ApiResponsePaymentMethod, DTO.GetPaymentPayloadSchema>({
    type: 'get',
    url: '/api/master-data/payment-methods',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiResponsePaymentMethod
  });

export const updatePaymentMethod = async (
  storeId: string,
  payments: Array<{id: number, active: boolean}>,
  image?: File
) => {
  try {
    const formData = new FormData();
    
    formData.append('payments', JSON.stringify(payments));
    
    if (image) {
      formData.append('image', image);
    }
    
    formData.append('_method', 'POST');

     const response = await apiClientWithHeadersWithoutContentType.post(`/api/master-data/payment-methods/${storeId}`, formData, // ⬅️ kirim langsung FormData sebagai body
      {
        headers: {
          Accept: 'application/json',
          // Content-Type jangan diset, biarkan axios / fetch set otomatis untuk FormData
        },
      }
    );

    return response;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};