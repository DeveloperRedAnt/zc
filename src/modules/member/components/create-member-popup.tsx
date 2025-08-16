'use client';

import { listStore } from '@/__generated__/api/client';
import type { StoreItem } from '@/__generated__/api/dto';
import { useCreateMember, useEditMember } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import { DatePicker } from '@/components/datepicker/date-picker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import FormFieldError from '@/components/form-field-error/form-field-error';
import CustomInput from '@/components/input/custom-input';
import { toast } from '@/components/toast/toast';
import { Member } from '@/modules/member/types/member';
import { zeroPad } from '@/utils/pad-start';
import { ArrowRight } from '@icon-park/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

// Using imported Member type from '@/modules/member/types/member'

type StoreOption = {
  value: string;
  label: string;
  data: StoreItem;
};

type MemberFormData = {
  name: string;
  birth_date: Date | null;
  phone: string;
  identity_number: string;
  address: string;
  store_id: string;
};

type CreateMemberParams = {
  body: {
    name: string;
    birth_date: string;
    phone: string;
    identity_number: string;
    address: string;
    store_id: string;
  };
};

type EditMemberParams = {
  id: string;
  body: {
    name: string;
    birth_date: string;
    phone: string;
    identity_number: string;
    address: string;
    store_id: string;
  };
};

const INITIAL_FORM_STATE: MemberFormData = {
  name: '',
  birth_date: null,
  phone: '',
  identity_number: '',
  address: '',
  store_id: '',
};

interface CreateMemberPopupProps {
  member?: Member | null; // Optional member data for edit mode
  onSuccess?: () => void;
}

