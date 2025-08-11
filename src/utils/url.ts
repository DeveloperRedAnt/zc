/**
 * Types for API parameters
 */
export type HeaderParams = {
  'x-device-id'?: string;
  'x-organization-id'?: string;
  'x-store-id'?: string;
  [key: string]: string | undefined;
};

export type PaginationParams = {
  page?: number;
  per_page?: number;
};

export type SortingParams = {
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
};

export type SearchParams = {
  search?: string;
};

export type CommonParams = PaginationParams & SortingParams & SearchParams;

// Define more specific types for parameter values
export type ParamValue = string | number | boolean | undefined | null;
export type QueryParamRecord = Record<string, ParamValue>;

/**
 * Extracts headers from API params
 * @param params Object that may contain header fields
 * @returns Object containing only the headers
 */
export function extractHeaders<T extends Record<string, ParamValue>>(params: T): HeaderParams {
  const headers: HeaderParams = {};

  // Common API headers in the codebase
  const commonHeaders = ['x-device-id', 'x-organization-id', 'x-store-id'];
  for (const key of commonHeaders) {
    if (key in params && params[key] !== undefined && typeof params[key] === 'string') {
      headers[key] = params[key] as string;
    }
  }

  return headers;
}

/**
 * Extracts query parameters from API params (excludes headers)
 * @param params Full params object
 * @returns Object with only query parameters
 */
export function extractQueryParams<T extends Record<string, ParamValue>>(
  params: T
): QueryParamRecord {
  const queryParams: QueryParamRecord = {};

  // Copy all non-header parameters
  for (const [key, value] of Object.entries(params)) {
    if (!key.startsWith('x-') && value !== undefined) {
      queryParams[key] = value;
    }
  }

  return queryParams;
}

/**
 * Builds URL query parameters from an object
 * @param params Object containing query parameters
 * @returns URLSearchParams instance and query string
 */
export function buildQueryParams<T extends QueryParamRecord>(
  params: T
): { queryParams: URLSearchParams; queryString: string } {
  const queryParams = new URLSearchParams();

  // Handle all possible parameter types
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        queryParams.append(key, String(item));
      }
    } else {
      queryParams.append(key, String(value));
    }
  }

  const queryString = queryParams.toString();
  return { queryParams, queryString };
}

/**
 * Builds a complete URL with query parameters
 * @param baseUrl Base URL without query parameters
 * @param params Object containing query parameters
 * @returns Complete URL with query parameters
 */
