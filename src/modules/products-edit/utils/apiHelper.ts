// TypeScript interfaces for the API payload
interface FormDataInput {
  thumbnail?: string;
  variants?: {
    id: string;
    name: string;
    barcode: string;
    sku: string;
    minStock: number;
    thumbnail: string;
    prices?: {
      id: string;
      namePcs: string;
      quantity: number;
      price: number;
    }[];
    typeprice: string;
    options?: {
      id: string;
      type: string;
      name: string;
      selected_id: string;
    }[];
    isActive: boolean;
  }[];
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
  // Allow additional properties for flexibility
  [key: string]: unknown;
}

interface VariantUnit {
  id: string;
  unit_name: string;
  conversion_value: string;
  price: string;
}

interface Variant {
  id: string;
  sku_code: string;
  barcode: string;
  is_active: boolean;
  attributes: unknown[]; // Using unknown[] for type safety
  is_wholesale: boolean;
  variant_units: VariantUnit[];
  minimum_stock: number;
}

interface CompositeComponent {
  id: string;
  product_variant_id: number;
  quantity: number;
}

interface Composites {
  production_per_batch: number;
  components: CompositeComponent[];
}

interface ProductPayload {
  id: string;
  name: string;
  type: 'single' | 'variant' | 'composite';
  package: string;
  is_active: boolean;
  is_favorite: boolean;
  is_non_tax: boolean;
  content: string;
  unit_id: number;
  tag_ids: number[];
  is_stock_tracking: boolean;
  minimum_stock: number;
  is_enable_expired_reminder: boolean;
  expired_reminder_in_days: number | undefined;
  expired_reminder_in_date: string | undefined;
  variants: Variant[];
  composites?: Composites;
}

export function mapFormDataToApiPayload(formData: FormDataInput): ProductPayload {
  // Generate temp IDs
  const productId = `p_${Date.now()}`;
  const variantId = `v_${Date.now()}`;

  // Determine product type
  const getProductType = () => {
    if (
      formData.variants &&
      formData.variants.length > 0 &&
      formData.variants[0] &&
      formData.variants[0].options &&
      formData.variants[0].options.length > 0
    )
      return 'variant';
    if (formData.composite?.components && formData.composite.components.length > 0)
      return 'composite';
    return 'single';
  };

  // Map variant units from default_prices
  const variantUnits = formData.default_prices
    ? formData.default_prices.map((price, index) => ({
        id: `vu_${Date.now()}_${index}`,
        unit_name: price.itemName || 'Eceran',
        conversion_value: price.quantity ? price.quantity.toString() : '1',
        price: price.price ? price.price.toString() : '0',
      }))
    : [];
  // Create variant structure based on product type
  const productType = getProductType();
  let variants: Variant[] = [];

  if (productType === 'variant' && formData.variants && formData.variants.length > 0) {
    // For variant products, use the provided variants
    variants = formData.variants.map((variant) => {
      // Map prices to variant_units (with fallback to default prices if variant.prices is empty)
      const mappedVariantUnits =
        variant.prices && variant.prices.length > 0
          ? variant.prices.map((price) => ({
              id: `vu_${price.id}`,
              unit_name: price.namePcs,
              conversion_value: price.quantity.toString(),
              price: price.price.toString(),
            }))
          : variantUnits; // Use the default variantUnits from above

      // Map options to attributes
      const attributes =
        variant.options && variant.options.length > 0
          ? variant.options.map((option) => ({
              attribute_id: parseInt(option.selected_id),
              value: option.name,
            }))
          : [];

      return {
        id: variant.id,
        sku_code: variant.sku,
        barcode: variant.barcode,
        is_active: variant.isActive,
        attributes: attributes,
        is_wholesale: formData.is_wholesale || false,
        variant_units: mappedVariantUnits,
        minimum_stock: variant.minStock,
      };
    });
  } else {
    // For single/composite products, create a single default variant
    variants = [
      {
        id: variantId,
        sku_code: formData.sku || `ZYCAS-${Date.now().toString().slice(-5)}`,
        barcode: formData.barcode || `${Date.now().toString().slice(-12)}`,
        is_active: formData.isActiveProduct !== undefined ? formData.isActiveProduct : true,
        attributes: [], // Empty for single/composite
        is_wholesale: formData.is_wholesale || false,
        variant_units: variantUnits,
        minimum_stock: formData.minimum_stock || 0,
      },
    ];
  }

  // Map composites - only for composite type
  const composites =
    productType === 'composite' && formData.composite && formData.composite.components
      ? {
          production_per_batch: formData.composite.production_per_batch || 1,
          components: formData.composite.components.map((comp, index) => {
            // Type assertion to ensure TypeScript knows the structure
            const component = comp as { quantity?: number; product_id?: number };
            return {
              id: `c_${Date.now()}-${index}`, // Generate UUID-like string
              product_variant_id: component.product_id || 0, // Use product_variant_id from form data
              quantity: component.quantity || 0,
            };
          }),
        }
      : null;

  const payload: ProductPayload = {
    id: productId,
    name: formData.productName || '',
    type: productType as 'single' | 'variant' | 'composite',
    package: formData.package || 'Plastik',
    is_active: formData.isActiveProduct !== undefined ? formData.isActiveProduct : true,
    is_favorite: formData.isFavorite !== undefined ? formData.isFavorite : false,
    is_non_tax: false,
    content: formData.content || '',
    unit_id: formData.unit_id || 1,
    tag_ids: [1], // Default tag for now
    is_stock_tracking: formData.is_track_stock !== undefined ? formData.is_track_stock : true,
    minimum_stock: formData.minimum_stock || 10,
    is_enable_expired_reminder:
      formData.is_enable_expired_reminder !== undefined
        ? formData.is_enable_expired_reminder
        : false,
    expired_reminder_in_days: formData.expired_reminder_in_days || undefined,
    expired_reminder_in_date: formData.expired_reminder_in_date || undefined,
    variants: variants,
  };

  // Only add composites if it's a composite type
  if (composites) {
    payload.composites = composites;
  }

  return payload;
}
