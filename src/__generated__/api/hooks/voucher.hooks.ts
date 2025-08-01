import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getVoucher } from '../client/voucher.client';
import * as DTO from '../dto';

export function useGetVoucher({
    params,
    body,
    options
  }: {
    params: DTO.BaseRequestSchema;
    body: DTO.GetVoucherListRequest;
    options?: UseQueryOptions<DTO.GetVoucherListRequest, Error, DTO.GetVoucherListResponse>;
  }) {
    return useQuery({
      queryKey: ['getVoucher', params, body],
      queryFn: () => getVoucher(params, body),
      ...options,
    });
  }