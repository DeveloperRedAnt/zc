'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React from 'react';

type FormStoreProps = {
  loadingDataStore?: boolean;
  optionsTypeStore: OptionType[];
  optionsCatStore: OptionType[];
  // Optional props untuk handling form state jika diperlukan
  onFormChange?: (formData: {
    namaToko?: string;
    noWhatsapp?: string;
    tipeToko?: OptionType | null;
    lokasi?: string;
    jenisToko?: OptionType | null;
    alamat?: string;
  }) => void;
  initialValues?: {
    namaToko?: string;
    noWhatsapp?: string;
    tipeToko?: OptionType | null;
    lokasi?: string;
    jenisToko?: OptionType | null;
    alamat?: string;
  };
};

const FormStore: React.FC<FormStoreProps> = ({
  optionsTypeStore,
  optionsCatStore,
  onFormChange,
  initialValues,
  loadingDataStore = false,
}) => {
  return (
    <>
      {loadingDataStore ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 p-[10px]">
            <CustomInput
              required
              label="Nama Toko"
              placeholder="cth: Toko Cahaya Sejati"
              value={initialValues?.namaToko || ''}
              onChange={(e) => {
                onFormChange?.({
                  ...initialValues,
                  namaToko: e.target.value,
                });
              }}
              isWidthFull
              classDiv="w-1/2"
            />
            <CustomInput
              required
              label="No. Whatsapp"
              placeholder="cth: 0811223344556"
              value={initialValues?.noWhatsapp || ''}
              onChange={(e) => {
                onFormChange?.({
                  ...initialValues,
                  noWhatsapp: e.target.value,
                });
              }}
              isWidthFull
              classDiv="w-1/2"
            />
          </div>
          <div className="flex flex-row gap-2 p-[10px]">
            <Dropdown
              label="Tipe Toko"
              options={optionsTypeStore}
              value={initialValues?.tipeToko || null}
              onChange={(value) => {
                onFormChange?.({
                  ...initialValues,
                  tipeToko: value,
                });
              }}
              placeholder="Pilih Tipe"
              required
              classDiv="w-1/2"
            />
            <CustomInput
              label="Lokasi"
              placeholder="Pilih Lokasi"
              appendIcon="LocalTwo"
              value={initialValues?.lokasi || ''}
              onChange={(e) => {
                onFormChange?.({
                  ...initialValues,
                  lokasi: e.target.value,
                });
              }}
              isWidthFull
              classDiv="w-1/2"
            />
          </div>
          <div className="flex flex-row gap-2 p-[10px]">
            <Dropdown
              label="Jenis Toko"
              options={optionsCatStore}
              value={initialValues?.jenisToko || null}
              onChange={(value) => {
                onFormChange?.({
                  ...initialValues,
                  jenisToko: value,
                });
              }}
              placeholder="Pilih Jenis"
              required
              classDiv="w-1/2"
            />
            <CustomInput
              label="Alamat"
              placeholder="cth: Jl. Raya | No. 2"
              className="h-[95px]"
              value={initialValues?.alamat || ''}
              onChange={(e) => {
                onFormChange?.({
                  ...initialValues,
                  alamat: e.target.value,
                });
              }}
              isWidthFull
              classDiv="w-1/2"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormStore;
