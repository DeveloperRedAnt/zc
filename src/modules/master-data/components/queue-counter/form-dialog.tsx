'use client';

import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Check, Refresh } from '@icon-park/react';
import { QueueCounterFormData } from './queue-counter-schema';

import type { OptionType } from '@/components/dropdown/dropdown';

interface QueueCounterFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: QueueCounterFormData;
  onInputChange: (field: keyof QueueCounterFormData, value: string | number | undefined) => void;
  onReset: () => void;
  onConfirm: () => void;
  store?: string;
  optionsResetRotation: OptionType[];
  isFormValid: boolean;
  fieldErrors?: Partial<Record<keyof QueueCounterFormData, { _errors: string[] }>>;
}

const QueueCounterFormDialog: React.FC<QueueCounterFormDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  formData,
  onInputChange,
  onReset,
  onConfirm,
  store = 'Default Store',
  optionsResetRotation,
  isFormValid,
  fieldErrors,
}) => {
  const selectedResetOption =
    optionsResetRotation.find((option) => Number(option.value) === formData.rotation) || null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="queue-counter-dialog-description">
        <DialogHeader>
          <DialogTitle>No. Urut Nota</DialogTitle>
        </DialogHeader>

        <form className="w-full gap-4 py-4">
          <div className="mb-4">
            <p className="font-semibold font-[600]">Untuk Toko:</p>
            <p>{store}</p>
          </div>

          <div className="mt-2">
            <CustomInput
              value={formData.prefix}
              onChange={(e) => onInputChange('prefix', e.target.value)}
              required
              isWidthFull
              placeholder="HQS"
              label="Prefix"
            />
            {fieldErrors?.prefix?._errors?.[0] && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.prefix._errors[0]}</p>
            )}
          </div>

          <div className="mt-2">
            <CustomInput
              value={formData.counter_start}
              onChange={(e) =>
                onInputChange(
                  'counter_start',
                  e.target.value === '' ? undefined : Number(e.target.value)
                )
              }
              required
              isWidthFull
              placeholder="1"
              label="No. Urut Awal"
              type="number"
              min="1"
              max="999999"
            />
            {fieldErrors?.counter_start?._errors?.[0] && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.counter_start._errors[0]}</p>
            )}
          </div>

          <div className="mt-2">
            <Dropdown
              label="Reset Rotasi"
              options={optionsResetRotation}
              value={selectedResetOption}
              onChange={(option) =>
                onInputChange('rotation', option?.value ? Number(option.value) : undefined)
              }
              placeholder="Pilih..."
              required
            />
            {fieldErrors?.rotation?._errors?.[0] && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.rotation._errors[0]}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            className={isEditMode ? '' : 'hidden'}
            onClick={onReset}
          >
            <Refresh size={14} />
            Reset
          </Button>
          <Button type="button" variant="success" onClick={onConfirm} disabled={!isFormValid}>
            Simpan No. Urut Nota
            <Check />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QueueCounterFormDialog;
