import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export function useSearchParams() {
  type SortOrder = 'asc' | 'desc';
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10));
  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault('id'));
  const [sortOrderRaw, setSortOrderRaw] = useQueryState(
    'sortOrder',
    parseAsString.withDefault('desc')
  );

  // Ensure sortOrder is always either 'asc' or 'desc'
  const sortOrder = (
    sortOrderRaw === 'asc' || sortOrderRaw === 'desc' ? sortOrderRaw : 'desc'
  ) as SortOrder;

  const setSortOrder = (value: SortOrder) => {
    setSortOrderRaw(value);
  };

  const resetFilters = () => {
    setSearch('');
    setPage(1);
    setSortBy('id');
    setSortOrderRaw('desc');
  };

  return {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetFilters,
  };
}
