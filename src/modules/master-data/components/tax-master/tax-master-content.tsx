'use client';

import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import TaxMasterConfirmDialog from '@/modules/master-data/components/tax-master/confirm-dialog';
import TaxMasterFormDialog from '@/modules/master-data/components/tax-master/form-dialog';
import TableList from '@/modules/master-data/components/tax-master/table-list';
import { TaxMaster } from '@/modules/master-data/types/tax-master';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTaxMaster, setSelectedTaxMaster] = useState<TaxMaster | null>(null);

  const [taxPercent, setTaxPercent] = useState('');
  const [store, setStore] = useState('');

  const handleEditButton = useCallback((taxMaster: TaxMaster) => {
    setIsEditMode(true);
    setSelectedTaxMaster(taxMaster);
    setTaxPercent(taxMaster.tax);
    setStore(taxMaster.store);
    setDialogFormOpen(true);
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    toast.success('Tersimpan!', {
      description: 'Master Pajak Anda telah berhasil tersimpan',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedTaxMaster) {
      setTaxPercent(selectedTaxMaster.tax);
    } else {
      setTaxPercent('');
    }
  }, [isEditMode, selectedTaxMaster]);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Master Pajak </p>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Penentuan pajak yang akan diterapkan saat Checkout transaksi" />

          <TableList handleEditButton={handleEditButton} />

          <TaxMasterFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            onConfirm={() => {
              setDialogConfirmOpen(true);
              setDialogFormOpen(false);
            }}
            handleResetForm={handleResetForm}
            taxPercent={taxPercent}
            setTaxPercent={setTaxPercent}
            store={store}
          />

          <TaxMasterConfirmDialog
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
