import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export function useSearchParams() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10));
  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault('id'));
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString.withDefault('desc'));

  const resetFilters = () => {
    setSearch('');
    setPage(1);
    setSortBy('id');
    setSortOrder('desc');
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
