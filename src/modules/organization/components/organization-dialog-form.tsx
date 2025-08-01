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
import React from 'react';

type OrganizationFormData = {
  name: string;
  phone: string;
  email: string;
  nib: string;
  npwp: string;
};

interface OrganizationDialogFormProps {
  isOpen: boolean;
  isEditMode: boolean;
  // isLoading: boolean;
  formData: OrganizationFormData;
  onChange: (field: keyof OrganizationFormData, value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
  onOpenChange: (open: boolean) => void;
  errors?: Record<string, string[]>;
  isValid?: boolean;
}

export const OrganizationDialogForm: React.FC<OrganizationDialogFormProps> = ({
  isOpen,
  isEditMode,
  // _isLoading,
  formData,
  onChange,
  onReset,
  onSubmit,
  onOpenChange,
  errors = {},
  isValid = true,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-sm gap-6">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Update Organisasi' : 'Tambah Organisasi'}</DialogTitle>
      </DialogHeader>

      <CustomInput
        required
        isWidthFull
        placeholder="cth: PT. Organisasi Sejahtera"
        label="Nama Organisasi"
        value={formData.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      {errors?.name && <p className="text-red-400 text-xs -mt-2">{errors.name[0]}</p>}

      <CustomInput
        required
        isWidthFull
        placeholder="cth: 0811223344556"
        label="Whatsapp"
        value={formData.phone}
        onChange={(e) => onChange('phone', e.target.value)}
      />
      {errors?.phone && <p className="text-red-400 text-xs -mt-2">{errors.phone[0]}</p>}

      <CustomInput
        required
        isWidthFull
        placeholder="cth: email@zycas.com"
        label="Email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
      />
      {errors?.email && <p className="text-red-400 text-xs -mt-2">{errors.email[0]}</p>}

      <CustomInput
        isWidthFull
        placeholder="Masukkan SIUP / NIB"
        label="SIUP / NIB"
        value={formData.nib}
        onChange={(e) => onChange('nib', e.target.value)}
      />
      {errors?.nib && <p className="text-red-400 text-xs -mt-2">{errors.nib[0]}</p>}

      <CustomInput
        isWidthFull
        placeholder="cth: 11.222.333.4-555.666"
        label="NPWP"
        value={formData.npwp}
        onChange={(e) => onChange('npwp', e.target.value)}
      />
      {errors?.npwp && <p className="text-red-400 text-xs -mt-2">{errors.npwp[0]}</p>}

      <DialogFooter>
        <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={onReset}>
          <Refresh size={14} />
          Reset
        </Button>
        <Button
          variant="success"
          onClick={onSubmit}
          disabled={!isValid}
          className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isEditMode ? 'Update Organisasi' : 'Simpan Organisasi'} <Check size={14} />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default OrganizationDialogForm;
