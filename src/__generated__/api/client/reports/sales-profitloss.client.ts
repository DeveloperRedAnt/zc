import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto/reports/sales-profit.dto';

export const getSalesProfitLoss = async (params: DTO.SalesProfitDto): Promise<DTO.SalesProfitResponse> => {
  return getDataFromApi<Record<string, unknown>, DTO.SalesProfitResponse>({
    type: 'get',
    url: '/api/reports/profit-and-loss',
    params: { ...params },
    injectHeaders: [
      'x-organization-id',
      'x-device-id',
      'x-store-id'
    ],
    withPagination: true,
    transformer: (data: Record<string, unknown>) => data as unknown as DTO.SalesProfitResponse,
  });
};