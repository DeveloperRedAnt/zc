import { BaseRequestSchema } from '../base.dto';

export type SubscriptionSchema = BaseRequestSchema & {
  body: Partial<GetSubscriptionPayloadSchema>;
};

export type GetSubscriptionPayloadSchema = {
  // Add any query parameters if needed
};

// API Response types based on the actual API structure
export type ApiPackage = {
  id: string;
  name: string;
  price: number;
  badge_link: string;
  is_active: boolean;
};

export type ApiAvailabilityInPackage = {
  id: number;
  name: string;
  is_available: boolean;
};

export type ApiAddOn = {
  id: number;
  name: string;
  price: number;
  description: string;
  minimum_package_badge_link: string | null;
  is_quantity_editable: 0 | 1;
  availability_in_package: ApiAvailabilityInPackage[];
};

export type ApiSubscriptionResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  // data:{
    packages: ApiPackage[];
    available_add_ons: ApiAddOn[];
  // }
};