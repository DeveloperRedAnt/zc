export interface CheckEditVariantResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: CheckEditVariantData;
}

export interface CheckEditVariantData {
  combinations: Combination[];
  attribute_variant_options: AttributeVariantOption[];
}

export interface Combination {
  variant_attribute_id: number;
  variant_option_id: number;
  attribute_option_name: string;
}

export interface AttributeVariantOption {
  attribute: Attribute;
}

export interface Attribute {
  id: number;
  name: string;
  values: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  value: string;
}

export interface VariantUnit {
  id: string;
  unit_name: string;
  conversion_value: string;
  price: string;
}

export interface AttributeRequest {
  attribute_id: number;
  value_id: number | null;
  other: string | null;
}

export interface CreateVariantOptionRequest {
  id: string;
  store_id: number;
  product_id: number;
  thumbnail: string;
  sku_code: string;
  barcode: string;
  is_active: boolean;
  is_wholesale: boolean;
  variant_units: VariantUnit[];
  attributes: AttributeRequest[];
}

export interface CreateVariantOptionResponse {
  message: string;
  data: unknown;
}
