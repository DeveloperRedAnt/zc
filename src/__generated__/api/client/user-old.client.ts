import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto';
import { ValidationError, apiClientWithHeaders } from './base.client';
import { apiClientWithHeadersWithoutContentType } from './base.client';

/**
 * List employees
 */
export const listEmployees = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: Partial<DTO.EmployeeSchema>;
}) => {
  try {
    let url = '/api/employees';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    const response = await apiClientWithHeaders.get(url, { headers, params: params.body });
    const users = response.data.data.map((user: DTO.EmployeeListResponse) => ({
      ...user,
      image: user.image || '/assets/zycas/default-image-user.png',
      store_count: user.store_count || '3 Toko',
    }));
    return users;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Detail employee
 */
export const getEmployeeDetail = async (params: { id: number }) => {
  return getDataFromApi<typeof params, DTO.EmployeeDetailDataSchema>({
    type: 'get',
    url: `/api/employees/${params.id}`,
    injectHeaders: ['x-organization-id'],
    params,
    transformer: (data) => {
      return data.data as DTO.EmployeeDetailDataSchema;
    },
  });
};

/**
 * Reset employee password
 */
export const resetEmployeePassword = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: {
    id_employee: number,
    password: string,
    password_confirmation: string,
  }
}) => {
  try {
    let url = `/api/employees/${params.body.id_employee}/reset-password`;
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

export const resetEmployeePin = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: {
    'id_employee': number,
  }
}) => {
  try {
    let url = `/api/employees/${params.body.id_employee}/reset-pin`;
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

export const createEmployee = async (params: {
  'x-organization-id': string;
  body: FormData;
}) => {
  try {
    const url = `/api/v2/employees`;
    const headers = {
      'x-organization-id': params['x-organization-id'],
    };
    
    const response = await apiClientWithHeadersWithoutContentType.post(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * UPDATE USER
 */
export const updateEmployee = async (params: {
  id: number;
  'x-organization-id': string;
  body: DTO.CreateEmployeePayload;
}) => {
  try {
    const url = `/api/v2/employees/${params.id}`;
    const headers = {
      'x-organization-id': params['x-organization-id'],
    };

    const response = await apiClientWithHeaders.put(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * GET MASTER DATA - POSITION
 */
export const listPosition = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
}) => {
  try {
    let url = `/api/positions`;
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    
    const response = await apiClientWithHeaders.get(url, { headers });

    return response.data.data.map((position) => ({
      label: position.name,
      value: position.id,
    }));
  } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
  }
};

/**
 * GET PERMISSION GRUP PER TOKO OR AND PER EMPLOYEE
 */
export const listPermissionGroup = async (params: {
  'x-store-id': string;
  'x-organization-id': string;
  body?: {
    employee_id?: string;
  };
}) => {
  try {
    const url = `/api/permission-groups/selection`;
    const headers = {
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
      
    };

    const response = await apiClientWithHeaders.get(
      url,
      { 
        headers,
        params: params.body ?? {} // Pass the body as query parameters
      }
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * ASSIGN PERMISSION USER
 */
export const assignPermissionEmployee = async (params: {
  id: number;
  'x-organization-id': string;
  body: {
    store_id: number;
    position_id: number;
    permissions: (string | number)[];
  }[];
}) => {
  try {
    const url = `/api/employees/${params.id}/assign-to-store`;
    const headers = {
      'x-organization-id': params['x-organization-id'],
    };

    const response = await apiClientWithHeaders.post(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Change employee password (by self)
 */
export const changeEmployeePassword = async (params: {
  id: number;
  body: {
    old_password: string;
    password: string;
    password_confirmation: string;
  };
}) => {
  return getDataFromApi<typeof params, unknown>({
    type: 'put',
    url: `/api/employees/${params.id}/change-password`,
    injectHeaders: ['x-organization-id'],
    params,
    body: params.body,
    transformer: (data) => {
      return data;
    },
  });
};

export const changeEmployeePin = async (params: {
  id: number;
  body: {
    old_pin: string;
    pin: string;
    pin_confirmation: string;
  };
}) => {
  return getDataFromApi<typeof params, unknown>({
    type: 'put',
    url: `/api/employees/${params.id}/change-pin`,
    injectHeaders: ['x-organization-id'],
    body: params.body,
    transformer: (data) => data,
  });
};

