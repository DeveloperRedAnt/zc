import axios from 'axios';
import { z } from 'zod';
import * as DTO from '../dto/organization.dto';
import { apiClientWithHeaders } from './base.client';
import { ValidationError } from './base.client';

/**
 * Get organization
 */
export const getOrganization = async (
  params: {
    'x-device-id': string;
    page?: number;
  },
) => {
  try {
    let url = '/api/organization';
    const headers = {
      'x-device-id': params['x-device-id'],
    };
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) {
      queryParams.append('page', String(params.page));
    }
    const queryString = queryParams.toString();
    if (queryString) {
      url += '?' + queryString;
    }
    const response = await apiClientWithHeaders.get(url, { headers });
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

/**
 * Create organization
 */
export const createOrganization = async (
  params: {
    'x-device-id': string;
    body: DTO.CreateOrganizationPayload
  }
) => {
  try {
    let url = '/api/dashboard/organizations';
    const headers = {
      'x-device-id': params['x-device-id'],
    };
    const response = await apiClientWithHeaders.post(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Update organization
 */
export const updateOrganization = async (
  params: {
    'x-device-id': string;
    id: string;
    body: DTO.UpdateOrganizationPayload;
  }
) => {
  try {
    let url = `/api/dashboard/organizations/${params.id}`;
    const headers = {
      'x-device-id': params['x-device-id'],
    };
    const response = await apiClientWithHeaders.put(url, params.body, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Select organization
 */
export const selectOrganization = async (
  params: {
    'x-device-id': string;
    'x-organization-id': string;
  }
) => {
  try {
    let url = `/api/organizations/${params['x-organization-id']}`;
    const headers = {
      'x-device-id': params['x-device-id'],
    };
    const response = await apiClientWithHeaders.get(url, { headers });
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


export const GetOrganizationOfUser = async (params: DTO.GetOrganizationOfUserRequestSchema) => {
    try {
      
      let url = `/api/org-of-user/${params['user-id']}`;
      
      
      
      const headers = {
        'x-device-id': '1'
      };
      
      const response = await apiClientWithHeaders.get(url, { headers });
      
      
      return response.data.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      if (error instanceof z.ZodError) throw new ValidationError(error.issues);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) console.error('Authentication required');
        if (error.response && error.response.status === 403) console.error('Access denied');
        throw new Error('HTTP ' + (error.response && error.response.status || 'unknown') + ': ' + error.message);
      }
      throw error;
    }
  }


export const UpdateOrganization = async (params: {
    'id': string;
    body: DTO.UpdateOrganizationPayload;
    
  }) => {
    try {
      
      let url = `/api/dashboard/organizations/${params.id}`;
      
      const headers = {
        'x-device-id': '1'
      };
      const response = await apiClientWithHeaders.put(url, params.body, { headers });
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  }

  export const SelectOrganization = async (params: {
    'x-device-id': string;
    'x-organization-id': string;
  }) => {
    try {
      let url = `/api/organizations/${params['x-organization-id']}`;

      const headers = {
        'x-device-id': params['x-device-id'],
      };
      const response = await apiClientWithHeaders.get(url, { headers });
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  }

  export const OnInToDashboard = async (params: {
    'x-device-id': string;
    'x-organization-id': string;
    body: {
      'organizationId': string;
    }
  }) => {
    try {
      let url = `/api/organizations/${params['x-organization-id']}/on-in-to-dashboard`;
      const headers = {
        'x-device-id': params['x-device-id'],
      };
       const response = await apiClientWithHeaders.post(url, params.body, { headers });
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  }

  export const getDashboardOrganizations = async (
    params: DTO.GetDashboardOrganizationsParams
  ) => {
    try {
      let url = '/api/dashboard/organizations';

      const headers = {
        'x-device-id': params['x-device-id'],
      };

      const queryParams = new URLSearchParams();
      if (params.page !== undefined) queryParams.append('page', String(params.page));
      if (params.per_page !== undefined) queryParams.append('per_page', String(params.per_page));
      if (params.search) queryParams.append('search', params.search);
      if (params.sort_by) queryParams.append('sort_by', params.sort_by);
      if (params.sort_direction) queryParams.append('sort_direction', params.sort_direction);

      const queryString = queryParams.toString();
      if (queryString) url += '?' + queryString;

      const response = await apiClientWithHeaders.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


