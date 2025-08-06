import { FilterOption, VoidReport } from '../types/void-report.types';

export const mockVoidReportData: VoidReport[] = [
  {
    tglTransaksi: '21/01/2025',
    noNota: 'AA1992280',
    kasir: 'Judith Ruth Rodriguez',
    nominalPenjualan: 'Rp 2.968.829',
    tglVoid: '22/01/2025',
    penanggungjawab: 'Katie Keva Sims',
  },
  {
    tglTransaksi: '20/01/2025',
    noNota: 'AA1992280',
    kasir: 'Stephanie Rain Nicol',
    nominalPenjualan: 'Rp 2.861.970',
    tglVoid: '21/01/2025',
    penanggungjawab: 'John Ethan Dukes',
  },
  {
    tglTransaksi: '19/01/2025',
    noNota: 'AA1992280',
    kasir: 'Corina Juliet McCoy',
    nominalPenjualan: 'Rp 1.620.436',
    tglVoid: '20/01/2025',
    penanggungjawab: 'Paula Eve Mora',
  },
  {
    tglTransaksi: '18/01/2025',
    noNota: 'AA1992280',
    kasir: 'Iva Tenley Ryan',
    nominalPenjualan: 'Rp 1.978.956',
    tglVoid: '19/01/2025',
    penanggungjawab: 'Autumn Pearl Phillips',
  },
  {
    tglTransaksi: '17/01/2025',
    noNota: 'AA1992280',
    kasir: 'Kimberly Raven Mastrangelo',
    nominalPenjualan: 'Rp 1.951.687',
    tglVoid: '18/01/2025',
    penanggungjawab: 'Kathy Jane Pacheco',
  },
  {
    tglTransaksi: '16/01/2025',
    noNota: 'AA1992280',
    kasir: 'Paula Eve Mora',
    nominalPenjualan: 'Rp 1.726.313',
    tglVoid: '17/01/2025',
    penanggungjawab: 'Judith Ruth Rodriguez',
  },
  {
    tglTransaksi: '15/01/2025',
    noNota: 'AA1992280',
    kasir: 'Eddie Liam Lake',
    nominalPenjualan: 'Rp 2.449.505',
    tglVoid: '16/01/2025',
    penanggungjawab: 'Corina Juliet McCoy',
  },
];

export const responsiblePersonOptions: FilterOption[] = [
  { value: 'Katie Keva Sims', label: 'Katie Keva Sims' },
  { value: 'John Ethan Dukes', label: 'John Ethan Dukes' },
  { value: 'Paula Eve Mora', label: 'Paula Eve Mora' },
  { value: 'Autumn Pearl Phillips', label: 'Autumn Pearl Phillips' },
  { value: 'Kathy Jane Pacheco', label: 'Kathy Jane Pacheco' },
  { value: 'Judith Ruth Rodriguez', label: 'Judith Ruth Rodriguez' },
  { value: 'Corina Juliet McCoy', label: 'Corina Juliet McCoy' },
];

export const cashierOptions: FilterOption[] = [
  { value: 'Judith Ruth Rodriguez', label: 'Judith Ruth Rodriguez' },
  { value: 'Stephanie Rain Nicol', label: 'Stephanie Rain Nicol' },
  { value: 'Corina Juliet McCoy', label: 'Corina Juliet McCoy' },
  { value: 'Iva Tenley Ryan', label: 'Iva Tenley Ryan' },
  { value: 'Kimberly Raven Mastrangelo', label: 'Kimberly Raven Mastrangelo' },
  { value: 'Paula Eve Mora', label: 'Paula Eve Mora' },
  { value: 'Eddie Liam Lake', label: 'Eddie Liam Lake' },
];
