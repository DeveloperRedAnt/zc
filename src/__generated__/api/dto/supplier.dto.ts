import { BaseResponseSchema } from './base.dto';

export interface SupplierData {
  id: number;
  name: string;
  pic: string;
  phone: string;
  created_at: string;
}

export interface SupplierPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Ubah ke interface agar data & pagination di level atas
export interface SupplierResponse extends BaseResponseSchema<unknown> {
  data: SupplierData[];
  pagination: SupplierPagination;
}

export interface SupplierRequestParams extends Record<string, unknown> {
  page?: number;
  search?: string;
}


export interface StoreRequestParams {
    [key: string]: unknown; 
    'x-organization-id': string;
    'x-device-id': string;
    page?: number;
    perpage?: number;
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
    search?: string;
}

export interface StoreList {
id: number;
  name: string;
  type: string;
  category: string;
  phone: string;
  address: string;
  lat: number;
  long: number;
}

export interface StoreResponse extends BaseResponseSchema<unknown> {
    data: StoreList[];
    pagination: SupplierPagination ;
}