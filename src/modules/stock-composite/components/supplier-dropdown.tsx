import { StoreList } from '@/__generated__/api/dto/supplier.dto';
import { useStore } from '@/__generated__/api/hooks/supplier.hooks';
import { useMemo, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import { FormValues } from '../types/form-values';

type Option = { value: string; label: string };

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  name?: string;
  label?: string;
  required?: boolean;
  className?: string;
};

const PAGE_SIZE = 10;
const SORT_BY = 'name';
const SORT_DIRECTION: 'asc' | 'desc' = 'asc';

export function SupplierDropdown({
  control,
  errors,
  name = 'supplier',
  label = 'Supplier',
  required = false,
  className,
}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: suppliersResponse, isLoading } = useStore(
    page,
    PAGE_SIZE,
    SORT_BY,
    SORT_DIRECTION,
    search
  );
  const suppliers: StoreList[] = Array.isArray(suppliersResponse?.data)
    ? suppliersResponse.data
    : [];

  const pagination = suppliersResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: PAGE_SIZE,
    total: 0,
  };
  const options: Option[] = useMemo(
    () =>
      suppliers.map((s) => ({
        value: String(s.id),
        label: `#${s.id} - ${s.name}`,
      })),
    [suppliers]
  );

  const handleMenuOpen = () => {
    if (page === null) setPage(1);
  };

  const handleLoadOptions = async (
    inputValue: string,
    _unused: unknown,
    additional?: { page: number }
  ) => {
    console.debug('[SupplierDropdown] API load', {
      inputValue,
      page: additional?.page ?? 1,
      timestamp: new Date().toISOString(),
    });
    setSearch(inputValue);
    setPage(additional?.page ?? 1);

    return {
      options,
      hasMore: pagination.current_page < pagination.last_page,
      additional: {
        page: pagination.current_page + 1,
      },
    };
  };

  return (
    <div className={className}>
      <label className="font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        control={control}
        name={name as keyof FormValues}
        render={({ field }) => {
          let selectedOption =
            options.find((opt) => opt.value === String(field.value ?? '')) || null;
          if (!selectedOption && field.value) {
            const supplier = suppliers.find((s) => String(s.id) === String(field.value));
            selectedOption = supplier
              ? { value: String(supplier.id), label: `#${supplier.id} - ${supplier.name}` }
              : { value: String(field.value), label: `#${field.value} - ${field.name}` };
          }
          return (
            <AsyncPaginate
              {...field}
              value={selectedOption}
              loadOptions={handleLoadOptions}
              additional={{ page: 1 }}
              options={options}
              placeholder={isLoading ? 'Memuat supplier...' : 'Cari dan pilih supplier...'}
              isClearable
              onChange={(option) => field.onChange(option ? option.value : '')}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}
              debounceTimeout={300}
              classNamePrefix="react-select"
              className="w-full"
              isLoading={isLoading}
              onMenuOpen={handleMenuOpen}
            />
          );
        }}
      />
      {errors[name] && (
        <span className="text-destructive text-xs">{errors[name]?.message as string}</span>
      )}
    </div>
  );
}
