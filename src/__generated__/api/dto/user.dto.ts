// DTOs for user domain
import { BaseRequestSchema, BaseResponseSchema } from "./base.dto";
import { StorePositionSchema } from "./store.dto";

export type TokenRequestSchema = {
  password: string;
  phone: string;
}

export type TokenResponseSchema = {
  token: string;
}

export type GetEmployeeSchema = BaseRequestSchema & {
  body: Partial<GetEmployeePayloadSchema>;
}

export type GetEmployeeDetailSchema = BaseRequestSchema & {
  id: number;
}

export type GetEmployeePayloadSchema = {
  id: string;
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
}

export type EmployeeSchema = {
  id: string;
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
}

export type EmployeeListResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  image: string;
  store_count: string;
};

export type ResetEmployeePasswordRequestSchema = BaseRequestSchema & {
  body: {
    id_employee: number;
    password: string;
    password_confirmation: string;
  }
}
export type ResetEmployeePinRequestSchema = BaseRequestSchema & {
  body: {
    id_employee: number;
  }
}

export type ResetEmployeePasswordResponseSchema = BaseResponseSchema<{ 
  id: number;
  updated: boolean; 
  updated_at: string; 
}>

export type ResetEmployeePinResponseSchema = BaseResponseSchema<{ 
  id: number;
  updated: boolean; 
  updated_at: string; 
}>


export type CreateEmployeePayload = {
    name: string;
    phone: string;
    id_number?: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_active: boolean;
    image?: File | null;
  };
  
  export type CreateEmployeeResponse = {
    id: number;
    name: string;
    email: string;
    phone: string;
    id_number: string;
    image: string;
    is_active: boolean;
  };
  
  export type CompanySchema = {
    id: number;
    name: string;
    phone: string;
    nib: string | null;
    npwp: string | null;
    address: string;
    email: string;
    image: string | null;
  };
  
  type CompanySchemaArray = Array<CompanySchema>;
  export type CompanyResponseSchema = BaseResponseSchema<CompanySchemaArray>;

  // Employee detail response DTOs
export type PermissionSchema = {
    id: number;
    name: string;
    key: string;
  };
  
  export type PermissionGroupSchema = {
    id: number;
    name: string;
    permissions: PermissionSchema[];
  };


  export type EmployeeStoreSchema = {
    id: number;
    name: string;
    position: StorePositionSchema | null;
    permission_groups: PermissionGroupSchema[];
  };
  
  export type EmployeeDetailDataSchema = {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string | null;
    id_number: string;
    image: string | null;
    is_active: boolean;
    stores: EmployeeStoreSchema[];
  };
  
  export type EmployeeDetailResponseSchema = BaseResponseSchema<EmployeeDetailDataSchema>;

  export type GetListPositionResponse = {
    id: number;
    name: string;
  };

  export type GetListPositionPayloadSchema = {
    search?: string;
    per_page?: number;
    page?: number;
  };
  