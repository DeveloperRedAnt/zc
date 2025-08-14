// Sales Variant DTO Types
import { PaginationLink } from "../base.dto";

export interface SalesVariantApiParams {
  product_id?: string;
  product_variant_id?: string;
  store_id?: string;
  start_date: string;
  end_date: string;
  sort_by?: string;
  sort_dir?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

export interface GraphData {
  product_name: string;
  variant_name: string;
  sold: string;
  percentage: string;
}

export interface TableData {
  product_name: string;
  variant_name: string;
  total_sold: string;
  total_sales: number;
  hpp: number;
  profit: number;
  percentage: string;
}

export interface VariantTableResponse {
  current_page: number;
  data: TableData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SalesVariantData {
  graph: GraphData[];
  table: VariantTableResponse;
}

export interface SalesVariantResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: SalesVariantData;
}

export type VariantReportProductListResponse = {
  data: {
    id: number,
    product_name: string,
    product_brand: string,
    product_id: number,
    variant_name: string
  };
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};