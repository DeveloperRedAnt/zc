export type SalesDailyTableItem = SalesDailyReport;
export interface SalesDailyReport {
  transaction_date: string;
  total_transactions: number;
  total_revenue: number;
  trans_growth: number;
  trans_growth_percent: string;
  rev_growth: number;
  rev_growth_percent: number;
}
