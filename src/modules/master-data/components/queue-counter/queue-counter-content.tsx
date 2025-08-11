'use client';

import {
  useCreateQueueCounterMasterData,
  useUpdateQueueCounterMasterData,
} from '@/__generated__/api/hooks/master-data/queue-counter.hooks';
import type { OptionType } from '@/components/dropdown/dropdown';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import QueueCounterConfirmDialog from '@/modules/master-data/components/queue-counter/confirm-dialog';
import QueueCounterFormDialog from '@/modules/master-data/components/queue-counter/form-dialog';
import TableList from '@/modules/master-data/components/queue-counter/table-list';
import { QueueCounter } from '@/modules/master-data/types/queue-counter';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { QueueCounterFormData } from './queue-counter-schema';
import { queueCounterFormSchema } from './queue-counter-schema';

const optionsResetRotation: OptionType[] = [
  { label: '1 Hari', value: 1 },
  { label: '7 Hari', value: 2 },
  { label: '1 Bulan', value: 3 },
  { label: '1 Tahun', value: 4 },
];

export const defaultQueueCounterData: QueueCounterFormData = {
  prefix: '',
  counter_start: 1,
  rotation: 1,
};

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedQueueCounter, setSelectedQueueCounter] = useState<QueueCounter | null>(null);
  const [formData, setFormData] = useState<QueueCounterFormData | null>(null);

  const { mutateAsync: createQueueCounter } = useCreateQueueCounterMasterData();
  const { mutateAsync: updateQueueCounter } = useUpdateQueueCounterMasterData();
  const queryClient = useQueryClient();

  const result = queueCounterFormSchema.safeParse(formData);
  const isFormValid = result.success;
  const fieldErrors = !result.success ? result.error.format() : {};

  const handleEditButton = (data: QueueCounter) => {
    setIsEditMode(true);
    setSelectedQueueCounter(data);
    setFormData({
      prefix: data.prefix,
      counter_start: data.counter_start,
      rotation: data.rotation,
    });
    setDialogFormOpen(true);
  };

  const handleFormSubmit = useCallback((data: QueueCounterFormData) => {
    setFormData(data);
    setDialogConfirmOpen(true);
  }, []);

  const handleConfirmSubmit = async () => {
    try {
      if (!formData) return;

      const payload = {
        prefix: formData.prefix,
        counter_start: formData.counter_start,
        rotation: formData.rotation,
        store_id: selectedQueueCounter?.store_id ?? 0,
      };

      if (isEditMode && selectedQueueCounter) {
        await updateQueueCounter({ id: selectedQueueCounter.store_id, ...payload });
      } else {
        await createQueueCounter(payload);
      }

      toast.success('Tersimpan!', {
        description: 'No. Urut Nota Anda telah berhasil tersimpan',
      });

      queryClient.invalidateQueries({
        queryKey: ['getQueueCounterList'],
      });
    } catch (_e) {
      toast.error('Gagal menyimpan');
    } finally {
      setDialogConfirmOpen(false);
      setDialogFormOpen(false);
      setIsEditMode(false);
      setSelectedQueueCounter(null);
      setFormData(defaultQueueCounterData);
    }
  };

  const handleInputChange = useCallback(
    (field: keyof QueueCounterFormData, value: string | number | undefined) => {
      setFormData((prev) => ({
        ...(prev ?? defaultQueueCounterData),
        [field]: value,
      }));
    },
    []
  );

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold">No. Urut Nota</p>
            </div>
          </div>
        </div>

        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Penentuan nomor urut nota yang akan diterapkan saat membuat transaksi" />

          <TableList handleEditButton={handleEditButton} />

          <QueueCounterFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            formData={formData ?? defaultQueueCounterData}
            onInputChange={handleInputChange}
            onConfirm={() => {
              if (formData) handleFormSubmit(formData);
            }}
            onReset={() => {
              if (isEditMode && selectedQueueCounter) {
                setFormData({
                  prefix: selectedQueueCounter.prefix,
                  counter_start: selectedQueueCounter.counter_start,
                  rotation: selectedQueueCounter.rotation,
                });
              } else {
                setFormData(defaultQueueCounterData);
              }
            }}
            store={selectedQueueCounter?.store || 'Default Store'}
            optionsResetRotation={optionsResetRotation}
            isFormValid={isFormValid}
            fieldErrors={fieldErrors}
          />

          <QueueCounterConfirmDialog
            isOpen={dialogConfirmOpen}
            onOpenChange={setDialogConfirmOpen}
            isEditMode={isEditMode}
            onConfirm={handleConfirmSubmit}
          />
        </div>
      </div>
    </>
  );
}
