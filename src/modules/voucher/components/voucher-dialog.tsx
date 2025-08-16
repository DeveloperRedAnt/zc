'use client';

import { listStore } from '@/__generated__/api/client';
import type { StoreItem } from '@/__generated__/api/dto';
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
import FormFieldError from '@/components/form-field-error/form-field-error';
import CustomInput from '@/components/input/custom-input';
import { zeroPad } from '@/utils/pad-start';
import { Check } from '@icon-park/react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import type { DateRange } from 'react-day-picker';
import { AsyncPaginate } from 'react-select-async-paginate';

// Define types
type Range = DateRange;

type StoreOption = {
  value: string;
  label: string;
  data: StoreItem;
};

type VoucherFormData = {
  name: string;
  code: string;
  type: string;
  amount: number;
  period: string;
  store_id: string;
};

type VoucherSubmitData = {
  name: string;
  code: string;
  type: string;
  amount: string;
  start_at: string;
  end_at: string;
  store_id: number;
};

const optionsStatus: OptionType[] = [
  { label: 'Pilih Tipe', value: '' },
  { label: 'Nominal', value: 'nominal' },
  { label: 'Persen', value: 'percent' },
];

const INITIAL_FORM_STATE: VoucherFormData = {
  name: '',
  code: '',
  type: '',
  amount: 0,
  period: '',
  store_id: '',
};

interface VoucherDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  voucher?: {
    id: string | number;
    name: string;
    code: string;
    type: string;
    amount: number;
    start_at: string;
    end_at: string;
    store?: {
      id: number;
      name: string;
    };
  };
  onConfirm?: () => void;
}

export interface VoucherDialogRef {
  getPendingData: () => VoucherSubmitData | null;
}

