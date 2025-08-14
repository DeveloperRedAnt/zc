export interface SalesProfitDto {
  grouping: string;
  start_date: string | Date;
  end_date: string | Date;
  page: number;
  sort_by: string,
  sort_dir: string,
  per_page: number;
}

// Response Root
export interface SalesProfitResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: SalesProfitData;
}

export interface SalesProfitData {
  graph: SalesProfitGraph;
  table: SalesProfitTable;
}

export interface SalesProfitGraph {
  total_hpp: number;
  total_revenue: number;
  gross_profit: number;
  gross_margin_percent: number;
}

export interface SalesProfitTable {
  current_page: number;
  data: SalesProfitRow[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: SalesProfitLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SalesProfitRow {
  period: string;
  period_start: string;
  period_end: string;
  hpp: number;
  total_revenue: number;
  gross_profit: number;
  gross_margin_percent: number;
}

export interface SalesProfitLink {
  url: string | null;
  label: string;
  active: boolean;
}
