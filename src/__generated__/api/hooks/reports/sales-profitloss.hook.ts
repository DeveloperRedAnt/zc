import { getSalesProfitLoss } from '@/__generated__/api/client/reports/sales-profitloss.client';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import * as DTO from '../../dto/reports/sales-profit.dto';


export function useProfitLoss(
  params: DTO.SalesProfitDto,
  options?: UseQueryOptions<DTO.SalesProfitResponse>
) {
  return useQuery<DTO.SalesProfitResponse, Error>({
    queryKey: ['profit-loss', params],
    queryFn: () => getSalesProfitLoss(params),
    ...options,
  });
}