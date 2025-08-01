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
  created_at: string;
  phone: string;
  is_active: boolean;
  purchases_summary: {
    montly: number;
    yearly: number;
    all_time: number;
  };
} 