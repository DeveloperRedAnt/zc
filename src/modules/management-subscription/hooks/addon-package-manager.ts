import { parseAsString, useQueryState } from 'nuqs';

export function useModeParams() {
  const [mode, setMode] = useQueryState('mode', parseAsString.withDefault('package'));

  const resetFilters = () => {
    setMode('package');
  };

  return {
    mode,
    setMode,
    resetFilters,
  };
}
