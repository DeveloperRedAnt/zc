'use client';

import { Button } from '@/components/button/button';
import { toast } from '@/components/toast/toast';
import { ArrowRight, Plus } from '@icon-park/react';
import cryptoRandomString from 'crypto-random-string';
import React, { useEffect, useRef } from 'react';
import { useProductVariantStore } from '../store';
import { ProductVariant, ProductVariants } from '../types';
import ProductVariantOptions from './add-variant-options';

const VariantManager = ({ onSave }: { onSave: (productVariants: ProductVariants) => void }) => {
  const { productVariants, addProductVariant } = useProductVariantStore() as {
    productVariants: ProductVariants;
    addProductVariant: (variant: ProductVariant) => void;
    removeProductVariant: (id: string | number) => void;
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

    onSave(productVariants);
  };

  const backToProduct = () => {
    window.location.href = '/dashboard/product/add';
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
