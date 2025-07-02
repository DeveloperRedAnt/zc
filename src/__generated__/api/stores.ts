// AUTO-GENERATED Zustand stores with API client integration
import { create } from 'zustand';
import api from './client';
import type * as DTO from './dto';

export const useAuthStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  authEmployeeToken: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.TokenRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.authEmployeeToken(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  authToken: async (params: { "x-device-id": string; body: DTO.TokenRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.authToken(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));

export const useMasterDataStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  updateTax: async (params: { id: string; "x-device-id": string; "x-store-id": string; body: DTO.CreateTaxRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.updateTax(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  createQueueCounter: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.CreateQueueCounterRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.createQueueCounter(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  updateQueueCounter: async (params: { "x-device-id": string; "x-store-id": string; id: string; body: DTO.CreateQueueCounterRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.updateQueueCounter(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  createTax: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.CreateTaxRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.createTax(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  fetchActiveTax: async (params: { "x-device-id": string; "x-store-id": string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.ActiveTax(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));

export const useMasterDataTagStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  fetchListTag: async (params: { "x-device-id": string; "x-store-id": string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.ListTag(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  createTag: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.TagRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.CreateTag(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  updateTag: async (params: { "x-device-id": string; "x-store-id": string; id: string; body: DTO.TagRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.UpdateTag(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  deleteTag: async (params: { "x-device-id": string; "x-store-id": string; id: string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.DeleteTag(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));

export const useMasterDataUnitStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  fetchListUnitProduct: async (params: { "x-device-id": string; "x-store-id": string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.ListUnitProduct(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  createUnitProduct: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.CreateUnitRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.CreateUnitProduct(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  deleteUnitProduct: async (params: { "x-device-id": string; "x-store-id": string; id: string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.deleteUnitProduct(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  updateUnit: async (params: { "x-device-id": string; "x-store-id": string; id: string; body: DTO.CreateQueueCounterRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.updateUnit(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));

export const useMasterDataVariantStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  fetchlistVariantAttributes: async (params: { "x-device-id": string; "x-store-id": string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.listVariantAttributes(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  create: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.VariantRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.Create(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  updateVariantAttribute: async (params: { "x-device-id": string; "x-store-id": string; id: string; body: DTO.VariantRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.updateVariantAttribute(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  deleteVariantAttribute: async (params: { "x-device-id": string; "x-store-id": string; id: string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.deleteVariantAttribute(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));

export const useOrganizationStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  createOrganization: async (params: { "x-device-id": string; body: DTO.CreateOrganizationRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.createOrganization(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  fetchgetOrganization: async (params: { "x-device-id": string; page?: number; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.getOrganization(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));

export const useSupplierStore = create((set) => ({
  data: null, loading: false, error: null,
  // Actions
  fetchlistSupplier: async (params: { "x-device-id": string; "x-store-id": string; "x-organization-id": string; body: DTO.SearchSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.listSupplier(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  createSupplier: async (params: { "x-device-id": string; "x-store-id": string; body: DTO.SupplierRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.CreateSupplier(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  fetchShowSupplier: async (params: { "x-device-id": string; "x-store-id": string; id: string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.ShowSupplier(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  updateSupplier: async (params: { "x-device-id": string; "x-store-id": string; id: string; body: DTO.SupplierRequestSchema; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.UpdateSupplier(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  deleteTag: async (params: { "x-device-id": string; "x-store-id": string; id: string; }) => {
    set({ loading: true, error: null });
    try {
      const result = await api.deleteTag(params);
      set({ data: result, loading: false }); return result;
    } catch (error) {
      set({ error, loading: false }); throw error;
    }
  },
  reset: () => set({ data: null, loading: false, error: null })
}));