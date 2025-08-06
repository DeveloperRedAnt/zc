export interface VoidReport {
  id?: string; // Optional for backward compatibility with mock data
  tglTransaksi: string;
  noNota: string;
  kasir: string;
  nominalPenjualan: string;
  tglVoid: string;
  penanggungjawab: string;
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
