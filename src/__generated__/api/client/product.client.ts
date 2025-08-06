import axios from 'axios';
import { z } from 'zod';
import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto/product.dto';
import { ValidationError, apiClientWithHeaders } from './base.client';
/**
 * Create tax
 */
export const createTax = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  body: DTO.CreateTaxRequestSchema;
}) => {
  try {
    let url = '/api/v1/taxes';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
    };
    const response = await apiClientWithHeaders.post(url, params.body, { headers });
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
 * List product tags
 */
export const listProductTags = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  page?: number;
  per_page?: number;
  search?: string;
}) => {
  try {
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.search) queryParams.append('search', params.search);
    
    const url = `/api/tags${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClientWithHeaders.get(url, { headers });
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    if (error instanceof z.ZodError) throw new ValidationError(error.issues);
    if ((error as any).isAxiosError) {
      const axiosError = error as any;
      if (axiosError.response && axiosError.response.status === 401) console.error('Authentication required');
      if (axiosError.response && axiosError.response.status === 403) console.error('Access denied');
      throw new Error('HTTP ' + (axiosError.response?.status || 'unknown') + ': ' + axiosError.message);
    }
    throw error;
  }
};

/**
 * List variant attributes
 */
export const listVariantAttributes = async (params: {
  'x-device-id': string;
  'x-store-id': string;
}) => {
  try {
    let url = '/api/variant-attributes';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
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

/**
 * Create variant attribute
 */
export const createVariantAttribute = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  body: DTO.VariantRequestSchema;
}) => {
  try {
    let url = '/api/variant-attributes';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
    };
    const response = await apiClientWithHeaders.post(url, params.body, { headers });
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
 * List unit product
 */
export const listUnitProduct = async (params: {
  'x-device-id': string;
  'x-store-id': string;
}) => {
  try {
    let url = '/api/v1/units';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
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

/**
 * Create unit product
 */
export const createUnitProduct = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  body: DTO.CreateUnitRequestSchema;
}) => {
  try {
    let url = '/api/v1/units';
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
    };
    const response = await apiClientWithHeaders.post(url, params.body, { headers });
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

// export const listProducts = async (params: {
//     'x-device-id': string;
//     'x-store-id': string;
//     'x-organization-id': string;
//     body?: DTO.ProductSchema;
//   }) => {
//     try {
      
//       let url = '/api/dashboard/products';
      
//       const headers = {
//         'x-device-id': params['x-device-id'],
//         'x-store-id': params['x-store-id'],
//         'x-organization-id': params['x-organization-id'],
//       };
      
//       // Convert body to query params if provided
//       const queryParams = params.body ? {
//         page: params.body.page,
//         per_page: params.body.per_page,
//         search: params.body.search,
//         sort_by: params.body.sort_by,
//         sort_direction: params.body.sort_direction,
//         status: params.body.status,
//       } : {};
      
//       const response = await apiClientWithHeaders.get(url, { 
//         headers, 
//         params: queryParams 
//       });
      
//       return response.data as DTO.ApiResponse;
//     } catch (error) {
//       if (error instanceof ValidationError) throw error;
//       if (error instanceof z.ZodError) throw new ValidationError(error.issues);
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.status === 401) console.error('Authentication required');
//         if (error.response && error.response.status === 403) console.error('Access denied');
//         throw new Error('HTTP ' + (error.response && error.response.status || 'unknown') + ': ' + error.message);
//       }
//       throw error;
//     }
//   }

  export const listProducts = async (params: DTO.ProductSchema) => getDataFromApi<typeof params, DTO.ApiResponse, DTO.ProductSchema>({
    type: 'get',
    url: '/api/dashboard/products',
    injectHeaders: ['x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiResponse
  });

  export const listProductUnits = async (params: {
    page?: number;
    per_page?: number;
    search?: string;
  }) => {
    try {
      const headers = {
        'x-device-id': '1',
        'x-organization-id': '1',
      };
      
      const url = '/api/product-units';
      
      const response = await apiClientWithHeaders.get(url, {
        headers,
        params
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  };

  export const ListProductStockHistories = async (params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body: {
      'id': number,
    }
  }) => {
    try {
      let url = `/api/products/${params.body.id}/stock-histories`;
      const headers = {
        'x-device-id': params['x-device-id'],
        'x-store-id': params['x-store-id'],
        'x-organization-id': params['x-organization-id'],
      };
      
      const response = await apiClientWithHeaders.get(url, { headers, params: params.body });

      return response.data.data;
    } catch (error) {
        if (error instanceof ValidationError) throw error;
        throw error;
    }
  }


  export const ProductDetail = async (params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body: {
      'id': number,
    }
  }) => {
    try {
      let url = `/api/products/${params.body.id}`;
      const headers = {
        'x-device-id': params['x-device-id'],
        'x-store-id': params['x-store-id'],
        'x-organization-id': params['x-organization-id'],
      };
      
      const response = await apiClientWithHeaders.get(url, { headers, params: params.body });

      return response.data.data;
    } catch (error) {
        if (error instanceof ValidationError) throw error;
        throw error;
    }
  }

  export const InitializeStock = async (params: {
    "x-device-id": string;
    "x-store-id": string;
    "x-organization-id": string;
    body: DTO.InitializeStockRequestSchema;
  }) => {
    let url = "/api/products";
    try {
      const headers = {
        "x-device-id": params["x-device-id"],
        "x-store-id": params["x-store-id"],
        "x-organization-id": params["x-organization-id"],
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(url, params.body, { headers });
      return response.data;
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      throw error;
    }
  }



  /** 
   *  Initialize Stock details
   */
  export const InitializeStockDetails = async ( 
    params: {
      product_id: string | number;
      'x-device-id': string;
        'x-store-id': string;
        'x-organization-id': string;
  }) => {
        console.log('InitializeStockDetails called with params:', params);

        let url = `http://localhost:3000/api/stock-detail?id=${params.product_id}`;

        try   {
          const headers = {
            'x-device-id': params['x-device-id'],
            'x-store-id': params['x-store-id'],
            'x-organization-id': params['x-organization-id'],
          };
          const response = await axios.get(url, { headers });
          return response.data;
        } catch (error) 
        { 
          if (error instanceof ValidationError) throw error;
          throw error;
        }
  }


