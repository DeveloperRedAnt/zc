// form-product-information.tsx
'use client';

import FormFieldError from '@/components/form-field-error/form-field-error';
import { InformationText } from '@/components/information-text/information-text';
import { Input } from '@/components/input/input';
import InputFile from '@/components/input/input-file';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import TagPicker, { TagOptionType } from '@/components/tag-picker/tag-picker';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import { useProductInformationStore } from '@/modules/products-edit/storing-data/product-information/stores';
import { ProductTag } from '@/modules/products-edit/storing-data/product-information/types';
import { useState } from 'react';

export default function FormProductInformation({ productId = 1 }: { productId?: number }) {
  // Zustand store
  const store = useProductInformationStore();
  const productData = store.products[productId] ?? {
    thumbnailFile: null,
    thumbnailUrl: null,
    productName: '',
    isActiveProduct: true,
    isFavorite: false,
    selectedTags: [],
  };

  // Extract actions that now require productId
  const setProductName = (name: string) => store.setProductName(productId, name);
  const setIsActiveProduct = (isActive: boolean) => store.setIsActiveProduct(productId, isActive);
  const setIsFavorite = (isFavorite: boolean) => store.setIsFavorite(productId, isFavorite);
  const setSelectedTags = (tags: ProductTag[]) => store.setSelectedTags(productId, tags);
  const setThumbnailFile = (file: File | null) => store.setThumbnailFile(productId, file);

  const mappedSelectedTags = productData.selectedTags.map((tag) => ({
    label: tag.label,
    value: tag.value.toString(),
    data: {
      id: tag.value,
      name: tag.label,
    },
  }));

  // Local state untuk tag picker (karena tipe berbeda)
  const [selectedTagOptions, setSelectedTagOptions] = useState<TagOptionType[]>([]);

  // Form validation
  const {
    ref: nameRef,
    error: nameError,
    handleChange: onNameChange,
  } = useRegisterField('productInformation.productName');

  // Handle product name change
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    onNameChange(); // Untuk validation
  };

  // Handle tag change
  const handleTagChange = (options: readonly TagOptionType[] | null) => {
    const tagOptions = options ? Array.from(options) : [];
    setSelectedTagOptions(tagOptions);
    // Convert ke format ProductTag, pastikan value adalah number
    const tags = tagOptions.map((option) => ({
      label: option.label,
      value: option.data.id,
    }));
    setSelectedTags(tags);
  };

  // Handle file upload
  const handleFileChange = (file: File | null) => {
    setThumbnailFile(file);
  };

  return (
    <div className="border-b-gray-200">
      <div className="pt-6">
        <p> Informasi Produk </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        {/* KIRI */}
        <div className="flex flex-col items-start gap-4 border-r-gray-200">
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
              value={productData.productName}
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
              checked={productData.isActiveProduct}
              onCheckedChange={setIsActiveProduct}
            />
            <Label htmlFor="isActiveProduct">Produk Aktif (Muncul di POS)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="isFavorite"
              checked={productData.isFavorite}
              onCheckedChange={setIsFavorite}
            />
            <Label htmlFor="isFavorite">Favoritkan Produk</Label>
          </div>
          <div>
            <label className="text-sm flex items-center gap-1 mb-2"> Tag Produk </label>
            <InformationText text="Pengelompokan produk berdasarkan kata kunci (Opsional)" />
            <TagPicker
              value={mappedSelectedTags}
              onChange={handleTagChange}
              placeholder="Pilih tag"
              className="mt-2 w-[70%]"
            />
            {selectedTagOptions.length === 0 && (
              <p className="text-xs text-[#D8D8D8] italic"> Tidak ada tags </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
