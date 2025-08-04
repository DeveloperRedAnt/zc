// DTOs for user domain
import { BaseRequestSchema } from "./base.dto";

export type GetMemberSchema = BaseRequestSchema & {
  body: Partial<GetMemberPayloadSchema>;
}

export type GetMemberPayloadSchema = {
  id: string;
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
}

export type MemberListResponse = {
  id: number;
  name: string;
  birth_date: string;
  created_at: string;
  phone: string;
  identity_number: string;
  address: string;
  is_active: boolean;
  purchases_summary: {
    montly: number;
    yearly: number;
    all_time: number;
  };
} 

// Create Member DTOs
export type CreateMemberSchema = BaseRequestSchema & {
  body: CreateMemberPayloadSchema;
}

export type CreateMemberPayloadSchema = {
  name: string;
  birth_date: string;
  phone: string;
  identity_number: string;
  address: string;
}

export type CreateMemberResponse = {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    birth_date: string;
    phone: string;
    identity_number: string;
    address: string;
  };
}

// Edit Member DTOs
export type EditMemberSchema = BaseRequestSchema & {
  body: EditMemberPayloadSchema;
  id: string;
}

export type EditMemberPayloadSchema = {
  name: string;
  birth_date: string;
  phone: string;
  identity_number: string;
  address: string;
}

export type EditMemberResponse = {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    birth_date: string;
    phone: string;
    identity_number: string;
    address: string;
    is_active: boolean;
  };
}