import { endOfWeek, getWeek, startOfWeek } from 'date-fns';

export function formatWeeklySubtitle(from: Date, to: Date): string {
  const weekStart = startOfWeek(new Date(from), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(to), { weekStartsOn: 1 });
  const weekNumStart = getWeek(weekStart, { weekStartsOn: 1 });
  const weekNumEnd = getWeek(weekEnd, { weekStartsOn: 1 });
  const formatDate = (date: Date) =>
    date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  return `Minggu ${weekNumStart} (${formatDate(weekStart)} - ${formatDate(
    endOfWeek(weekStart, { weekStartsOn: 1 })
  )}) - Minggu ${weekNumEnd} (${formatDate(
    startOfWeek(weekEnd, { weekStartsOn: 1 })
  )} – ${formatDate(weekEnd)})`;
}
