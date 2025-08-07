'use client';

import { Button } from '@/components/button/button';
import FormFieldError from '@/components/form-field-error/form-field-error';
import { Input } from '@/components/input/input';
import UnitPicker, { UnitOptionType } from '@/components/unit-picker/unit-picker';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import { useProductDetailStore } from '@/modules/products/storing-data/product-detail/stores';
import { Refresh } from '@icon-park/react';
import { useRef, useState } from 'react';

export default function FormProductDetail({ isEdit = false }: { isEdit?: boolean }) {
  const [selectedUnit, setSelectedUnit] = useState<UnitOptionType | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const productDetailStore = useProductDetailStore(); // ✅ Init store

  // Register field: Content
  const {
    ref: contentRef,
    error: contentError,
    handleChange: originalOnContentChange,
  } = useRegisterField('productDetail.content');

  // Register field: Packaging
  const {
    ref: packagingRef,
    error: packagingError,
    handleChange: originalOnPackagingChange,
  } = useRegisterField('productDetail.packaging');

  // Register field: Unit (Dropdown)
  const { error: unitError, handleChange: onUnitChange } = useRegisterField(
    'productDetail.unit',
    true,
    {
      getValue: () => selectedUnit?.value?.toString() ?? '',
    }
  );

  // ✅ Update store on content change
  const onContentChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    originalOnContentChange();
    productDetailStore.setProductDetail({ content: e.target.value });
  };

  // ✅ Update store on packaging change
  const onPackagingChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    originalOnPackagingChange();
    productDetailStore.setProductDetail({ package: e.target.value });
  };

  // ✅ Update barcode on packaging change
  const onBarcodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    originalOnPackagingChange();
    productDetailStore.setProductDetail({ barcode: e.target.value });
  };

  // ✅ Update sku on packaging change
  const onSkuChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    originalOnPackagingChange();
    productDetailStore.setProductDetail({ sku: e.target.value });
  };

  // ✅ Update store on dropdown change
  const handleDropdownChange = (val: UnitOptionType | null) => {
    setSelectedUnit(val);
    onUnitChange(); // for validation
    productDetailStore.setProductDetail({ unit_id: val ? val.data.id : null });
  };

  return (
    <div className="pb-6">
      <div className="pt-6 flex-row flex justify-between items-center">
        <p> Detail Produk </p>
        {isEdit && (
          <div className="flex">
            <Button type="button" variant="outline">
              <Refresh />
              Reset
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Content */}
        <div className="flex flex-col items-start gap-4">
          <div className="w-full mt-4">
            <label className="block mb-2">
              Isi / Content <span className="text-[#F08181]">*</span>
            </label>
            <Input
              ref={contentRef as React.RefObject<HTMLInputElement>}
              onChange={onContentChange}
              type="text"
              placeholder="cth: 250"
              className={`border ${contentError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
            />
            <FormFieldError message={contentError} />
          </div>
        </div>

        {/* Unit (Dropdown) */}
        <div className="flex flex-col items-start gap-4">
          <div className="w-full mt-4" ref={dropdownRef}>
            <UnitPicker
              label="Unit"
              value={selectedUnit}
              onChange={handleDropdownChange}
              placeholder="Pilih Unit"
              className={'h-[40px] pb-1 w-full'}
              required
            />
            <FormFieldError message={unitError} />
          </div>
        </div>

        {/* Packaging */}
        <div className="flex flex-col items-start gap-4">
          <div className="w-full mt-4">
            <label className="block mb-2">
              Kemasan <span className="text-[#F08181]">*</span>
            </label>
            <Input
              ref={packagingRef as React.RefObject<HTMLInputElement>}
              onChange={onPackagingChange}
              type="text"
              placeholder="cth: Botol"
              className={`border ${packagingError ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
            />
            <FormFieldError message={packagingError} />
          </div>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-start gap-4">
          <div className="w-full mt-2">
            <label className="block mb-2"> Barcode </label>
            <Input
              type="text"
              className="border-[#C2C7D0]"
              placeholder="cth: 1199922838920"
              onChange={onBarcodeChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="w-full mt-2">
            <label className="block mb-2"> SKU </label>
            <Input
              type="text"
              className="border-[#C2C7D0]"
              placeholder="cth: 782217821"
              onChange={onSkuChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
