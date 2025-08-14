import { z } from 'zod';

export const formValuesSchema = z.object({
  batch_stock: z.string().min(1, 'Jumlah batch wajib diisi'),
  other_cost: z.string().optional(),
  store_id: z.string().min(1, 'Toko wajib dipilih'),
  expired_date: z.date({ required_error: 'Tanggal kedaluwarsa wajib diisi' }),
  stock_date: z.date().optional(),
});

export type FormValues = z.infer<typeof formValuesSchema>;
