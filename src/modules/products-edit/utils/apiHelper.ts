import * as DTO from '@/__generated__/api/dto/product.dto';

// Enhanced FormDataInput interface with proper typing
interface EnhancedFormDataInput {
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
  priceMultiPackList?: Array<{
    id?: number;
    itemName?: string;
    unit_name?: string;
    quantity?: number;
    price?: number;
  }>;
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
  type?: 'single' | 'variant' | 'composite'; // Fixed: changed 'simple' to 'single'
  // Allow additional properties for flexibility
  [key: string]: unknown;
}

// LocalStorage variant data structure
interface LocalStorageVariantData {
  state: {
    currentKey?: string;
    variants: {
      [key: string]: {
        variantId: number;
        productId: string;
        name: string;
        cardValue: {
          file: string;
          barcode: string;
          sku: string;
          minStock: number;
        };
        isWholesale: boolean;
        lastSaved: string;
        multiPackErrors: { [itemId: number]: { [field: string]: string } };
        priceMultiPackList: Array<{
          id: number;
          unitName: string;
          conversionValue: number;
          price: number;
        }>;
      };
    };
  };
  version: number;
}

// Helper function to get localStorage data (safe for SSR)
function getLocalStorageData(): LocalStorageVariantData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem('Single-variant-edit-data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing local storage data:', error);
  }
  return null;
}

// Helper function to find matching localStorage variant data
function findMatchingLocalVariant(
  variantId: number,
  productId: number,
  localData: LocalStorageVariantData | null
) {
  if (!localData?.state?.variants) return null;

  // Search through all variant keys in localStorage
  for (const key in localData.state.variants) {
    const variant = localData.state.variants[key];
    if (variant?.variantId === variantId && variant.productId === productId.toString()) {
      return variant;
    }
  }
  return null;
}

// Enhanced function to merge localStorage data with variants
function mergeVariantsWithLocalStorage(
  variants: DTO.GetProductDetailVariant[],
  productId: number
): DTO.GetProductDetailVariant[] {
  const localData = getLocalStorageData();

  if (!localData) return variants;

  return variants.map((variant) => {
    const variantId = Number(variant.id);
    const matchingLocalVariant = findMatchingLocalVariant(variantId, productId, localData);

    if (matchingLocalVariant) {
      // Merge localStorage data with original variant
      return {
        ...variant,
        barcode: matchingLocalVariant.cardValue.barcode,
        sku_code: matchingLocalVariant.cardValue.sku,
        is_wholesale: matchingLocalVariant.isWholesale,
        minimum_stock: matchingLocalVariant.cardValue.minStock,
        variant_units: matchingLocalVariant.priceMultiPackList.map((price) => ({
          id: price.id.toString(),
          unit_name: price.unitName,
          conversion_value: price.conversionValue.toString(),
          price: price.price.toString(),
        })),
      };
    }

    return variant;
  });
}

export function mapFormDataToApiPayload(
  formData: EnhancedFormDataInput
): DTO.UpdateProductRequestSchema {
  const productType = formData.type;

  // Merge variants with localStorage data before processing
  const mergedVariants = formData.variants
    ? mergeVariantsWithLocalStorage(formData.variants, formData.id)
    : [];

  const variants = mergedVariants.map((variant) => {
    const variantUnits =
      Array.isArray(variant.variant_units) && variant.variant_units.length > 0
        ? variant.variant_units.map((unit) => ({
            ...unit,
            price: unit.price,
            conversion_value: unit.conversion_value,
          }))
        : Array.isArray(formData.priceMultiPackList)
          ? formData.priceMultiPackList.map((unit, idx) => ({
              id: unit.id ? unit.id.toString() : `vu_${Date.now()}_${idx}`,
              unit_name: unit.itemName || unit.unit_name || '',
              conversion_value: unit.quantity ? unit.quantity.toString() : '1',
              price: unit.price ? unit.price.toString() : '0',
            }))
          : [];

    return {
      ...variant,
      variant_units: variantUnits,
    };
  });

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
    variants: variants,
    thumbnail: formData.thumbnail || '',
    composites: composites || undefined,
  };

  return payload;
}

// Export helper functions for external use if needed
export { getLocalStorageData, findMatchingLocalVariant, mergeVariantsWithLocalStorage };

// Type-safe wrapper for formData to ensure proper typing
export function createEnhancedFormDataInput(
  data: Record<string, unknown> & { type?: string }
): EnhancedFormDataInput {
  return {
    ...data,
    type: data.type === 'simple' ? 'single' : (data.type as string),
  } as EnhancedFormDataInput;
}
