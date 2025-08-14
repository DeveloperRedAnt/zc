import { BaseRequestSchema } from '../base.dto';

export type AddOnConfirmationSchema = BaseRequestSchema & {
  body: Partial<GetAddOnConfirmationPayloadSchema>;
};

export type GetAddOnConfirmationPayloadSchema = {
  // Add any query parameters if needed
};

// API Response types for add-on confirmation
export type ApiActivePackage = {
  id: number;
  name: string;
  badge_link: string;
  strip_link: string;
};

export type ApiAddOnForAddonMode = {
  id: number;
  name: string;
  price: number;
  description: string;
  minimum_package_badge_link: string | null;
  is_quantity_editable: 0 | 1;
  availability_in_package: boolean;
};

export type ApiAddOnConfirmationResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
//   data: {
    active_package: ApiActivePackage;
    available_add_ons: ApiAddOnForAddonMode[];
//   };
};