// multi-pack-item.tsx
'use client';

import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import FormFieldError from '@/components/form-field-error/form-field-error';
import CustomInput from '@/components/input/custom-input';
import { Stepper } from '@/components/number-stepper/number-stepper';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import { Delete } from '@icon-park/react';
import { useCallback, useRef } from 'react';

type PriceMultiPackItem = {
  id?: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

type Props = {
  index: number;
  item: PriceMultiPackItem;
  onChange: (id: number, field: keyof PriceMultiPackItem, value: string | number) => void;
  onRemove?: () => void;
  errors?: { [field: string]: string };
};

export default function MultiPackItem({ index, item, onChange, onRemove, errors = {} }: Props) {
  const unitNameRef = useRef<HTMLInputElement>(null);
  const conversionValueRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const {
    ref: unitNameFieldRef,
    error: unitNameError,
    handleChange: handleunitNameChange,
  } = useRegisterField(`multiPrice.${index}.unitName`, true, {
    ref: unitNameRef,
    getValue: () => unitNameRef.current?.value ?? '',
  });

  const {
    ref: conversionValueFieldRef,
    error: conversionValueError,
    handleChange: handleconversionValueChange,
  } = useRegisterField(`multiPrice.${index}.conversionValue`, true, {
    ref: conversionValueRef,
    getValue: () => conversionValueRef.current?.value ?? '',
  });

  const {
    ref: priceFieldRef,
    error: priceError,
    handleChange: handlePriceChange,
  } = useRegisterField(`multiPrice.${index}.price`, true, {
    ref: priceRef,
    getValue: () => priceRef.current?.value ?? '',
  });

  // Ensure item.id is available
  const itemId = item.id ?? 0;

  const handleUnitNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(itemId, 'unitName', e.target.value);
      handleunitNameChange();
    },
    [itemId, onChange, handleunitNameChange]
  );

  const handleConversionValueChange = useCallback(
    (val: number) => {
      onChange(itemId, 'conversionValue', val);
      handleconversionValueChange();
    },
    [itemId, onChange, handleconversionValueChange]
  );

  const handlePriceChangeCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(itemId, 'price', Number(e.target.value));
      handlePriceChange();
    },
    [itemId, onChange, handlePriceChange]
  );

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-6">
        {/* Nama Satuan */}
        <div className="w-[18.6rem]">
          <CustomInput
            ref={unitNameFieldRef}
            label="Nama Satuan"
            value={item.unitName}
            onChange={handleUnitNameChange}
            placeholder="cth: Single"
            required
            isWidthFull
            className={unitNameError || errors.unitName ? '!border-[#F08181]' : 'border-[#C2C7D0]'}
          />
          <FormFieldError message={unitNameError || errors.unitName} />
        </div>

        {/* Kuantiti */}
        <div>
          <Stepper
            ref={conversionValueFieldRef}
            value={item.conversionValue}
            onChange={handleConversionValueChange}
            label="Kuantiti"
            required
            error={conversionValueError || errors.conversionValue}
          />
        </div>

        {/* Harga */}
        <div className="w-[18.6rem]">
          <CustomInput
            ref={priceFieldRef}
            label="Nominal Harga"
            placeholder="0"
            currency
            inputNumber
            prependText="Rp"
            value={item.price.toString()}
            onChange={handlePriceChangeCallback}
            required
            isWidthFull
            className={priceError || errors.price ? '!border-[#F08181]' : 'border-[#C2C7D0]'}
          />
          <FormFieldError message={priceError || errors.price} />
        </div>
      </div>

      {/* Tombol Hapus */}
      {onRemove && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="text-[#F08181] mt-2 ml-[1px] flex items-center"
            >
              <Delete size="20" fill="#F08181" />
              Hapus
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Anda akan menghapus Opsi Harga</DialogTitle>
              <DialogDescription className="pt-4">
                Apakah Anda yakin akan menghapus opsi harga tersebut?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Tidak</Button>
              </DialogClose>
              <Button variant="ghost" className="text-[#F08181]" onClick={onRemove}>
                Ya, Saya Yakin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
