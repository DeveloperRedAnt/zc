import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { z } from 'zod';
import * as DTO from '../dto';

export type TypeToZod<T> = Required<{
    [K in keyof T]: T[K] extends string | number | boolean | null | undefined
        ? undefined extends T[K]
            ? z.ZodDefault<z.ZodType<Exclude<T[K], undefined>>>
            : z.ZodType<T[K]>
        : T[K] extends Array<infer U>
            ? U extends Record<string, any>
                ? z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>>
                : z.ZodArray<z.ZodType<U>>
            : T[K] extends Record<string, any>
                ? z.ZodRecord<z.ZodString, z.ZodAny>
                : z.ZodObject<TypeToZod<T[K]>>;
  }>;
  
  export const createZodObject = <T>(_obj: TypeToZod<T>) => {
    return z.object(_obj) as z.ZodObject<TypeToZod<T>>;
  };
  
  // --- Axios Instances ---
  export const apiClientWithHeaders = axios.create({
    baseURL: "https://api-zycas.eling.my.id",
    headers: {
      'accept': 'application/json',
      'x-device-id': '1',
      'x-organization-id': '2',
      'Content-Type': 'application/json',
    },
  });
  
  // Add response interceptor for error handling
  apiClientWithHeaders.interceptors.response.use((response) => response, async (error) => {
    if (error.response) {
        const { status, data } = error.response;
        error.message = 'API Error ' + status + ': ' + (data && data.message || error.message);
        error.data = data;
        
        // Handle 401 unauthorized errors by logging out
        if (status === 401 && typeof window !== 'undefined') {
          try {
            const { signOut } = await import('next-auth/react');
            await signOut({ redirect: true, callbackUrl: '/sign-in' });
            console.log('Unauthorized', error);
          } catch (logoutError) {
            console.error('Error during automatic logout:', logoutError);
          }
        }
    }
    return Promise.reject(error);
  });
  
  apiClientWithHeaders.interceptors.request.use(async (config) => {
  try {
    // Check for token in cookies first (client-side)
    const token = Cookies.get('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    
    // Fallback to NextAuth session if no cookie token found
    if (typeof window !== 'undefined') { // Only run on client side
      const { getSession } = await import('next-auth/react');
      const session = await getSession();
      
      if (session?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }
  } catch (error) {
    console.error('Error setting auth header:', error);
  }
  return config;
  }, error => Promise.reject(error));
  
  export const apiClientWithHeadersWithoutContentType = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  
  apiClientWithHeadersWithoutContentType.interceptors.response.use((response) => response, async (error) => {
    if (error.response) {
        const { status, data } = error.response;
        error.message = 'API Error ' + status + ': ' + (data && data.message || error.message);
        error.data = data;
        
        // Handle 401 unauthorized errors by logging out
        if (status === 401 && typeof window !== 'undefined') {
          try {
            const { signOut } = await import('next-auth/react');
            await signOut({ redirect: true, callbackUrl: '/sign-in' });
          } catch (logoutError) {
            console.error('Error during automatic logout:', logoutError);
          }
        }
    }
    return Promise.reject(error);
  });
  
  apiClientWithHeadersWithoutContentType.interceptors.request.use(async (config) => {
  try {
    // Check for token in cookies first (client-side)
    const token = Cookies.get('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    
    // Fallback to NextAuth session if no cookie token found
    if (typeof window !== 'undefined') { // Only run on client side
      const { getSession } = await import('next-auth/react');
      const session = await getSession();
      
      if (session?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }
  } catch (error) {
    console.error('Error setting auth header:', error);
  }
  return config;
  }, error => Promise.reject(error));
  
  const defaultHeaders = {
    'accept': 'application/json',
    'x-device-id': '1',
    'x-store-id': '1',
    'x-organization-id': '1',
    'Content-Type': 'application/json',
  };
  
  /**
   * Helper to make API requests with or without default headers.
   * @param config AxiosRequestConfig
   * @param useDefaultHeaders boolean (default: true)
   */
  export function apiRequest<T = any>(config: AxiosRequestConfig, useDefaultHeaders = true) {
    return apiClientWithHeaders.request<T>({
      ...config,
      headers: useDefaultHeaders
        ? { ...defaultHeaders, ...(config.headers || {}) }
        : config.headers,
    });
  }
  
  
  // Set auth token for requests
  export const setAuthToken = (token: string | null) => {
      if (token) {
        apiClientWithHeaders.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      } else {
        delete apiClientWithHeaders.defaults.headers.common['Authorization'];
      }
  };
  
  
  // Define Zod schemas for validation
  export const SearchSchemaSchema = createZodObject<DTO.SearchSchema>({ 
    search: z.string(), 
  }).partial().passthrough();
  export const CreateOrganizationRequestSchemaSchema = createZodObject<DTO.CreateOrganizationRequestSchema>({ 
    address: z.string(), 
    email: z.string(), 
    image: z.string(), 
    name: z.string(), 
    nib: z.string(), 
    npwp: z.string(), 
    phone: z.string(), 
  }).partial().passthrough();
  export const CreateQueueCounterRequestSchemaSchema = createZodObject<DTO.CreateQueueCounterRequestSchema>({ 
    counter: z.number(), 
    counter_start: z.number(), 
    next_reset_at: z.string(), 
    padding: z.number(), 
    prefix: z.string(), 
    rotation: z.number(), 
  }).partial().passthrough();
  export const PageNumberSchemaSchema = createZodObject<DTO.PageNumberSchema>({ 
  }).partial().passthrough();
  export const FieldErrorSchema = z.object({
    field: z.string(),
    message: z.string(),
  });
  
  export const ErrorResponseSchemaSchema = z.object({
    code: z.number(),
    status: z.string(),
    name: z.string(),
    message: z.string(),
    data: z
      .object({
        errors: z.array(FieldErrorSchema).optional(),
      })
      .optional(),
  });
  export const IdParamSchema = createZodObject<DTO.IdParam>({ 
  }).partial().passthrough();
  export const SupplierSchemaSchema = createZodObject<DTO.SupplierSchema>({ 
    id: z.number(), 
    name: z.string(), 
    phone: z.string(), 
    pic: z.string(), 
  }).partial().passthrough();
  export const CreateTaxRequestSchemaSchema = createZodObject<DTO.CreateTaxRequestSchema>({ 
    tax: z.number(), 
  }).partial().passthrough();
  export const TagRequestSchemaSchema = createZodObject<DTO.TagRequestSchema>({ 
    name: z.string(), 
  }).partial().passthrough();
  export const DeviceIDSchemaSchema = createZodObject<DTO.DeviceIDSchema>({ 
  }).partial().passthrough();
  export const TokenRequestSchemaSchema = createZodObject<DTO.TokenRequestSchema>({ 
    password: z.string(), 
    phone: z.string(), 
  }).partial().passthrough();
  export const VariantSchemaSchema = createZodObject<DTO.VariantSchema>({ 
    id: z.number(), 
    variant_attribute_name: z.string(), 
  }).partial().passthrough();
  export const TokenResponseSchemaSchema = createZodObject<DTO.TokenResponseSchema>({ 
    token: z.string(), 
  }).partial().passthrough();
  export const TaxSchemaSchema = createZodObject<DTO.TaxSchema>({ 
    created_at: z.string(), 
    deleted_at: z.string(), 
    id: z.number(), 
    period_date: z.string(), 
    store_id: z.number(), 
    tax: z.number(), 
    updated_at: z.string(), 
  }).partial().passthrough();
  export const TagSchemaSchema = createZodObject<DTO.TagSchema>({ 
    created_at: z.string(), 
    deleted_at: z.string(), 
    id: z.number(), 
    name: z.string(), 
    store_id: z.number(), 
    updated_at: z.string(), 
  }).partial().passthrough();
  export const CreateUnitRequestSchemaSchema = createZodObject<DTO.CreateUnitRequestSchema>({ 
    unit_name: z.string(), 
  }).partial().passthrough();
  export const UnitSchemaSchema = createZodObject<DTO.UnitSchema>({ 
    data: z.array(z.record(z.string(), z.any())), 
  }).partial().passthrough();
  export const StoreIDSchemaSchema = createZodObject<DTO.StoreIDSchema>({ 
  }).partial().passthrough();
  export const OrganizationSchemaSchema = createZodObject<DTO.OrganizationSchema>({ 
    address: z.string(), 
    email: z.string(), 
    id: z.number(), 
    image: z.string(), 
    name: z.string(), 
    nib: z.string(), 
    npwp: z.string(), 
    phone: z.string(), 
  }).partial().passthrough();
  export const VariantRequestSchemaSchema = createZodObject<DTO.VariantRequestSchema>({ 
    name: z.string(), 
  }).partial().passthrough();
  export const QueueCounterSchemaSchema = createZodObject<DTO.QueueCounterSchema>({ 
    counter: z.number(), 
    counter_start: z.number(), 
    created_at: z.string(), 
    deleted_at: z.string(), 
    id: z.number(), 
    next_reset_at: z.string(), 
    padding: z.number(), 
    prefix: z.string(), 
    rotation: z.number(), 
    store_id: z.number(), 
    updated_at: z.string(), 
  }).partial().passthrough();
  export const CreateStoreRequestSchemaSchema = createZodObject<DTO.CreateStoreRequestSchema>({ 
    name: z.string(),
    address: z.string(),
    phone: z.number(),
    type: z.string(),
    category: z.string(),
    lat: z.number(),
    long: z.number(),
  }).partial().passthrough();
  export const SupplierRequestSchemaSchema = createZodObject<DTO.SupplierRequestSchema>({ 
    name: z.string(), 
    phone: z.string(), 
    pic: z.string(), 
  }).partial().passthrough();
  export const OrganizationIDSchemaSchema = createZodObject<DTO.OrganizationIDSchema>({ 
  }).partial().passthrough();
  
  
  // Type exports from schemas
  export type SearchSchema = z.infer<typeof SearchSchemaSchema>;
  export type CreateOrganizationRequestSchema = z.infer<typeof CreateOrganizationRequestSchemaSchema>;
  export type CreateQueueCounterRequestSchema = z.infer<typeof CreateQueueCounterRequestSchemaSchema>;
  export type PageNumberSchema = z.infer<typeof PageNumberSchemaSchema>;
  export type ErrorResponseSchema = z.infer<typeof ErrorResponseSchemaSchema>;
  export type IdParam = z.infer<typeof IdParamSchema>;
  export type SupplierSchema = z.infer<typeof SupplierSchemaSchema>;
  export type CreateTaxRequestSchema = z.infer<typeof CreateTaxRequestSchemaSchema>;
  export type TagRequestSchema = z.infer<typeof TagRequestSchemaSchema>;
  export type DeviceIDSchema = z.infer<typeof DeviceIDSchemaSchema>;
  export type TokenRequestSchema = z.infer<typeof TokenRequestSchemaSchema>;
  export type VariantSchema = z.infer<typeof VariantSchemaSchema>;
  export type TokenResponseSchema = z.infer<typeof TokenResponseSchemaSchema>;
  export type TaxSchema = z.infer<typeof TaxSchemaSchema>;
  export type TagSchema = z.infer<typeof TagSchemaSchema>;
  export type CreateUnitRequestSchema = z.infer<typeof CreateUnitRequestSchemaSchema>;
  export type UnitSchema = z.infer<typeof UnitSchemaSchema>;
  export type StoreIDSchema = z.infer<typeof StoreIDSchemaSchema>;
  export type OrganizationSchema = z.infer<typeof OrganizationSchemaSchema>;
  export type VariantRequestSchema = z.infer<typeof VariantRequestSchemaSchema>;
  export type QueueCounterSchema = z.infer<typeof QueueCounterSchemaSchema>;
  export type CreateStoreRequestSchema = z.infer<typeof CreateStoreRequestSchemaSchema>;
  export type SupplierRequestSchema = z.infer<typeof SupplierRequestSchemaSchema>;
  export type OrganizationIDSchema = z.infer<typeof OrganizationIDSchemaSchema>;
  
  
  // Custom error handling
  export class ValidationError extends Error {
    constructor(public issues: z.ZodIssue[], message: string = 'Validation failed') {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  
  
  
  
  // Helper to validate response with Zod schema
  export const validateResponse = <T>(data: unknown, schema: z.ZodType<T>): T => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.issues);
      }
      throw error;
    }
  };
  