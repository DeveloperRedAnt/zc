'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DatePicker } from '@/components/datepicker/date-picker';
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
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Input } from '@/components/input/input';
import { toast } from '@/components/toast/toast';
import { Check } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import {
//   createColumnHelper,
// } from '@tanstack/react-table';

// interface ProductData {
//   product: string;
//   quantity: string;
// }

// const columnHelper = createColumnHelper<ProductData>();

// const baseColumns = [
//   columnHelper.accessor('product', {
//     header: 'Produk yang dipadukan',
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('quantity', {
//     header: 'Jumlah yang dibutuhkan',
//     cell: (info) => info.getValue(),
//   }),
// ];

// const PaduanProductData = [
//   {
//     product: 'ParKaos Combed 34 cm (Merah - Small)acetamol',
//     quantity: '0 pcs',
//   },
//   {
//     product: 'Kopi Gato - 250ml',
//     quantity: '0 botol',
//   },
// ];

// type StockItem = {
//   store: string;
//   firstStock: number;
//   buyPrice: number;
//   expiredDate: Date | undefined;
// };

// const initialStock: StockItem = {
//   store: '',
//   firstStock: 0,
//   buyPrice: 0,
//   expiredDate: undefined,
// };

// const variantList = [
//   'Merah - Small',
//   'Merah - Medium',
// ];

const optionsSupplier: OptionType[] = [
  { label: 'CV. Damri Sejahtera', value: 1 },
  { label: 'PT. Nasmoco Indonesia Terjaya', value: 5 },
  { label: 'Toko Semar Jaya Malibu', value: 7 },
  { label: 'Sheeran Company Limited', value: 10 },
];

export default function Index() {
  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState<Date | undefined>(undefined);
  const [selectedExpiredDate, setSelectedExpiredDate] = useState<Date | undefined>(undefined);

  const [selectedSupplier, setSelectedSupplier] = useState<OptionType | null>(null);
  const router = useRouter();

  // const table = useReactTable({
  //     data: PaduanProductData,
  //     columns: baseColumns,
  //     getCoreRowModel: getCoreRowModel(),
  //     getFilteredRowModel: getFilteredRowModel(),
  //     getPaginationRowModel: getPaginationRowModel(),
  //     getSortedRowModel: getSortedRowModel(),
  //     state: {},
  // });

  // const [dataStock, setDataStock] = useState(() =>
  //     Object.fromEntries(variantList.map((v) => [v, [initialStock]]))
  // );

  // const handleAddStock = (variant: string) => {
  //     setDataStock((prev) => ({
  //         ...prev,
  //         [variant]: [...(prev[variant] ?? []), initialStock],
  //     }));
  // };

  // const handleRemoveStock = (variant: string, index: number) => {
  //     setDataStock((prev) => ({
  //         ...prev,
  //         [variant]: (prev[variant] ?? []).filter((_, i) => i !== index),
  //     }));
  // };

  // const handleChange = (variant: string, index: number, field: keyof StockItem, value: string | number | Date | undefined) => {
  //     setDataStock((prev) => {
  //         const list = [...(prev[variant] ?? [])];

  //         const updatedItem: StockItem = {
  //         ...initialStock,
  //         ...list[index],
  //         [field]: value,
  //         };

  //         list[index] = updatedItem;

  //         return {
  //         ...prev,
  //         [variant]: list,
  //         };
  //     });
  // };

  // const [selectedStore, setSelectedStore] = useState<OptionType | null>(null);

  return (
    <>
      <Card className="my-[1rem] px-2">
        <CardHeader className="border-b">
          <CardTitle className="text-[1rem]"> Atur Stok Awal </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <form>
            <p> Silahkan isikan Stok untuk Produk yang akan Anda tambahkan </p>
            <p className="text-[#F08181]"> Form bertanda (*) harus diisi </p>
            <div className="mt-6">
              <div className="border-b border-[#C2C7D0] pb-4">
                <p> Supplier dan Biaya Lain-Lain (Opsional) </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                  <div className="flex flex-col gap-6">
                    <DatePicker
                      mode="single"
                      label="Tanggal Pembelian"
                      value={selectedPurchaseDate}
                      placeholder="dd/mm/yyyy"
                      onChange={(date) => setSelectedPurchaseDate(date as Date | undefined)}
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <Dropdown
                      label="Supplier"
                      options={optionsSupplier}
                      value={selectedSupplier}
                      onChange={setSelectedSupplier}
                      placeholder="Pilih supplier"
                      className="mt-2"
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <CustomInput
                      currency
                      className="border-[#C2C7D0] mt-1"
                      placeholder="0"
                      prependText="Rp"
                      inputNumber
                      isWidthFull
                      label="Biaya Lain-lain"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="block">No. Nota</label>
                    <Input type="text" placeholder="cth: AA112233" />
                  </div>
                </div>
              </div>
              <div className="border-b border-[#C2C7D0] py-8">
                <p> Tujuan Pengisian Stok </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                  <div className="flex flex-col mt-2">
                    <p className="font-[600] mb-2"> Organisasi: </p>
                    <p> #1155230ASA5 - PT Mencari Cinta Sejati </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Dropdown
                      label="Toko"
                      options={optionsSupplier}
                      value={selectedSupplier}
                      onChange={setSelectedSupplier}
                      placeholder="Pilih Toko"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-[#C2C7D0] py-8">
                <p> Stok Awal Produk </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                  <div className="flex flex-col">
                    <CustomInput
                      className="border-[#C2C7D0]"
                      placeholder="0"
                      inputNumber
                      isWidthFull
                      label="Stok Awal"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <CustomInput
                      currency
                      className="border-[#C2C7D0]"
                      placeholder="0"
                      prependText="Rp"
                      inputNumber
                      isWidthFull
                      label="Harga Beli"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <DatePicker
                      mode="single"
                      label="Tanggal Kedaluwarsa"
                      value={selectedExpiredDate}
                      placeholder="dd/mm/yyyy"
                      onChange={(date) => setSelectedExpiredDate(date as Date | undefined)}
                      mandatory="true"
                    />
                  </div>
                </div>
              </div>

              {/* STOK AWAL VARIAN -- JANGAN DIHAPUS */}
              {/* <div className="border-b border-[#C2C7D0] py-8">
                            <p> Stok Awal Produk </p>
                            <div className="space-y-8">
                                {variantList.map((variant) => (
                                    <Card key={variant} className='text-[#555555] px-2 my-[1rem]'>
                                        <CardHeader className='border-b border-[#C2C7D0]'>
                                            <CardTitle className='text-[1rem]'> {variant} </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 text-sm">
                                            {dataStock[variant]?.map((stock, index) => (
                                            <>
                                            <div key={index}>
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-2">
                                                    <div className="flex flex-col gap-6">
                                                        <Dropdown
                                                            label="Toko"
                                                            options={optionsStore}
                                                            value={optionsStore.find((opt) => opt.value === stock.store) || null}
                                                            onChange={(selected) => handleChange(variant, index, 'store', selected?.value ?? '')}
                                                            placeholder="Pilih supplier"
                                                            className="mt-2"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-6">
                                                        <CustomInput
                                                            className='border-[#C2C7D0]'
                                                            placeholder="cth: Kopi Arabica"
                                                            inputNumber
                                                            required
                                                            label='Stok Awal'
                                                            onChange={(e) => handleChange(variant, index, 'firstStock', e.target.value)}
                                                            value={stock.firstStock}
                                                            isWidthFull
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-6">
                                                        <CustomInput
                                                            value={stock.buyPrice}
                                                            onChange={(e) => handleChange(variant, index, 'buyPrice', e.target.value)}
                                                            prependText="Rp"
                                                            inputNumber
                                                            label='Harga Beli'
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-6">
                                                        <DatePicker
                                                            mode="single"
                                                            label="Tanggal Kedaluwarsa"
                                                            value={stock.expiredDate}
                                                            placeholder="dd/mm/yyyy"
                                                            onChange={(date) => {
                                                                if (date instanceof Date || date === undefined) {
                                                                handleChange(variant, index, 'expiredDate', date);
                                                                }
                                                            }}
                                                            mandatory="true"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    {(dataStock[variant]?.length ?? 0) > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            className="text-[#F08181] ml-[1px] flex items-center"
                                                            onClick={() => handleRemoveStock(variant, index)}
                                                        >
                                                            <Delete size="20" fill="#F08181" className="" />
                                                            Hapus
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            </>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="mt-2"
                                                onClick={() => handleAddStock(variant)}
                                            >
                                                <Plus /> Stok Toko Lain
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    ))}
                            </div>
                        </div> */}
              {/* END STOK AWAL VARIAN -- JANGAN DIHAPUS */}

              {/* STOK AWAL PADUAN -- JANGAN DIHAPUS */}
              {/* <div className="border-b border-[#C2C7D0] pb-4">
                             <p> Tanggal Stok dan Biaya Lain-Lain (Opsional) </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                                <div className="flex flex-col gap-6">
                                    <DatePicker
                                        mode="single"
                                        label="Tanggal Stok"
                                        value={selectedStockDate}
                                        placeholder="dd/mm/yyyy"
                                        onChange={(date) => setSelectedStockDate(date as Date | undefined)}
                                    />
                                </div>
                                <div className="flex flex-col gap-6">
                                    <CustomInput 
                                        currency 
                                        className='border-[#C2C7D0]' 
                                        placeholder="0" 
                                        prependText="Rp"
                                        inputNumber
                                        isWidthFull
                                        label="Biaya Lain-lain"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-[#C2C7D0] py-8">
                            <p> Tujuan Pengisian Stok </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                                <div className="flex flex-col mt-2">
                                    <p className='mb-2'> Organisasi: </p>
                                    <p> #1155230ASA5 - PT Mencari Cinta Sejati </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <Dropdown
                                        label="Toko"
                                        options={optionsSupplier}
                                        value={selectedSupplier}
                                        onChange={setSelectedSupplier}
                                        placeholder="Pilih Toko"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-[#C2C7D0] py-8">
                            <p> Stok Awal Produk </p>
                            <Card className='text-[#555555] px-2 my-[1rem]'>
                                <CardHeader className='border-b border-[#C2C7D0] flex-row flex justify-between items-center'>
                                    <CardTitle className='text-[1rem]'> Produk Paduan </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 text-sm">
                                    <div className="mt-4">
                                        <DataTable width="100%" table={table} isLoading={false} />
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8">
                                            <div className="flex flex-col gap-2">
                                                <div className='font-semibold'> Jumlah Produksi per Batch: </div> 5
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className='font-semibold'> Harga Beli </div> Rp 15.000
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="border-b border-[#C2C7D0] py-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
                                <div className="flex flex-col">
                                    <CustomInput 
                                        className='border-[#C2C7D0]' 
                                        placeholder="0" 
                                        inputNumber
                                        isWidthFull
                                        label="Stok Batch"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <DatePicker
                                        mode="single"
                                        label="Tanggal Kedaluwarsa"
                                        value={selectedExpiredDate}
                                        placeholder="dd/mm/yyyy"
                                        onChange={(date) => setSelectedExpiredDate(date as Date | undefined)}
                                        mandatory="true"
                                        className=''
                                    />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <div className='font-semibold'> Jumlah Stok Awal Produk: </div> 0
                            </div>
                        </div> */}
              {/* END STOK AWAL PADUAN */}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 ml-[1px] flex items-center"
                  onClick={() => router.push('/dashboard/product/add')}
                >
                  Kembali ke Tambah Produk
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 ml-[1px] flex items-center"
                    >
                      Simpan Produk
                      <Check />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle> Anda akan menyimpan Produk </DialogTitle>
                      <DialogDescription className="pt-4">
                        Apakah Anda yakin akan menyimpan produk tersebut?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Tidak</Button>
                      </DialogClose>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          toast.success('Tersimpan!', {
                            description: 'Produk Anda telah berhasil disimpan',
                            className: 'bg-[#16a34a]',
                          });
                        }}
                      >
                        Ya, Saya Yakin
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
