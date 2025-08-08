import { BaseRequestSchema } from '../base.dto';

export type GetQueueTicketsSchema = BaseRequestSchema & {
  body: Partial<GetQueueTicketsPayloadSchema>;
};

export type GetQueueTicketsPayloadSchema = {
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
};

// Frontend component data structure
export type QueueTicketStore = {
  id: string;
  name: string;
  is_printed: boolean;
};

// API Response types for the actual API structure
export type ApiQueueTicketData = {
  store_id: number;
  is_printed: boolean;
};

export type ApiQueueTicketsResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiQueueTicketData[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

// Update queue ticket request types
export type UpdateQueueTicketPayload = {
  is_printed: boolean;
};

export type UpdateQueueTicketResponse = {
  code: number;
  status: string;
  message: string;
  data?: unknown;
};