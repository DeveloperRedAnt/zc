import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/master-data/queue-counter.dto';

type QueueCounterListParams = {
  page?: number;
  per_page?: number;
};

export const getQueueCounterList = async (
  params: QueueCounterListParams
): Promise<DTO.QueueCounterListResponse> => {
  return getDataFromApi<typeof params, DTO.QueueCounterListResponse>({
    type: 'get',
    url: `/api/master-data/queue-counters`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.QueueCounterListResponse,
  });
};

export const createQueueCounterMasterData = async (
  payload: DTO.QueueCounterPayload
): Promise<DTO.QueueCounterListResponse> => {
  return getDataFromApi<typeof payload, DTO.QueueCounterListResponse>({
    type: 'post',
    url: `/api/master-data/queue-counters`,
    injectHeaders: ['x-organization-id', 'x-device-id', 'x-store-id'],
    params: payload,
    transformer: (data) => data as DTO.QueueCounterListResponse,
  });
};

export const updateQueueCounterMasterData = async (
  params: { id: number } & DTO.QueueCounterPayload
): Promise<DTO.QueueCounterListResponse> => {
  const { id, ...payload } = params;
  return getDataFromApi<typeof payload, DTO.QueueCounterListResponse>({
    type: 'put',
    url: `/api/master-data/queue-counters/${id}`,
    injectHeaders: ['x-organization-id'],
    params: payload,
    transformer: (data) => data as DTO.QueueCounterListResponse,
  });
};
