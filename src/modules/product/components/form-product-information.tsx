'use client';

import { useState } from 'react';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { InformationText } from '@/components/information-text/information-text';
import { Input } from '@/components/input/input';
import InputFile from '@/components/input/input-file';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import FormFieldError from '@/components/form-field-error/form-field-error';

const optionsTag: OptionType[] = [
  { label: 'Pakaian', value: 1 },
  { label: 'Makanan', value: 2 },
  { label: 'Besar', value: 3 },
  { label: 'Kecil', value: 4 },
  { label: 'Kotak', value: 5 },
  { label: 'Eceran', value: 6 },
];

export default function FormProductInformation() {
  const [selectedTag, setSelectedTag] = useState<OptionType[]>([]);

  const {
    ref: nameRef,
    error: nameError,
    handleChange: onNameChange,
  } = useRegisterField('productInformation.productName');

  return (
    <div className="border-b border-[#C2C7D0]">
      <div className="pt-6">
        <p> Informasi Produk </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        {/* KIRI */}
        <div className="flex flex-col items-start gap-4 border-r border-[#C2C7D0]">
          <div className="w-[95%]">
            <InputFile
              label="Unggah Thumbnail"
              accept="image/png, image/jpeg, image/jpg"
              fileInfoExtension=".jpg, .jpeg, .png"
              maxSize={2 * 1024 * 1024}
            />
          </div>
          <div className="w-full mt-4">
            <label className="block mb-2">
              Nama Produk <span className="text-[#F08181]">*</span>
            </label>
            <Input
              ref={nameRef as React.RefObject<HTMLInputElement>}
              type="text"
              onChange={onNameChange}
              className={`w-[70%] border ${
                nameError ? '!border-[#F08181]' : 'border-[#C2C7D0]'
              }`}
              placeholder="cth: Kopi Arabica"
            />
            <FormFieldError message={nameError} />
          </div>
        </div>

        {/* KANAN */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Switch id="isActiveProduct" defaultChecked />
            <Label htmlFor="isActiveProduct">Produk Aktif (Muncul di POS)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="isFavorite" />
            <Label htmlFor="isFavorite">Favoritkan Produk</Label>
          </div>
          <div>
            <label className="text-sm flex items-center gap-1 mb-2"> Tag Produk </label>
            <InformationText text="Pengelompokan produk berdasarkan kata kunci (Opsional)" />
            <Dropdown
              label=""
              options={optionsTag}
              isMulti
              value={selectedTag}
              onChange={setSelectedTag}
              placeholder="Pilih tag"
              className="mt-2 w-[70%]"
            />
            {selectedTag.length === 0 && (
              <p className="text-xs text-[#D8D8D8] italic"> Tidak ada tags </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
