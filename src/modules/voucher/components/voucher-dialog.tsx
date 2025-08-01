'use client';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import type { OptionType } from '@/components/dropdown/dropdown';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Check, Percentage, Refresh } from '@icon-park/react';
import React, { useState } from 'react';
import { VoucherFormData } from '../types/voucher-types';

interface VoucherDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: VoucherFormData;
  onInputChange: (field: keyof VoucherFormData, value: string) => void;
  onReset: () => void;
  onConfirm: () => void;
}

const VoucherDialog: React.FC<VoucherDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  formData,
  onInputChange,
  onReset,
  onConfirm,
}) => {
  const optionsStatus: OptionType[] = [
    { label: 'Semua status voucher', value: 1 },
    { label: 'Nominal', value: 2 },
    { label: 'Persen', value: 3 },
  ];

  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>({
    label: 'Semua status voucher',
    value: 1,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Voucher' : 'Tambah Voucher'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Silakan edit data Voucher yang ingin Anda ubah'
              : 'Silakan isi data Voucher yang ingin Anda tambahkan'}
          </DialogDescription>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Voucher"
          placeholder="cth: Diskon Lebaran"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
        />
        <Dropdown
          required
          label="Tipe Voucher"
          options={optionsStatus}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />
        {selectedStatus?.value === 2 ? (
          <CustomInput
            required
            isWidthFull
            label="Nominal Voucher"
            currency
            prependText="Rp"
            placeholder="cth: 10.000"
          />
        ) : (
          <CustomInput
            required
            isWidthFull
            label="Persen Voucher"
            currency
            appendText={<Percentage />}
            placeholder="cth: 10"
          />
        )}
        <DialogFooter>
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={onReset}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onConfirm}>
            {isEditMode ? 'Update Voucher' : 'Simpan Voucher'} <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherDialog;
