'use client';

import { Text } from '@/components/text/text';
import React from 'react';
import VariantManager from './add-variant-manager';

const AddProductVariant = ({ onSave }) => {
  return (
    <>
      <div className="p-[10px] flex flex-col gap-2">
        <Text size="md" className="font-semibold text-[#555555]">
          Step 1 - Varian Produk
        </Text>
        <Text size="sm" className="text-gray-500">
          Silahkan isikan informasi Varian Produk yang akan Anda tambahkan
        </Text>
        <Text size="sm" className="text-[#F08181]">
          Form bertanda (*) harus diisi
        </Text>
      </div>
      <VariantManager onSave={onSave} />
    </>
  );
};

export default AddProductVariant;
