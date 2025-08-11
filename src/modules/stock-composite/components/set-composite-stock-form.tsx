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
import { useEffect } from 'react';

export function SetCompositeStockForm() {
  const { showSuccess, showError } = useToast();

  const {
    org,
    control,
    errors,
    getValues,
    handleCancel,
    saveCompositeStock,
    saveError,
    saveResult,
    isSaving,
    openSaveDialogComposite,
    totalInitialStock,
    productionPerBatch,
    productMixes,
    setOpenSaveDialogComposite,
  } = useCompositeStockForm();

  const onClickSave = () => {
    setOpenSaveDialogComposite(true);
  };

  const onConfirmDialog = () => {
    const values = getValues();
    saveCompositeStock(values);
    setOpenSaveDialogComposite(false);
  };

  useEffect(() => {
    if (saveError) {
      showError('Gagal!', typeof saveError === 'string' ? saveError : 'Gagal menyimpan data');
    }
    if (saveResult) {
      showSuccess('Sukses!', 'Stok awal berhasil disimpan');
    }
  }, [saveError, saveResult, showError, showSuccess]);

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
              <StockDateInput control={control} errors={errors} />
              <OtherCostInput control={control} errors={errors} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">Tujuan Pengisian Stok</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="font-bold">Organisasi:</span>
                <div> {org ? `#${org.id || '-'} - ${org.name || '-'}` : '-'}</div>
              </div>
              <div>
                <SupplierDropdown
                  name="toko"
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
                  <ProductMixTable mixes={productMixes} />
                  <div className="mt-4 flex flex-row gap-8">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Jumlah Produksi per Batch
                      </span>
                      <div className="font-semibold">{productionPerBatch}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Harga Beli</span>
                      <div className="font-semibold">Rp. 12.000</div>
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
                name="expiredDate"
                label="Tanggal Kedaluwarsa"
              />
            </div>
            <div className="mb-6">
              <TotalInitialStock total={totalInitialStock} />
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCancel} className="h-11">
                Kembali ke Tambah Produk
              </Button>
              <Button type="button" className="h-11" onClick={onClickSave}>
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
        onConfirm={onConfirmDialog}
        onCancel={handleCancel}
        loading={isSaving}
      />
    </>
  );
}
