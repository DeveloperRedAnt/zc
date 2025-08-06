import { AxiosError } from 'axios';
import { z } from 'zod';
import * as DTO from '../dto/reports.dto';
import { ValidationError, apiClientWithHeaders } from './base.client';

interface GetVoidReportsParams {
  'x-device-id': string;
  'x-store-id': string;
  query?: DTO.VoidReportRequest;
}

/**
 * Get void reports with filtering, pagination, and sorting
 */
export const getVoidReports = async (params: GetVoidReportsParams) => {
  try {
    let url = '/api/v1/reports/void';

    // Build query parameters
    const queryParams = new URLSearchParams();
    const { query } = params;

    if (query) {
      const {
        search,
        responsiblePerson,
        cashier,
        dateFrom,
        dateTo,
        page,
        pageSize,
        sortBy,
        sortDirection,
      } = query;

      if (search) queryParams.append('search', search);
      if (responsiblePerson && responsiblePerson !== 'all-responsible') {
        queryParams.append('responsiblePerson', responsiblePerson);
      }
      if (cashier && cashier !== 'all-cashier') {
        queryParams.append('cashier', cashier);
      }
      if (dateFrom) queryParams.append('dateFrom', dateFrom);
      if (dateTo) queryParams.append('dateTo', dateTo);
      if (page !== undefined) queryParams.append('page', page.toString());
      if (pageSize !== undefined) queryParams.append('pageSize', pageSize.toString());
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (sortDirection) queryParams.append('sortDirection', sortDirection);
    }

    if ([...queryParams].length > 0) {
      url += `?${queryParams.toString()}`;
    }

    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
    };

    const response = await apiClientWithHeaders.get(url, { headers });

    // Validate response
    return DTO.VoidReportResponseSchema.parse(response.data);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    if (error instanceof z.ZodError) {
      throw new ValidationError(error.issues);
    }

    const axiosError = error as AxiosError;

    if (axiosError?.isAxiosError) {
      const status = axiosError.response?.status;

      if (status === 401) {
        console.error('Authentication required');
      } else if (status === 403) {
        console.error('Access denied');
      }

      throw new Error(`HTTP ${status ?? 'unknown'}: ${axiosError.message}`);
    }

    throw error;
  }
};

interface GetProfitLossReportsParams {
  'x-device-id': string;
  'x-store-id': string;
  query?: DTO.ProfitLossReportRequest;
}

/**
 * Get profit loss reports with filtering, pagination, and sorting
 */
export const getProfitLossReports = async (params: GetProfitLossReportsParams) => {
  try {
    let url = '/api/v1/reports/profit-loss';

    // Build query parameters
    const queryParams = new URLSearchParams();
    const { query } = params;

    if (query) {
      const {
        search,
        dateFrom,
        dateTo,
        page,
        pageSize,
        sortBy,
        sortDirection,
      } = query;

      if (search) queryParams.append('search', search);
      if (dateFrom) queryParams.append('dateFrom', dateFrom);
      if (dateTo) queryParams.append('dateTo', dateTo);
      if (page !== undefined) queryParams.append('page', page.toString());
      if (pageSize !== undefined) queryParams.append('pageSize', pageSize.toString());
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (sortDirection) queryParams.append('sortDirection', sortDirection);
    }

    if ([...queryParams].length > 0) {
      url += `?${queryParams.toString()}`;
    }

    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
    };

    const response = await apiClientWithHeaders.get(url, { headers });

    // Validate response
    return DTO.ProfitLossReportResponseSchema.parse(response.data);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    if (error instanceof z.ZodError) {
      throw new ValidationError(error.issues);
    }

    const axiosError = error as AxiosError;

    if (axiosError?.isAxiosError) {
      const status = axiosError.response?.status;

      if (status === 401) {
        console.error('Authentication required');
      } else if (status === 403) {
        console.error('Access denied');
      }

      throw new Error(`HTTP ${status ?? 'unknown'}: ${axiosError.message}`);
    }

    throw error;
  }
};
