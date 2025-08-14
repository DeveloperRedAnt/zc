import { useStore } from '@/__generated__/api/hooks/supplier.hooks';
import { useMemo, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

type Option = { value: string; label: string };

type Props = {
  label?: string;
  className?: string;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
};

const PAGE_SIZE = 10;
const SORT_BY = 'name';
const SORT_DIRECTION: 'asc' | 'desc' = 'asc';

export function TokoDropdown({ label = '', className, value, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: suppliersResponse, isLoading } = useStore(
    page,
    PAGE_SIZE,
    SORT_BY,
    SORT_DIRECTION,
    search
  );

  const suppliers = Array.isArray(suppliersResponse?.data) ? suppliersResponse.data : [];

  const pagination = suppliersResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: PAGE_SIZE,
    total: 0,
  };
  type Store = {
    id: string | number;
    name: string;
  };
  const options: Option[] = useMemo(
    () =>
      suppliers.map((s: Store) => ({
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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <AsyncPaginate
        value={value}
        loadOptions={handleLoadOptions}
        additional={{ page: 1 }}
        options={options}
        placeholder={isLoading ? 'Memuat data...' : 'Semua Toko'}
        isClearable
        onChange={onChange}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        debounceTimeout={300}
        classNamePrefix="react-select"
        className="w-full"
        isLoading={isLoading}
        onMenuOpen={handleMenuOpen}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '52px',
            borderRadius: '8px',
          }),
        }}
      />
    </div>
  );
}