const VoucherDialog = forwardRef<VoucherDialogRef, VoucherDialogProps>(
  ({ isOpen, onOpenChange, isEditMode = false, voucher, onConfirm }, ref) => {
    const router = useRouter();

    const [formData, setFormData] = useState<VoucherFormData>(INITIAL_FORM_STATE);
    const [selectedRange, setSelectedRange] = useState<Range | undefined>(undefined);
    const [selectedStatus, setSelectedStatus] = useState<OptionType | null>({
      label: 'Pilih Tipe',
      value: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedStore, setSelectedStore] = useState<StoreOption | null>(null);
    const [pendingVoucherData, setPendingVoucherData] = useState<VoucherSubmitData | null>(null);

    // Populate form data when voucher data is available (edit mode)
    useEffect(() => {
      if (isEditMode && voucher) {
        setFormData({
          name: voucher.name,
          code: voucher.code,
          type: voucher.type,
          amount: voucher.amount,
          period: `${voucher.start_at} - ${voucher.end_at}`,
          store_id: voucher.store?.id?.toString() || '',
        });

        setSelectedRange({
          from: new Date(voucher.start_at),
          to: new Date(voucher.end_at),
        });

        const matchedStatus = optionsStatus.find((opt) => opt.value === voucher.type);
        setSelectedStatus(matchedStatus || null);

        // Set selected store for dropdown
        if (voucher.store) {
          setSelectedStore({
            value: voucher.store.id.toString(),
            label: `#${zeroPad(voucher.store.id, 4)} - ${voucher.store.name}`,
            data: {
              id: voucher.store.id,
              name: voucher.store.name,
              address: '',
              phone: '',
              email: '',
              lat: 0,
              lng: 0,
              image: '',
            },
          });
        }
      } else {
        setFormData(INITIAL_FORM_STATE);
        setSelectedRange(undefined);
        setSelectedStatus({ label: 'Pilih Tipe', value: '' });
        setSelectedStore(null);
        setPendingVoucherData(null);
      }
    }, [isEditMode, voucher]);

    // Load stores function for dropdown
    const loadStores = useCallback(async (search: string) => {
      try {
        const response = await listStore({
          page: 1,
          per_page: 50,
          search: search || undefined,
          sort_by: 'name',
          sort_direction: 'asc' as const,
        });

        let storeData: StoreItem[];
        if (Array.isArray(response)) {
          storeData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          storeData = response.data;
        } else {
          storeData = [];
        }

        const options: StoreOption[] = storeData.map((store: StoreItem) => ({
          value: store.id.toString(),
          label: `#${zeroPad(store.id, 4)} - ${store.name}`,
          data: store,
        }));

        return {
          options,
          hasMore: false,
        };
      } catch (error) {
        console.error('Error loading stores:', error);
        return {
          options: [],
          hasMore: false,
        };
      }
    }, []);

    const handleStoreChange = useCallback(
      (option: StoreOption | null) => {
        setSelectedStore(option);
        setFormData((prev) => ({
          ...prev,
          store_id: option ? option.value : '',
        }));

        // Clear error when store is selected
        if (errors.store_id) {
          setErrors((prev) => ({ ...prev, store_id: '' }));
        }
      },
      [errors.store_id]
    );

    // Expose getPendingData function to parent via ref
    useImperativeHandle(
      ref,
      () => ({
        getPendingData: () => pendingVoucherData,
      }),
      [pendingVoucherData]
    );

    const handleDialogClose = () => {
      onOpenChange(false);
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setSelectedRange(undefined);
      setSelectedStatus({ label: 'Pilih Tipe', value: '' });
      setSelectedStore(null);
      setPendingVoucherData(null);
      router.refresh();
    };

    const handleInputChange = (field: keyof VoucherFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: field === 'amount' ? (value !== '' ? Number(value) : 0) : value,
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

    const handleStatusChange = (option: OptionType | null) => {
      setSelectedStatus(option);
      if (option) {
        handleInputChange('type', String(option.value));
      }
    };

    const handleRangeChange = (date: Date | DateRange | undefined) => {
      if (date && typeof date === 'object' && 'from' in date) {
        setSelectedRange(date);
      } else {
        setSelectedRange(undefined);
      }
    };

    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Nama voucher wajib diisi';
      }

      if (!formData.code.trim()) {
        newErrors.code = 'Kode voucher wajib diisi';
      }

      if (!selectedStatus?.value) {
        newErrors.type = 'Tipe voucher wajib dipilih';
      }

      if (!formData.amount || formData.amount <= 0) {
        newErrors.amount = 'Amount voucher wajib diisi dan harus lebih dari 0';
      }

      if (!selectedRange?.from || !selectedRange?.to) {
        newErrors.period = 'Jangka waktu wajib diisi';
      }

      if (!formData.store_id) {
        newErrors.store_id = 'Toko wajib dipilih';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSaveClick = () => {
      if (!validateForm()) {
        return;
      }

      // Prepare voucher data and store it as pending
      const voucherData: VoucherSubmitData = {
        name: formData.name,
        code: formData.code,
        type: selectedStatus?.value?.toString() || '',
        amount: formData.amount === 0 ? '0' : String(formData.amount.toFixed(2)), //hardcode dulu
        start_at: selectedRange?.from ? format(selectedRange.from, 'yyyy-MM-dd') : '',
        end_at: selectedRange?.to ? format(selectedRange.to, 'yyyy-MM-dd') : '',
        store_id: Number(formData.store_id),
      };

      // Store pending data
      setPendingVoucherData(voucherData);

      // Call parent confirm handler to show external confirm dialog
      if (onConfirm) {
        onConfirm();
      }
    };

    const handleOpenChange = (open: boolean) => {
      onOpenChange(open);
      if (!open) {
        setFormData(INITIAL_FORM_STATE);
        setErrors({});
        setSelectedRange(undefined);
        setSelectedStatus({ label: 'Pilih Tipe', value: '' });
        setSelectedStore(null);
        setPendingVoucherData(null);
      }
    };

    // const isValidForm =
    //   (formData.name ?? '').trim() !== '' &&
    //   (formData.code ?? '').trim() !== '' &&
    //   selectedStatus?.value &&
    //   ((selectedStatus.value === 'nominal' && formData.amount > 0) ||
    //     (selectedStatus.value === 'percent' && formData.amount > 0)) &&
    //   selectedRange?.from &&
    //   selectedRange?.to;

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[1rem] font-[500]">
              {isEditMode ? 'Edit Voucher' : 'Tambah Voucher'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Input Nama Voucher */}
            <div>
              <CustomInput
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                isWidthFull
                placeholder="cth: Diskon Lebaran"
                label="Nama Voucher"
              />
              {errors.name && <FormFieldError message={errors.name} />}
            </div>

            {/* Input Kode Voucher */}
            <div>
              <CustomInput
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                required
                isWidthFull
                placeholder="cth: LEBARAN2024"
                label="Kode Voucher"
              />
              {errors.code && <FormFieldError message={errors.code} />}
            </div>

            {/* Dropdown Pilih Toko */}
            <div>
              <label className="block text-sm font-medium text-[#555555] mb-2">
                Pilih Toko <span className="text-red-500">*</span>
              </label>
              <AsyncPaginate
                value={selectedStore}
                loadOptions={loadStores}
                onChange={handleStoreChange}
                placeholder="Pilih Toko"
                isClearable
                className={`w-full ${errors.store_id ? 'border-red-500' : ''}`}
                classNamePrefix="react-select"
                debounceTimeout={300}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: '42px',
                    borderRadius: '8px',
                    borderColor: errors.store_id
                      ? '#F08181'
                      : state.isFocused
                        ? '#3B82F6'
                        : '#C2C7D0',
                    boxShadow: state.isFocused ? '0 0 0 1px #3B82F6' : 'none',
                    '&:hover': {
                      borderColor: errors.store_id ? '#F08181' : '#3B82F6',
                    },
                  }),
                }}
              />
              {errors.store_id && <FormFieldError message={errors.store_id} />}
            </div>

            {/* Dropdown Tipe Voucher */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#555555]">
                Tipe Voucher <span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={optionsStatus}
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Pilih Tipe Voucher"
                className={errors.type ? 'border-red-500' : ''}
              />
              {errors.type && <FormFieldError message={errors.type} />}
            </div>

            {/* Input Amount */}
            <div>
              <CustomInput
                value={formData.amount === 0 ? '' : formData.amount.toString()}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                required
                isWidthFull
                currency={selectedStatus?.value === 'nominal'}
                inputNumber={selectedStatus?.value === 'percent'}
                placeholder="0"
                label={selectedStatus?.value === 'percent' ? 'Persentase (%)' : 'Nominal (Rp)'}
              />
              {errors.amount && <FormFieldError message={errors.amount} />}
            </div>

            {/* Date Range Picker */}
            <div>
              <DatePicker
                label="Periode Voucher"
                mode="range"
                mandatory="true"
                value={selectedRange}
                onChange={handleRangeChange}
                placeholder="Pilih periode voucher"
                className={`border h-10 ${
                  errors.period ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                }`}
              />
              {errors.period && <FormFieldError message={errors.period} />}
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" className="min-w-[80px]" onClick={handleDialogClose}>
              Batal
            </Button>
            <Button variant="success" className="min-w-[120px]" onClick={handleSaveClick}>
              {isEditMode ? 'Update Voucher' : 'Simpan Voucher'}
              <Check size={14} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

VoucherDialog.displayName = 'VoucherDialog';

export default VoucherDialog;
