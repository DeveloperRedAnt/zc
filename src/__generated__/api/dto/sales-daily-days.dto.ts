// Full response interface for sales daily days API
// Wrapper sesuai response API
export interface SalesDailyDaysApiResponse {
  data: SalesDailyDaysResponse;
}

// Response data di dalam 'data' property
export interface SalesDailyDaysResponse {
  current_page: number;
  data: SalesDailyDaysItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: SalesDailyTableLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SalesDailyDaysData {
  data: SalesDailyDaysItem[]; // Array data
  last_page: number;          // Total halaman
  current_page: number;       // Halaman saat ini
  per_page: number;           // Jumlah data per halaman
}


/**
 * Satu item data laporan harian kasir
 * Tidak punya property 'data', hanya field transaksi
 */
export interface SalesDailyDaysItem {
  period: string;
  cashier_name: string;
  total_transactions: number;
  omzet: number;
  total_shift: number;
  avg_transactions_per_shift: number;
  canceled_transactions: number;
  return_transactions: number;
}

export interface SalesDailyDaysRequest {
    start_date: string | null;
    end_date: string | null;
    store_id: string | null;
    sort_by: string;
    sort_dir: string;
    per_page: number;
    page: number;
}


export interface SalesDailyGraphItem {
  date: string;
  transaction_growth: number;
  revenue_growth: number;
}

export interface SalesDailyTableItem {
  transaction_date: string;
  total_transactions: number;
  total_revenue: number;
  trans_growth: number | null;
  trans_growth_percent: string | null;
  rev_growth: number | null;
  rev_growth_percent: number | string | null;
}

export interface SalesDailyTableLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface SalesDailyTable {
  current_page: number;
  data: SalesDailyTableItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: SalesDailyTableLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SalesDailyData {
  graph: SalesDailyGraphItem[];
  table: SalesDailyTable;
}

export interface SalesDailyResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: SalesDailyData;
}

// sales cashier

export interface SalesDailyDaysFilter {
  start_date: string | null;
  end_date: string | null;
  cashier_id: number | null;
  per_page: number;
}