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
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { Stepper } from '@/components/number-stepper/number-stepper';
import { BulkEditPopover } from '@/components/popover-menu/popover-menu';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { Text } from '@/components/text/text';
import { toast } from '@/components/toast/toast';
import { ArrowLeft, Check, Delete, FullSelection, Plus } from '@icon-park/react';
import cryptoRandomString from 'crypto-random-string';
import React, { useEffect, useState, useRef } from 'react';
import { useProductVariantStore } from '../store';
import {
  FormattedDatas,
  PricesVariantOption,
  ProductVariantStore,
  ProductVariants,
} from '../types';

type AddMultiPriceProps = {
  onSave: (data: ProductVariants) => void;
  initialData?: ProductVariants;
  onBack: () => void;
};

interface BulkPriceOption {
  id: string;
  unitName: string;
  quantity: number;
  price: number;
}

// Updated AddMultiPrice component dengan batch update pattern
const AddMultiPrice = ({ onSave, onBack }: AddMultiPriceProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [_selectedIds, setSelectedIds] = useState<string[]>([]);
  const {
    formattedData,
    updateFormattedDataPrices,
    clearFormattedData,
    clearAllData,
    setFinalData,
  } = useProductVariantStore() as ProductVariantStore & {
    updateFormattedDataPrices: (
      id: string,
      prices: PricesVariantOption[],
      typeprice: string
    ) => void;
    bulkUpdateFormattedDataPrices: (
      selectedIds: string[],
      prices: PricesVariantOption[],
      typeprice: string
    ) => void;
    clearFormattedData();
    clearAllData();
    setFinalData: (data: FormattedDatas) => void;
  };

  const [typePrice, setTypePrice] = useState<'Grosir' | 'Multi Kemasan'>('Multi Kemasan');

  // State untuk menyimpan data prices sementara (mirip dengan detailVariantRefs di AddDetailVariant)
  const [priceOptions, setPriceOptions] = useState<Record<string, PricesVariantOption[]>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Ref untuk menyimpan data dari setiap price card (mirip dengan AddDetailVariant)
  const priceVariantRefs = useRef<{ [key: string]: PricesVariantOption[] }>({});

  // Function to load existing price data from formattedData
  const loadExistingPriceData = () => {
    const existingPriceOptions: Record<string, PricesVariantOption[]> = {};
    let hasExistingData = false;

    for (const data of formattedData) {
      if (data.prices && data.prices.length > 0) {
        hasExistingData = true;
        existingPriceOptions[data.id] = data.prices.map((price) => ({
          id: price.id ?? cryptoRandomString({ length: 10 }),
          namePcs: price.namePcs ?? '',
          quantity: price.quantity ?? 1,
          price: price.price ?? 0,
        }));
      } else {
        // Initialize with one empty price option if no existing data
        existingPriceOptions[data.id] = [
          {
            id: cryptoRandomString({ length: 10 }),
            namePcs: '',
            quantity: 1,
            price: 0,
          },
        ];
      }
    }

    return { existingPriceOptions, hasExistingData };
  };

  // Initialize price options on component mount
  useEffect(() => {
    if (!isDataLoaded && formattedData.length > 0) {
      const { existingPriceOptions } = loadExistingPriceData();
      setPriceOptions(existingPriceOptions);
      // Initialize refs
      priceVariantRefs.current = { ...existingPriceOptions };
      setIsDataLoaded(true);
    }
  }, [formattedData, isDataLoaded, loadExistingPriceData]);

  // Function untuk handle perubahan input (hanya update state lokal, tidak langsung ke store)
  const handleInputChange = (
    optionID: string,
    priceIndex: number,
    field: keyof PricesVariantOption,
    inputValue: string | number
  ) => {
    setPriceOptions((prev) => {
      const currentPrices = prev[optionID] || [];
      const updatedPrices = [...currentPrices];

      if (!updatedPrices[priceIndex]) {
        updatedPrices[priceIndex] = {
          id: cryptoRandomString({ length: 10 }),
          namePcs: '',
          quantity: 1,
          price: 0,
        };
      }

      updatedPrices[priceIndex] = {
        ...updatedPrices[priceIndex],
        [field]: inputValue,
      };

      // Update refs untuk batch save nanti
      priceVariantRefs.current[optionID] = updatedPrices;

      return {
        ...prev,
        [optionID]: updatedPrices,
      };
    });
  };

  const handleAddPriceOption = (optionID: string) => {
    setPriceOptions((prev) => {
      const currentPrices = prev[optionID] || [];
      if (currentPrices.length >= 10) return prev; // Max 10 options

      const newPrice: PricesVariantOption = {
        id: cryptoRandomString({ length: 10 }),
        namePcs: '',
        quantity: 1,
        price: 0,
      };

      const updatedPrices = [...currentPrices, newPrice];

      // Update refs
      priceVariantRefs.current[optionID] = updatedPrices;

      return {
        ...prev,
        [optionID]: updatedPrices,
      };
    });
  };

  const handleRemovePriceOption = (optionID: string, priceIndex: number) => {
    setPriceOptions((prev) => {
      const currentPrices = prev[optionID] || [];
      const updatedPrices = currentPrices.filter((_, index) => index !== priceIndex);

      // Update refs
      priceVariantRefs.current[optionID] = updatedPrices;

      return {
        ...prev,
        [optionID]: updatedPrices,
      };
    });
  };

  // Bulk options state dan functions
  const [bulkoptions, setOptions] = useState<BulkPriceOption[]>([
    { id: crypto.randomUUID(), unitName: '', quantity: 1, price: 0 },
  ]);

  const updateOptionBulk = (id: string, field: keyof BulkPriceOption, value: string | number) => {
    setOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, [field]: value } : opt)));
  };

  const addOptionBulk = () => {
    setOptions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), unitName: '', quantity: 1, price: 0 },
    ]);
  };

  const removeOptionBulk = (id: string) => {
    setOptions((prev) => {
      if (prev.length <= 1) return prev; // jangan hapus jika hanya 1
      return prev.filter((opt) => opt.id !== id);
    });
  };

  // Function untuk handle bulk save dari dialog
  const handleBulkSave = () => {
    // Convert bulkoptions ke PricesVariantOption format
    const convertedPrices: PricesVariantOption[] = bulkoptions.map((option) => ({
      id: cryptoRandomString({ length: 10 }),
      namePcs: option.unitName,
      quantity: option.quantity,
      price: option.price,
    }));

    // Update state lokal untuk selected items
    setPriceOptions((prev) => {
      const updated = { ...prev };
      for (const id of _selectedIds) {
        updated[id] = [...convertedPrices];
        // Update refs juga
        priceVariantRefs.current[id] = [...convertedPrices];
      }
      return updated;
    });

    setDialogOpen(false);

    toast.success('Harga berhasil diterapkan!', {
      description: 'Harga telah berhasil diterapkan ke varian yang dipilih',
      className: 'bg-[#16a34a]',
    });
  };

  const handleRedirect = () => {
    clearFormattedData();
    clearAllData();
    window.location.href = '/dashboard/products/add';
  };

  // MAIN SAVE FUNCTION - Dipanggil dari button "Simpan/Update Varian Produk"
  const handleSave = () => {
    // Validasi
    const allValid = formattedData.every((variant) => {
      const prices = priceVariantRefs.current[variant.id] || [];
      return (
        prices.length > 0 &&
        prices.every(
          (opt) =>
            opt.namePcs &&
            opt.namePcs.trim() !== '' &&
            typeof opt.quantity === 'number' &&
            opt.quantity > 0 &&
            typeof opt.price === 'number' &&
            opt.price > 0
        )
      );
    });

    if (!allValid || !typePrice) {
      toast.error('Lengkapi semua harga dan jenis harga sebelum menyimpan', {
        description:
          'Pastikan semua varian memiliki harga, nama satuan, kuantitas, dan jenis harga sudah dipilih',
        className: 'bg-red-500 text-white',
      });
      return;
    }

    // Simpan prices ke Zustand
    for (const formattedItem of formattedData) {
      const prices = priceVariantRefs.current[formattedItem.id] || [];
      updateFormattedDataPrices(formattedItem.id, prices, typePrice);
    }

    // Ambil data terbaru dari Zustand (bukan dari variable formattedData lama)
    const latestFormattedData = useProductVariantStore.getState().formattedData;
    setFinalData(JSON.parse(JSON.stringify(latestFormattedData)));

    toast.success('Data berhasil disimpan!', {
      description: 'Semua harga varian telah berhasil disimpan',
      className: 'bg-[#16a34a]',
    });

    onSave(formattedData);
    handleRedirect();
  };

  return (
    <>
      <div className="p-[10px] flex flex-col gap-2">
        <div className="flex flex-row justify-between w-full gap-2">
          <div className="gap-4 flex flex-col">
            <Text size="md" className="font-semibold">
              Step 3: Atur Harga Multi Satuan
            </Text>
            <Text size="sm" className="text-gray-500">
              Silahkan isikan Harga untuk Varian yang akan Anda tambahkan
            </Text>
            <Text size="sm" className="text-[#F08181]">
              Form bertanda (*) harus diisi
            </Text>
            <Text size="md" className="font-semibold pt-2">
              Harga Multi Satuan
            </Text>
            <InformationText text="Penentuan harga sesuai dengan pengelompokan atau paket yang Anda tentukan:" />
            <ul className="list-disc pl-10 space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-semibold">Multi Kemasan</span>
                <div className="text-gray-600">
                  Harga jual dianggap terpisah untuk tiap satuan yang dibeli
                </div>
              </li>
              <li>
                <span className="font-semibold">Grosir</span>
                <div className="text-gray-600">Harga berubah sesuai jumlah pembelian minimal</div>
              </li>
            </ul>
            <RadioGroup
              defaultValue={typePrice}
              onValueChange={(val) => setTypePrice(val as 'Grosir' | 'Multi Kemasan')}
              className="flex flex-row gap-2 mt-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="option-1" value="Multi Kemasan" />
                <Label htmlFor="option-1">Multi Kemasan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="option-2" value="Grosir" />
                <Label htmlFor="option-2">Grosir</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <BulkEditPopover
              variants={formattedData}
              triggerButtonText="Isi Harga Secara Massal"
              triggerButtonIcon={<FullSelection size={14} />}
              triggerButtonClassName="bg-white hover:bg-grey-700 text-[#555555] px-4 py-2 rounded-md border border-[#c2c7d0]"
              title="Pilih Varian"
              description="Silahkan pilih varian untuk diisikan datanya secara massal"
              actionButtonLabel="Lanjut Isi Harga Secara Massal"
              position="bottom-right"
              onUpdate={(selectedIds) => {
                setSelectedIds(selectedIds);
                setDialogOpen(true);
              }}
            />

            {/* Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="w-[636px] max-w-none h-auto">
                <DialogHeader>
                  <DialogTitle className="text-[#555555]">Isi Harga Secara Massal</DialogTitle>
                  <DialogDescription className="pt-4">
                    Silahkan isikan Harga Multi Satuan untuk Varian yang akan Anda tambahkan
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {bulkoptions.map((option) => (
                    <div key={option.id}>
                      <div className="flex flex-row gap-4">
                        <CustomInput
                          required
                          label="Nama Satuan"
                          placeholder="cth: single"
                          value={option.unitName}
                          onChange={(e) => updateOptionBulk(option.id, 'unitName', e.target.value)}
                          isWidthFull
                        />
                        <Stepper
                          label="Kuantity"
                          readOnly
                          required
                          value={option.quantity}
                          onChange={(val: number) => updateOptionBulk(option.id, 'quantity', val)}
                        />
                        <CustomInput
                          label="Nominal Harga"
                          currency
                          prependText="Rp"
                          placeholder="0"
                          required
                          value={option.price}
                          onChange={(e) =>
                            updateOptionBulk(option.id, 'price', parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div>
                        {bulkoptions.length > 1 && (
                          <Button
                            type="button"
                            variant="delete"
                            size="sm"
                            onClick={() => removeOptionBulk(option.id)}
                            disabled={bulkoptions.length === 1}
                          >
                            <Delete size={14} /> Hapus
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <DialogFooter className="sm:justify-between">
                  <Button type="button" variant="outline" onClick={addOptionBulk}>
                    <Plus size={14} /> Opsi Harga
                  </Button>
                  <Button variant="success" onClick={handleBulkSave}>
                    Simpan dan Terapkan Harga <Check size={14} />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div>
        {formattedData.map((data) => {
          const optionPrices = priceOptions[data.id] || [];
          return (
            <Card key={`${data.id}`} className="m-4">
              <CardHeader className="text-lg font-semibold border-b border-gray-300 group flex flex-row justify-between items-center text-[#555555]">
                <div className="flex items-center gap-2">{data.name}</div>
              </CardHeader>
              <CardContent className="space-y-4 pt-3">
                {optionPrices.map((priceOption, priceIndex) => (
                  <div key={priceOption.id} className="space-y-2">
                    <div className="flex flex-row gap-4 items-end">
                      <CustomInput
                        required
                        label="Nama Satuan"
                        placeholder="cth: single"
                        isWidthFull
                        value={priceOption.namePcs || ''}
                        onChange={(e) =>
                          handleInputChange(data.id, priceIndex, 'namePcs', e.target.value)
                        }
                      />
                      <Stepper
                        label="Kuantity"
                        readOnly
                        required
                        value={priceOption.quantity || 1}
                        onChange={(val) => handleInputChange(data.id, priceIndex, 'quantity', val)}
                      />
                      <CustomInput
                        required
                        label="Nominal Harga"
                        placeholder="0"
                        currency
                        prependText="Rp"
                        value={priceOption.price || 0}
                        onChange={(e) =>
                          handleInputChange(
                            data.id,
                            priceIndex,
                            'price',
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div>
                      {optionPrices.length > 1 && (
                        <Button
                          type="button"
                          variant="delete"
                          size="sm"
                          onClick={() => handleRemovePriceOption(data.id, priceIndex)}
                        >
                          <Delete size={14} /> Hapus
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddPriceOption(data.id)}
                  disabled={optionPrices.length >= 10}
                >
                  <Plus size={14} /> Opsi Harga {optionPrices.length >= 10 && '(Maksimal 10)'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft size={14} /> Kembali ke Detail Varian
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="success">
                {loadExistingPriceData().hasExistingData ? 'Update' : 'Simpan'} Varian Produk{' '}
                <Check size={14} />
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
                    handleSave(); // MAIN SAVE FUNCTION - ini yang memicu semua update ke store
                    handleRedirect();
                  }}
                >
                  Ya, Saya Yakin
                </Button>
              </DialogFooter>
              <DialogClose />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AddMultiPrice;
