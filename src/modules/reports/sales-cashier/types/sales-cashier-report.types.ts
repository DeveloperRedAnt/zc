export interface VoidReport {
  period: string;
  cashier_name: string;
  total_transactions: number;
  omzet: string;
  total_shift: number;
  avg_transactions_per_shift: number;
  canceled_transactions: number;
  return_transactions: number;
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
