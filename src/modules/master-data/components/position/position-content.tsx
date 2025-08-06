'use client';

import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import PositionConfirmDialog from '@/modules/master-data/components/position/confirm-dialog';
import PositionFormDialog from '@/modules/master-data/components/position/form-dialog';
import TableList from '@/modules/master-data/components/position/table-list';
import { Position } from '@/modules/master-data/types/position';
import { Plus } from '@icon-park/react';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const [namePosition, setNamePosition] = useState('');

  const handleEditButton = useCallback((position: Position) => {
    setIsEditMode(true);
    setSelectedPosition(position);
    setNamePosition(position.name);
    setDialogFormOpen(true);
  }, []);

  const handleAddButton = useCallback(() => {
    setIsEditMode(false);
    setSelectedPosition(null);
    setNamePosition('');
    setDialogFormOpen(true);
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    toast.success('Tersimpan!', {
      description: 'Jabatan Anda telah berhasil tersimpan',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedPosition) {
      setNamePosition(selectedPosition.name);
    } else {
      setNamePosition('');
    }
  }, [isEditMode, selectedPosition]);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Jabatan </p>
            </div>
          </div>
          <div>
            <Button variant="outline" type="button" onClick={handleAddButton}>
              <Plus />
              Tambah Jabatan
            </Button>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Jabatan dari User yang Anda daftarkan" />

          <TableList handleEditButton={handleEditButton} />

          <PositionFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            onConfirm={() => {
              setDialogConfirmOpen(true);
              setDialogFormOpen(false);
            }}
            handleResetForm={handleResetForm}
            namePosition={namePosition}
            setNamePosition={setNamePosition}
          />

          <PositionConfirmDialog
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
