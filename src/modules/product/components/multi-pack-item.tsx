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
import { useRef } from 'react';

type PriceMultiPackItem = {
  id: number;
  itemName: string;
  quantity: number;
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
  const itemNameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const {
    ref: itemNameFieldRef,
    error: itemNameError,
    handleChange: handleItemNameChange,
  } = useRegisterField(`multiPrice.${index}.itemName`, true, {
    ref: itemNameRef,
    getValue: () => itemNameRef.current?.value ?? '',
  });

  const {
    ref: quantityFieldRef,
    error: quantityError,
    handleChange: handleQuantityChange,
  } = useRegisterField(`multiPrice.${index}.quantity`, true, {
    ref: quantityRef,
    getValue: () => quantityRef.current?.value ?? '',
  });

  const {
    ref: priceFieldRef,
    error: priceError,
    handleChange: handlePriceChange,
  } = useRegisterField(`multiPrice.${index}.price`, true, {
    ref: priceRef,
    getValue: () => priceRef.current?.value ?? '',
  });

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-6">
        {/* Nama Satuan */}
        <div className="w-[18.6rem]">
          <CustomInput
            ref={itemNameFieldRef}
            label="Nama Satuan"
            value={item.itemName}
            onChange={(e) => {
              onChange(item.id, 'itemName', e.target.value);
              handleItemNameChange();
            }}
            placeholder="cth: Single"
            required
            isWidthFull
            className={itemNameError || errors.itemName ? '!border-[#F08181]' : 'border-[#C2C7D0]'}
          />
          <FormFieldError message={itemNameError || errors.itemName} />
        </div>

        {/* Kuantiti */}
        <div>
          <Stepper
            ref={quantityFieldRef}
            value={item.quantity}
            onChange={(val) => {
              onChange(item.id, 'quantity', val);
              handleQuantityChange();
            }}
            label="Kuantiti"
            required
            error={quantityError || errors.quantity}
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
            onChange={(e) => {
              onChange(item.id, 'price', Number(e.target.value));
              handlePriceChange();
            }}
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
