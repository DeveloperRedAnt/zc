'use client';
import { useGetStore } from '@/__generated__/api/hooks/store.hooks';
import { Button } from '@/components/button/button';
import { DatePicker } from '@/components/datepicker/date-picker';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import type { OptionType } from '@/components/dropdown/dropdown';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Check, Refresh } from '@icon-park/react';
import React, { useMemo } from 'react';
import { VoucherFormData } from '../types/voucher-types';
// Define a local Range type to avoid the external dependency
interface Range {
  from: Date;
  to?: Date;
}

interface VoucherDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: VoucherFormData;
  onInputChange: (field: keyof VoucherFormData, value: string) => void;
  onReset: () => void;
  onConfirm: () => void;
  // Additional props that were missing
  selectedStoreVoucher: OptionType | null;
  setSelectedStoreVoucher: (option: OptionType | null) => void;
  selectedRange: Range | undefined;
  setSelectedRange: (range: Range | undefined) => void;
  optionsStatus?: OptionType[];
  selectedStatus: OptionType | null;
  setSelectedStatus: (status: OptionType | null) => void;
}

const VoucherDialog: React.FC<VoucherDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  formData,
  onInputChange,
  onReset,
  onConfirm,
  selectedStoreVoucher,
  setSelectedStoreVoucher,
  selectedRange,
  setSelectedRange,
  optionsStatus,
  selectedStatus,
  setSelectedStatus,
}) => {
  const paramsStore = useMemo(
    () => ({
      'x-device-id': '1',
      'x-store-id': '1', // Adding required x-store-id parameter
      'x-organization-id': '1',
      body: {
        sort_by: 'id',
        sort_direction: 'asc' as 'asc' | 'desc', // Explicitly type as 'asc' | 'desc'
        per_page: 50,
      },
    }),
    []
  );

  const { data: stores } = useGetStore(paramsStore);

  const dataStores = stores?.data ?? [];

  const optionsStoresVoucher: OptionType[] = dataStores.map((store) => ({
    label: `#${store.id} - ${store.name}`,
    value: store.id,
  }));

  const isValidForm = () => {
    return (
      (formData.name ?? '').trim() !== '' &&
      (formData.code ?? '').trim() !== '' &&
      selectedStatus?.value &&
      ((selectedStatus.value === 'nominal' && formData.amount > 0) ||
        (selectedStatus.value === 'percent' && formData.amount > 0)) &&
      selectedStoreVoucher !== null &&
      selectedRange?.from &&
      selectedRange?.to
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="voucher-dialog-description">
        <DialogHeader className="mb-2">
          <DialogTitle>{isEditMode ? 'Edit Voucher' : 'Tambah Voucher'}</DialogTitle>
        </DialogHeader>
        <CustomInput
          required
          isWidthFull
          label="Nama Voucher"
          placeholder="cth: Diskon Lebaran"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className="mb-2"
        />
        <CustomInput
          required
          isWidthFull
          placeholder="cth: AA11223344"
          label="Kode Voucher"
          value={formData.code}
          onChange={(e) => onInputChange('code', e.target.value)}
          className="mb-2"
        />
        <div className="w-full">
          <DatePicker
            mode="range"
            label="Jangka Waktu"
            value={selectedRange}
            placeholder="dd/mm/yyyy - dd/mm/yyyy"
            onChange={(range) => setSelectedRange(range as Range | undefined)}
            className="mb-2"
            mandatory="true"
          />
        </div>
        <Dropdown
          required
          label="Tipe Voucher"
          options={optionsStatus || []}
          value={selectedStatus}
          onChange={(option) => {
            setSelectedStatus(option);
            if (option) {
              onInputChange('type', String(option.value));
            }
          }}
        />
        {selectedStatus?.value === 'nominal' && (
          <CustomInput
            required
            isWidthFull
            label="Nominal Voucher"
            currency
            prependText="Rp"
            placeholder="cth: 10.000"
            value={formData.amount}
            onChange={(e) => onInputChange('amount', String(e.target.value))}
            className="mb-2"
          />
        )}
        {selectedStatus?.value === 'percent' && (
          <CustomInput
            required
            isWidthFull
            placeholder="cth: 10"
            label="Persen Voucher"
            inputNumber
            maxDecimalDigits={1}
            maxValue={100}
            appendIcon="Percentage"
            value={formData.amount}
            onChange={(e) => onInputChange('amount', String(e.target.value))}
            className="mb-2"
          />
        )}
        {!isEditMode && (
          <div>
            <Dropdown
              required
              label="Berlaku di Toko"
              options={optionsStoresVoucher}
              value={selectedStoreVoucher ?? null}
              onChange={(option) => setSelectedStoreVoucher(option)}
              placeholder="Pilih Toko"
              classDiv="mb-0"
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={onReset}>
            <Refresh size={14} />
            Reset
          </Button>
          <Button variant="success" onClick={onConfirm} disabled={!isValidForm()}>
            {isEditMode ? 'Update Voucher' : 'Simpan Voucher'} <Check size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherDialog;
