'use client';

import { useBusinesModel } from '@/__generated__/api/hooks/business/business-models.hooks';
import { useCategoryStore } from '@/__generated__/api/hooks/business/business.hooks';
import type { OptionType } from '@/components/dropdown/dropdown';
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
import { FormStoreProps, StoreFormData } from '@/modules/store/types/form-create-store.types';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const MapDialog = dynamic(() => import('./map-dialog'), { ssr: false });

const DEFAULT_LAT = -7.7828728;
const DEFAULT_LNG = 110.3684071;

const getInitialLocation = (lat?: number, lng?: number) =>
  typeof lat === 'number' && typeof lng === 'number' ? `${lat}, ${lng}` : '';

const FormStore: React.FC<FormStoreProps> = ({
  onFormChange,
  initialValues,
  loadingDataStore = false,
}) => {
  const { data: listCategory } = useCategoryStore();
  const { data: listType } = useBusinesModel();

  // Mapping options
  const typeOptions = Array.isArray(listType)
    ? listType.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const categoryOptions = Array.isArray(listCategory)
    ? listCategory.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  // State
  const [selectedType, setSelectedType] = useState<OptionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(null);
  const [name, setName] = useState(initialValues?.name ?? '');
  const [noWhatsapp, setNoWhatsapp] = useState<string>(
    initialValues?.phone ? String(initialValues.phone) : ''
  );
  const [lat, setLat] = useState<number>(
    typeof initialValues?.lat === 'number' ? initialValues.lat : DEFAULT_LAT
  );
  const [lng, setLng] = useState<number>(
    typeof initialValues?.long === 'number' ? initialValues.long : DEFAULT_LNG
  );
  const [location, setLocation] = useState(
    getInitialLocation(initialValues?.lat, initialValues?.long)
  );
  const [address, setAddress] = useState(initialValues?.address ?? '');
  const [openMapDialog, setOpenMapDialog] = useState(false);

  // Set selectedType & selectedCategory dari initialValues dan options
  const [didSetInitial, setDidSetInitial] = useState(false);

  useEffect(() => {
    if (!didSetInitial && initialValues && Array.isArray(listType) && Array.isArray(listCategory)) {
      const matchType = listType.find((item) => item.id === initialValues.type);
      setSelectedType(matchType ? { label: matchType.name, value: matchType.id } : null);

      const matchCat = listCategory.find((item) => item.id === initialValues.category);
      setSelectedCategory(matchCat ? { label: matchCat.name, value: matchCat.id } : null);

      setName(initialValues.name ?? '');
      setNoWhatsapp(initialValues.phone ? String(initialValues.phone) : '');
      setAddress(initialValues.address ?? '');
      setLat(typeof initialValues.lat === 'number' ? initialValues.lat : DEFAULT_LAT);
      setLng(typeof initialValues.long === 'number' ? initialValues.long : DEFAULT_LNG);
      setLocation(getInitialLocation(initialValues.lat, initialValues.long));

      setDidSetInitial(true); // <-- agar hanya dijalankan sekali
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, listType, listCategory, didSetInitial]);

  const { ref: nameRef, error: nameError } = useRegisterField('name');
  const { ref: noWhatsappRef, error: noWhatsappError } = useRegisterField('noWhatsapp');

  const { error: storeTypeError } = useRegisterField('type', true, {
    getValue: () => selectedType?.value?.toString() ?? '',
  });
  const { error: categoryError, handleChange: onCategoryChange } = useRegisterField(
    'category',
    true,
    {
      getValue: () => selectedCategory?.value?.toString() ?? '',
    }
  );

  const triggerFormChange = (changed: Partial<StoreFormData>) => {
    onFormChange?.({
      name: changed.name ?? name,
      address: changed.address ?? address,
      phone: changed.phone ?? noWhatsapp,
      type: changed.type ?? selectedType?.value?.toString() ?? '',
      category: changed.category ?? selectedCategory?.value?.toString() ?? '',
      lat: changed.lat ?? lat,
      long: changed.long ?? lng,
    });
  };

  // Reusable input handler
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof StoreFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      triggerFormChange({ [field]: e.target.value });
    };

  // Reusable select handler
  const handleSelectChange =
    (
      setter: React.Dispatch<React.SetStateAction<OptionType | null>>,
      field: keyof StoreFormData,
      onFieldChange: () => void,
      options: OptionType[]
    ) =>
    (val: string) => {
      const selected = options.find((opt) => opt.value.toString() === val) ?? null;
      setter(selected);
      onFieldChange();
      triggerFormChange({ [field]: selected?.value ?? '' });
    };

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
            <div className="w-1/2">
              <CustomInput
                required
                label="Nama Toko"
                placeholder="cth: Toko Cahaya Sejati"
                ref={nameRef}
                value={name}
                onChange={handleInputChange(setName, 'name')}
                isWidthFull
                className={`border ${nameError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
              />
              <FormFieldError message={nameError} />
            </div>
            <div className="w-1/2">
              <CustomInput
                required
                label="No. Whatsapp"
                placeholder="cth: 0811223344556"
                ref={noWhatsappRef}
                value={noWhatsapp}
                onChange={handleInputChange(setNoWhatsapp, 'phone')}
                isWidthFull
                className={`border ${noWhatsappError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
                inputNumber
              />
              <FormFieldError message={noWhatsappError} />
            </div>
          </div>
          <div className="flex flex-row gap-2 p-[10px]">
            <div className="w-1/2">
              <Select
                value={selectedType?.value?.toString() ?? ''}
                onValueChange={handleSelectChange(setSelectedType, 'type', () => {}, typeOptions)}
              >
                <SelectTrigger
                  className="w-full pb-1 border !border-[#C2C7D0] mt-1"
                  icon={<ChevronDown size={18} className="ml-2" />}
                >
                  <SelectValue placeholder="Pilih Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipe Toko</SelectLabel>
                    {typeOptions.map((opt) => (
                      <SelectItem key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormFieldError message={storeTypeError} />
            </div>
            <div className="w-1/2">
              <CustomInput
                label="Lokasi"
                placeholder="Pilih Lokasi"
                value={location}
                appendIcon="LocalTwo"
                readOnly
                onClick={() => setOpenMapDialog(true)}
                isWidthFull
              />
            </div>
          </div>
          <div className="flex flex-row gap-2 p-[10px]">
            <div className="w-1/2">
              <Select
                value={selectedCategory?.value?.toString() ?? ''}
                onValueChange={handleSelectChange(
                  setSelectedCategory,
                  'category',
                  onCategoryChange,
                  categoryOptions
                )}
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
                    {categoryOptions.map((opt) => (
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
                asTextarea
                onChange={handleInputChange(setAddress, 'address')}
                isWidthFull
                className="h-[95px]"
              />
            </div>
          </div>
          {openMapDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-[80vh] flex flex-col relative">
                <button
                  type="button"
                  className="absolute top-2 right-2 text-xl"
                  onClick={() => setOpenMapDialog(false)}
                >
                  ✕
                </button>
                <div className="flex-1 flex flex-col">
                  <label className="block mb-1 font-medium p-4">Pilih Lokasi di Map</label>
                  <MapDialog
                    lat={lat}
                    lng={lng}
                    setLatLng={(newLat: number, newLng: number) => {
                      setLat(newLat);
                      setLng(newLng);
                      setLocation(`${newLat}, ${newLng}`);
                    }}
                    name={name}
                    address={address}
                    triggerFormChange={(changed) => {
                      if (changed.address) setAddress(changed.address);
                      const updatedFields: Partial<StoreFormData> = {};
                      if (changed.lat !== undefined) updatedFields.lat = changed.lat;
                      if (changed.address !== undefined) updatedFields.address = changed.address;
                      if (lng !== undefined) updatedFields.long = lng;
                      triggerFormChange(updatedFields);
                    }}
                  />
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Lat: {lat}, Lng: {lng}
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white rounded"
                      onClick={() => {
                        triggerFormChange({ lat, long: lng });
                        setOpenMapDialog(false);
                      }}
                    >
                      Pilih Lokasi ✓
                    </button>
                  </div>
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
