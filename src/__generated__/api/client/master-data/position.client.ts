import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/master-data/position.dto';

type PositionListParams = {
  page?: number;
  per_page?: number;
};

export const getPositionList = async (
  params: PositionListParams
): Promise<DTO.PositionListResponse> => {
  return getDataFromApi<typeof params, DTO.PositionListResponse>({
    type: 'get',
    url: `/api/positions`,
    injectHeaders: ['x-organization-id'],
    params,
    withPagination: true,
    transformer: (data) => data as DTO.PositionListResponse,
  });
};

export const createPositionMasterData = async (
  payload: DTO.PositionPayload
): Promise<DTO.PositionResponse> => {
  return getDataFromApi<typeof payload, DTO.PositionResponse>({
    type: 'post',
    url: `/api/positions`,
    injectHeaders: ['x-organization-id', 'x-device-id', 'x-store-id'],
    params: payload,
    transformer: (data) => data as DTO.PositionResponse,
  });
};

export const updatePositionMasterData = async (
  params: { id: number } & DTO.PositionPayload
): Promise<DTO.PositionResponse> => {
  const { id, ...payload } = params;
  return getDataFromApi<typeof payload, DTO.PositionResponse>({
    type: 'put',
    url: `/api/positions/${id}`,
    injectHeaders: ['x-organization-id'],
    params: payload,
    transformer: (data) => data as DTO.PositionResponse,
  });
};
