// client/product-variant.client.ts
import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto/products-edit.dto';
import { ValidationError, apiClientWithHeaders } from './base.client';


/**
 * Get product detail with variants
 */
export const getProductDetail = async (
  productId: string, 
  storeId: string = '1'
): Promise<DTO.ApiProductDetailData> => {
  return getDataFromApi<
    { store_id: string }, 
    DTO.ApiProductDetailData, 
    { store_id: string }
  >({
    type: 'get',
    url: `/api/products/${productId}`,
    injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
    params: { store_id: storeId },
    transformer: (data: Record<string, unknown>) => data as DTO.ApiProductDetailData
  });
};

/**
 * Update product variants
 */
export const updateProductVariants = async (
  productId: string,
  payload: DTO.UpdateProductVariantsPayload
): Promise<DTO.UpdateProductVariantsResponse> => {
  try {
    const response = await apiClientWithHeaders.put(
      `/api/dashboard/products/${productId}/variants`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data as DTO.UpdateProductVariantsResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Update single variant
 */
export const updateSingleVariant = async (
  productId: string,
  variantId: string,
  payload: DTO.ProductVariantUpdateData
): Promise<DTO.UpdateProductVariantsResponse> => {
  try {
    const response = await apiClientWithHeaders.put(
      `/api/dashboard/products/${productId}/variants/${variantId}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data as DTO.UpdateProductVariantsResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Transform API data to frontend format
 */
export const transformApiDataToFormattedVariants = (
  apiData: DTO.ApiProductDetailData
): DTO.FormattedVariantData[] => {
  console.log('API Data variants:', apiData.variants); // Debug log
  
  return apiData.variants.map(variant => {
    // Create variant name by combining ALL attribute values properly
    // Based on your API response, each variant has multiple attributes with same "attribute" field
    // but different "value" fields - we want to combine all the values
    const attributeValues = variant.attributes.map(attr => attr.value);
    const variantName = attributeValues.length > 0 
      ? attributeValues.join(' - ') : "Data Rusak (tidak ada attribute variant)";

    const minStockMatch = apiData.stock_tracking.minimum_stock?.match(/\d+/);
    const minStock = minStockMatch ? parseInt(minStockMatch[0]) : 0;

    // console.log(`Variants: ${JSON.stringify(variant)}`); // Debug log

    // console.log(`Variant ${variant.id}: ${variantName}`); // Debug log
    // console.log(`Variant Unit: ${JSON.stringify(variant.variant_units)}`); // Debug log

    return {
      id: variant.id,
      name: variantName,
      thumbnail: variant.thumbnail || '',
      barcode: variant.barcode,
      sku: variant.sku_code,
      minStock,
      isActive: variant.is_active,
      attributes: variant.attributes,
      isWholesale: variant.is_wholesale,
      variantUnits: variant.variant_units.map((unit) => ({
        id: unit.id,
        unitName: unit.unit_name,
        conversionValue: Number(unit.conversion_value) || 0,
        price: parseFloat(unit.price.replace(/[^0-9.]/g, '')) || 0
      }))
    };
  });
};

/**
 * Transform frontend data to API format for update
 */
export const transformFormattedVariantsToApiData = (
  formattedVariants: DTO.FormattedVariantData[],
  cardValues: { [key: number]: DTO.ProductCardValue } // Changed key type to number
): DTO.UpdateProductVariantsPayload => {
  const variants = formattedVariants.map(variant => {
    const cardValue = cardValues[variant.id];
    
    return {
      id: variant.id, // Already a number
      thumbnail: cardValue?.file || variant.thumbnail,
      barcode: cardValue?.barcode || variant.barcode,
      sku_code: cardValue?.sku || variant.sku,
      minimum_stock: cardValue?.minStock || variant.minStock,
      is_active: variant.isActive,
      variant_units: variant.variantUnits.map(unit => ({
        id: unit.id,
        unit_name: unit.unitName,
        conversion_value: unit.conversionValue,
        price: unit.price
      }))
    };
  });

  return { variants };
};
