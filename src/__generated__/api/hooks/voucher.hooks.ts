import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { createVoucher, getVoucher, updateVoucher } from '../client/voucher.client';
import * as DTO from '../dto';

export function useGetVoucher({
  body,
  options
}: {
  body: DTO.GetVoucherListRequest;
  options?: UseQueryOptions<DTO.GetVoucherListRequest, Error, DTO.GetVoucherListResponse>;
}) {
  return useQuery({
    queryKey: ['getVoucher', body],
    queryFn: () => getVoucher(body),
    ...options,
  });
}

export function useCreateVoucher(
  options?: UseMutationOptions<
    DTO.VoucherItem,
    Error,
    {
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
      body: DTO.createVoucherRequest;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => updateVoucher(params),
    ...options,
  });
}