import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export function useSalesPaymentParams() {
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString.withDefault(today));
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString.withDefault(today));
  const [isActive, setIsActive] = useQueryState('is_active', parseAsInteger.withDefault(1));
  const [idsRaw, setIdsRaw] = useQueryState('ids', parseAsString.withDefault(''));
  const [isGrouping, setIsGrouping] = useQueryState('grouping', parseAsString.withDefault('daily'));
  const ids = idsRaw.split(',').map(Number);
  const setIds = (arr: number[]) => setIdsRaw(arr.join(','));
  const [name, setName] = useQueryState('name', parseAsString.withDefault('tunai'));

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setIsActive(1);
    setIds([]);
    setName('tunai');
    setIsGrouping('daily');
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isActive,
    setIsActive,
    ids,
    setIds,
    name,
    setName,
    resetFilters,
    isGrouping,
    setIsGrouping,
  };
}
