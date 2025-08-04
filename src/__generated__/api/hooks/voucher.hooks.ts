import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { createVoucher, getVoucher, updateVoucher } from '../client/voucher.client';
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

export function useCreateVoucher(
  options?: UseMutationOptions<
    DTO.VoucherItem,
    Error,
    {
      'x-device-id': string;
      'x-organization-id': string;
      'x-store-id': string;
      body: DTO.createVoucherRequest;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => createVoucher(params),
    ...options,
  });
}

export function useUpdateVoucher(
  options?: UseMutationOptions<
    DTO.VoucherItem,
    Error,
    {
      id: number;
      'x-organization-id': string;
      'x-store-id': string;
      'x-device-id': string;
      body: DTO.createVoucherRequest;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => updateVoucher(params),
    ...options,
  });
}