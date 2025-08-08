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

interface PositionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
  handleResetForm: () => void;
  namePosition: string;
  setNamePosition: (value: string) => void;
  nameError: string;
  setNameError: (value: string) => void;
}

const PositionFormDialog: React.FC<PositionDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onConfirm,
  handleResetForm,
  namePosition,
  setNamePosition,
  nameError,
  setNameError,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="position-dialog-description">
        <DialogHeader className="mb-2">
          <DialogTitle> Jabatan </DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Jabatan"
          placeholder="cth: Kasir"
          className={`${nameError ? 'border !border-red-500' : ''}`}
          value={namePosition}
          onChange={(e) => {
            setNamePosition(e.target.value);
            if (nameError) setNameError('');
          }}
        />
        {nameError && <p className="text-sm text-red">{nameError}</p>}
        <DialogFooter className="mt-2">
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={handleResetForm}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onConfirm} disabled={!namePosition.trim()}>
            Simpan Jabatan <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PositionFormDialog;
