import { BaseRequestSchema } from '../base.dto';

export type GetPaymentMethodSchema = BaseRequestSchema & {
  body: Partial<GetPaymentPayloadSchema>;
};

export type GetPaymentPayloadSchema = {
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
};

export type PaymentMethodStore = {
  id: string;
  name: string;
  cash: 'active' | 'nonactive';
  debitorkredit: 'active' | 'nonactive';
  voucher: 'active' | 'nonactive';
  debt: 'active' | 'nonactive';
  qris: 'active' | 'nonactive';
  qrisImage?: string;
};

export type PaymentMethodApiResponse = {
  data: PaymentMethodStore[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

// API Response types for the actual API structure
export type ApiPaymentMethod = {
  id: number;
  name: string;
  status: boolean;
  image: string | null;
  image_url: string | null;
};

export type ApiStoreData = {
  id: number;
  organization_id: number;
  name: string;
  address: string;
  phone: string;
  type: string;
  category: string;
  created_at: string;
  updated_at: string;
  lat: number;
  long: number;
  email: string;
  payment_1: ApiPaymentMethod;
  payment_2: ApiPaymentMethod;
  payment_3: ApiPaymentMethod;
  payment_4: ApiPaymentMethod;
  payment_5: ApiPaymentMethod;
  payment_methods: ApiPaymentMethod[];
};

export type ApiResponsePaymentMethod = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiStoreData[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

// Update payment method request types
export type UpdatePaymentMethodPayload = {
  payments: Array<{
    id: number;
    active: boolean;
  }>;
  image?: File;
};

export type UpdatePaymentMethodResponse = {
  code: number;
  status: string;
  message: string;
  data?: any;
};