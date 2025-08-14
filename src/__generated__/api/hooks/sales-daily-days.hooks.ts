import { useQuery } from '@tanstack/react-query';
import { listEmployees } from '../client/sales-daily-days.client';
import { salesCashierFetch, salesDailyDays as fetchSalesDailyDays } from '../client/sales-daily-days.client';
import { EmployeeListApiResponse, FilteringEmployee } from '../dto/cashier-use-pagination.dto'
import { SalesDailyDaysApiResponse, SalesDailyDaysFilter,SalesDailyDaysRequest, SalesDailyResponse } from '../dto/sales-daily-days.dto';



export function useEmployees(payload: FilteringEmployee, deviceId: string, storeId: string, organizationId: string) {
      return useQuery<EmployeeListApiResponse>({
      queryKey: ['employees', deviceId, storeId, organizationId, payload],
      queryFn: () => listEmployees({
        'x-device-id': deviceId,
        'x-store-id': storeId,
        'x-organization-id': organizationId,
        body: payload,
      }),
  });
}


export function useSalesDailyDaysChartAndTable(payload: SalesDailyDaysRequest, organizationId: string) {
  return useQuery<SalesDailyResponse>({
    queryKey: ['sales-daily-days', organizationId, payload],
    queryFn: () => fetchSalesDailyDays({
      'x-organization-id': organizationId,
      body: payload,
    }),
  });
}

export function useSalesCashier(payload: SalesDailyDaysFilter, organizationId: string) {
  return useQuery<SalesDailyDaysApiResponse>({
    queryKey: ['sales-daily-cashier', organizationId, payload],
    queryFn: async () => {
      const response = await salesCashierFetch({
        'x-organization-id': organizationId,
        body: payload,
      });
      return response as unknown as SalesDailyDaysApiResponse;
    },
  });
}


