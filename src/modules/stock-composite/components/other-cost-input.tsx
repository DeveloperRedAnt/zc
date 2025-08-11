import CustomInput from '@/components/input/custom-input';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types/form-values';

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors;
};

export function OtherCostInput({ control, errors }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium mb-1">Biaya Lain-lain</label>
      <Controller
        control={control}
        name="otherCost"
        render={({ field }) => (
          <CustomInput
            currency
            placeholder="0"
            prependText="Rp"
            label=""
            min={1}
            className="w-full h-11 text-sm"
            {...field}
          />
        )}
      />
      {errors.otherCost?.message && (
        <span className="text-destructive text-xs">{String(errors.otherCost.message)}</span>
      )}
    </div>
  );
}
