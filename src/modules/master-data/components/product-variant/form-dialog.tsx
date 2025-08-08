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

interface VariantDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
  handleResetForm: () => void;
  nameVariant: string;
  setNameVariant: (value: string) => void;
  nameError: string;
  setNameError: (value: string) => void;
}

const ProductVariantFormDialog: React.FC<VariantDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onConfirm,
  handleResetForm,
  nameVariant,
  setNameVariant,
  nameError,
  setNameError,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="variant-dialog-description">
        <DialogHeader className="mb-2">
          <DialogTitle> Varian Produk </DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Varian"
          placeholder="cth: Warna"
          className={`${nameError ? 'border !border-red-500' : ''}`}
          value={nameVariant}
          onChange={(e) => {
            setNameVariant(e.target.value);
            if (nameError) setNameError('');
          }}
        />
        {nameError && <p className="text-sm text-red">{nameError}</p>}
        <DialogFooter className="mt-2">
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={handleResetForm}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onConfirm} disabled={!nameVariant.trim()}>
            Simpan Varian <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariantFormDialog;
