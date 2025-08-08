import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';
import { ValidationError, apiClientWithHeaders } from '../base.client';

export const listQueueTickets = async (params: DTO.GetQueueTicketsPayloadSchema): Promise<DTO.ApiQueueTicketsResponse> =>
  getDataFromApi<typeof params, DTO.ApiQueueTicketsResponse, DTO.GetQueueTicketsPayloadSchema>({
    type: 'get',
    url: '/api/master-data/queue-tickets',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiQueueTicketsResponse
  });

export const updateQueueTicket = async (
  storeId: string,
  payload: DTO.UpdateQueueTicketPayload
): Promise<DTO.UpdateQueueTicketResponse> => {
  try {
    const response = await apiClientWithHeaders.put(
      `/api/master-data/queue-tickets/${storeId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data as DTO.UpdateQueueTicketResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};