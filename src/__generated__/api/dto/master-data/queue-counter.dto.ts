import { QueueCounter } from '@/modules/master-data/types/queue-counter';

export type QueueCounterListResponse = {
  data: QueueCounter[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type QueueCounterPayload = {
  store_id: number;
  prefix: string;
  counter_start: number;
  rotation: number;
};

