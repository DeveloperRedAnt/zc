'use client';

import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import InputFile from '@/components/input/input-file';
import { BulkEditPopover } from '@/components/popover-menu/popover-menu';
import { Text } from '@/components/text/text';
import { toast } from '@/components/toast/toast';
import { ArrowLeft, ArrowRight, Check, FullSelection } from '@icon-park/react';
import cryptoRandomString from 'crypto-random-string';
import React, { useState, useRef } from 'react';
import { useProductVariantStore } from '../store';
import { FormattedDatas } from '../types';
import type { FormattedData as FormattedDataType, ProductVariants } from '../types';
import DetailVariantList from './detail-variant-list';
import type { ProductCardValue } from './detail-variant-list';

type DetailData = FormattedDataType;

interface AddDetailVariantProps {
  onBack: () => void;
  onSaveDetail: (data: DetailData[]) => void;
}

import type { PricesVariantOption } from '../types';
// Define the expected option type for variant options
interface ProductVariantOption {
  name: string;
  barcode?: string;
  sku?: string;
  minStock?: number;
  thumbnail?: string;
  prices?: PricesVariantOption[];
}

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
    };
  });
};

const AddDetailVariant: React.FC<AddDetailVariantProps> = ({ onBack, onSaveDetail }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [_selectedIds, setSelectedIds] = useState<string[]>([]);
  const [FormattedData, setFormattedVariants] = useState<FormattedDataType[]>([]);

  // Ref untuk menyimpan data dari setiap DetailVariantList
  const detailVariantRefs = useRef<{ [key: string]: ProductCardValue }>({});

  const { productVariants, formattedData, setFormattedData, updateFormattedData } =
    useProductVariantStore() as {
      productVariants: ProductVariants;
      formattedData: FormattedDataType[];
      setFormattedData: (data: FormattedDataType[]) => void;
      updateFormattedData: (id: string, data: Partial<FormattedDataType>) => void;
    };

  const variantsData = productVariants.map((variant) => ({
    type: variant.type ?? '',
    options: variant.options || [],
  }));

  React.useEffect(() => {
    if (variantsData.length > 0 && variantsData.some((v) => v.options.length > 0)) {
      const formatted = createVariantCombinations(variantsData);
      setFormattedVariants(formatted);
      setFormattedData(formatted);
    }
  }, [variantsData, setFormattedData]);

  // Callback untuk menerima data dari DetailVariantList
  const handleDetailVariantChange = (id: string, values: ProductCardValue) => {
    detailVariantRefs.current[id] = values;
  };

  const handleSave = () => {
    // Validasi semua field harus terisi
    const allValid = FormattedData.every((formattedItem) => {
      const cardValue = detailVariantRefs.current[formattedItem.id];
      return (
        cardValue?.file &&
        cardValue.barcode &&
        cardValue.sku &&
        cardValue.minStock !== undefined &&
        cardValue.minStock !== null &&
        cardValue.minStock !== 0
      );
    });

    if (!allValid) {
      toast.error('Lengkapi semua detail varian sebelum melanjutkan', {
        description:
          'Pastikan Anda mengisi thumbnail, barcode, SKU, dan stok minimum untuk semua varian',
        className: 'bg-red-500 text-white',
      });
      return;
    }

    for (const formattedItem of FormattedData) {
      const cardValue = detailVariantRefs.current[formattedItem.id];
      if (cardValue) {
        updateFormattedData(formattedItem.id, {
          name: formattedItem.name,
          thumbnail: cardValue.file,
          barcode: cardValue.barcode,
          sku: cardValue.sku,
          minStock: cardValue.minStock,
          prices: [],
          typeprice: '',
        });
      }
    }

    toast.success('Data berhasil disimpan!', {
      description: 'Semua detail varian telah berhasil disimpan',
      className: 'bg-[#16a34a]',
    });

    onSaveDetail(formattedData);
  };

  return (
    <>
      <div className="p-[10px] flex flex-col gap-2">
        <div className="flex flex-row justify-between w-full gap-2">
          <div>
            <Text size="md" className="font-semibold text-[#555555]">
              Step 2 - Detail Varian
            </Text>
            <Text size="sm" className="text-gray-500">
              Silahkan isikan Detail untuk Varian yang akan Anda tambahkan
            </Text>
            <Text size="sm" className="text-[#F08181]">
              Form bertanda (*) harus diisi
            </Text>
          </div>
          <div>
            <BulkEditPopover
              variants={FormattedData}
              triggerButtonText="Isi Detail Secara Massal"
              triggerButtonIcon={<FullSelection size={14} />}
              triggerButtonClassName="bg-white hover:bg-grey-700 text-[#555555] px-4 py-2 rounded-md border border-[#c2c7d0]"
              title="Pilih Varian"
              description="Silahkan pilih varian untuk diisikan datanya secara massal"
              actionButtonLabel="Lanjut Isi Detail Secara Massal"
              position="bottom-right"
              onUpdate={(selectedIds) => {
                setSelectedIds(selectedIds);
                setDialogOpen(true);
              }}
            />
            {/* Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="w-[636px] max-w-none h-[676px]">
                <DialogHeader>
                  <DialogTitle className="text-[#555555]">Isi Detail Secara Massal</DialogTitle>
                  <DialogDescription className="pt-4">
                    Silahkan isikan Detail untuk Varian yang akan Anda tambahkan
                  </DialogDescription>
                </DialogHeader>
                <InputFile label="Unggah Thumbnail" accept="image/*" onChange={(_e) => {}} />
                <Text className="text-[#555555]">Angka Awal Barcode (3-6 angka)</Text>
                <InformationText
                  text="Barcode akan diisikan secara berurut dengan awalan nomor yang Anda isikan. <br/>contoh: <br/>
                <ul>
                  <li>Anda mengisikan <strong>'123'</strong></li>
                  <li>Jika Barcode tersedia, maka nomor yang akan di-generate pada barcode adalah <strong>'1231, 1232, dst.'</strong> atau melanjutkan angka yang sudah ada</li>
                </ul>"
                />
                <CustomInput placeholder="cth: 123" onChange={(_e) => {}} />
                <Text className="text-[#555555]">Peringatan Stok Minimum</Text>
                <InformationText text="Penentuan peringatan minimum sebelum stok produk habis" />
                <CustomInput appendText="Produk" placeholder="0" />
                <DialogFooter>
                  <Button
                    variant="success"
                    onClick={() => {
                      toast.success('Tersimpan!', {
                        description: 'Produk Anda telah berhasil disimpan',
                        className: 'bg-[#16a34a]',
                      });
                      setDialogOpen(false);
                    }}
                  >
                    Simpan dan Terapkan Detail <Check size={14} />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {FormattedData.map((data) => {
        return (
          <DetailVariantList
            key={data.id}
            formattedData={data || []}
            onChange={(values) => handleDetailVariantChange(data.id, values)}
          />
        );
      })}
      <div className="mt-2 flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft size={14} /> Kembali ke Varian Produk
          </Button>
          <Button type="button" variant="info" onClick={handleSave}>
            Simpan dan Atur Harga Multi Satuan <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddDetailVariant;
