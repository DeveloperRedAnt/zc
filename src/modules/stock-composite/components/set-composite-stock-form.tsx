import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { useToast } from '@/components/toast/toast';
import { Toaster } from '@/components/toast/toast';
import { DialogFirstStock } from '@/modules/products/components/dialog-first-stock';
import { BatchStockInput } from '@/modules/stock-composite/components/batch-stock-input';
import { OtherCostInput } from '@/modules/stock-composite/components/other-cost-input';
import { ProductMixTable } from '@/modules/stock-composite/components/product-mix-table';
import { StockDateInput } from '@/modules/stock-composite/components/stock-date-input';
import { SupplierDropdown } from '@/modules/stock-composite/components/supplier-dropdown';
import { TotalInitialStock } from '@/modules/stock-composite/components/total-initial-stock';
import { useCompositeStockForm } from '@/modules/stock-composite/hooks/use-other-cost-input';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function SetCompositeStockForm() {
  const { showSuccess, showError } = useToast();
  const params = useParams();
  const router = useRouter();
  const productId = params?.id ? Number(params.id) : 0;

  const {
    org,
    control,
    errors,
    handleSubmit,
    handleCancel,
    saveCompositeStock,
    purchase_price,
    saveError,
    saveResult,
    isSaving,
    openSaveDialogComposite,
    totalInitialStock,
    productionPerBatch,
    productMixes,
    setOpenSaveDialogComposite,
    isLoading,
    error,
    productMixesPayload,
  } = useCompositeStockForm(productId);

  useEffect(() => {
    if (saveError) {
      showError('Gagal!', typeof saveError === 'string' ? saveError : 'Gagal menyimpan data');
    }
    if (saveResult) {
      showSuccess('Sukses!', 'Stok awal berhasil disimpan');
      router.push('/dashboard/products');
    }
  }, [saveError, saveResult, showError, showSuccess, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  const handleOpenDialog = () => {
    setOpenSaveDialogComposite(true);
  };

  const handleSave = (values: typeof control._defaultValues) => {
    const { other_cost, store_id, stock_date } = values;

    const note = `INIT-STOCK-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;

    // Helper untuk format tanggal
    const formatDate = (date?: Date | string) => {
      if (!date) return '';
      if (typeof date === 'string') return date.slice(0, 10);
      return date.toISOString().slice(0, 10);
    };

    const products = productMixesPayload.map((mix) => {
      const production_per_batch = Number(productionPerBatch);
      const stock_batch_realization = Number(values.batch_stock);

      return {
        product_id: Number(mix.product_id),
        product_variant_id: Number(mix.product_variant_id),
        store_id: Number(values.store_id),
        production_per_batch,
        stock_batch_realization,
        quantity: production_per_batch * stock_batch_realization,
        purchase_price: Number(purchase_price),
        purchase_date: formatDate(values.stock_date),
        expired_at: formatDate(values.expired_date),
      };
    });

    const payload = {
      product_type: 'composite' as const,
      stock_date: formatDate(stock_date),
      other_cost: Number(other_cost) || 0,
      note,
      stock_reason_code_id: 1,
      type: 'in' as const,
      products,
    };
    saveCompositeStock({ body: payload, store_id: Number(store_id) });
    setOpenSaveDialogComposite(false);
  };

  return (
    <>
      <Toaster />
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Atur Stok Awal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-muted-foreground">
              Silahkan isikan Stok untuk Produk yang akan Anda tambahkan
              <br />
              <span className="text-destructive">Form bertanda (*) harus diisi</span>
              <div className="text-muted-foreground mt-3">
                Tanggal Stok dan Biaya Lain-Lain (Opsional)
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <StockDateInput
                control={control}
                errors={errors}
                label="Tanggal Stok"
                name="stock_date"
              />
              <OtherCostInput control={control} errors={errors} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">Tujuan Pengisian Stok</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="font-bold">Organisasi:</span>
                <div>{org ? `#${org.id || '-'} - ${org.name || '-'}` : '-'}</div>
              </div>
              <div>
                <SupplierDropdown
                  name="store_id"
                  label="Toko"
                  required
                  control={control}
                  errors={errors}
                />
              </div>
            </div>
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stok Awal Produk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 font-semibold">Produk Paduan</div>
                  <ProductMixTable
                    mixes={productMixes.map((mix) => ({ ...mix, qty: String(mix.qty) }))}
                  />
                  <div className="mt-4 flex flex-row gap-8">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Jumlah Produksi per Batch
                      </span>
                      <div className="font-semibold">{productionPerBatch}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Harga Beli</span>
                      <div className="font-semibold">{purchase_price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 min-w-0">
              <BatchStockInput control={control} errors={errors} />
              <StockDateInput
                control={control}
                errors={errors}
                name="expired_date"
                label="Tanggal Kedaluwarsa"
              />
            </div>
            <div className="mb-6">
              <TotalInitialStock total={totalInitialStock ?? 0} />
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-11"
                disabled={isSaving}
              >
                Kembali ke Tambah Produk
              </Button>
              <Button
                type="button"
                className="bg-primary h-11"
                onClick={handleSubmit(handleOpenDialog)}
                disabled={isSaving}
              >
                Simpan Produk
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <DialogFirstStock
        openClose={openSaveDialogComposite}
        title="Konfirmasi Stok Awal"
        description="Apakah Anda yakin ingin menyimpan stok awal ini?"
        cancelText="Batal"
        confirmText="Ya Saya Yakin"
        onConfirm={handleSubmit(handleSave)}
        onCancel={handleCancel}
        loading={isSaving}
      />
    </>
  );
}
