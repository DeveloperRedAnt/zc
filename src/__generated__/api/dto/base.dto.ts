export type BaseRequestSchema = {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
  };
  
export type IdParam = {};
export type PageNumberSchema = {};
export type DeviceIDSchema = {};

export type BaseResponseSchema<T> = {
  status: string;
  message: string;
  data: T;
};

export type FieldError = {
  field: string;
  message: string;
};

export type ErrorResponseSchema = {
  code: number;
  status: string;
  name: string;
  message: string;
  data?: {
    errors?: FieldError[];
  };
};

export type SearchSchema = {
  search: string;
};

export interface BaseRequestPagination {
    page: number;
    per_page: number;
    sort_by: string;
    sort_direction: string;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface BaseResponseSchemaPagination<T> extends BaseResponseSchema<T> {
    pagination: Pagination;
}
    
    