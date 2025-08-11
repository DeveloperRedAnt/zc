// Removed Effect String import to avoid conflicts

const isEmptyOrNull = (value: string | null | undefined): boolean =>
  value === null ||
  value === undefined ||
  value === '' ||
  (typeof value === 'string' && value.trim() === '');

const getStringWithDefault = (value: string | null | undefined, defaultValue = '-'): string => {
  if (isEmptyOrNull(value)) {
    return defaultValue;
  }

  return (value as string).trim();
};

export { isEmptyOrNull, getStringWithDefault };
