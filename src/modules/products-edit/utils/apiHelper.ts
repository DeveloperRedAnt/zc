import * as DTO from '@/__generated__/api/dto/product.dto';

// TypeScript interfaces for the API payload
interface FormDataInput {
  id: number;
  thumbnail?: string;
  variants?: DTO.GetProductDetailVariant[];
  composite?: {
    components?: {
      quantity?: number;
      product_variant_id?: number;
    }[];
    production_per_batch?: number;
  };
  default_prices?: {
    itemName?: string;
    quantity?: number;
    price?: number;
  }[];
  sku?: string;
  barcode?: string;
  isActiveProduct?: boolean;
  productName?: string;
  package?: string;
  isFavorite?: boolean;
  content?: string;
  unit_id?: number | null;
  is_track_stock?: boolean;
  minimum_stock?: number | null;
  is_enable_expired_reminder?: boolean;
  expired_reminder_in_days?: number | null;
  expired_reminder_in_date?: string | null;
  is_wholesale?: boolean;
  current_stock: number;
  // Allow additional properties for flexibility
  [key: string]: unknown;
}

export function mapFormDataToApiPayload(formData: FormDataInput): DTO.UpdateProductRequestSchema {
  const productType = formData.type;

  const variants =
    formData.variants?.map((variant) => {
      const variantUnits =
        Array.isArray(variant.variant_units) && variant.variant_units.length > 0
          ? variant.variant_units.map((unit) => ({
              ...unit,
              price: unit.price,
              conversion_value: unit.conversion_value,
            }))
          : Array.isArray(formData.priceMultiPackList)
            ? formData.priceMultiPackList.map((unit, idx) => ({
                id: unit.id ?? `vu_${Date.now()}_${idx}`,
                unit_name: unit.itemName || unit.unit_name || null,
                conversion_value: unit.quantity ? unit.quantity.toString() : 1,
                price: unit.price ? unit.price.toString() : 0,
              }))
            : [];
      return {
        ...variant,
        variant_units: variantUnits,
      };
    }) || [];
  const composites =
    productType === 'composite' && formData.composite && formData.composite.components
      ? {
          production_per_batch: formData.composite.production_per_batch || 1,
          components: formData.composite.components.map((comp) => {
            const component = comp as { quantity?: number; product_id?: number };
            return {
              id: 0,
              product_variant_id: component.product_id || 0,
              quantity: component.quantity || 0,
            };
          }),
        }
      : null;

  const payload: DTO.UpdateProductRequestSchema = {
    id: formData.id,
    name: formData.productName || '',
    current_stock: formData.current_stock || 0,
    type: productType as 'single' | 'variant' | 'composite',
    package: formData.package || 'Plastik',
    is_active: formData.isActiveProduct !== undefined ? formData.isActiveProduct : true,
    is_favorite: formData.isFavorite !== undefined ? formData.isFavorite : false,
    is_non_tax: false,
    content: formData.content || '',
    unit_id: formData.unit_id || 1,
    tag_ids: [1], // Default tag for now
    is_stock_tracking: formData.is_track_stock !== undefined ? formData.is_track_stock : true,
    is_enable_expired_reminder:
      formData.is_enable_expired_reminder !== undefined
        ? formData.is_enable_expired_reminder
        : false,
    expired_reminder_in_days: formData.expired_reminder_in_days || 0,
    expired_reminder_in_date: formData.expired_reminder_in_date || '',
    variants: formData.variants ? variants : [],
    thumbnail: formData.thumbnail || '',
    composites: composites || undefined,
  };

  return payload;
}
