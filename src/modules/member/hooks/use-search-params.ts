import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export function useMemberSearchParams() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage, setPerPage] = useQueryState('per_page', parseAsInteger.withDefault(10));

  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault(''));
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString.withDefault(''));

  const [status, setStatus] = useQueryState('status', parseAsString.withDefault('all'));

  const resetFilters = () => {
    setSearch('');
    setPage(1);
    setSortBy('name');
    setSortOrder('asc');
    setStatus('all');
  };

  return {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetFilters,
    status,
    setStatus,
  };
}
