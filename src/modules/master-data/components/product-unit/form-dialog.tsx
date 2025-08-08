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

interface UnitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
  handleResetForm: () => void;
  nameUnit: string;
  setNameUnit: (value: string) => void;
  nameUnitError: string;
  setNameUnitError: (value: string) => void;
}

const ProductUnitFormDialog: React.FC<UnitDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onConfirm,
  handleResetForm,
  nameUnit,
  setNameUnit,
  nameUnitError,
  setNameUnitError,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="mb-2">
          <DialogTitle> Unit Produk </DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Unit"
          placeholder="cth: kg"
          className={`${nameUnitError ? 'border !border-red-500' : ''}`}
          value={nameUnit}
          onChange={(e) => {
            setNameUnit(e.target.value);
            if (nameUnitError) setNameUnitError('');
          }}
        />
        {nameUnitError && <p className="text-sm text-red">{nameUnitError}</p>}
        <DialogFooter className="mt-2">
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={handleResetForm}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onConfirm} disabled={!nameUnit.trim()}>
            Simpan Unit <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUnitFormDialog;
