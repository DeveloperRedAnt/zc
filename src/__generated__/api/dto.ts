// AUTO-GENERATED TypeScript DTOs
export type StoreIDSchema = {
}
export type IdParam = {
}
export type CreateQueueCounterRequestSchema = {
  counter: number;
  counter_start: number;
  next_reset_at: string;
  padding: number;
  prefix: string;
  rotation: number;
}
export type UnitSchema = {
  data: Record<string, any>[];
}
export type TaxSchema = {
  created_at: string;
  deleted_at: string;
  id: number;
  period_date: string;
  store_id: number;
  tax: number;
  updated_at: string;
}
export type ErrorResponseSchema = {
  message: string;
}
export type CreateTaxRequestSchema = {
  tax: number;
}
export type PageNumberSchema = {
}
export type TokenResponseSchema = {
  token: string;
}
export type CreateUnitRequestSchema = {
  display_name: string;
}
export type VariantRequestSchema = {
  name: string;
}
export type CreateOrganizationRequestSchema = {
  address: string;
  email: string;
  image: string;
  name: string;
  nib: string;
  npwp: string;
  phone: string;
}
export type SupplierSchema = {
  id: number;
  name: string;
  phone: string;
  pic: string;
}
export type QueueCounterSchema = {
  counter: number;
  counter_start: number;
  created_at: string;
  deleted_at: string;
  id: number;
  next_reset_at: string;
  padding: number;
  prefix: string;
  rotation: number;
  store_id: number;
  updated_at: string;
}
export type TagRequestSchema = {
  name: string;
}
export type SupplierRequestSchema = {
  name: string;
  phone: string;
  pic: string;
}
export type DeviceIDSchema = {
}
export type CreateStoreRequestSchema = {
  address: string;
  email: string;
  image: string;
  lat: number;
  lng: number;
  name: string;
  phone: number;
}
export type VariantSchema = {
  id: number;
  name: string;
}
export type OrganizationIDSchema = {
}
export type TokenRequestSchema = {
  password: string;
  phone: string;
}
export type SearchSchema = {
  search: string;
}
export type OrganizationSchema = {
  address: string;
  email: string;
  id: number;
  image: string;
  name: string;
  nib: string;
  npwp: string;
  phone: string;
}
export type TagSchema = {
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  store_id: number;
  updated_at: string;
}
