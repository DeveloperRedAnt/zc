'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader } from '@/components/card/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import CustomInput from '@/components/input/custom-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { Text } from '@/components/text/text';
import { Toaster } from '@/components/toast/toast';
import { Delete, Plus } from '@icon-park/react';
import cryptoRandomString from 'crypto-random-string';
import { useEffect, useRef, useState } from 'react';
import {
  ProductVariantOption as TProductVariantOption,
  ProductVariantOptions as TProductVariantOptions,
  ProductVariantType,
  ProductVariants as TProductVariants,
} from '../types';

import { useProductVariantStore } from '../store';

type TProductVariantOptionsProps = {
  variantId: string;
  variantIndex: string;
  variantLength: number;
  options: TProductVariantOptions;
};
const ProductVariantOptions = ({
  variantId,
  variantLength,
  variantIndex,
  options,
}: TProductVariantOptionsProps) => {
  const {
    updateProductVariantOptionByProductIDandOptionID,
    deleteOptionByProductIDandOptionID,
    addProductVariantOption,
    removeProductVariant,
    productVariants,
    changeProductVariantTypeByID,
  } = useProductVariantStore() as {
    productVariants: TProductVariants;
    updateProductVariantOptionByProductIDandOptionID: (
      productVariantID: string,
      optionID: string,
      data: TProductVariantOption
    ) => void;
    deleteOptionByProductIDandOptionID: (productVariantID: string, optionID: string) => void;

    changeProductVariantTypeByID: (id: string, type: ProductVariantType) => void;
    addProductVariantOption: (productVariantID: string, option: TProductVariantOption) => void;
    removeProductVariant: (id: string) => void;
  };
  const productVariantType =
    productVariants.find((variant) => variant.id === variantId)?.type || 'Warna';

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const initializedRef = useRef(false);

  // handle to render 1 options when start load page
  useEffect(() => {
    if (!initializedRef.current) {
      if (options.length === 0) {
        addProductVariantOption(variantId, {
          id: cryptoRandomString({ length: 10 }),
          type: productVariantType,
          name: '',
        });
      }
      initializedRef.current = true;
    }
  }, [addProductVariantOption, options.length, productVariantType, variantId]);

  const handleAddOption = () => {
    if (options.length < 10) {
      addProductVariantOption(variantId, {
        id: cryptoRandomString({ length: 10 }),
        type: productVariantType,
        name: '',
      });
    }
  };

  const handleConfirmDelete = () => {
    removeProductVariant(variantId);
  };

  return (
    <Card className="m-4">
      <CardHeader className="text-lg font-semibold border-b border-gray-300 group flex flex-row justify-between items-center">
        <Text size="md" className="font-semibold text-[#555555]">
          Varian {variantIndex}
        </Text>
        {variantLength > 1 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="delete" size="sm">
                <Delete size={14} /> Hapus
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Anda akan menyimpan Varian Produk</DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin akan menyimpan varian produk tersebut?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Tidak</Button>
                </DialogClose>
                <Button
                  variant="info"
                  onClick={() => {
                    handleConfirmDelete();
                  }}
                >
                  Ya, Saya Yakin
                </Button>
              </DialogFooter>
              <DialogClose />
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="w-[450.5px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Varian</label>
          <Select
            value={productVariantType}
            onValueChange={(value) => {
              changeProductVariantTypeByID(variantId, value as ProductVariantType);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Varian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Warna">Warna</SelectItem>
              <SelectItem value="Ukuran">Ukuran</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-6">Opsi Variasi</label>
          {options.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <CustomInput
                label="Nama Opsi"
                placeholder={focusedIndex === index ? '' : 'Contoh: Merah, M, L, dll'}
                value={item.name}
                className="w-[450.5px]"
                onChange={(e) =>
                  updateProductVariantOptionByProductIDandOptionID(variantId, item.id, {
                    ...item,
                    name: e.target.value,
                    type: productVariantType,
                  })
                }
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                required
              />
              {options.length > 1 && (
                <Button
                  type="button"
                  variant="delete"
                  className="gap-2"
                  size="sm"
                  onClick={() => deleteOptionByProductIDandOptionID(variantId, item.id)}
                >
                  <Delete size={14} /> Hapus
                </Button>
              )}
            </div>
          ))}
        </div>
        {options.length < 10 && (
          <Button type="button" variant="outline" className="gap-2" onClick={handleAddOption}>
            <Plus size={14} />
            Tambah Opsi
          </Button>
        )}
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default ProductVariantOptions;
