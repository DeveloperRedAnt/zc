'use client';

import {
  useCreateUnitProductMasterData,
  useUpdateUnitProductMasterData,
} from '@/__generated__/api/hooks/master-data/unit-product.hooks';
import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import ProductUnitConfirmDialog from '@/modules/master-data/components/product-unit/confirm-dialog';
import ProductUnitFormDialog from '@/modules/master-data/components/product-unit/form-dialog';
import TableList from '@/modules/master-data/components/product-unit/table-list';
import { Unit } from '@/modules/master-data/types/unit';
import { Plus } from '@icon-park/react';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const [nameUnit, setNameUnit] = useState('');
  const [nameUnitError, setNameUnitError] = useState('');

  const { mutate: createUnit } = useCreateUnitProductMasterData();
  const { mutate: updateUnit } = useUpdateUnitProductMasterData();
  const queryClient = useQueryClient();

  const handleEditButton = useCallback((unit: Unit) => {
    setIsEditMode(true);
    setSelectedUnit(unit);
    setNameUnit(unit.unit_name);
    setDialogFormOpen(true);
    setNameUnitError('');
  }, []);

  const handleAddButton = useCallback(() => {
    setIsEditMode(false);
    setSelectedUnit(null);
    setNameUnit('');
    setDialogFormOpen(true);
    setNameUnitError('');
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    const payload = { unit_name: nameUnit };

    const onSuccess = () => {
      queryClient.invalidateQueries({
        queryKey: ['getUnitProductList'],
      });

      setDialogConfirmOpen(false);
      setDialogFormOpen(false);
      setSelectedUnit(null);
      setIsEditMode(false);

      toast.success('Tersimpan!', {
        description: 'Unit Produk Anda telah berhasil tersimpan',
      });
    };

    if (isEditMode && selectedUnit) {
      updateUnit(
        {
          id: selectedUnit.id,
          unit_name: nameUnit,
        },
        { onSuccess }
      );
    } else {
      createUnit(payload, {
        onSuccess,
        onError: (error: unknown) => {
          if (isAxiosError(error) && error.response?.status === 422) {
            const message = error.response.data?.errors?.unit_name?.[0];
            if (message === 'The unit name has already been taken.') {
              setNameUnitError('Unit sudah digunakan');
            } else {
              setNameUnitError(message);
            }
            setDialogConfirmOpen(false);
            setDialogFormOpen(true);
          }
        },
      });
    }
  }, [isEditMode, nameUnit, selectedUnit, createUnit, updateUnit, queryClient]);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedUnit) {
      setNameUnit(selectedUnit.unit_name);
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
            nameUnitError={nameUnitError}
            setNameUnitError={setNameUnitError}
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
