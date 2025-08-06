import { z } from 'zod';

// Request schemas
export const VoidReportRequestSchema = z.object({
  search: z.string().optional(),
  responsiblePerson: z.string().optional(),
  cashier: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.number().int().min(0).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});

export const CreateTaxRequestSchema = z.object({
  // Add tax creation fields as needed
  name: z.string(),
  rate: z.number(),
});

// Response schemas
export const VoidReportItemSchema = z.object({
  id: z.string(),
  tglTransaksi: z.string(),
  noNota: z.string(),
  kasir: z.string(),
  nominalPenjualan: z.string(),
  tglVoid: z.string(),
  penanggungjawab: z.string(),
});

export const VoidReportResponseSchema = z.object({
  data: z.array(VoidReportItemSchema),
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Profit Loss Report schemas
export const ProfitLossReportRequestSchema = z.object({
  search: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.number().int().min(0).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});

export const ProfitLossReportItemSchema = z.object({
  id: z.string(),
  tanggal: z.string(),
  hpp: z.string(),
  pendapatanPenjualan: z.string(),
  labaRugiKotor: z.string(),
  persentaseMarginLabaKotor: z.string(),
});

export const ProfitLossReportResponseSchema = z.object({
  data: z.array(ProfitLossReportItemSchema),
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Type exports
export type VoidReportRequest = z.infer<typeof VoidReportRequestSchema>;
export type CreateTaxRequest = z.infer<typeof CreateTaxRequestSchema>;
export type VoidReportItem = z.infer<typeof VoidReportItemSchema>;
export type VoidReportResponse = z.infer<typeof VoidReportResponseSchema>;
export type ProfitLossReportRequest = z.infer<typeof ProfitLossReportRequestSchema>;
export type ProfitLossReportItem = z.infer<typeof ProfitLossReportItemSchema>;
export type ProfitLossReportResponse = z.infer<typeof ProfitLossReportResponseSchema>;