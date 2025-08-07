import { z } from 'zod';

export const queueCounterFormSchema = z.object({
  prefix: z
    .string()
    .min(1, 'Prefix tidak boleh kosong')
    .min(2, 'Prefix minimal 2 karakter')
    .max(10, 'Prefix maksimal 10 karakter')
    .regex(/^[A-Z]+$/, 'Prefix hanya boleh berisi huruf kapital')
    .trim(),
  counter_start: z
    .number({
      required_error: 'No. Urut Awal tidak boleh kosong',
      invalid_type_error: 'No. Urut Awal harus berupa angka',
    })
    .min(1, 'No. Urut Awal minimal 1')
    .max(999999, 'No. Urut Awal maksimal 999999')
    .int('No. Urut Awal harus berupa bilangan bulat'),
  rotation: z
    .number({
      required_error: 'Reset Rotasi harus dipilih',
      invalid_type_error: 'Reset Rotasi tidak valid',
    })
    .refine((val) => val !== null, 'Reset Rotasi harus dipilih'),
});

export type QueueCounterFormData = z.infer<typeof queueCounterFormSchema>;
export type QueueCounterData = z.infer<typeof queueCounterFormSchema>;

// Extended schema untuk update/create dengan store_id
export const queueCounterWithStoreSchema = queueCounterFormSchema.extend({
  store_id: z.union([z.string(), z.number()]),
  store: z.string().min(1, 'Nama toko tidak boleh kosong'),
});

export type QueueCounterWithStoreData = z.infer<typeof queueCounterWithStoreSchema>;
