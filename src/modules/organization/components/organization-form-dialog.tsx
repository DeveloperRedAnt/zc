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

export type OrganizationFormData = {
  name: string;
  phone: string;
  email: string;
  nib: string;
  npwp: string;
};

type OrganizationFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: OrganizationFormData;
  onInputChange: (field: keyof OrganizationFormData, value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
};

export function OrganizationFormDialog({
  open,
  onOpenChange,
  isEditMode,
  formData,
  onInputChange,
  onReset,
  onSubmit,
}: OrganizationFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Update Organisasi' : 'Tambah Organisasi'}</DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          className="mb-2"
          placeholder="Masukkan Nama Organisasi"
          label="Nama Organisasi"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
        <CustomInput
          required
          isWidthFull
          className="mb-2"
          placeholder="cth: 0811223344556"
          label="Whatsapp"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
        />
        <CustomInput
          required
          isWidthFull
          className="mb-2"
          placeholder="Masukkan Email"
          label="Email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
        />
        <CustomInput
          required
          isWidthFull
          className="mb-2"
          placeholder="Masukkan SIUP / NIB"
          label="SIUP / NIB"
          value={formData.nib}
          onChange={(e) => onInputChange('nib', e.target.value)}
        />
        <CustomInput
          required
          isWidthFull
          className="mb-2"
          placeholder="cth: 11.222.333.4-555.666"
          label="NPWP"
          value={formData.npwp}
          onChange={(e) => onInputChange('npwp', e.target.value)}
        />

        <DialogFooter>
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={onReset}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onSubmit}>
            {isEditMode ? 'Update Organisasi' : 'Simpan Organisasi'} <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
