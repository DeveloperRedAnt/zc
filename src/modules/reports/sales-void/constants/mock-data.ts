import { FilterOption, VoidReport } from '../types/void-report.types';

export const mockVoidReportData: VoidReport[] = [
  {
    start_date: '2025-01-21',
    end_date: '2025-01-22',
    nota_number: 'AA1992280',
    cashier_name: 'Judith Ruth Rodriguez',
    void_by: 'Katie Keva Sims',
    sort_dir: 'asc',
    page: 0,
    per_page: 10,
    sort_by: 'transaction_date',
  },
  {
    start_date: '2025-01-20',
    end_date: '2025-01-21',
    nota_number: 'AA1992280',
    cashier_name: 'Stephanie Rain Nicol',
    void_by: 'John Ethan Dukes',
    sort_dir: 'asc',
    page: 0,
    per_page: 10,
    sort_by: 'transaction_date',
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
