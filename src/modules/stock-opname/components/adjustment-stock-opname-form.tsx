'use client';

import React, { useState } from 'react';

import { Button } from '@/components/button/button';
import { DialogConfirm } from '@/components/dialog-confirm/dialog-confirm';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { optionsStore } from '@/modules/products/types';
import { Check, Plus } from '@icon-park/react';
import { DialogStockExceed } from './dialog-stock-exceed';
import StockOpnameItem from './stock-opname-item';

interface StockOpnameItemData {
  id: string;
  selectedProduct: { label: string; value: string | number } | null;
  stockValue: string;
}

export default function AdjustmentStockOpnameForm() {
  const [stockItems, setStockItems] = useState<StockOpnameItemData[]>([
    {
      id: '1',
      selectedProduct: null,
      stockValue: '',
    },
  ]);
  const [isDialogSaveStock, toggleDialogSaveStock] = useState(false);
  const [isDialogMaximumExceedReason, toggleDialogMaximumExceedReason] = useState(false);

  const addStockItem = () => {
    const newItem: StockOpnameItemData = {
      id: Date.now().toString(),
      selectedProduct: null,
      stockValue: '',
    };
    setStockItems([...stockItems, newItem]);
  };

  const removeStockItem = (id: string) => {
    setStockItems(stockItems.filter((item) => item.id !== id));
  };

  const updateStockItem = (
    id: string,
    field: keyof StockOpnameItemData,
    value: StockOpnameItemData[keyof StockOpnameItemData]
  ) => {
    setStockItems(stockItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <>
      <div className="px-2">
        <div>
          <p className="text-sm font-semibold">Tanggal Opname:</p>
          <p className="text-sm mt-2">30/12/2024</p>
        </div>

        <div className="mt-6">
          <div className="flex flex-row gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Keperluan Opname <span className="text-red-500">*</span>
              </label>
              <CustomInput
                className="border-[#C2C7D0] h-10 min-w-[21rem]"
                placeholder="Opname Agustus"
                isWidthFull
                // Add form control here
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Untuk Toko <span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={optionsStore}
                value={null}
                onChange={() => {}}
                placeholder="PT Ezhe Source"
                className="h-10 w-[14rem]"
                required
              />
            </div>
          </div>

          {stockItems.map((item) => (
            <StockOpnameItem
              key={item.id}
              productOptions={[]} // Add product options here
              selectedProduct={item.selectedProduct}
              onProductChange={(product) => updateStockItem(item.id, 'selectedProduct', product)}
              stockValue={item.stockValue}
              onStockChange={(value) => updateStockItem(item.id, 'stockValue', value)}
              onDelete={() => removeStockItem(item.id)}
            />
          ))}

          <Button type="button" variant="outline" onClick={addStockItem} className="h-11">
            <Plus className="h-4 w-4" /> Tambah Produk
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-end mt-8">
          <Button type="button" variant="outline" onClick={() => {}} className="h-11">
            Kembali ke List Stok Opname
          </Button>
          <Button type="submit" className="btn-succes h-11">
            Proses Stok Opname
            <Check className="ml-1" />
          </Button>
        </div>
      </div>
      <DialogConfirm
        openClose={isDialogSaveStock}
        title="Anda akan menyimpan Stok Opname"
        description="Apakah Anda yakin akan menyimpan data Stok Opname tersebut?"
        cancelText="Batal"
        confirmText="Ya Saya Yakin"
        onConfirm={() => {}}
        onCancel={() => toggleDialogSaveStock(false)}
      />

      <DialogStockExceed
        openClose={isDialogMaximumExceedReason}
        cancelText="Batal"
        confirmText="Ya Saya Yakin"
        onConfirm={() => {}}
        onCancel={() => toggleDialogMaximumExceedReason(false)}
      />
    </>
  );
}