export function buildUrl<T extends QueryParamRecord>(baseUrl: string, params: T): string {
  const { queryString } = buildQueryParams(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Gets header values from cookies or localStorage
 * @param headerKeys Array of header keys to retrieve
 * @returns Object with header values retrieved from local data
 */
export function getHeadersFromLocalData(headerKeys: string[]): HeaderParams {
  const headers: HeaderParams = {};

  // Check if we're in a browser environment
  if (typeof document !== 'undefined') {
    for (const key of headerKeys) {
      // Try to get from cookies first
      const cookieValue = getCookieValue(key);
      if (cookieValue) {
        headers[key] = cookieValue;
        continue;
      }

      // Try localStorage next if available
      if (typeof localStorage !== 'undefined') {
        const localValue = localStorage.getItem(key);
        if (localValue) {
          headers[key] = localValue;
        }
      }
    }
  }

  return headers;
}

/**
 * Gets a cookie value by name
 * @param name Cookie name
 * @returns Cookie value or empty string if not found
 */
export function getCookieValue(name: string): string {
  if (typeof document === 'undefined') return '';

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] ? match[2] : '';
}

/**
 * Options for API call preparation
 */
export interface PrepareApiCallOptions {
  /** Header keys to retrieve from cookies/localStorage */
  setHeadersFromLocalData?: string[];
}

/**
 * Prepares API call parameters from a combined params object
 * @param baseUrl Base URL for the API endpoint
 * @param params Combined API parameters (headers and query params)
 * @param options Additional options for API call preparation
 * @returns Object with url and headers for API call
 */
export function prepareApiCall<T extends Record<string, ParamValue>>(
  baseUrl: string,
  params: T,
  options?: PrepareApiCallOptions
): { url: string; headers: HeaderParams } {
  let headers = extractHeaders(params);
  const queryParams = extractQueryParams(params);
  const url = buildUrl(baseUrl, queryParams);

  // Add headers from cookies/localStorage if specified
  if (options?.setHeadersFromLocalData && options.setHeadersFromLocalData.length > 0) {
    const localHeaders = getHeadersFromLocalData(options.setHeadersFromLocalData);
    headers = { ...localHeaders, ...headers }; // Params headers take precedence over cookie headers
  }

  return { url, headers };
}

// Buat fungsi lebih praktis untuk digunakan di file client
export interface ApiErrorHandlerOptions {
  /** Display authentication required message */
  showAuthRequired?: boolean;
  /** Display access denied message */
  showAccessDenied?: boolean;
}

/**
 * Creates a standard error handler function for API requests
 * @param options Configuration options for the error handler
 * @returns An error handler function
 */
export function createApiErrorHandler(options: ApiErrorHandlerOptions = {}) {
  const { showAuthRequired = true, showAccessDenied = true } = options;

  return function handleError(error: unknown): never {
    // Handle axios errors with special handling
    if (
      error &&
      typeof error === 'object' &&
      'isAxiosError' in error &&
      error.isAxiosError === true
    ) {
      // Need to cast to unknown first to avoid TypeScript complaint
      const axiosError = error as unknown as { response?: { status: number }; message: string };

      if (axiosError.response) {
        // Handle authentication errors
        if (showAuthRequired && axiosError.response.status === 401) {
          console.error('Authentication required');
        }

        // Handle authorization errors
        if (showAccessDenied && axiosError.response.status === 403) {
          console.error('Access denied');
        }
      }

      throw axiosError;
    }

    // If it's not an axios error, just throw it as is
    throw error;
  };
}

import { apiClientWithHeaders } from '../__generated__/api/client/base.client';

// Type definitions for getDataFromApi
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// Define a more specific type for API responses to avoid 'any' while maintaining compatibility
type ApiResponse = Record<string, unknown>;

interface GetDataFromApiOptions<
  T extends Record<string, unknown>,
  R = ApiResponse,
  B = Record<string, unknown>,
> {
  type: HttpMethod;
  url: string;
  params?: T;
  body?: B;
  injectHeaders?: string[];
  withPagination?: boolean;
  transformer?: (data: ApiResponse) => R; // Fungsi untuk mengubah response sesuai format yang dibutuhkan
}

// Generic utility function to make API calls with consistent error handling
export async function getDataFromApi<
  T extends Record<string, unknown>,
  R = ApiResponse,
  B = Record<string, unknown>,
>(options: GetDataFromApiOptions<T, R, B>): Promise<R> {
  const { type, url, params = {}, body, injectHeaders = [], withPagination, transformer } = options;

  try {
    // Prepare API call with headers
    const { url: preparedUrl, headers } = prepareApiCall(url, params, {
      setHeadersFromLocalData: injectHeaders,
    });

    let response: { data: ApiResponse };

    // Call the API based on HTTP method type
    switch (type.toLowerCase()) {
      case 'get':
        response = await apiClientWithHeaders.get(preparedUrl, { headers });
        break;
      case 'post':
        response = await apiClientWithHeaders.post(preparedUrl, body, { headers });
        break;
      case 'put':
        response = await apiClientWithHeaders.put(preparedUrl, body, { headers });
        break;
      case 'delete':
        response = await apiClientWithHeaders.delete(preparedUrl, { headers });
        break;
      case 'patch':
        response = await apiClientWithHeaders.patch(preparedUrl, body, { headers });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${type}`);
    }

    // Process response data
    const responseData = withPagination
      ? response.data
      : (response.data as { data: ApiResponse }).data;

    // Apply transformer if provided
    if (transformer) {
      return transformer(responseData);
    }

    // Return data as is
    return responseData as R;
  } catch (error) {
    // Use the error handler utility
    const handleError = createApiErrorHandler();
    return handleError(error); // This line will never actually return because handleError always throws
  }
}

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};
