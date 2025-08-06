'use client';

import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import ProductVariantConfirmDialog from '@/modules/master-data/components/product-variant/confirm-dialog';
import ProductVariantFormDialog from '@/modules/master-data/components/product-variant/form-dialog';
import TableList from '@/modules/master-data/components/product-variant/table-list';
import { Variant } from '@/modules/master-data/types/variant';
import { Plus } from '@icon-park/react';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const [nameVariant, setNameVariant] = useState('');

  const handleEditButton = useCallback((variant: Variant) => {
    setIsEditMode(true);
    setSelectedVariant(variant);
    setNameVariant(variant.name);
    setDialogFormOpen(true);
  }, []);

  const handleAddButton = useCallback(() => {
    setIsEditMode(false);
    setSelectedVariant(null);
    setNameVariant('');
    setDialogFormOpen(true);
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    toast.success('Tersimpan!', {
      description: 'Varian Produk Anda telah berhasil tersimpan',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedVariant) {
      setNameVariant(selectedVariant.name);
    } else {
      setNameVariant('');
    }
  }, [isEditMode, selectedVariant]);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Varian Produk </p>
            </div>
          </div>
          <div>
            <Button variant="outline" type="button" onClick={handleAddButton}>
              <Plus />
              Tambah Varian
            </Button>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Untuk mengatur pilihan varian produk" />

          <TableList handleEditButton={handleEditButton} />

          <ProductVariantFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            onConfirm={() => {
              setDialogConfirmOpen(true);
              setDialogFormOpen(false);
            }}
            handleResetForm={handleResetForm}
            nameVariant={nameVariant}
            setNameVariant={setNameVariant}
          />

          <ProductVariantConfirmDialog
            isOpen={dialogConfirmOpen}
            onOpenChange={setDialogConfirmOpen}
            isEditMode={isEditMode}
            onCancel={() => {
              setDialogConfirmOpen(false);
              setDialogFormOpen(true);
            }}
            onConfirm={handleConfirmSubmit}
          />
        </div>
      </div>
    </>
  );
}
