import { z } from 'zod';

export const firstStockSchema = z.object({
  firstStock: z.number().min(1, 'Stok harus diisi dan lebih dari 0'),
  buyPrice: z.number().min(1, 'Harga beli harus diisi dan lebih dari 0'),
  expiredDate: z.date({ required_error: 'Tanggal kadaluwarsa wajib diisi' }),
  purchaseDate: z.date({ required_error: 'Tanggal pembelian wajib diisi' }),
});

export type FirstStockForm = z.infer<typeof firstStockSchema>;
