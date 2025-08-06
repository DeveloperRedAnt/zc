import dayjs from 'dayjs';
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';

export function useSearchParams() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage, setPerPage] = useQueryState('per_page', parseAsInteger.withDefault(10));

  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault(''));
  const [sortOrder, setSortOrder] = useQueryState(
    'sortOrder',
    parseAsStringEnum(['asc', 'desc']).withDefault('asc')
  );

  const [from, setStateFrom] = useQueryState('from', parseAsString.withDefault(''));
  const [to, setStateTo] = useQueryState('to', parseAsString.withDefault(''));

  const setFrom = (from: string) => setStateFrom(dayjs(from).format('YYYY-MM-DD'));
  const setTo = (to: string) => setStateTo(dayjs(to).format('YYYY-MM-DD'));

  const resetFilters = () => {
    setPage(1);
    setSortBy('asc');
    setSortOrder('asc');
    setFrom('');
    setTo('');
  };

  return {
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetFilters,
    from,
    setFrom,
    to,
    setTo,
  };
}
