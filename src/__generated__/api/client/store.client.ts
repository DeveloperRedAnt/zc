import axios from 'axios';
import z from 'zod';
import * as DTO from '../dto';
import { ValidationError, apiClientWithHeaders } from './base.client';

/**
 * Create Store
 */

  /**
   * Create Store
   */
  export const onCreateStore = async (params: {
    'x-organization-id' : string;
    'x-device-id': string;
    body: DTO.CreateStoreRequestSchema;
  }): Promise<DTO.StoreSchema> => {
    try {
      let url = '/api/stores';
      
      const headers = {
        'x-organization-id': params['x-organization-id'],
        'x-device-id': params['x-device-id'],
        'x-store-id': undefined,
      };

      const response = await apiClientWithHeaders.post(url, params.body, { headers });
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  };

  /**  
   * Update Store
   */
  export const onUpdateStore = async (
    params: {
    'x-organization-id' : string;
    'x-device-id': string;
    store_id: string;
    body: DTO.StoreSchema;
  }) : Promise<DTO.StoreSchema> => {
    try {
      let url = `/api/store/${params.store_id}`;
      
      const headers = {
        'x-organization-id': params['x-organization-id'],
        'x-device-id': params['x-device-id'],
        'x-store-id': undefined,
      };
      console.log(params.body);
      
      const response = await apiClientWithHeaders.put(url, params.body, { headers });
      return response.data;

    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  }


/**
 * Detail Store
 */
export const detailStore = async (params: {
  'x-organization-id' : string;
  'x-device-id': string;
  body: { id: string; }
}) => {
  try {
    let url = `/api/store/${params.body.id}`;
    const headers = {
      'x-organization-id': params['x-organization-id'],
      'x-device-id': params['x-device-id'],
      'x-store-id': undefined,
    };
    const response = await apiClientWithHeaders.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const onStoreStockFirstVariant = async (params: {
    "x-device-id": string;
    "x-store-id": string;
    "x-organization-id": string;
    body: DTO.ProductStockPayload;
  }) => {
    try {
      let url = `/api/products`;
      const headers = {
        "x-device-id": params["x-device-id"],
        "x-store-id": params["x-store-id"],
        "x-organization-id": params["x-organization-id"],
        "Content-Type": "application/json",
      };
      const response = await apiClientWithHeaders.post(url, params.body, {
        headers,
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      if (error instanceof z.ZodError) throw new ValidationError(error.issues);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401)
          console.error("Authentication required");
        if (error.response && error.response.status === 403)
          console.error("Access denied");
        throw new Error(
          "HTTP " +
            ((error.response && error.response.status) || "unknown") +
            ": " +
            error.message
        );
      }
      throw error;
    }
  };

  export const listStore = async (params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body?: {
      page?: number;
      per_page?: number;
      search?: string;
      sort_by?: string;
      sort_direction?: 'asc' | 'desc';
    };
  }): Promise<DTO.StoreListResponse> => {
    try {
      const headers = {
        'x-device-id': params['x-device-id'],
        'x-store-id': params['x-store-id'],
        'x-organization-id': params['x-organization-id'],
      };
      
      const url = `/api/stores`;
      const queryParams = params.body || {};
      
      const response = await apiClientWithHeaders.get(url, {
        headers,
        params: queryParams
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  }

