'use client';

import FormFieldError from '@/components/form-field-error/form-field-error';
import CustomInput from '@/components/input/custom-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { Skeleton } from '@/components/skeleton/skeleton';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import CustomLocationInput from '@/modules/store/components/prepend-click-location';
import { FormStoreProps, StoreFormData } from '@/modules/store/types/form-create-store.types';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';

const MapDialog = dynamic(() => import('./components/map-dialog'), {
  ssr: false,
});

const DEFAULT_LAT = -6.2;
const DEFAULT_LNG = 106.816666;

const FormStore: React.FC<FormStoreProps> = ({
  loadingDataStore = false,
  optionsTypeStore,
  optionsCatStore,
  onFormChange,
  initialValues,
}) => {
  // State untuk form
  const [name, setName] = useState(initialValues?.name ?? '');
  const [address, setAddress] = useState(initialValues?.address ?? '');
  const [phone, setPhone] = useState(initialValues?.phone ?? '');
  const [type, setType] = useState(initialValues?.type ?? '');
  const [category, setCategory] = useState(initialValues?.category ?? '');
  const [lat, setLat] = useState(typeof initialValues?.lat === 'number' ? initialValues.lat : null);
  const [long, setLong] = useState(
    typeof initialValues?.long === 'number' ? initialValues.long : null
  );
  const [location, setLocation] = useState(
    typeof initialValues?.lat === 'number' &&
      typeof initialValues?.long === 'number' &&
      initialValues.lat !== 0 &&
      initialValues.long !== 0
      ? `${initialValues.lat}, ${initialValues.long}`
      : ''
  );
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [_isClient, setIsClient] = useState(false);

  const { ref: nameRef, error: nameError, handleChange: onNameChange } = useRegisterField('name');
  const {
    ref: phoneRef,
    error: phoneError,
    handleChange: onPhoneChange,
  } = useRegisterField('phone');
  const { error: typeError, handleChange: onTypeChange } = useRegisterField('type', true, {
    getValue: () => type,
  });
  const { error: categoryError, handleChange: onCategoryChange } = useRegisterField(
    'category',
    true,
    { getValue: () => category }
  );

  const isFirstSync = useRef(true);
  useEffect(() => {
    if (isFirstSync.current && initialValues) {
      setName(initialValues.name ?? '');
      setAddress(initialValues.address ?? '');
      setPhone(initialValues.phone ?? '');
      setType(initialValues.type ?? '');
      setCategory(initialValues.category ?? '');
      setLat(typeof initialValues.lat === 'number' ? initialValues.lat : DEFAULT_LAT);
      setLong(typeof initialValues.long === 'number' ? initialValues.long : DEFAULT_LNG);
      setLocation(
        typeof initialValues.lat === 'number' &&
          typeof initialValues.long === 'number' &&
          initialValues.lat !== 0 &&
          initialValues.long !== 0
          ? `${initialValues.lat}, ${initialValues.long}`
          : ''
      );
      isFirstSync.current = false;
      triggerFormChange({});
    }
  }, [initialValues]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Trigger perubahan ke parent
  const triggerFormChange = (changed: Partial<StoreFormData>) => {
    onFormChange?.({
      name: changed.name ?? name,
      address: changed.address ?? address,
      phone: changed.phone ?? phone,
      type: changed.type ?? type,
      category: changed.category ?? category,
      lat: 'lat' in changed && typeof changed.lat === 'number' ? changed.lat : lat ?? DEFAULT_LAT,
      long:
        'long' in changed && typeof changed.long === 'number' ? changed.long : long ?? DEFAULT_LNG,
    });
  };

  return (
    <>
      {loadingDataStore ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-start">
            <div className="w-1/2">
              <CustomInput
                required
                label="Nama Toko"
                placeholder="cth: Toko Cahaya Sejati"
                ref={nameRef}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  onNameChange();
                  triggerFormChange({ name: e.target.value });
                }}
                isWidthFull
                className={`h-9 border ${nameError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
              />
              <FormFieldError message={nameError} />
            </div>
            <div className="w-1/2">
              <CustomInput
                required
                label="No. Whatsapp"
                placeholder="cth: 0811223344556"
                ref={phoneRef}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  onPhoneChange();
                  triggerFormChange({ phone: e.target.value });
                }}
                isWidthFull
                className={`h-9 border ${phoneError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
                inputNumber
              />
              <FormFieldError message={phoneError} />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-start">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-sm">
                Tipe Toko<span className="text-[#F08181]">*</span>
              </label>
              <Select
                value={type}
                onValueChange={(val) => {
                  setType(val);
                  onTypeChange();
                  triggerFormChange({ type: val });
                }}
              >
                <SelectTrigger
                  icon={<ChevronDown size={18} />}
                  className="w-full h-10 border pb-1 mt-1"
                >
                  <SelectValue placeholder="Pilih Tipe Toko" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipe Toko</SelectLabel>
                    {optionsTypeStore.map((opt) => (
                      <SelectItem key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormFieldError message={typeError} />
            </div>
            <div className="w-1/2">
              <CustomLocationInput
                label="Lokasi"
                value={location || ''}
                placeholder="Pilih Lokasi"
                readOnly={false}
                onAppendClick={() => setOpenMapDialog(true)}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (!e.target.value) {
                    setLat(null);
                    setLong(null);
                    triggerFormChange({ lat: undefined, long: undefined });
                  }
                }}
                className="w-full h-9"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-start">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-sm">
                Jenis Toko<span className="text-[#F08181]">*</span>
              </label>
              <Select
                value={category}
                onValueChange={(val) => {
                  setCategory(val);
                  onCategoryChange();
                  triggerFormChange({ category: val });
                }}
              >
                <SelectTrigger
                  className={`w-full pb-1 border mt-1 ${
                    categoryError ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                  }`}
                  icon={<ChevronDown size={18} className="ml-2" />}
                >
                  <SelectValue placeholder="Pilih Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Jenis Toko</SelectLabel>
                    {optionsCatStore.map((opt) => (
                      <SelectItem key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormFieldError message={categoryError} />
            </div>
            <div className="w-1/2">
              <CustomInput
                label="Alamat"
                placeholder="cth: Jl. Raya | No. 2"
                value={address}
                asTextarea={true}
                onChange={(e) => {
                  setAddress(e.target.value);
                  triggerFormChange({ address: e.target.value });
                }}
                isWidthFull
                className="min-h-[48px] h-9"
              />
            </div>
          </div>
          {/* Map Dialog */}
          {openMapDialog && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
              onClick={() => setOpenMapDialog(false)}
            >
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-[90vw] h-full flex flex-col relative"
                style={{ minWidth: 900, maxWidth: '90vw', height: '90vh' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex-1 flex flex-col">
                  <MapDialog
                    lat={lat ?? DEFAULT_LAT}
                    lng={long ?? DEFAULT_LNG}
                    setLatLng={(newLat: number, newLong: number) => {
                      setLat(newLat);
                      setLong(newLong);
                      setLocation(`${newLat}, ${newLong}`);
                      triggerFormChange({ lat: newLat, long: newLong });
                    }}
                    name={name}
                    address={address}
                    triggerFormChange={(changed: {
                      lat?: number;
                      lng?: number;
                      location?: string;
                      address?: string;
                      closeDialog?: boolean;
                    }) => {
                      if (changed.address) setAddress(changed.address);
                      triggerFormChange({
                        ...changed,
                      });
                      if (changed.closeDialog) setOpenMapDialog(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FormStore;
