// checkout.dto.ts - Fixed version
import { BaseRequestSchema } from '../base.dto';

export type CheckoutSchema = BaseRequestSchema & {
  body: CheckoutPayloadSchema;
};

// Add-on item structure
export type AddOnItem = {
  add_on_id: number;
  quantity: number;
  amount: string; // decimal string with .0
};

// Flexible add-ons type - can be array or object
export type AddOnsPayload = AddOnItem[] | Record<string, AddOnItem> | Record<string, any>;

export type CheckoutPayloadSchema = {
  package?: {
    package_id: number;
    amount: string; // decimal string with .0
  } | null;
  add_ons?: AddOnsPayload;
};

export type ApiCheckoutResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data?: any; // Add specific response data structure if available
};