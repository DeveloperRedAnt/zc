import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Effect, pipe } from 'effect';
import { isEmptyOrNull } from './basic';

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

// Your existing format function
const formatDate = (date: string) => dayjs(date).format('DD MMMM YYYY');

// Additional dayjs formatters
const formatDateTime = (date: string) => dayjs(date).format('DD MMMM YYYY HH:mm');
const formatTime = (date: string) => dayjs(date).format('HH:mm');
const formatShortDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

// Simple version that returns string directly
const formatDateWithDefault = (input: string | null | undefined, defaultValue = '-'): string => {
  if (isEmptyOrNull(input)) {
    return defaultValue;
  }

  const parsed = dayjs(input as string);
  if (parsed.isValid()) {
    return formatDate(input as string);
  }

  return defaultValue;
};

const validateAndFormatDate = (
  dateString: string,
  formatter: (date: string) => string = formatDate
): Effect.Effect<string, Error> => {
  const parsed = dayjs(dateString);
  return parsed.isValid()
    ? Effect.succeed(formatter(dateString))
    : Effect.fail(new Error(`Invalid date format: ${dateString}`));
};

const processDateWithCustomFormatter = (
  input: string | null | undefined,
  formatter: (date: string) => string = formatDate,
  defaultValue = '-'
) =>
  pipe(
    input,
    (value) =>
      isEmptyOrNull(value) ? Effect.succeed(defaultValue) : Effect.succeed(value as string),

    Effect.flatMap((value) =>
      value === defaultValue
        ? Effect.succeed(defaultValue)
        : pipe(
            validateAndFormatDate(value, formatter),
            Effect.catchAll(() => Effect.succeed(defaultValue))
          )
    )
  );

// Multiple formatters untuk different use cases
const processDateMultiFormat = (input: string | null | undefined) => {
  if (isEmptyOrNull(input)) {
    return Effect.succeed({
      date: '-',
      dateTime: '-',
      time: '-',
      shortDate: '-',
    });
  }

  const dateStr = input as string;
  const parsed = dayjs(dateStr);

  if (!parsed.isValid()) {
    return Effect.succeed({
      date: '-',
      dateTime: '-',
      time: '-',
      shortDate: '-',
    });
  }

  return Effect.succeed({
    date: formatDate(dateStr), // "15 Januari 2024"
    dateTime: formatDateTime(dateStr), // "15 Januari 2024 10:30"
    time: formatTime(dateStr), // "10:30"
    shortDate: formatShortDate(dateStr), // "15/01/2024"
  });
};

// Advanced: dengan validation dan transformation chain
const processDateWithValidation = (
  input: string | null | undefined,
  options: {
    formatter?: (date: string) => string;
    defaultValue?: string;
    minDate?: string; // ISO string
    maxDate?: string; // ISO string
  } = {}
) => {
  const { formatter = formatDate, defaultValue = '-', minDate, maxDate } = options;

  return pipe(
    input,
    (value) =>
      isEmptyOrNull(value) ? Effect.succeed(defaultValue) : Effect.succeed(value as string),

    Effect.flatMap((value) => {
      if (value === defaultValue) return Effect.succeed(defaultValue);

      const parsed = dayjs(value);
      if (!parsed.isValid()) {
        return Effect.succeed(defaultValue);
      }

      // Date range validation
      if (minDate && parsed.isBefore(dayjs(minDate))) {
        return Effect.fail(new Error(`Date is before minimum: ${minDate}`));
      }

      if (maxDate && parsed.isAfter(dayjs(maxDate))) {
        return Effect.fail(new Error(`Date is after maximum: ${maxDate}`));
      }

      return Effect.succeed(formatter(value));
    }),
    Effect.catchAll(() => Effect.succeed(defaultValue))
  );
};

// Object processing dengan multiple date fields
interface UserData {
  id: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  lastLogin: string | null;
  birthDate: string | null;
}

const processUserDates = (user: UserData) =>
  pipe(
    Effect.all({
      createdAt: processDateWithCustomFormatter(user.createdAt, formatDateTime),
      updatedAt: processDateWithCustomFormatter(user.updatedAt, formatDateTime),
      lastLogin: processDateWithCustomFormatter(user.lastLogin, formatTime, 'Never'),
      birthDate: processDateWithCustomFormatter(user.birthDate, formatDate, 'Unknown'),
    }),
    Effect.map((dates) => ({
      ...user,
      ...dates,
    }))
  );

// Relative date formatting (e.g., "2 days ago")
const formatRelativeDate = (date: string) => dayjs(date).fromNow();

const processRelativeDate = (input: string | null | undefined, defaultValue = '-') =>
  pipe(
    input,
    (value) =>
      isEmptyOrNull(value) ? Effect.succeed(defaultValue) : Effect.succeed(value as string),

    Effect.flatMap((value) =>
      value === defaultValue
        ? Effect.succeed(defaultValue)
        : pipe(
            validateAndFormatDate(value, formatRelativeDate),
            Effect.catchAll(() => Effect.succeed(defaultValue))
          )
    )
  );

export {
  formatDateWithDefault,
  processDateWithCustomFormatter,
  processDateMultiFormat,
  processDateWithValidation,
  processUserDates,
  processRelativeDate,
  // Dayjs formatters
  formatDate,
  formatDateTime,
  formatTime,
  formatShortDate,
};
