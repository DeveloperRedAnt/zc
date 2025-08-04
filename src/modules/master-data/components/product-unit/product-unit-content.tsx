'use client';

import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import ProductUnitConfirmDialog from '@/modules/master-data/components/product-unit/confirm-dialog';
import ProductUnitFormDialog from '@/modules/master-data/components/product-unit/form-dialog';
import TableList from '@/modules/master-data/components/product-unit/table-list';
import { Unit } from '@/modules/master-data/types/unit';
import { Plus } from '@icon-park/react';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const [nameUnit, setNameUnit] = useState('');

  const handleEditButton = useCallback((unit: Unit) => {
    setIsEditMode(true);
    setSelectedUnit(unit);
    setNameUnit(unit.name);
    setDialogFormOpen(true);
  }, []);

  const handleAddButton = useCallback(() => {
    setIsEditMode(false);
    setSelectedUnit(null);
    setNameUnit('');
    setDialogFormOpen(true);
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    toast.success('Tersimpan!', {
      description: 'Unit Produk Anda telah berhasil tersimpan',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedUnit) {
      setNameUnit(selectedUnit.name);
    } else {
      setNameUnit('');
    }
  }, [isEditMode, selectedUnit]);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Unit Produk </p>
            </div>
          </div>
          <div>
            <Button variant="outline" type="button" onClick={handleAddButton}>
              <Plus />
              Tambah Unit
            </Button>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Unit dari produk yang Anda daftarkan (cth: ml, L, g)" />

          <TableList handleEditButton={handleEditButton} />

          <ProductUnitFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            onConfirm={() => {
              setDialogConfirmOpen(true);
              setDialogFormOpen(false);
            }}
            handleResetForm={handleResetForm}
            nameUnit={nameUnit}
            setNameUnit={setNameUnit}
          />

          <ProductUnitConfirmDialog
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
