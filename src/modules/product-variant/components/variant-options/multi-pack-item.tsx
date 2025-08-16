'use client';
import { Button } from '@/components/button/button';
import FormFieldError from '@/components/form-field-error/form-field-error';
import CustomInput from '@/components/input/custom-input';
import { Stepper } from '@/components/number-stepper/number-stepper';
import { Delete } from '@icon-park/react';
import { MultiPackItemType, usePriceMultiPackStore } from './multi-pack-stores';

type Props = {
  index: number;
  item: MultiPackItemType;
  errors: Record<string, string>;
  onRemove?: (index: number) => void;
};

export default function MultiPackItem({ index, item, errors, onRemove }: Props) {
  const { updateMultiPackItem } = usePriceMultiPackStore();

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <CustomInput
        label="Nama Satuan"
        value={item.unit_name}
        onChange={(e) => updateMultiPackItem(index, 'unit_name', e.target.value)}
        placeholder="cth: Single"
        required
      />
      <FormFieldError message={errors.unit_name} />

      <Stepper
        value={Number(item.conversion_value)}
        onChange={(val) => updateMultiPackItem(index, 'conversion_value', String(val))}
        label="Nilai Konversi"
        required
        error={errors.conversion_value}
      />

      <CustomInput
        label="Nominal Harga"
        value={item.price}
        onChange={(e) => updateMultiPackItem(index, 'price', e.target.value)}
        placeholder="0"
        currency
        inputNumber
        prependText="Rp"
        required
      />
      <FormFieldError message={errors.price} />

      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          className="text-[#F08181] mt-2"
          onClick={() => onRemove(index)}
        >
          <Delete size="20" fill="#F08181" />
          Hapus
        </Button>
      )}
    </div>
  );
}
