// checkout.client.ts - Enhanced debugging version
// import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';
import { ValidationError, apiClientWithHeaders } from '../base.client';

// export const postCheckout = async (
//   params: DTO.CheckoutPayloadSchema
// ): Promise<DTO.ApiCheckoutResponse> => {

//   // ⬅ Enhanced debugging
//   console.log("=== DETAILED CHECKOUT REQUEST DEBUGGING ===");
//   console.log("1. Original params:", params);
//   console.log("2. JSON.stringify params:", JSON.stringify(params, null, 2));
//   console.log("3. Type of params:", typeof params);
//   console.log("4. Type of params.add_ons:", typeof params.add_ons);
//   console.log("5. Is params.add_ons Array?", Array.isArray(params.add_ons));
  
//   if (params.add_ons) {
//     console.log("6. add_ons length:", Array.isArray(params.add_ons) ? params.add_ons.length : 'Not array');
//     console.log("7. add_ons content:", params.add_ons);
//   }

//   try {
//     const result = await getDataFromApi<typeof params, DTO.ApiCheckoutResponse, DTO.CheckoutPayloadSchema>({
//       type: 'post',
//       url: '/api/dashboard/subscriptions/checkout',
//       injectHeaders: ['x-organization-id'],
//       params,
//       transformer: (data: Record<string, unknown>) => {
//         console.log('8. Backend Response:', data);
//         return data as DTO.ApiCheckoutResponse;
//       }
//     });

//     console.log("9. Final result:", result);
//     return result;

//   } catch (error: any) {
//     console.log("10. === REQUEST FAILED - DETAILED ERROR ===");
//     console.log("Error object:", error);
//     console.log("Error message:", error.message);
//     console.log("Error response:", error.response);
//     console.log("Error response data:", error.response?.data);
//     console.log("Error response headers:", error.response?.headers);
//     console.log("Request config:", error.config);
//     console.log("Request data sent:", error.config?.data);
//     console.log("Request headers sent:", error.config?.headers);
    
//     throw error;
//   }
// };

export const postCheckout = async (
  payload: DTO.CheckoutPayloadSchema
): Promise<DTO.ApiCheckoutResponse> => {
  try {
    const response = await apiClientWithHeaders.post(
      '/api/dashboard/subscriptions/checkout',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-organization-id': '1', 
        },
      }
    );

    return response.data as DTO.ApiCheckoutResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};