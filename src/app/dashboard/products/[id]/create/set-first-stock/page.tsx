'use client';

import * as DTO from '@/__generated__/api/dto';
import { useSetFirstStock } from '@/__generated__/api/hooks/product.hooks';
import { useStore, useSuppliers } from '@/__generated__/api/hooks/supplier.hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DatePicker } from '@/components/datepicker/date-picker';
import CustomInput from '@/components/input/custom-input';
import { DialogFirstStock } from '@/modules/products/components/dialog-first-stock';
import SupplierPicker, { SupplierOptionType } from '@/modules/products/components/supplier-picker';
import { firstStockSchema } from '@/modules/products/constants';
import type { FirstStockForm } from '@/modules/products/constants';
import { useOrganizationStore } from '@/store/organization-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from '@icon-park/react';
import { Loader2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Index() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  // State
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierOptionType | null>(null);
  const [otherCost, setOtherCost] = useState<number>(0);
  const [noteNumber, setNoteNumber] = useState('');
  const [selectedStore, setSelectedStore] = useState<SupplierOptionType | null>(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [formData, setFormData] = useState<FirstStockForm | null>(null);
  const [openSaveDialogFirstStock, setOpenSaveDialogFirstStock] = useState(false);

  const organization = useOrganizationStore.getState().organization;

  // Supplier search & pagination state
  const [supplierSearch, setSupplierSearch] = useState('');
  const [supplierPage, setSupplierPage] = useState(1);

  // Store search & pagination state
  const [storeSearch, setStoreSearch] = useState('');
  const [storePage, setStorePage] = useState(1);

  // Tanstack query
  const { data: suppliersData, isLoading: isSuppliersLoading } = useSuppliers(
    supplierPage,
    supplierSearch
  );
  const { data: storesData, isLoading: isStoresLoading } = useStore(
    Number(storePage),
    10,
    'name',
    'asc',
    storeSearch
  );

  const TokoLoadOption = async (
    search: string,
    _prev: readonly SupplierOptionType[],
    additional: { page?: number } | undefined
  ) => {
    setStoreSearch(search);
    const page = additional?.page ?? 1;
    setStorePage(page);
    const allSuppliers = storesData?.data ?? [];

    const options: SupplierOptionType[] = allSuppliers.map(
      (supplier: {
        id: number;
        name: string;
        pic?: string;
        phone?: string;
        created_at?: string;
      }) => ({
        value: supplier.id,
        label: supplier.name,
        data: {
          id: supplier.id,
          name: supplier.name,
          pic: supplier.pic ?? '',
          phone: supplier.phone ?? '',
          created_at: supplier.created_at ?? '',
        },
      })
    );

    const hasMore =
      !!suppliersData?.pagination &&
      suppliersData.pagination.current_page < suppliersData.pagination.last_page;
    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    };
  };

  // Supplier loadOptions for AsyncPaginate
  const supplierLoadOptions = async (
    search: string,
    _prev: readonly SupplierOptionType[],
    additional: { page?: number } | undefined
  ) => {
    setSupplierSearch(search);
    const page = additional?.page ?? 1;
    setSupplierPage(page);

    const allSuppliers = suppliersData?.data ?? [];

    const options: SupplierOptionType[] = allSuppliers.map(
      (supplier: {
        id: number;
        name: string;
        pic?: string;
        phone?: string;
        created_at?: string;
      }) => ({
        value: supplier.id,
        label: supplier.name,
        data: {
          id: supplier.id,
          name: supplier.name,
          pic: supplier.pic ?? '',
          phone: supplier.phone ?? '',
          created_at: supplier.created_at ?? '',
        },
      })
    );
    const hasMore =
      !!suppliersData?.pagination &&
      suppliersData.pagination.current_page < suppliersData.pagination.last_page;

    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    };
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FirstStockForm>({
    resolver: zodResolver(firstStockSchema),
    defaultValues: {
      firstStock: 0,
      buyPrice: 0,
      expiredDate: undefined,
      purchaseDate: undefined,
      store: 0,
    },
  });

  const purchaseDate = watch('purchaseDate');
  const expiredDate = watch('expiredDate');

  const onSubmit = (data: FirstStockForm) => {
    setFormData(data);
    setOpenSaveDialogFirstStock(true);
  };

  const handleCancel = () => setOpenSaveDialogFirstStock(false);

  const { mutate: mutationForStockFirstProduct } = useSetFirstStock({
    onSuccess: () => {
      toast.success('Tersimpan!', {
        description: 'Produk Anda telah berhasil disimpan',
        className: 'bg-[#16a34a]',
      });
      setTimeout(() => router.push('/dashboard/product'), 2000);
      setOpenSaveDialogFirstStock(false);
      setIsLoadingButton(true);
    },
    onError: () => {
      setOpenSaveDialogFirstStock(false);
      toast.error('Gagal menyimpan produk');
    },
    onSettled: () => {
      setIsLoadingButton(false);
    },
  });

  const saveFirstStock = async () => {
    if (!formData) return;
    setOpenSaveDialogFirstStock(false);
    setIsLoadingButton(true);

    const payload: DTO.InitializeStockRequestSchema = {
      store_id: Number(selectedStore?.value ?? 1),
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
      'x-device-id': localStorage.getItem('x-device-id') || '',
      'x-store-id': localStorage.getItem('x-store-id') || '',
      'x-organization-id': localStorage.getItem('x-store-id') || '',
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
          <p className="text-red mt-1 mb-1">Form bertanda (*) harus diisi</p>
          <div className="mt-6">
            <div className="border-b-gray-200 pb-4">
              <p>Supplier dan Biaya Lain-Lain (Opsional)</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                <div className="flex flex-col gap-6" style={{ marginTop: '-4px' }}>
                  <DatePicker
                    mode="single"
                    label="Tanggal Pembelian"
                    className="border-[#C2C7D0] h-10"
                    value={purchaseDate}
                    placeholder="dd/mm/yyyy"
                    onChange={(date) => setValue('purchaseDate', date as Date)}
                    mandatory="false"
                    closeOnSelect={true}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <SupplierPicker
                    label="Supplier"
                    loadOptions={supplierLoadOptions}
                    value={selectedSupplier}
                    onChange={setSelectedSupplier}
                    placeholder="Pilih Supplier"
                    isLoading={isSuppliersLoading}
                    className="border-[#C2C7D0] h-10"
                    isClearable
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
                  <p>{organization ? `#${organization.id} - ${organization.name}` : '-'}</p>
                </div>
                <div className="flex flex-col mt-2">
                  <SupplierPicker
                    label="Toko"
                    loadOptions={TokoLoadOption}
                    value={selectedStore}
                    onChange={(val) => {
                      setSelectedStore(val);
                      setValue('store', val?.value ? Number(val.value) : 0);
                    }}
                    placeholder="Pilih Toko"
                    isLoading={isStoresLoading}
                    required
                    className="border-[#C2C7D0] h-10"
                    isClearable
                  />
                  {errors.store && (
                    <span className="text-red-500 text-xs mt-1">{errors.store.message}</span>
                  )}
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
                      required: 'Harga Beli wajib diisi',
                      setValueAs: (v) => {
                        if (typeof v === 'string') {
                          const cleaned = v.replace(/,/g, '');
                          const num = Number(cleaned);
                          return Number.isNaN(num) ? undefined : num;
                        }
                        if (typeof v === 'number') return v;
                        return undefined;
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
                    className="h-12"
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