export default function CreateMemberPopup({
  member = null,
  onSuccess,
  ...props
}: CreateMemberPopupProps & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const createMemberMutation = useCreateMember();
  const editMemberMutation = useEditMember();
  const router = useRouter();

  // Determine if we're in edit mode
  const isEditMode = Boolean(member);

  const [formData, setFormData] = useState<MemberFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreOption | null>(null);
  // Populate form data when member data is available (edit mode)
  useEffect(() => {
    if (isEditMode && member) {
      setFormData({
        name: member.name,
        birth_date: member.birth_date ? new Date(member.birth_date) : null,
        phone: member.phone,
        identity_number: member.identity_number,
        address: member.address,
        store_id: member.store.id.toString(),
      });

      // Set selected store for dropdown
      setSelectedStore({
        value: member.store.id.toString(),
        label: `#${zeroPad(member.store.id, 4)} - ${member.store.name}`,
        data: {
          id: member.store.id,
          name: member.store.name,
          address: '',
          phone: '',
          email: '',
          lat: 0,
          lng: 0,
          image: '',
        },
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
      setSelectedStore(null);
    }
  }, [isEditMode, member]);

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

  const handleDialogClose = () => {
    props.onOpenChange(false);
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setShowConfirm(false);
    setSelectedStore(null);
    router.refresh();
  };

  const handleInputChange = (field: keyof MemberFormData, value: string | Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.birth_date) {
      newErrors.birth_date = 'Tanggal lahir wajib diisi';
    }

    const phone = formData.phone.trim();
    if (!phone) {
      newErrors.phone = 'No. Telp wajib diisi';
    } else if (!/^08\d{8,11}$/.test(phone)) {
      newErrors.phone = 'No. Telp tidak valid (harus 10–13 digit, diawali 08)';
    }

    const ktp = formData.identity_number.trim();
    if (!ktp) {
      newErrors.identity_number = 'No. KTP wajib diisi';
    } else if (!/^\d{16}$/.test(ktp)) {
      newErrors.identity_number = 'No. KTP harus 16 digit angka';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat wajib diisi';
    }

    if (!formData.store_id.trim()) {
      newErrors.store_id = 'Toko wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (!validateForm()) {
      return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = async () => {
    // Format date to YYYY-MM-DD
    const birthDateFormatted = formData.birth_date
      ? formData.birth_date.toISOString().split('T')[0]
      : ''; // Use empty string instead of undefined

    // Ensure birth_date is always a string to satisfy the API requirements
    const payload = {
      name: formData.name,
      birth_date: birthDateFormatted || '', // Ensure it's never undefined
      phone: formData.phone,
      identity_number: formData.identity_number,
      address: formData.address,
      store_id: formData.store_id,
    };

    if (isEditMode && member) {
      const editParams: EditMemberParams = {
        id: member.id.toString(),
        body: payload,
      };

      editMemberMutation.mutate(editParams, {
        onSuccess: (response) => {
          setShowConfirm(false);

          if (response.status === 'success') {
            toast.success('Member berhasil diperbarui!', {
              style: { background: '#22c55e', color: '#fff' },
            });

            // Reset form and close popup
            setFormData(INITIAL_FORM_STATE);
            setErrors({});
            props.onOpenChange(false);

            // Invalidate queries to refresh member list
            queryClient.invalidateQueries({ queryKey: ['getMember'] });

            // Call onSuccess callback
            if (onSuccess) {
              onSuccess();
              props.onOpenChange(false);
              router.refresh();
            }
          } else {
            toast.error(response.message || 'Gagal memperbarui member', {
              style: { background: '#ef4444', color: '#fff' },
            });
          }
        },
        onError: (error: unknown) => {
          setShowConfirm(false);
          handleMutationError(error);
        },
      });
    } else {
      const createParams: CreateMemberParams = {
        body: payload,
      };

      createMemberMutation.mutate(createParams, {
        onSuccess: (response) => {
          setShowConfirm(false);

          if (response.status === 'success') {
            toast.success('Member berhasil ditambahkan!', {
              style: { background: '#22c55e', color: '#fff' },
            });

            // Reset form and close popup
            setFormData(INITIAL_FORM_STATE);
            setErrors({});
            props.onOpenChange(false);

            // Invalidate queries to refresh member list
            queryClient.invalidateQueries({ queryKey: ['getMember'] });

            // Call onSuccess callback
            if (onSuccess) {
              onSuccess();
              props.onOpenChange(false);
              router.refresh();
            }
          } else {
            toast.error(response.message || 'Gagal menambahkan member', {
              style: { background: '#ef4444', color: '#fff' },
            });
          }
        },
        onError: (error: unknown) => {
          setShowConfirm(false);
          handleMutationError(error);
        },
      });
    }
  };

  const handleMutationError = (error: unknown) => {
    let errorMessage = 'Terjadi kesalahan';
    const apiErrors: Record<string, string> = {};

    if (typeof error === 'object' && error !== null && 'response' in error) {
      const typedError = error as {
        response: {
          data?: {
            message?: string;
            errors?: Record<string, string[] | string>;
          };
        };
        message?: string;
      };

      errorMessage = typedError.response?.data?.message || typedError.message || errorMessage;

      if (typedError.response?.data?.errors) {
        const errors = typedError.response.data.errors;
        // Make sure errors is an object before using Object.entries
        if (errors && typeof errors === 'object') {
          for (const [key, value] of Object.entries(errors)) {
            // Handle undefined/null values by providing empty string as fallback
            apiErrors[key] = Array.isArray(value) ? value[0] || '' : value ? String(value) : '';
          }
          setErrors(apiErrors);
        }
      }
    }

    toast.error(errorMessage, {
      style: { background: '#ef4444', color: '#fff' },
    });
  };

  const handleOpenChange = (open: boolean) => {
    props.onOpenChange(open);

    if (!open) {
      // Reset form when closing
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setShowConfirm(false);
    }
  };

  const handleBackToForm = () => {
    setShowConfirm(false);
  };

  const isLoading = createMemberMutation.isPending || editMemberMutation.isPending;

  return (
    <Dialog open={props.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!showConfirm ? (
          <>
            {/* Form Step */}
            <DialogHeader>
              <DialogTitle className="text-[1rem] font-[500]">
                {isEditMode ? 'Edit Member' : 'Tambah Member'}
              </DialogTitle>
              <DialogDescription className="text-[12px]">
                {isEditMode ? 'Perbarui data member' : 'Lengkapi data member baru'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Toko Dropdown */}
              {!isEditMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Toko *
                  </label>
                  <AsyncPaginate
                    value={selectedStore}
                    loadOptions={loadStores}
                    onChange={handleStoreChange}
                    placeholder="Pilih Toko"
                    isClearable
                    className={`w-[278px] ${errors.store_id ? 'border-red-500' : ''}`}
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
                  <FormFieldError message={errors.store_id} />
                </div>
              )}
              {/* Input Nama Member */}
              <div>
                <CustomInput
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  isWidthFull
                  className={`border ${errors.name ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
                  placeholder="cth: John Doe"
                  label="Nama Member"
                />
                <FormFieldError message={errors.name} />
              </div>

              {/* Input Tanggal Lahir */}
              <div>
                <DatePicker
                  mode="single"
                  label="Tanggal Lahir *"
                  className={`border h-10 ${
                    errors.birth_date ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                  }`}
                  value={formData.birth_date || undefined}
                  placeholder="dd/mm/yyyy"
                  onChange={(date) => handleInputChange('birth_date', date as Date)}
                  mandatory="true"
                  closeOnSelect={true}
                />
                <FormFieldError message={errors.birth_date} />
              </div>

              {/* Input No. Telp */}
              <div>
                <CustomInput
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  isWidthFull
                  className={`border ${errors.phone ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
                  placeholder="cth: 0811223344556"
                  label="No. Telp"
                  inputNumber
                />
                <FormFieldError message={errors.phone} />
              </div>

              {/* Input No. KTP */}
              <div>
                <CustomInput
                  value={formData.identity_number}
                  onChange={(e) => handleInputChange('identity_number', e.target.value)}
                  required
                  isWidthFull
                  className={`border ${
                    errors.identity_number ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                  }`}
                  placeholder="cth: 34012233445566"
                  label="No. KTP"
                  inputNumber
                />
                <FormFieldError message={errors.identity_number} />
              </div>

              {/* Input Alamat */}
              <div>
                <CustomInput
                  label="Alamat"
                  placeholder="cth: Jl. Raya | No. 2"
                  value={formData.address}
                  asTextarea
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  isWidthFull
                  className={`mb-1 border h-[95px] ${
                    errors.address ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                  }`}
                  required
                />
                <FormFieldError message={errors.address} />
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-4 pt-4">
              <DialogClose asChild>
                <Button variant="ghost" className="min-w-[80px]" onClick={handleDialogClose}>
                  Batal
                </Button>
              </DialogClose>
              <Button variant="info" className="min-w-[120px]" onClick={handleSaveClick}>
                {isEditMode ? 'Perbarui Member' : 'Simpan Member'}
                <ArrowRight />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {/* Confirmation Step */}
            <DialogHeader>
              <DialogTitle className="text-[1rem] font-[500]">
                {isEditMode ? 'Anda akan memperbarui Member' : 'Anda akan menyimpan Member'}
              </DialogTitle>
              <DialogDescription className="pt-4 text-[12px]">
                {isEditMode
                  ? 'Apakah Anda yakin akan memperbarui data Member ini?'
                  : 'Apakah Anda yakin akan menyimpan data Member ini?'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-4 pt-4">
              <Button variant="ghost" className="min-w-[80px]" onClick={handleBackToForm}>
                Tidak
              </Button>
              <Button
                variant="info"
                className="min-w-[120px]"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (isEditMode ? 'Memperbarui...' : 'Menyimpan...') : 'Ya, Saya Yakin'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
