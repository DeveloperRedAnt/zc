import { getDataFromApi } from '../../../utils/url';
import { StoreRequestParams, StoreResponse, SupplierRequestParams, SupplierResponse } from '../dto/supplier.dto';

export const getSupplier = async (params: SupplierRequestParams): Promise<SupplierResponse> =>
    getDataFromApi<SupplierRequestParams, SupplierResponse>({
        type: 'get',
        url: '/api/suppliers',
        injectHeaders: ['x-organization-id'],
        params,
        transformer: (data: Record<string, unknown>) => data as unknown as SupplierResponse
    });

export const getStore = async (params: StoreRequestParams): Promise<StoreResponse> =>
    getDataFromApi<StoreRequestParams, StoreResponse>({
        type: 'get',
        url: '/api/stores',
        injectHeaders: [
            'x-organization-id',
            'x-device-id',
        ],
        params,
        transformer: (data: Record<string, unknown>) => data as unknown as StoreResponse
    });