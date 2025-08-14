// Sales Product DTO Types
import { PaginationLink } from "../base.dto";

export interface SalesProductApiParams {
  product_id?: string;
  store_id?: string;
  start_date: string;
  end_date: string;
  sort_column?: string;
  sort_direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

export interface GraphDataProduct {
  name: string;
  sold: number;
  revenue: number;
  hpp: number;
  profit: number;
  percentage: number;
  fill: string;
}

export interface TableDataProduct {
  product_name: string;
  total_sales: string;
  total_transaction: number;
  hpp: number;
  profit: number;
  sales_transaction: string;
}



export interface TableResponse {
  current_page: number;
  data: TableDataProduct[];
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

export interface SalesProductData {
  graph: GraphDataProduct[];
  table: TableResponse;
}

export interface SalesProductResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: SalesProductData;
}