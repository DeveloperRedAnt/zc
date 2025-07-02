// AUTO-GENERATED React Query hooks
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import api from './client';
import { queryClient } from './queryClient';

// Type helpers
type ExtractFnReturnType<FnType extends (...args: any) => any> = 
  ReturnType<FnType> extends Promise<infer T> ? T : ReturnType<FnType>;

type MutationParams<FnType extends (...args: any) => any> = 
  Parameters<FnType>[0];
/**
 * Auth Hooks
 */
// Get token to access the app
export function useAuthEmployeeToken(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.authEmployeeToken>,
    unknown,
    MutationParams<typeof api.authEmployeeToken>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.authEmployeeToken,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// Get token
export function useAuthToken(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.authToken>,
    unknown,
    MutationParams<typeof api.authToken>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.authToken,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
/**
 * MasterData Hooks
 */
// Create queue counter
export function useCreateQueueCounter(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.createQueueCounter>,
    unknown,
    MutationParams<typeof api.createQueueCounter>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.createQueueCounter,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ActiveTax'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// get active tax
export function useActiveTax(
  params: MutationParams<typeof api.ActiveTax>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.ActiveTax>,
    unknown,
    ExtractFnReturnType<typeof api.ActiveTax>,
    ['ActiveTax', MutationParams<typeof api.ActiveTax>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['ActiveTax', params],
    queryFn: () => api.ActiveTax(params),
    ...options,
  });
}
// Update an existing tax
export function useUpdateTax(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.updateTax>,
    unknown,
    MutationParams<typeof api.updateTax>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.updateTax,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ActiveTax'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// Create tax
export function useCreateTax(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.createTax>,
    unknown,
    MutationParams<typeof api.createTax>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.createTax,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ActiveTax'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// update queue counter
export function useUpdateQueueCounter(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.updateQueueCounter>,
    unknown,
    MutationParams<typeof api.updateQueueCounter>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.updateQueueCounter,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ActiveTax'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
/**
 * MasterData - Tag Hooks
 */
// create tag
export function useCreateTag(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.CreateTag>,
    unknown,
    MutationParams<typeof api.CreateTag>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.CreateTag,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ListTag'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// list tag product
export function useListTag(
  params: MutationParams<typeof api.ListTag>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.ListTag>,
    unknown,
    ExtractFnReturnType<typeof api.ListTag>,
    ['ListTag', MutationParams<typeof api.ListTag>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['ListTag', params],
    queryFn: () => api.ListTag(params),
    ...options,
  });
}
// update tag
export function useUpdateTag(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.UpdateTag>,
    unknown,
    MutationParams<typeof api.UpdateTag>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.UpdateTag,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ListTag'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// delete tag
export function useDeleteTag(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.DeleteTag>,
    unknown,
    MutationParams<typeof api.DeleteTag>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.DeleteTag,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ListTag'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
/**
 * MasterData - Unit Hooks
 */
// update unit
export function useUpdateUnit(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.updateUnit>,
    unknown,
    MutationParams<typeof api.updateUnit>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.updateUnit,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ListUnitProduct'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// delete unit
export function useDeleteUnitProduct(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.deleteUnitProduct>,
    unknown,
    MutationParams<typeof api.deleteUnitProduct>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.deleteUnitProduct,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ListUnitProduct'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// list unit product
export function useListUnitProduct(
  params: MutationParams<typeof api.ListUnitProduct>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.ListUnitProduct>,
    unknown,
    ExtractFnReturnType<typeof api.ListUnitProduct>,
    ['ListUnitProduct', MutationParams<typeof api.ListUnitProduct>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['ListUnitProduct', params],
    queryFn: () => api.ListUnitProduct(params),
    ...options,
  });
}
// create unit product
export function useCreateUnitProduct(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.CreateUnitProduct>,
    unknown,
    MutationParams<typeof api.CreateUnitProduct>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.CreateUnitProduct,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'ListUnitProduct'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
/**
 * MasterData - Variant Hooks
 */
// update variant attribute
export function useUpdateVariantAttribute(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.updateVariantAttribute>,
    unknown,
    MutationParams<typeof api.updateVariantAttribute>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.updateVariantAttribute,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'listVariantAttributes'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// delete variant attribute
export function useDeleteVariantAttribute(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.deleteVariantAttribute>,
    unknown,
    MutationParams<typeof api.deleteVariantAttribute>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.deleteVariantAttribute,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'listVariantAttributes'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// list variant attributes
export function useListVariantAttributes(
  params: MutationParams<typeof api.listVariantAttributes>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.listVariantAttributes>,
    unknown,
    ExtractFnReturnType<typeof api.listVariantAttributes>,
    ['listVariantAttributes', MutationParams<typeof api.listVariantAttributes>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['listVariantAttributes', params],
    queryFn: () => api.listVariantAttributes(params),
    ...options,
  });
}
// create tag
export function useCreate(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.Create>,
    unknown,
    MutationParams<typeof api.Create>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.Create,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: [, 'listVariantAttributes'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
/**
 * Organization Hooks
 */
// Get organization
export function useGetOrganization(
  params: MutationParams<typeof api.getOrganization>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.getOrganization>,
    unknown,
    ExtractFnReturnType<typeof api.getOrganization>,
    ['getOrganization', MutationParams<typeof api.getOrganization>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['getOrganization', params],
    queryFn: () => api.getOrganization(params),
    ...options,
  });
}
// Create organization
export function useCreateOrganization(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.createOrganization>,
    unknown,
    MutationParams<typeof api.createOrganization>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.createOrganization,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: ['getOrganization'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
/**
 * Supplier Hooks
 */
// list supplier
export function useListSupplier(
  params: MutationParams<typeof api.listSupplier>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.listSupplier>,
    unknown,
    ExtractFnReturnType<typeof api.listSupplier>,
    ['listSupplier', MutationParams<typeof api.listSupplier>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['listSupplier', params],
    queryFn: () => api.listSupplier(params),
    ...options,
  });
}
// create supplier
export function useCreateSupplier(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.CreateSupplier>,
    unknown,
    MutationParams<typeof api.CreateSupplier>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.CreateSupplier,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: ['listSupplier', 'ShowSupplier'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
// show supplier
export function useShowSupplier(
  params: MutationParams<typeof api.ShowSupplier>,
  options: Omit<UseQueryOptions<
    ExtractFnReturnType<typeof api.ShowSupplier>,
    unknown,
    ExtractFnReturnType<typeof api.ShowSupplier>,
    ['ShowSupplier', MutationParams<typeof api.ShowSupplier>]
  >, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    queryKey: ['ShowSupplier', params],
    queryFn: () => api.ShowSupplier(params),
    ...options,
  });
}
// update supplier
export function useUpdateSupplier(
  options: UseMutationOptions<
    ExtractFnReturnType<typeof api.UpdateSupplier>,
    unknown,
    MutationParams<typeof api.UpdateSupplier>,
    unknown
  > = {}
) {
  return useMutation({
    mutationFn: api.UpdateSupplier,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries when a new one is created
      queryClient.invalidateQueries({ queryKey: ['listSupplier', 'ShowSupplier'] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}