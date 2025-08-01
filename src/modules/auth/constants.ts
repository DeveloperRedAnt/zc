import type { OptionType } from '@/components/dropdown/dropdown';
import { z } from 'zod';

export const optionsSupplier: OptionType[] = [
  { label: 'CV. Damri Sejahtera', value: 1 },
  { label: 'PT. Nasmoco Indonesia Terjaya', value: 5 },
  { label: 'Toko Semar Jaya Malibu', value: 7 },
  { label: 'Sheeran Company Limited', value: 10 },
];

export const organizationSchema = z.object({
  name: z.string().min(1, 'Nama Organisasi wajib diisi'),
  phone: z.number().refine((val) => val.toString().length >= 10 && val.toString().length <= 15, {
    message: 'Nomor telepon harus 10-15 digit',
  }),
  nib: z.string().min(1, 'NIB wajib diisi'),
  npwp: z.string().min(1, 'NPWP wajib diisi'),
  address: z.string().optional().default(''),
  email: z.string().email('Format email tidak valid'),
  image: z.string().optional().default(''),
});
