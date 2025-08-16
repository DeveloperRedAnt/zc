import { getDataFromApi } from '../../../utils/url';
import { CompositeStockRequest, ResponseInitStockFirstComposiste } from '../dto/inti-first-stock/composite.dto';
import { ProductDetail, ProductVariantDetailResponse, StoreVariantRequest, StoreVariantResponse } from '../dto/set-variant-stock.dto';
import { StoreRequestParams, StoreResponse, SupplierRequestParams, SupplierResponse } from '../dto/supplier.dto';


export const getSupplier = async (params: SupplierRequestParams): Promise<SupplierResponse> =>
    getDataFromApi<SupplierRequestParams, SupplierResponse>({
        type: 'get',
        url: '/api/suppliers',
        injectHeaders: ['x-organization-id'],
        params,
        withPagination: true,
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
        withPagination: true,
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

export const getProductDetail = async ( params: { id: number }): Promise<ProductDetail> =>
  getDataFromApi<{ store_id: number }, ProductDetail>({
    type: 'get',
    url: `/api/dashboard/products/${params.id}`,
    injectHeaders: [
      'x-organization-id',
      'x-device-id',
      'x-store-id',
    ],
    transformer: (data: Record<string, unknown>) => data as unknown as ProductDetail
});

export const postCompositeStock = async ({ body, store_id }: { body: CompositeStockRequest; store_id: number }): Promise<ResponseInitStockFirstComposiste> =>
  getDataFromApi<CompositeStockRequest, ResponseInitStockFirstComposiste>({
    type: 'post',
    url: `/api/stocks/batches?store_id=${store_id}`,
    injectHeaders: [
      'x-organization-id',
      'x-device-id',
      'x-store-id',
    ],
    body,
    transformer: (response: Record<string, unknown>) => response as unknown as ResponseInitStockFirstComposiste
  });

export const getProductVariantDetail = async ( params: { id: number }): Promise<ProductVariantDetailResponse> =>
  getDataFromApi<{ store_id: number }, ProductVariantDetailResponse>({
    type: 'get',
    url: `/api/product-variant/${params.id}`,
    injectHeaders: [
      'x-organization-id',
      'x-device-id',
      'x-store-id',
    ],
    transformer: (data: Record<string, unknown>) => data as unknown as ProductVariantDetailResponse
});