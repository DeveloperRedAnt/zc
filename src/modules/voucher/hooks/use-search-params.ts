import dayjs from 'dayjs';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export function useSearchParams() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage, setPerPage] = useQueryState('per_page', parseAsInteger.withDefault(10));

  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault(''));
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString.withDefault(''));

  const [status, setStatus] = useQueryState('status', parseAsString.withDefault('all'));
  const [from, setStateFrom] = useQueryState('from', parseAsString.withDefault(''));
  const [to, setStateTo] = useQueryState('to', parseAsString.withDefault(''));

  const setFrom = (from: string) => setStateFrom(dayjs(from).format('YYYY-MM-DD'));
  const setTo = (to: string) => setStateTo(dayjs(to).format('YYYY-MM-DD'));

  const resetFilters = () => {
    setSearch('');
    setPage(1);
    setSortBy('asc');
    setSortOrder('asc');
    setStatus('');
    setFrom('');
    setTo('');
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
    from,
    setFrom,
    to,
    setTo,
  };
}
