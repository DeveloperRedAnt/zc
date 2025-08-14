

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { createStandardQueryKey } from "../../../utils/query-key";
import { paymentMethod, salesPaymentReport } from "../client/sales-payment-report.client";

export namespace DTO {
    export interface SalesDailyDaysRequest {
        start_date: string; 
        end_date: string;  
        is_active: number;  
        ids: number[];     
        name: string;      
    }

    export interface SalesDailyResponse {
        code: number;
        status: string;
        name: string;
        message: string;
          recap: {
              total_transaction: number;
              payment_methods: any[];
          };
          graph: {
              labels: string[];
              data: number[];
          };
    }

     export interface PaymentDailyRespons {
         code: number;
        status: string;
        name: string;
        message: string;
        data: {
            id: number;
            name: string;
            is_active: number;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
        }

     }
}

export function usePaymentReport(
  params: DTO.SalesDailyDaysRequest,
  options?: UseQueryOptions<DTO.SalesDailyResponse>
) {
  return useQuery({
    queryKey: ["getPaymentReport", params], 
    queryFn: () => {
      return salesPaymentReport({
        'x-organization-id': (params as any)['x-organization-id'],
        body: params
      });
    },
    ...options,
  });
}


export function usePaymentMethod(params?: unknown) {
  return useQuery({
    queryKey: createStandardQueryKey("getPaymentMethod", params || {}),
    queryFn: () => {
      return paymentMethod({
        'x-organization-id': (params as unknown)?.['x-organization-id'],
      });
    },
  });
}