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

interface VoucherDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
  handleResetForm: () => void;
  nameUnit: string;
  setNameUnit: (value: string) => void;
}

const ProductUnitFormDialog: React.FC<VoucherDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onConfirm,
  handleResetForm,
  nameUnit,
  setNameUnit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="voucher-dialog-description">
        <DialogHeader className="mb-2">
          <DialogTitle> Unit Produk </DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Unit"
          placeholder="cth: kg"
          className="mb-2"
          value={nameUnit}
          onChange={(e) => setNameUnit(e.target.value)}
        />
        <DialogFooter>
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
