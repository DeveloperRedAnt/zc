import { Position } from '@/modules/master-data/types/position';

export type PositionListResponse = {
  data: Position[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type PositionPayload = {
  name: string;
};

export type PositionResponse = {
  id: number;
  name: string;
};