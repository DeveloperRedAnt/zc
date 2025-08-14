import * as DTO from '../dto';
import { ValidationError, apiClientWithHeaders } from './base.client';

/**
 * Get list of devices
 */
export const getDeviceList = async () => {
  try {
    const url = '/api/devices';
    const response = await apiClientWithHeaders.get(url);
    return response.data as DTO.DeviceListResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Get device information by ID
 */
export const getDeviceInfo = async (params: { id: number }) => {
  try {
    const url = `/api/device/${params.id}`;
    const response = await apiClientWithHeaders.get(url);
    return response.data as DTO.DeviceResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Update device information
 */
export const updateDevice = async (params: {
  id: number;
  body: Partial<{
    name: string;
    model: string;
    serial_number: string;
    code: string;
  }>;
}) => {
  try {
    const url = `/api/device/${params.id}`;
    const response = await apiClientWithHeaders.put(url, params.body);
    return response.data as DTO.DeviceResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};