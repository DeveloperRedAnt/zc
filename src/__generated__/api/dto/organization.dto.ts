// DTOs for organization domain
import { BaseRequestSchema , BaseResponseSchema, BaseResponseSchemaPagination} from "./base.dto";
import { StoreLinksSchema, StoreMetaSchema, StoreSchema } from "./store.dto";

export type GetOrganizationSchema = {
    'x-device-id': string;
    page?: number
  }
  
  export type GetOrganizationOfUserRequestSchema = {
    'x-device-id': string;
    'user-id': string;
    page?: number
  }

export type GetOrganizationOfUserResponseSchema = {
  id: number;
  name: string;
  phone: string;
  nib: string;
  npwp: string;
  address: string;
  email: string;
  image: string;
}

export type OrganizationSchema = {
  address: string;
  email: string;
  id: number;
  image: string;
  name: string;
  nib: string;
  npwp: string;
  phone: string;
}

export type CreateOrganizationRequestSchema = {
  address: string;
  email: string;
  image: string;
  name: string;
  nib: string;
  npwp: string;
  phone: string;
}

export type OrganizationIDSchema = {
}

export type GetOrganizationListResponseSchema = {
  data: OrganizationSchema[];
}

export type SelectOrganizationSchema = {
  id: number;
  name: string;
}


export type GetListOrganizationSchema = BaseRequestSchema & {
    body: Partial<SelectOrganizationSchema>;
  }
  
  
  
  export type EnterOrganizationResponseSchema = BaseResponseSchema<{ 
    id: number;
    updated: boolean; 
    updated_at: string; 
  }>

  export type ApiResponseOrganizationByEmployee = BaseResponseSchemaPagination<{ 
    data: StoreSchema[];
    links: StoreLinksSchema;
    meta: StoreMetaSchema;
  }>

  export type CreateOrganizationPayload = {
    name: string;
    phone: number;
    email: string;
    nib: string;
    npwp: string;
  };
  
  
  export type UpdateOrganizationPayload = {
   name: string;
    phone: number;
    email: string;
    nib: string;
    npwp: string;
  };
  

  export type CreateOrganizationResponse = {
    code: number;
    status: string;
    name: string;
    message: string;
    data: {
      id: number;
      name: string;
      phone: string;
      email: string;
      nib: string;
      npwp: string;
    };
};

// type for organization list 
export type GetDashboardOrganizationsParams = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  'x-device-id': string;
};

export type OrganizationResponse = {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  npwp?: string;
  nib?: string;
  siup?: string; // Add siup property as optional
};

  // Define the expected type for the API response
  export type DashboardOrganizationsResponse = {
    data: Array<OrganizationResponse>
    pagination?: {
      current_page?: number;
      last_page?: number;
      per_page?: number;
      total?: number;
    };
  };