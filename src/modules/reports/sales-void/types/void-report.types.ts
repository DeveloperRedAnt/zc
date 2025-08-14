export interface VoidReport {
  start_date: string;
  end_date: string;
  nota_number: string;
  cashier_name: string;
  void_by: string;
  sort_dir: 'asc' | 'desc';
  page: number;
  per_page: number;
  sort_by: string;
}

export interface VoidReportFilters {
  globalFilter: string;
  responsiblePerson: string;
  cashier: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
