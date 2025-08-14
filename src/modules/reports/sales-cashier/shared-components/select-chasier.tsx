import { useEmployees } from '@/__generated__/api/hooks/sales-daily-days.hooks';
import { useMemo, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

type Option = { value: string; label: string };

type Props = {
  label?: string;
  className?: string;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
  placholder?: string;
};

const PAGE_SIZE = 10;
const SORT_BY = 'name';
const SORT_DIRECTION: 'asc' | 'desc' = 'asc';

export function SupplierDropdown({
  label = '',
  className,
  value,
  onChange,
  placholder = '',
}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: suppliersResponse, isLoading } = useEmployees(
    {
      search,
      page,
      per_page: PAGE_SIZE,
      sort_by: SORT_BY,
      search_by_status: 'all',
      sort_direction: SORT_DIRECTION,
    },
    '1',
    '1',
    '1'
  );
  const suppliers = Array.isArray(suppliersResponse?.data) ? suppliersResponse.data : [];

  const pagination = suppliersResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: PAGE_SIZE,
    total: 0,
  };
  type Employee = {
    id: string | number;
    name: string;
    // tambahkan field lain jika ada
  };
  const options: Option[] = useMemo(
    () =>
      suppliers.map((s: Employee) => ({
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
      <label className="font-medium mb-1">{label}</label>
      <AsyncPaginate
        value={value}
        loadOptions={handleLoadOptions}
        additional={{ page: 1 }}
        options={options}
        placeholder={isLoading ? 'Memuat ...' : placholder}
        isClearable
        onChange={onChange}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        debounceTimeout={300}
        classNamePrefix="react-select"
        className="w-full"
        isLoading={isLoading}
        onMenuOpen={handleMenuOpen}
      />
    </div>
  );
}
