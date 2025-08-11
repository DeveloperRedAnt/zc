import { DatePicker } from '@/components/datepicker/date-picker';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types/form-values';

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  name?: keyof FormValues;
  label?: string;
};

export function StockDateInput({
  control,
  errors,
  name = 'expiredDate',
  label = 'Tanggal Stok',
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium mb-1">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            mode="single"
            label=""
            value={
              typeof field.value === 'string'
                ? field.value
                  ? new Date(field.value)
                  : undefined
                : field.value
            }
            placeholder="dd/mm/yyyy"
            onChange={field.onChange}
            mandatory="true"
            closeOnSelect={true}
            className="h-11 w-full"
          />
        )}
      />
      {errors[name] && (
        <span className="text-destructive text-xs">{errors[name]?.message as string}</span>
      )}
    </div>
  );
}
