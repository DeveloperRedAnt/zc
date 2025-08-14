// Updated sales-summary.dto.ts
import { BaseRequestSchema } from '../base.dto';

// Sales Summary Table API
export type GetSalesSummarySchema = BaseRequestSchema & {
  body: Partial<GetSalesSummaryPayloadSchema>;
};

export type GetSalesSummaryPayloadSchema = {
  store_ids: number[] | null; // Allow null for initial load
  period_type: 'quarterly' | 'monthly' | 'yearly';
  period_start: string;
  period_end: string;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  page?: number;
};

export type ApiSalesSummaryData = {
  period: string;
  date: string;
  netto: string;
  bruto: string;
  service_charge: string;
  discount: string;
  tax: string;
  transaction_count: number;
  cogs: string;
  profit: string;
  loss: string;
};

export type ApiSalesSummaryResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiSalesSummaryData[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

// Sales Summary Chart API
export type GetSalesSummaryChartSchema = BaseRequestSchema & {
  body: Partial<GetSalesSummaryChartPayloadSchema>;
};

export type GetSalesSummaryChartPayloadSchema = {
  store_ids: number[] | null; // Allow null for initial load
  period_type: 'quarterly' | 'monthly' | 'yearly';
  period_start: string;
  period_end: string;
};

export type ApiSalesSummaryChartStore = {
  id: number;
  name: string;
  netto: string;
};

export type ApiSalesSummaryChartData = {
  group_key: number;
  netto: string;
  stores: ApiSalesSummaryChartStore[];
};

export type ApiSalesSummaryChartResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiSalesSummaryChartData[];
};

export type ApiStoreDropdown = {
  id: number;
  name?: string;
};

/** Store */
export type GetStoresSchema = BaseRequestSchema & {
  body: Partial<GetStorePayloadSchema>;
};

export type GetStorePayloadSchema = {
  page?: number;
  per_page?: number;
  search?: string;
};

export type ApiStoreDropdownResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiStoreDropdown[];
};