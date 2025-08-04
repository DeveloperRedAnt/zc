export type Member = {
  id: number;
  name: string;
  created_at: string;
  birth_date: string;
  phone: string;
  identity_number: string;
  address: string;
  is_active: boolean;
  purchases_summary: {
    montly: number;
    yearly: number;
    all_time: number;
  };
  montly?: number; // Made optional since it seems redundant with purchases_summary
  yearly?: number; // Made optional since it seems redundant with purchases_summary
  all_time?: number; // Made optional since it seems redundant with purchases_summary
  monthly_formatted: string;
  yearly_formatted: string;
  all_time_formatted: string;
  registered_formatted: string;
};
