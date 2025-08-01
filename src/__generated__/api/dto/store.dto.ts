// DTOs for store domain
import { BaseResponseSchema } from "./base.dto";
export type StoreIDSchema = {
}

export type CreateStoreRequestSchema = {
  name: string;
  address: string;
  phone: number;
  type: string;
  category: string;
  lat: number;
  long: number;
}


export type QueueCounterSchema = {
  counter: number;
  counter_start: number;
  created_at: string;
  deleted_at: string;
  id: number;
  next_reset_at: string;
  padding: number;
  prefix: string;
  rotation: number;
  store_id: number;
  updated_at: string;
}

export type CreateQueueCounterRequestSchema = {
  counter: number;
  counter_start: number;
  next_reset_at: string;
  padding: number;
  prefix: string;
  rotation: number;
}

export type SupplierSchema = {
  id: number;
  name: string;
  phone: string;
  pic: string;
}

export type SupplierRequestSchema = {
  name: string;
  phone: string;
  pic: string;
}


// Store paginated response DTOs
export type StoreSchema = {
  id: number;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  phone: string;
  email: string | null;
  image: string | null;
};

export type StoreLinksSchema = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type StoreMetaLinkSchema = {
  url: string | null;
  label: string;
  active: boolean;
};

export type StoreMetaSchema = {
  current_page: number;
  from: number;
  last_page: number;
  links: StoreMetaLinkSchema[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type StoreSchemaArray = Array<StoreSchema>;
export type StorePaginatedResponseSchema = BaseResponseSchema<StoreSchemaArray> & {
  links: StoreLinksSchema;
  meta: StoreMetaSchema;
};


export type StorePositionSchema = {
  id: number;
  name: string;
};


// Create Organization Payload DTO


export interface StoreListResponse {
  data: StoreItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface StoreItem {
  id: number;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  phone: string;
  email: string | null;
  image: string | null;
}