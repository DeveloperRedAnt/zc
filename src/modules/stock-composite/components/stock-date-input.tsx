import { DatePicker } from '@/components/datepicker/date-picker';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types/form-values';

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  name?: 'batch_stock' | 'other_cost' | 'store_id' | 'expired_date' | 'stock_date';
  label?: string;
};

export function StockDateInput({
  control,
  errors,
  name = 'expired_date',
  label = 'Tanggal Stok',
}: Props) {
  const isExpiredDate = name === 'expired_date' || label === 'Tanggal Kedaluwarsa';
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium mb-1">
        {label}
        {isExpiredDate && <span className="text-red-500">*</span>}
      </label>
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
