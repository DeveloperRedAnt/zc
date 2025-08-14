import { Input } from '@/components/input/input';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../types/form-values';

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export function BatchStockInput({ control, errors }: Props) {
  return (
    <Controller
      control={control}
      name="batch_stock"
      render={({ field }) => (
        <div>
          <label className="block mb-1 font-medium">
            Stok Batch <span className="text-red-500">*</span>
          </label>
          <Input type="number" min={1} required className="w-full h-11 text-sm" {...field} />
          {errors.batch_stock?.message && (
            <span className="text-red-500 text-xs mt-1">{errors.batch_stock.message}</span>
          )}
        </div>
      )}
    />
  );
}
