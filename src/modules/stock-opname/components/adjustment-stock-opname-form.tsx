'use client';

import React, { useRef, useState } from 'react';

import * as DTO from '@/__generated__/api/dto';
import {
  useAdjustmentStockTakings,
  useCheckStockBaik,
} from '@/__generated__/api/hooks/product.hooks';
import { Button } from '@/components/button/button';
import { DialogConfirm } from '@/components/dialog-confirm/dialog-confirm';
import CustomInput from '@/components/input/custom-input';
import { ProductOptionType } from '@/components/product-picker/product-picker';
import StoreFilterComposable from '@/components/store-filter/store-filter-composable';
import { useStockOpnameStore } from '@/modules/stock-opname/store/stock-opname.store';
import { Check, Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { DialogStockExceed } from './dialog-stock-exceed';
import StockOpnameItem from './stock-opname-item';

interface StockOpnameItemData {
  id: string;
  selectedProduct: ProductOptionType | null;
  stockValue: string;
}

interface FormErrors {
  keperluan: string;
  store: string;
  items: { [key: string]: { product: string; stock: string } };
}

export default function AdjustmentStockOpnameForm() {
  const [stockItems, setStockItems] = useState<StockOpnameItemData[]>([
    {
      id: '1',
      selectedProduct: null,
      stockValue: '',
    },
  ]);
  const [selectedStore, setSelectedStore] = useState<{ id: number | string; name: string } | null>(
    null
  );
  const [keperluan, setKeperluan] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({
    keperluan: '',
    store: '',
    items: {},
  });
  const [isDialogSaveStock, toggleDialogSaveStock] = useState(false);
  const [isDialogMaximumExceedReason, toggleDialogMaximumExceedReason] = useState(false);
  const [stockBaikItems, setStockBaikItems] = useState<DTO.CheckStockBaikItems | null>(null);
  const [stockExceeds, setStockExceeds] = useState<DTO.StockBaikDataItem[]>([]);
  const [tempId, setTempId] = useState<string>('');
  const router = useRouter();

  // Persistent store for saving categorized stock opname by a temporary id
  const setStockOpnameById = useStockOpnameStore((s) => s.setById);

  const { mutate: checkStockBaik, isPending: checkStockBaikLoading } = useCheckStockBaik();
  const { mutate: fetchAdjustStockOpname, isPending: adjustStockOpnameLoading } =
    useAdjustmentStockTakings();

  // Refs for scrolling to error fields
  const keperluanRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

    // Clear item errors when updated
    if (errors.items[id]) {
      const newItemErrors = { ...errors.items };
      const itemErr = newItemErrors[id] ?? { product: '', stock: '' };
      if (field === 'selectedProduct' && value) {
        itemErr.product = '';
      }
      if (field === 'stockValue' && value) {
        itemErr.stock = '';
      }
      newItemErrors[id] = itemErr;

      // Remove item error if both fields are cleared
      if (!newItemErrors[id].product && !newItemErrors[id].stock) {
        delete newItemErrors[id];
      }

      setErrors((prev) => ({ ...prev, items: newItemErrors }));
    }
  };

  const handleStoreChange = (
    _storeId: number | string | null,
    store: { value: number | string; data: { name: string } } | null
  ) => {
    if (store) {
      setSelectedStore({
        id: store.value,
        name: store.data.name,
      });
    } else {
      setSelectedStore(null);
    }

    if (store) {
      setErrors((prev) => ({ ...prev, store: '' }));
    }
  };

  const scrollToFirstError = () => {
    // Check keperluan first
    if (errors.keperluan && keperluanRef.current) {
      keperluanRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Check store
    if (errors.store && storeRef.current) {
      storeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Check items in order
    for (const item of stockItems) {
      if (errors.items[item.id] && itemRefs.current[item.id]) {
        itemRefs.current[item.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  };

  const goToReasonForm = ({ id }: { id: string }) => {
    router.push(`/stock-opname/adjustment/${id}/reason`);
  };

  const createStockOpnameBasedOnPreviousCheck = () => {
    const incoming_equal_to_system_stock = (
      stockBaikItems?.incoming_equal_to_system_stock ?? []
    ).map((item) => {
      return {
        product_id: Number(item.product_id),
        product_variant_id: Number(item.product_variant_id),
        stock: {
          system_stock: Number(item.stock.system_stock),
          physical_stock: Number(item.stock.physical_stock),
          difference: Number(item.stock.difference),
        },
      };
    });
    const incoming_less_than_system_stock = (
      stockBaikItems?.incoming_less_than_system_stock ?? []
    ).map((item) => {
      return {
        product_id: Number(item.product_id),
        product_variant_id: Number(item.product_variant_id),
        stock: {
          system_stock: Number(item.stock.system_stock),
          physical_stock: Number(item.stock.physical_stock),
          difference: Number(item.stock.difference),
          reasons: [] as { stock: number; reason: string }[],
        },
      };
    });

    fetchAdjustStockOpname({
      body: {
        note: keperluan,
        store_id: Number(selectedStore?.id),
        incoming_equal_to_system_stock,
        incoming_less_than_system_stock,
      },
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      keperluan: '',
      store: '',
      items: {},
    };

    // Validate keperluan
    if (!keperluan.trim()) {
      newErrors.keperluan = 'Stock opname purpose is required';
    }

    // Validate store
    if (!selectedStore) {
      newErrors.store = 'Store must be selected';
    }

    // Validate stock items
    for (const item of stockItems) {
      const itemErrors = { product: '', stock: '' };

      if (!item.selectedProduct) {
        itemErrors.product = 'Product must be selected';
      }

      if (!item.stockValue.trim()) {
        itemErrors.stock = 'Good stock is required';
      } else {
        const stockNumber = Number(item.stockValue);
        if (Number.isNaN(stockNumber)) {
          itemErrors.stock = 'Good stock must be a valid number';
        } else if (stockNumber < 0) {
          itemErrors.stock = 'Good stock cannot be negative';
        } else if (!Number.isInteger(stockNumber)) {
          itemErrors.stock = 'Good stock must be a whole number';
        }
      }

      if (itemErrors.product || itemErrors.stock) {
        newErrors.items[item.id] = itemErrors;
      }
    }

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors =
      newErrors.keperluan || newErrors.store || Object.keys(newErrors.items).length > 0;

    // If there are errors, scroll to first error after a brief delay for state update
    if (hasErrors) {
      setTimeout(scrollToFirstError, 100);
      return false;
    }

    return !hasErrors;
  };

  const showStockExceedsModal = ({ id, data }: { id: string; data: DTO.CheckStockBaikItems }) => {
    setStockExceeds(data.incoming_greater_than_system_stock ?? []);
    setStockOpnameById(id, data, {
      store_id: Number(selectedStore?.id),
      note: keperluan,
    });

    toggleDialogMaximumExceedReason(true);
    setTempId(id);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      checkStockBaik(
        {
          body: {
            note: keperluan,
            store_id: Number(selectedStore?.id),
            items: stockItems.map((item) => {
              const itemValue = item.selectedProduct?.value.split(';');
              const variantId = itemValue?.[0];
              const productId = itemValue?.[1];
              return {
                product_id: Number(productId),
                product_variant_id: Number(variantId),
                physical_stock: Number(item.stockValue),
              };
            }),
          },
        },
        {
          onSuccess: (data: DTO.CheckStockBaikItems) => {
            setStockBaikItems(data);

            const tempId = Date.now().toString();
            if (data) {
              const hasGreaterThanSystem =
                (data.incoming_greater_than_system_stock?.length ?? 0) > 0;
              const hasLessThanSystem = (data.incoming_less_than_system_stock?.length ?? 0) > 0;
              const hasEqualToSystem = (data.incoming_equal_to_system_stock?.length ?? 0) > 0;
              const hasWithoutInitialStock = (data.incoming_without_initial_stock?.length ?? 0) > 0;

              // // jika ada stok baik > stok sistem && ada stok baik < stok sistem
              if (hasGreaterThanSystem && hasLessThanSystem) {
                return showStockExceedsModal({ id: tempId, data });
              }

              // // jika stok baik > stok sistem
              if (hasGreaterThanSystem) {
                return showStockExceedsModal({ id: tempId, data });
              }

              // // jika stok baik < stok sistem
              if (hasLessThanSystem) {
                setStockBaikItems(data);
                setStockOpnameById(tempId, data, {
                  store_id: Number(selectedStore?.id),
                  note: keperluan,
                });
                return router.push(`/dashboard/stock-opname/adjust/${tempId}/reason`);
              }

              // jika tidak ada stock baik > sistem dan stok baik < sistem dan stok baik sama dengan stok sistem dan ada stok yang tidak ada initial stock
              if (
                !hasGreaterThanSystem &&
                !hasLessThanSystem &&
                !hasEqualToSystem &&
                hasWithoutInitialStock
              ) {
                return toggleDialogSaveStock(true);
              }
            }
          },
          onError: (_e) => {
            toggleDialogMaximumExceedReason(true);
          },
        }
      );
    }
  };

  const handleKeperluanChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeperluan(e.target.value);

    // Clear error when user starts typing
    if (errors.keperluan) {
      setErrors((prev) => ({ ...prev, keperluan: '' }));
    }
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
            <div className="flex flex-col" ref={keperluanRef}>
              <label className="text-sm font-medium text-gray-700 mb-2">
                Keperluan Opname <span className="text-red-500">*</span>
              </label>
              <CustomInput
                className="border-[#C2C7D0] h-10 min-w-[21rem]"
                placeholder="Opname Agustus"
                isWidthFull
                value={keperluan}
                onChange={
                  handleKeperluanChange as React.ChangeEventHandler<HTMLInputElement> &
                    React.ChangeEventHandler<HTMLTextAreaElement>
                }
              />
              {errors.keperluan && <p className="text-red-500 text-xs mt-1">{errors.keperluan}</p>}
            </div>
            <div className="flex flex-col" ref={storeRef}>
              <label className="text-sm font-medium text-gray-700 mb-2">
                Untuk Toko <span className="text-red-500">*</span>
              </label>
              <StoreFilterComposable
                selectedStore={selectedStore}
                onChangeSelect={handleStoreChange}
                placeholder="Pilih Toko"
                className="h-10 w-[14rem]"
                showLabel={false}
              />
              {errors.store && <p className="text-red-500 text-xs mt-1">{errors.store}</p>}
            </div>
          </div>

          {stockItems.map((item) => {
            const itemError = errors.items[item.id];
            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
              >
                <StockOpnameItem
                  selectedProduct={item.selectedProduct}
                  onProductChange={(product) =>
                    updateStockItem(item.id, 'selectedProduct', product)
                  }
                  stockValue={item.stockValue}
                  onStockChange={(value) => updateStockItem(item.id, 'stockValue', value)}
                  onDelete={() => removeStockItem(item.id)}
                  productError={itemError?.product}
                  stockError={itemError?.stock}
                />
              </div>
            );
          })}

          <Button type="button" variant="outline" onClick={addStockItem} className="h-11">
            <Plus className="h-4 w-4" /> Tambah Produk
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-end mt-8">
          <Button type="button" variant="outline" onClick={() => {}} className="h-11">
            Kembali ke List Stok Opname
          </Button>
          <Button
            type="button"
            className="btn-succes h-11"
            onClick={handleSubmit}
            isLoading={checkStockBaikLoading}
          >
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
        onConfirm={() => {
          createStockOpnameBasedOnPreviousCheck();
        }}
        onCancel={() => toggleDialogSaveStock(false)}
        isLoading={adjustStockOpnameLoading}
      />

      <DialogStockExceed
        openClose={isDialogMaximumExceedReason}
        cancelText="Batal"
        confirmText="Ya Saya Yakin"
        onConfirm={() => {
          if ((stockBaikItems?.incoming_less_than_system_stock?.length ?? 0) > 0) {
            goToReasonForm({ id: tempId });
          }

          if ((stockBaikItems?.incoming_greater_than_system_stock?.length ?? 0) > 0) {
            createStockOpnameBasedOnPreviousCheck();
          }

          if (stockBaikItems) {
            createStockOpnameBasedOnPreviousCheck();
          }
        }}
        stockExceeds={stockExceeds}
        onCancel={() => toggleDialogMaximumExceedReason(false)}
        isLoading={adjustStockOpnameLoading}
      />
    </>
  );
}
