import { z } from 'zod';
import * as DTO from '../dto';
import { apiClientWithHeaders } from './base.client';
import { ValidationError } from './base.client';

export const getVoucher = async (
  params: DTO.BaseRequestSchema,
  body: DTO.GetVoucherListRequest,
) => {
  try {
    let url = '/api/vouchers';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-organization-id': params['x-organization-id']
    };

    var urlencoded = new URLSearchParams();
    if (body.search_by_status) urlencoded.append("search_by_status", body.search_by_status);
    if (body.search) urlencoded.append("search", body.search);
    if (body.page) urlencoded.append("page", String(body.page));
    if (body.per_page) urlencoded.append("per_page", String(body.per_page));

    if (body.start_at) urlencoded.append("start_at", body.start_at);
    if (body.end_at) urlencoded.append("end_at", body.end_at);

    urlencoded.append("sort_by", body.sort_by || "name");
    urlencoded.append("sort_direction", body.sort_direction || "asc");

    const response = await apiClientWithHeaders.get(url, { headers, params: urlencoded });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    if (error instanceof z.ZodError) throw new ValidationError(error.issues);
    if ((error as any).isAxiosError) {
      const axiosError = error as any;
      if (axiosError.response && axiosError.response.status === 401) console.error('Authentication required');
      if (axiosError.response && axiosError.response.status === 403) console.error('Access denied');
      throw new Error('HTTP ' + (axiosError.response && axiosError.response.status || 'unknown') + ': ' + axiosError.message);
    }
    throw error;
  }
};

export const createVoucher = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: DTO.createVoucherRequest,
}) => {
  try {
    let url = `/api/vouchers`;
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    const response = await apiClientWithHeaders.post(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

export const updateVoucher = async (params: {
  id: number;
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: DTO.createVoucherRequest,
}) => {
  try {
    let url = `/api/vouchers/${params.id}`;
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    const response = await apiClientWithHeaders.put(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};
