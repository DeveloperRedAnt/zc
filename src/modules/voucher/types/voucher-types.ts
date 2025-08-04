export type Voucher = {
  id: number;
  name: string;
  type: 'nominal' | 'percent';
  amount: number;
  start_at: string;
  end_at: string;
  code: string;
  is_active: boolean;
  store: {
    id: number;
    name: string;
  };
};

export type VoucherFormData = {
  name: string;
  amount: number;
  period: string;
  type: string;
  code: string;
  store: number;
};

export const defaultVoucherData: VoucherFormData = {
  name: '',
  type: '',
  amount: 0,
  period: '',
  code: '',
  store: 0,
};

export type Range = {
  from: Date;
  to?: Date;
};
