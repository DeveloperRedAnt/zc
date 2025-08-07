'use client';

import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import CustomInput from '@/components/input/custom-input';
import { Check, Refresh } from '@icon-park/react';

interface TaxMasterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
  handleResetForm: () => void;
  taxPercent: string;
  setTaxPercent: (value: string) => void;
  store: string;
}

const TaxMasterFormDialog: React.FC<TaxMasterDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onConfirm,
  handleResetForm,
  taxPercent,
  setTaxPercent,
  store,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="tax-master-dialog-description">
        <DialogHeader>
          <DialogTitle> Master Pajak </DialogTitle>
        </DialogHeader>
        <div className="w-full gap-4 py-4">
          <div className="mb-4">
            <p className="font-semibold font-[600]"> Untuk Toko: </p>
            <p> {store} </p>
          </div>
          <CustomInput
            required
            isWidthFull
            className="mb-2"
            placeholder="12.0"
            label="Persen Pajak"
            inputNumber
            maxDecimalDigits={1}
            maxValue={100}
            appendIcon="Percentage"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={handleResetForm}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button
            type="button"
            variant="success"
            disabled={taxPercent.trim() === ''}
            onClick={onConfirm}
          >
            Simpan Pajak
            <Check />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaxMasterFormDialog;
