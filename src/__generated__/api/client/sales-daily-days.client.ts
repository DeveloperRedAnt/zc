import { FilteringEmployee } from '../dto/cashier-use-pagination.dto';
import * as DTO from '../dto/sales-daily-days.dto';
import { SalesDailyResponse } from '../dto/sales-daily-days.dto';
import { apiClientWithHeaders } from './base.client';


export const salesDailyDays = async (params: {
    'x-organization-id': string;
    body: Partial<DTO.SalesDailyDaysRequest>;
}): Promise<SalesDailyResponse> => {
    try {
        let url = '/api/reports/transaction-daily';
        const headers = {
            'x-organization-id': params['x-organization-id'],
        };
        const response = await apiClientWithHeaders.get(url, { headers, params: params.body });
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const salesCashierFetch = async (params: {
    'x-organization-id': string;
    body: Partial<DTO.SalesDailyDaysFilter>;
}): Promise<DTO.SalesDailyDaysResponse> => {
    try {
        let url = '/api/reports/sales-per-cashier';
        const headers = {
        'x-organization-id': params['x-organization-id'],
        };
        const response = await apiClientWithHeaders.get(url, { headers, params: params.body });
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const listEmployees = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: FilteringEmployee ;
}) => {
  try {
    let url = '/api/employees';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    const response = await apiClientWithHeaders.get(url, { headers, params: params.body });
    return response.data;
  } catch (error) {
    throw error;
  }
};


