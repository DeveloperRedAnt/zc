import { getDataFromApi } from '../../../utils/url';

export namespace DTO {
    export interface SalesDailyDaysRequest {
        start_date: string; // format: YYYY-MM-DD
        end_date: string;   // format: YYYY-MM-DD
        is_active: number;  // 1 = aktif, 0 = tidak aktif
        ids: number[];      // daftar ID metode pembayaran
        name: string;       // nama filter
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

export const salesPaymentReport = async (params: {
    'x-organization-id': string;
    body: DTO.SalesDailyDaysRequest;
}): Promise<DTO.SalesDailyResponse> => 
    getDataFromApi<typeof params, DTO.SalesDailyResponse>({
    type: 'get',
    url: '/api/reports/payment-method-transaction',
    injectHeaders: [
        'x-organization-id',
        'x-store-id'
    ],
    params: params, 
    transformer: (data: Record<string, unknown>) => data as unknown as DTO.SalesDailyResponse
});
export const paymentMethod = async (params: {
    'x-organization-id': string;
}): Promise<DTO.PaymentDailyRespons> => 
     getDataFromApi<typeof params, DTO.PaymentDailyRespons>({
    type: 'get', 
    url: 'api/master-data/payment-reference',
    injectHeaders: [
        'x-organization-id',
        'x-store-id'
    ],
    params: params, 
    transformer: (data: Record<string, unknown>) => data as unknown as DTO.PaymentDailyRespons
})
