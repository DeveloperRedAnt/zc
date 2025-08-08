'use client';

import { Button } from '@/components/button/button';
import { toast } from '@/components/toast/toast';
import { ArrowRight, Plus } from '@icon-park/react';
import cryptoRandomString from 'crypto-random-string';
import React, { useEffect, useRef } from 'react';
import { useProductVariantStore } from '../store';
import {
  FormattedDatas,
  PricesVariantOption,
  ProductVariant,
  ProductVariantOption as BaseProductVariantOption,
  ProductVariants,
} from '../types';
import ProductVariantOptions from './add-variant-options';

// Extended type that includes both base properties and additional properties needed for variant combinations
type ProductVariantOption = BaseProductVariantOption & {
  barcode?: string;
  sku?: string;
  minStock?: number;
  thumbnail?: string;
};

const cartesianProduct = (arrays: ProductVariantOption[][]): ProductVariantOption[][] => {
  if (arrays.length === 0) return [[]];
  if (arrays.length === 1) return (arrays[0] ?? []).map((item) => [item]);

  const result: ProductVariantOption[][] = [];
  const restProduct = cartesianProduct(arrays.slice(1));

  for (const item of arrays[0] ?? []) {
    for (const restItem of restProduct) {
      result.push([item, ...restItem]);
    }
  }

  return result;
};

const createVariantCombinations = (
  variantsData: { options: ProductVariantOption[] }[]
): FormattedDatas => {
  const allVariantOptions = variantsData.map((variant) => variant.options);
  const combinations = cartesianProduct(allVariantOptions);

  return combinations.map((combination) => {
    const name = combination.map((option: ProductVariantOption) => option.name).join(' - ');
    const baseOption = combination[0] as ProductVariantOption;

    return {
      id: cryptoRandomString({ length: 10 }),
      name,
      barcode: baseOption.barcode || '',
      sku: baseOption.sku || '',
      minStock: baseOption.minStock || 0,
      thumbnail: baseOption.thumbnail || '',
      prices: (baseOption.prices as PricesVariantOption[]) || [],
      typeprice: '',
      isActive: true,
      options: combination.map((option: ProductVariantOption) => ({
        id: option.id,
        type: option.type,
        name: option.name,
        selected_id: option.selected_id || option.id,
      })),
    };
  });
};

const VariantManager = ({ onSave }: { onSave: (productVariants: ProductVariants) => void }) => {
  const { productVariants, addProductVariant, setFormattedData } = useProductVariantStore() as {
    productVariants: ProductVariants;
    addProductVariant: (variant: ProductVariant) => void;
    removeProductVariant: (id: string | number) => void;
    setFormattedData: (data: FormattedDatas) => void;
  };

  const initializedRef = useRef(false);

  // handle to render 1 variant when start load page
  useEffect(() => {
    if (!initializedRef.current) {
      if (productVariants.length === 0) {
        addProductVariant({ id: cryptoRandomString({ length: 10 }), type: 'Warna', options: [] });
      }
      initializedRef.current = true;
    }
  }, [addProductVariant, productVariants.length]);

  const handleAddVariant = () => {
    if (productVariants.length < 2) {
      addProductVariant({ id: cryptoRandomString({ length: 10 }), type: 'Ukuran', options: [] });
    }
  };

  const goToStep2 = () => {
    const allValid = productVariants.every((variant: ProductVariant) => {
      return (
        Array.isArray(variant.options) &&
        variant.options.every((opt) => opt.name != null && opt.name.trim() !== '')
      );
    });

    if (!allValid) {
      toast.error('Lengkapi semua varian sebelum melanjutkan ke Step 2', {
        description: 'Pastikan Anda memilih jenis varian dan mengisi opsi variasi',
        className: 'bg-red-500 text-white',
      });
      return;
    }

    // Create formatted data here before moving to step 2
    const variantsData = productVariants.map((variant) => {
      const mappedOptions = variant?.options?.map((option) => {
        return {
          ...option,
          selected_id: variant.selected_id,
        };
      });
      return {
        type: variant.type ?? '',
        options: mappedOptions || [],
      };
    });

    if (variantsData.length > 0 && variantsData.some((v) => v.options.length > 0)) {
      const formatted = createVariantCombinations(variantsData);
      setFormattedData(formatted);
    }

    onSave(productVariants);
  };

  const backToProduct = () => {
    window.location.href = '/dashboard/products/add';
  };

  return (
    <>
      {productVariants.map((variant, index) => (
        <ProductVariantOptions
          key={variant.id}
          variantId={variant.id}
          variantIndex={String(index + 1)}
          options={variant.options || []}
          variantLength={productVariants.length}
        />
      ))}

      <div className="mt-2 flex justify-between items-center">
        <div>
          {productVariants.length < 2 && (
            <Button type="button" variant="outline" onClick={() => handleAddVariant()}>
              <Plus size={14} /> Tambah Varian 2
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => backToProduct()}>
            Kembali ke Tambah Produk
          </Button>
          <Button type="button" variant="info" onClick={() => goToStep2()}>
            Simpan dan Isi Detail Varian <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default VariantManager;
