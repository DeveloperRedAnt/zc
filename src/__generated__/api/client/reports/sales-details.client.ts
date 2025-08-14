import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';

export const listDetailTransaction = async (params: DTO.GetDetailTransactionPayloadSchema): Promise<DTO.ApiDetailTransactionResponse> =>
  getDataFromApi<typeof params, DTO.ApiDetailTransactionResponse, DTO.GetDetailTransactionPayloadSchema>({
    type: 'get',
    url: '/api/reports/detail-transaction',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiDetailTransactionResponse
  });

export const listCashiers = async (params?: DTO.GetCashiersPayloadSchema): Promise<DTO.ApiCashiersResponse> =>
  getDataFromApi<DTO.GetCashiersPayloadSchema, DTO.ApiCashiersResponse, DTO.GetCashiersPayloadSchema>({
    type: 'get',
    url: '/api/master-data/cashier',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params: params || {},
    transformer: (data: Record<string, unknown>) => data as DTO.ApiCashiersResponse
  });

export const listProductsDetails = async (params?: DTO.GetProductsPayloadSchema): Promise<DTO.ApiProductsResponse> =>
  getDataFromApi<DTO.GetProductsPayloadSchema, DTO.ApiProductsResponse, DTO.GetProductsPayloadSchema>({
    type: 'get',
    url: '/api/master-data/products',
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.ApiProductsResponse
  });