import { toast } from '@/components/toast/toast';
// hooks/products-edit.hooks.ts
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../client/products-edit.client';
import * as DTO from '../dto/products-edit.dto';

/**
 * Hook to get product detail with variants
 */
export function useGetProductDetailData(
  params: {
    productId: string;
    storeId?: string;
  },
  options?: UseQueryOptions<DTO.ApiProductDetailData>
) {
  return useQuery<DTO.ApiProductDetailData, Error>({
    queryKey: ['productDetail', params.productId, params.storeId],
    queryFn: () => api.getProductDetail(params.productId, params.storeId),
    enabled: !!params.productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

/**
 * Hook to get formatted variant data (transformed from API)
 */
export function useGetFormattedVariants(
  params: {
    productId: string;
    storeId?: string;
  },
  options?: UseQueryOptions<DTO.FormattedVariantData[]>
) {
  return useQuery<DTO.FormattedVariantData[], Error>({
    queryKey: ['formattedVariants', params.productId, params.storeId],
    queryFn: async () => {
      const response = await api.getProductDetail(params.productId, params.storeId);
      console.log(response, 'response')
      return api.transformApiDataToFormattedVariants(response);
    },
    enabled: !!params.productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

/**
 * Hook to update product variants
 */
export function useUpdateProductVariants() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      productId, 
      payload
    }: {
      productId: string;
      payload: DTO.UpdateProductVariantsPayload;
    }) => api.updateProductVariants(productId, payload),
    onSuccess: (_, variables) => {
      // Invalidate and refetch product detail queries
      queryClient.invalidateQueries({ 
        queryKey: ['productDetail', variables.productId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['formattedVariants', variables.productId] 
      });
      
      toast.success('Data berhasil disimpan!', {
        description: 'Semua detail varian telah berhasil disimpan',
        className: 'bg-[#16a34a]',
      });
    },
    onError: (error) => {
      console.error('Error updating variants:', error);
      toast.error('Gagal menyimpan data', {
        description: 'Terjadi kesalahan saat menyimpan data varian',
        className: 'bg-red-500 text-white',
      });
    },
  });
}

/**
 * Hook to update single variant
 */
export function useUpdateSingleVariant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      productId,
      variantId, 
      payload
    }: {
      productId: string;
      variantId: string;
      payload: DTO.ProductVariantUpdateData;
    }) => api.updateSingleVariant(productId, variantId, payload),
    onSuccess: (_, variables) => {
      // Invalidate and refetch product detail queries
      queryClient.invalidateQueries({ 
        queryKey: ['productDetail', variables.productId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['formattedVariants', variables.productId] 
      });
      
      toast.success('Varian berhasil diperbarui!', {
        description: 'Data varian telah berhasil disimpan',
        className: 'bg-[#16a34a]',
      });
    },
    onError: (error) => {
      console.error('Error updating variant:', error);
      toast.error('Gagal memperbarui varian', {
        description: 'Terjadi kesalahan saat memperbarui data varian',
        className: 'bg-red-500 text-white',
      });
    },
  });
}

/**
 * Custom hook for managing variant form state
 */
export function useVariantForm(productId: string) {
  const { data: formattedVariants, isLoading, error, refetch } = useGetFormattedVariants({
    productId,
    storeId: '1'
  });
  
  const updateVariantsMutation = useUpdateProductVariants();

  const handleSaveVariants = async (
    variants: DTO.FormattedVariantData[],
    cardValues: { [key: number]: DTO.ProductCardValue } // Changed key type to number
  ) => {
    const payload = api.transformFormattedVariantsToApiData(variants, cardValues);
    
    return updateVariantsMutation.mutateAsync({
      productId,
      payload
    });
  };

  return {
    formattedVariants: formattedVariants || [],
    isLoading,
    error: error?.message || null,
    refetch,
    handleSaveVariants,
    isSaving: updateVariantsMutation.isPending,
  };
}

/**
 * Hook for field validation errors
 */
export function useFieldValidation() {
  const validateVariant = (variant: DTO.ProductVariantValidationSchema): { [field: string]: string } => {
    const errors: { [field: string]: string } = {};

    if (!variant.name || variant.name.trim().length === 0) {
      errors.name = 'Nama harus diisi';
    }

    if (variant.thumbnail && !variant.thumbnail.match(/^https?:\/\/.+/)) {
      errors.thumbnail = 'Thumbnail harus berupa URL yang valid';
    }

    if (!variant.barcode || variant.barcode.trim().length === 0) {
      errors.barcode = 'Barcode harus diisi';
    } else if (variant.barcode.length > 13) {
      errors.barcode = 'Barcode maksimal 13 karakter';
    }

    if (!variant.sku || variant.sku.trim().length === 0) {
      errors.sku = 'SKU harus diisi';
    } else if (variant.sku.length > 20) {
      errors.sku = 'SKU maksimal 20 karakter';
    }

    if (variant.minStock < 1) {
      errors.minStock = 'Stok minimal harus lebih dari 0';
    }

    return errors;
  };

  return { validateVariant };
}