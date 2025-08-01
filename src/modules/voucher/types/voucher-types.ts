export type Voucher = {
  id: string;
  name: string;
  type: string;
  quantity: string;
  period: string;
  voucher_code: string;
  status: string;
};

export type VoucherFormData = {
  name: string;
  type: string;
  quantity: string;
  period: string;
  voucher_code: string;
  status: string;
};

export const defaultVoucherData: VoucherFormData = {
  name: '',
  type: '',
  quantity: '',
  period: '',
  voucher_code: '',
  status: '',
};

export type Range = {
  from: Date;
  to?: Date;
};
