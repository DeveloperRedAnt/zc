import { BaseResponseSchemaPagination } from './base.dto';

// Voucher list request DTO
export interface GetVoucherListRequest {
  page?: number;
  per_page?: number;
  search?: string;
  search_by_status?: string;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  start_at?: string;
  end_at?: string;
}

// Store information in voucher response
export interface VoucherStore {
  id: number;
  name: string;
}

// Single voucher item in response
export interface VoucherItem {
  id: number;
  name: string;
  code: string;
  start_at: string;
  end_at: string;
  type: string;
  amount: number;
  is_active: boolean;
  store: VoucherStore;
}


export type GetVoucherListResponse = BaseResponseSchemaPagination<VoucherItem[]>

export type createVoucherRequest = {
  name: string;
  code: string;
  start_at?: string;
  end_at?: string;
  type: string;
  amount: number;
  store_id: number;
};