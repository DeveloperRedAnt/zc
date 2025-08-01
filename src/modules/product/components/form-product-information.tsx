// form-product-information.tsx
'use client';

import { useProductTags } from '@/__generated__/api/hooks';
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import FormFieldError from '@/components/form-field-error/form-field-error';
import { InformationText } from '@/components/information-text/information-text';
import { Input } from '@/components/input/input';
import InputFile from '@/components/input/input-file';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import { useProductInformationStore } from '@/modules/products/storing-data/product-information/stores';
import { useEffect, useMemo, useState } from 'react';

export default function FormProductInformation() {
  // Zustand store
  const {
    productName,
    isActiveProduct,
    isFavorite,
    selectedTags,
    // thumbnailFile,
    setProductName,
    setIsActiveProduct,
    setIsFavorite,
    setSelectedTags,
    setThumbnailFile,
  } = useProductInformationStore();

  const {
    data: tags,
    isLoading,
    isError,
    error,
  } = useProductTags({
    'x-device-id': '1',
    'x-store-id': '1',
    'x-organization-id': '1',
  });

  const optionsTag: OptionType[] = useMemo(() => {
    if (!tags) return [];
    return tags.map((tag: string | { name: string; id: string | number }, _index: number) => {
      if (typeof tag === 'string') {
        return { label: tag.charAt(0).toUpperCase() + tag.slice(1), value: tag };
      }
      if (tag && typeof tag === 'object' && 'name' in tag && 'id' in tag) {
        return { label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1), value: tag.id };
      }
      return { label: String(tag), value: tag };
    });
  }, [tags]);

  // Local state untuk dropdown (karena tipe berbeda)
  const [selectedTagOptions, setSelectedTagOptions] = useState<OptionType[]>([]);

  // Form validation
  const {
    ref: nameRef,
    error: nameError,
    handleChange: onNameChange,
  } = useRegisterField('productInformation.productName');

  // Sync selectedTags dengan selectedTagOptions
  useEffect(() => {
    const options = selectedTags.map((tag) => ({
      label: tag.label,
      value: tag.value,
    }));
    setSelectedTagOptions(options);
  }, [selectedTags]);

  // Handle product name change
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    onNameChange(); // Untuk validation
  };

  // Handle tag change
  const handleTagChange = (options: OptionType[]) => {
    setSelectedTagOptions(options);
    // Convert ke format ProductTag, pastikan value adalah number
    const tags = options.map((option) => ({
      label: option.label,
      value: typeof option.value === 'number' ? option.value : Number(option.value),
    }));
    setSelectedTags(tags);
  };

  // Handle file upload
  const handleFileChange = (file: File | null) => {
    setThumbnailFile(file);
  };

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
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full mt-4">
            <label className="block mb-2">
              Nama Produk <span className="text-[#F08181]">*</span>
            </label>
            <Input
              ref={nameRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={productName}
              onChange={handleProductNameChange}
              className={`w-[70%] border ${nameError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
              placeholder="cth: Kopi Arabica"
            />
            <FormFieldError message={nameError} />
          </div>
        </div>

        {/* KANAN */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Switch
              id="isActiveProduct"
              checked={isActiveProduct}
              onCheckedChange={setIsActiveProduct}
            />
            <Label htmlFor="isActiveProduct">Produk Aktif (Muncul di POS)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="isFavorite" checked={isFavorite} onCheckedChange={setIsFavorite} />
            <Label htmlFor="isFavorite">Favoritkan Produk</Label>
          </div>
          <div>
            <label className="text-sm flex items-center gap-1 mb-2"> Tag Produk </label>
            <InformationText text="Pengelompokan produk berdasarkan kata kunci (Opsional)" />
            <Dropdown
              isLoading={isLoading}
              label=""
              options={optionsTag}
              isMulti
              value={selectedTagOptions}
              onChange={handleTagChange}
              placeholder="Pilih tag"
              className="mt-2 w-[70%]"
            />
            {isError && (
              <p className="text-xs text-red-500 italic mt-1">
                {error?.message || 'Gagal memuat tags'}
              </p>
            )}
            {selectedTagOptions.length === 0 && (
              <p className="text-xs text-[#D8D8D8] italic"> Tidak ada tags </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
