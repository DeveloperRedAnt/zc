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

interface TagDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
  handleResetForm: () => void;
  nameTag: string;
  setNameTag: (value: string) => void;
  nameTagError: string;
  setNameTagError: (value: string) => void;
}

const ProductTagFormDialog: React.FC<TagDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onConfirm,
  handleResetForm,
  nameTag,
  setNameTag,
  nameTagError,
  setNameTagError,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="tag-dialog-description">
        <DialogHeader className="mb-2">
          <DialogTitle> Tag Produk </DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Tag"
          placeholder="cth: makanan"
          className={`${nameTagError ? 'border !border-red-500' : ''}`}
          value={nameTag}
          onChange={(e) => {
            setNameTag(e.target.value);
            if (nameTagError) setNameTagError('');
          }}
        />
        {nameTagError && <p className="text-sm text-red">{nameTagError}</p>}
        <DialogFooter className="mt-2">
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={handleResetForm}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onConfirm} disabled={!nameTag.trim()}>
            Simpan Tag <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTagFormDialog;
