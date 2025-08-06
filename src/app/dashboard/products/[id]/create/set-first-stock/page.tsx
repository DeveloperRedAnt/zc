'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import * as DTO from '@/__generated__/api/dto';
import { useSetFirstStock, useStockDetail } from '@/__generated__/api/hooks/product.hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DatePicker } from '@/components/datepicker/date-picker';
import { OptionType } from '@/components/dropdown/dropdown';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { DialogFirstStock } from '@/modules/products/components/dialog-first-stock';
import { SetFirstStockSkeleton } from '@/modules/products/components/skeleton-first-stock';
import { firstStockSchema } from '@/modules/products/constants';
import type { FirstStockForm } from '@/modules/products/constants';
import { optionsStore, optionsSupplier } from '@/modules/products/types';
import { Check } from '@icon-park/react';
import { Loader2Icon } from 'lucide-react';

export default function Index() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  // State untuk dropdown, input, dan dialog
  const [selectedSupplier, setSelectedSupplier] = useState<OptionType | null>(null);
  const [otherCost, setOtherCost] = useState<number>(0);
  const [noteNumber, setNoteNumber] = useState('');
  const [selectedStore, setSelectedStore] = useState<OptionType | null>(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [formData, setFormData] = useState<FirstStockForm | null>(null);
  const [openSaveDialogFirstStock, setOpenSaveDialogFirstStock] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FirstStockForm>({
    resolver: zodResolver(firstStockSchema),
    defaultValues: {
      firstStock: 0,
      buyPrice: 0,
      expiredDate: undefined,
      purchaseDate: undefined,
    },
  });

  // Ambil value tanggal dari form
  const purchaseDate = watch('purchaseDate');
  const expiredDate = watch('expiredDate');

  const onSubmit = (data: FirstStockForm) => {
    setFormData(data);
    setOpenSaveDialogFirstStock(true);
  };

  const handleCancel = () => setOpenSaveDialogFirstStock(false);

  // API
  const { data: stockDetail, isLoading } = useStockDetail({
    product_id: Number(productId),
    'x-device-id': '1',
    'x-store-id': '1',
    'x-organization-id': '1',
  });

  const { mutate: mutationForStockFirstProduct } = useSetFirstStock({
    onSuccess: () => {
      toast.success('Tersimpan!', {
        description: 'Produk Anda telah berhasil disimpan',
        className: 'bg-[#16a34a]',
      });
      setOpenSaveDialogFirstStock(false);
      setTimeout(() => router.push('/dashboard/product/add'), 2000);
    },
    onError: () => {
      toast.error('Gagal menyimpan produk');
    },
    onSettled: () => {
      setIsLoadingButton(false);
    },
  });

  // Reset form saat edit (data dari API)
  useEffect(() => {
    if (stockDetail) {
      reset({
        firstStock: stockDetail.firstStock ?? 0,
        buyPrice: stockDetail.buyPrice ?? 0,
        expiredDate: stockDetail.expiredDate ? new Date(stockDetail.expiredDate) : undefined,
        purchaseDate: stockDetail.purchaseDate ? new Date(stockDetail.purchaseDate) : undefined,
      });
      setSelectedSupplier(
        stockDetail.supplier
          ? { label: stockDetail.supplier.name, value: stockDetail.supplier.id }
          : null
      );
      setOtherCost(stockDetail.otherCost ?? 0);
      setNoteNumber(stockDetail.noteNumber ?? '');
      setSelectedStore(
        stockDetail.store ? { label: stockDetail.store.name, value: stockDetail.store.id } : null
      );
    }
  }, [stockDetail, reset]);

  if (isLoading) return <SetFirstStockSkeleton />;

  const saveFirstStock = async () => {
    if (!formData) return;
    setIsLoadingButton(true);

    const payload: DTO.InitializeStockRequestSchema = {
      supplier_id: Number(selectedSupplier?.value ?? 0),
      other_cost: Number(otherCost),
      note: noteNumber,
      type: DTO.StockType.IN,
      stock_reason_code_id: 1,
      products: [
        {
          product_id: Number(productId),
          product_variant_id: 1,
          quantity: formData.firstStock ?? 0,
          purchase_price: formData.buyPrice ?? 0,
          expired_at: formData.expiredDate ? formData.expiredDate.toISOString().slice(0, 10) : '',
        },
      ],
    };
    mutationForStockFirstProduct({
      body: payload,
      'x-device-id': '1', // Replace with actual device id if available
      'x-store-id': String(selectedStore?.value ?? 1), // Use store id from selection
      'x-organization-id': '1', // Replace with actual organization id if available
    });
  };

  return (
    <Card className="my-[1rem] px-2">
      <CardHeader className="border-b">
        <CardTitle className="text-[1rem]">Atur Stok Awal</CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Silahkan isikan Stok untuk Produk yang akan Anda tambahkan</p>
          <p className="text-[#F08181]">Form bertanda (*) harus diisi</p>
          <div className="mt-6">
            <div className="border-b-gray-200 pb-4">
              <p>Supplier dan Biaya Lain-Lain (Opsional)</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                <div className="flex flex-col gap-6" style={{ marginTop: '-4px' }}>
                  <DatePicker
                    mode="single"
                    label="Tanggal Pembelian *"
                    className="border-[#C2C7D0] h-10"
                    value={purchaseDate}
                    placeholder="dd/mm/yyyy"
                    onChange={(date) => setValue('purchaseDate', date as Date)}
                    mandatory="true"
                    closeOnSelect={true}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <Dropdown
                    label="Supplier"
                    options={optionsSupplier}
                    value={selectedSupplier}
                    onChange={setSelectedSupplier}
                    placeholder="Pilih supplier"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <CustomInput
                    currency
                    className="border-[#C2C7D0] h-10"
                    placeholder="0"
                    prependText="Rp"
                    inputNumber
                    isWidthFull
                    value={otherCost}
                    label="Biaya Lain-lain"
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/,/g, ''));
                      setOtherCost(Number.isNaN(val) ? 0 : val);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <CustomInput
                    className="border-[#C2C7D0] h-10"
                    placeholder="cth: AA112233"
                    value={noteNumber}
                    label="Nomor Nota"
                    isWidthFull
                    onChange={(e) => setNoteNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="border-b-gray-200 py-8">
              <p>Tujuan Pengisian Stok</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                <div className="flex flex-col mt-2">
                  <p className="font-[600] mb-2">Organisasi:</p>
                  <p>
                    {stockDetail?.organization
                      ? `#${stockDetail.organization.id} - ${stockDetail.organization.name}`
                      : '-'}
                  </p>
                </div>
                <div className="flex flex-col mt-2">
                  <Dropdown
                    label="Toko"
                    options={optionsStore}
                    value={selectedStore}
                    onChange={setSelectedStore}
                    placeholder="Pilih Toko"
                    className="mt-2 h-10"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="border-b-gray-200 py-8">
              <p>Stok Awal Produk</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="flex flex-col">
                  <CustomInput
                    {...register('firstStock', { valueAsNumber: true })}
                    className="border-[#C2C7D0] h-10"
                    placeholder="0"
                    inputNumber
                    isWidthFull
                    label="Stok Awal"
                    required
                  />
                  {errors.firstStock && (
                    <span className="text-red-500 text-xs mt-1">{errors.firstStock.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  <CustomInput
                    {...register('buyPrice', {
                      setValueAs: (v) => {
                        if (typeof v === 'string') {
                          const cleaned = v.replace(/,/g, '');
                          const num = Number(cleaned);
                          return Number.isNaN(num) ? undefined : num;
                        }
                        return v;
                      },
                    })}
                    currency
                    className="border-[#C2C7D0] h-10"
                    placeholder="0"
                    prependText="Rp"
                    inputNumber
                    isWidthFull
                    label="Harga Beli"
                    required
                  />
                  {errors.buyPrice && (
                    <span className="text-red-500 text-xs mt-1" style={{ marginTop: '-20px' }}>
                      {errors.buyPrice.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  <DatePicker
                    mode="single"
                    className="h-10"
                    label="Tanggal Kedaluwarsa"
                    value={expiredDate ?? null}
                    placeholder="dd/mm/yyyy"
                    onChange={(date) => setValue('expiredDate', date as Date)}
                    mandatory="true"
                    closeOnSelect={true}
                  />
                  {errors.expiredDate && (
                    <span className="text-red-500 text-xs mt-1">{errors.expiredDate.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                className="mt-2 ml-[1px] flex items-center h-10"
                onClick={() => router.push('/dashboard/product/add')}
                disabled={isLoadingButton}
              >
                Kembali ke Tambah Produk
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="mt-2 ml-[1px] flex items-center h-10 btn-succes"
                disabled={isLoadingButton}
              >
                {isLoadingButton ? (
                  <Loader2Icon className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    Simpan Produk
                    <Check />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <DialogFirstStock
        openClose={openSaveDialogFirstStock}
        title="Konfirmasi Stok Awal"
        description="Apakah Anda yakin ingin menyimpan stok awal ini?"
        cancelText="Batal"
        confirmText="Ya Saya Yakin"
        onConfirm={saveFirstStock}
        onCancel={handleCancel}
      />
    </Card>
  );
}
