'use client';
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
import React, { useMemo, useCallback } from 'react';
import type { DateRange } from 'react-day-picker';
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
  selectedRange: Range | undefined;
  setSelectedRange: (range: Range | undefined) => void;
  optionsStatus?: OptionType[];
  selectedStatus: OptionType | null;
  setSelectedStatus: (status: OptionType | null) => void;
}

const VoucherDialog: React.FC<VoucherDialogProps> = React.memo(
  ({
    isOpen,
    onOpenChange,
    isEditMode,
    formData,
    onInputChange,
    onReset,
    onConfirm,
    selectedRange,
    setSelectedRange,
    optionsStatus,
    selectedStatus,
    setSelectedStatus,
  }) => {
    // Store options are now passed from parent component
    // No need for API call here anymore

    // Memoize callback functions to prevent unnecessary re-renders
    const handleStatusChange = useCallback(
      (option: OptionType | null) => {
        setSelectedStatus(option);
        if (option) {
          onInputChange('type', String(option.value));
        }
      },
      [setSelectedStatus, onInputChange]
    );

    const handleRangeChange = useCallback(
      (date: Date | DateRange | undefined) => {
        if (date && typeof date === 'object' && 'from' in date) {
          setSelectedRange(date as Range);
        } else {
          setSelectedRange(undefined);
        }
      },
      [setSelectedRange]
    );

    const isValidForm = useMemo(() => {
      return (
        (formData.name ?? '').trim() !== '' &&
        (formData.code ?? '').trim() !== '' &&
        selectedStatus?.value &&
        ((selectedStatus.value === 'nominal' && formData.amount > 0) ||
          (selectedStatus.value === 'percent' && formData.amount > 0)) &&
        selectedRange?.from &&
        selectedRange?.to
      );
    }, [formData, selectedStatus, selectedRange]);

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
              onChange={handleRangeChange}
              className="mb-2"
              mandatory="true"
            />
          </div>
          <Dropdown
            required
            label="Tipe Voucher"
            options={optionsStatus || []}
            value={selectedStatus}
            isSearchable={false}
            onChange={handleStatusChange}
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
          <DialogFooter>
            <Button variant="ghost" className={isEditMode ? '' : 'hidden'} onClick={onReset}>
              <Refresh size={14} />
              Reset
            </Button>
            <Button variant="success" onClick={onConfirm} disabled={!isValidForm}>
              {isEditMode ? 'Update Voucher' : 'Simpan Voucher'} <Check size={14} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

VoucherDialog.displayName = 'VoucherDialog';

export default VoucherDialog;
