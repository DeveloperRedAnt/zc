import { getDataFromApi } from '../../../utils/url';
import { ProductDetailResponse, StoreVariantRequest, StoreVariantResponse } from '../dto/set-variant-stock.dto';
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
export const postStoreVariant = async (data: StoreVariantRequest): Promise<StoreVariantResponse> =>
getDataFromApi<StoreVariantRequest, StoreVariantResponse>({
    type: 'post',
    url: '/api/stocks/batches',
    injectHeaders: [
        'x-organization-id',
        'x-device-id',
        'x-store-id',
    ],
    body: data,
    transformer: (response: Record<string, unknown>) => response as unknown as StoreVariantResponse
});

export const getProductDetail = async (params: { id: number; store_id: number }): Promise<ProductDetailResponse> =>
getDataFromApi<{ store_id: number }, ProductDetailResponse>({
    type: 'get',
    url: `/api/dashboard/products/${params.id}`,
    injectHeaders: [
        'x-organization-id',
        'x-device-id',
        'x-store-id',
    ],
    params, 
    transformer: (data: Record<string, unknown>) => data as unknown as ProductDetailResponse
});