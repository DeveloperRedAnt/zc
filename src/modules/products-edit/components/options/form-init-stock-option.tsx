import {
  ProductDetail,
  StoreVariantProduct,
  StoreVariantRequest,
} from '@/__generated__/api/dto/set-variant-stock.dto';
import { usePostStoreVariant } from '@/__generated__/api/hooks/set_variant_stock.hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { Label } from '@/components/label/label';

import { useEditVariantStockForm } from '@/modules/products-edit/hooks/useEditVariantStockForm';
import { DialogStockFirst } from './stock-variant/stock-dialog-first';

import { StockEntryList } from './stock-variant/stock-entry-list';
import { SupplierSection } from './stock-variant/stock-supplier-section';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface StockVariantPageProps {
  productData?: ProductDetail; // Use ProductDetail instead of ProductData
}

export function StockVariantPage({ productData }: StockVariantPageProps) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    purchaseDate,
    setPurchaseDate,
    supplier,
    setSupplier,
    otherCosts,
    setOtherCosts,
    invoiceNumber,
    setInvoiceNumber,
    errors,
    validateForm,
    handleRemoveStockEntry,
    handleStockEntryChange,
    setStockEntriesFromProductDetail,
    handleAddStockToVariant,
    getEntriesByVariant,
    getVariantTitle,
    getFormDataForAPI,
    variants,
  } = useEditVariantStockForm(productData);

  // TanStack Query mutation hook
  const storeVariantMutation = usePostStoreVariant({
    onSuccess: (data) => {
      if (data.code === 201 && data.status === 'success') {
        toast.success('Tersimpan!', {
          description: 'Data stok variant telah tersimpan dengan sukses.',
          className: 'bg-[#16a34a]',
        });
        setOpenDialog(false);
        router.push('/dashboard/products');
      }
    },
    onError: (error) => {
      toast.error('Gagal menyimpan stock variant!', {
        description: `Terjadi kesalahan: ${error.message}`,
        className: 'bg-[#dc2626]',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setOpenDialog(true);
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      const apiData = getFormDataForAPI();
      const defaultDate = new Date().toISOString().split('T')[0];
      const requestBody: StoreVariantRequest = {
        supplier_id: apiData.supplier_id || 1,
        other_cost: apiData.other_cost || 0,
        note:
          apiData.note || `INIT-STOCK-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        stock_reason_code_id: apiData.stock_reason_code_id || 1,
        type: 'in',
        products: (apiData.products || []).map(
          (product): StoreVariantProduct => ({
            store_id: product.store_id,
            product_id: product.product_id,
            product_variant_id: product.product_variant_id ?? 0,
            quantity: product.quantity,
            purchase_price: product.purchase_price,
            expired_at: (product.expired_at ?? defaultDate) as string,
          })
        ),
      };
      storeVariantMutation.mutate(requestBody);
    } catch (error) {
      console.error('Error preparing data:', error);
    }
  };

  const handleCancelSubmit = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setStockEntriesFromProductDetail();
  }, [setStockEntriesFromProductDetail]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-4">Stok Awal Produk</CardTitle>
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
              Silahkan isikan Stok untuk Produk yang akan Anda tambahkan
            </Label>
            <h6 className="text-red-500">Form bertanda(*) harus diisi</h6>
          </div>
          <h3 className="text-lg font-semibold mb-4 mt-3">
            Supplier dan Biaya Lain-Lain (Opsional)
          </h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <SupplierSection
              purchaseDate={purchaseDate}
              setPurchaseDate={setPurchaseDate}
              supplier={supplier}
              setSupplier={setSupplier}
              otherCosts={otherCosts}
              setOtherCosts={setOtherCosts}
              invoiceNumber={invoiceNumber}
              setInvoiceNumber={setInvoiceNumber}
              errors={errors}
            />

            {/* Group entries per variant */}
            {variants?.map((variant) => {
              const variantEntries = getEntriesByVariant(variant.id);
              const variantTitle = getVariantTitle(variant.attributes);

              return (
                <div key={variant.id} className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{variantTitle}</h3>
                    <p className="text-sm text-gray-500">SKU: {variant.sku_code}</p>
                  </div>
                  <StockEntryList
                    stockEntries={variantEntries}
                    errors={errors}
                    onRemove={handleRemoveStockEntry}
                    onChange={handleStockEntryChange}
                    onAdd={() => handleAddStockToVariant(variant.id)}
                    variantId={variant.id}
                    showAddButton={true}
                  />
                </div>
              );
            })}
            <div className="flex gap-2 mt-6 justify-end">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Kembali ke Tambah Produk
              </Button>
              <Button type="submit" variant="primary" disabled={storeVariantMutation.isPending}>
                {storeVariantMutation.isPending ? 'Menyimpan...' : 'Simpan Produk'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <DialogStockFirst
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={
          <>
            Anda akan menyimpan <strong>Stock Variant</strong>
          </>
        }
        description="Apakah Anda yakin akan menyimpan stock variant tersebut?"
        confirmText="Ya, Saya Yakin"
        cancelText="Tidak"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
        isLoading={storeVariantMutation.isPending}
        disabled={false}
        variant="info"
      />
    </>
  );
}
