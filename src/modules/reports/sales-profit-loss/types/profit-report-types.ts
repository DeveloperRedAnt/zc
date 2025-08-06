// Legacy types for backward compatibility
export type SalesProfitLoss = {
  periode: string;
  nama_barang: string;
  sisa: string;
  pembelian: string;
  hpp: string;
  biaya_tambahan: string;
  pajak: string;
  nama_produk: string;
  jumlah_terjual: string;
  nominal_penjualan: string;
  laba: string;
  persentase_penjualan: string;
};

// New types matching the API and table design
export type ProfitLossReportItem = {
  id: string;
  tanggal: string;
  hpp: string;
  pendapatanPenjualan: string;
  labaRugiKotor: string;
  persentaseMarginLabaKotor: string;
};

export type ProfitLossReportResponse = {
  data: ProfitLossReportItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
};

export type TableDataItem = {
  id: string;
  date: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  profit: string;
};

export type SalesProfitLossTableProps = {
  data: TableDataItem[];
  className?: string;
};
