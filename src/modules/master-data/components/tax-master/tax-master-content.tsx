'use client';

import { TaxMasterStore } from '@/__generated__/api/dto/master-data/tax-master.dto';
import { useUpdateTaxMaster } from '@/__generated__/api/hooks/master-data/tax-master.hooks';
import { InformationText } from '@/components/information-text/information-text';
import { useToast } from '@/components/toast/toast';
import TaxMasterConfirmDialog from '@/modules/master-data/components/tax-master/confirm-dialog';
import TaxMasterFormDialog from '@/modules/master-data/components/tax-master/form-dialog';
import TableList from '@/modules/master-data/components/tax-master/table-list';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTaxMaster, setSelectedTaxMaster] = useState<TaxMasterStore | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [taxPercent, setTaxPercent] = useState('');
  const [store, setStore] = useState('');
  const [hasNPWP, setHasNPWP] = useState(true); // Assuming this is used to check if NPWP is available

  const toast = useToast();
  const updateTaxMasterMutation = useUpdateTaxMaster();

  const handleEditButton = useCallback((taxMaster: TaxMasterStore) => {
    setIsEditMode(true);
    setSelectedTaxMaster(taxMaster);
    setTaxPercent(taxMaster.percentage.replace('%', ''));
    setStore(taxMaster.name);
    setDialogFormOpen(true);
    if (taxMaster.npwp !== '') {
      setHasNPWP(true);
    }
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    if (!selectedTaxMaster) return;

    setIsUpdating(true);
    try {
      await updateTaxMasterMutation.mutateAsync({
        storeId: selectedTaxMaster.id,
        payload: {
          tax: parseFloat(taxPercent) || 0,
        },
      });

      toast.showSuccess('Tersimpan!', 'Master Pajak berhasil diperbarui.');

      setDialogConfirmOpen(false);
      setDialogFormOpen(false);

      // Reset form state
      setSelectedTaxMaster(null);
      setTaxPercent('');
      setStore('');
      setIsEditMode(false);
    } catch (error) {
      toast.showError('Gagal menyimpan!', 'Terjadi kesalahan saat menyimpan Master Pajak.');
      console.error('Save error:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [selectedTaxMaster, taxPercent, updateTaxMasterMutation, toast]);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedTaxMaster) {
      setTaxPercent(selectedTaxMaster.percentage.replace('%', ''));
    } else {
      setTaxPercent('');
    }
  }, [isEditMode, selectedTaxMaster]);

  return (
    <div className="box-border flex flex-col gap-6 items-start w-full text-black">
      <div className="flex-row flex justify-between items-start w-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
          <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
            <p className="block leading-[24px] whitespace-pre font-semibold">Master Pajak</p>
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
          isUpdating={isUpdating}
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
          isUpdating={isUpdating}
          hasNPWP={hasNPWP}
          setHasNPWP={setHasNPWP}
        />
      </div>
    </div>
  );
}
