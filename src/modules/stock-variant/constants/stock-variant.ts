import { ProductDetailResponse, Store } from '@/modules/stock-variant/types/stock-variant.types';

export const PRODUCT_DETAIL: ProductDetailResponse = {
  status: 'success',
  message: 'Product detail retrieved successfully',
  data: {
    id: 1,
    name: null,
    type: 'Single',
    thumbnail: '',
    is_active: true,
    is_favorite: false,
    is_non_tax: false,
    content: null,
    current_stock: '0 ',
    tags: [],
    stock_tracking: {
      is_enabled: true,
      minimum_stock: '0 Produk',
    },
    expired_reminder: {
      is_enabled: false,
      countdown: '0 Hari',
    },
    variants: [
      {
        id: 1,
        thumbnail: '',
        sku_code: 'HM-POLO',
        barcode: '1234567890123',
        is_active: true,
        stock: '588.416 ',
        store_name: null,
        expiration: {
          expired_at: '-',
        },
        attributes: [
          { attribute: 'Warna', value: 'Merah' },
          { attribute: 'Size', value: 'S' },
        ],
        is_wholesale: false,
        variant_units: [
          { unit_name: 'Eceran', conversion_value: '1', price: 'Rp 150.000' },
          { unit_name: 'Lusin', conversion_value: '12', price: 'Rp 14.000' },
          { unit_name: 'Kodi', conversion_value: '20', price: 'Rp 7.500' },
        ],
      },
      {
        id: 2,
        thumbnail: '',
        sku_code: 'HM-POLO-2',
        barcode: '1234567890124',
        is_active: true,
        stock: '300.000 ',
        store_name: null,
        expiration: {
          expired_at: '-',
        },
        attributes: [
          { attribute: 'Warna', value: 'Biru' },
          { attribute: 'Size', value: 'M' },
        ],
        is_wholesale: false,
        variant_units: [
          { unit_name: 'Eceran', conversion_value: '1', price: 'Rp 175.000' },
          { unit_name: 'Lusin', conversion_value: '12', price: 'Rp 15.000' },
          { unit_name: 'Kodi', conversion_value: '20', price: 'Rp 8.500' },
        ],
      },
    ],
    composite: null,
  },
};

export const STORES: Store[] = [
  { id: '#001190', name: 'Toko Hajarat' },
  { id: '#001191', name: 'Indoapit Gedean' },
  { id: '#001193', name: 'Superindi Pakungsin' },
];
