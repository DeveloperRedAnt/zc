import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'quarterly';

export function periodToApiPayload(period: {
  type: PeriodType;
  value: {
    from: string | { quarter: number; year: number };
    to: string | { quarter: number; year: number };
  };
}) {
  if (period.type === 'quarterly') {
    const fromQuarter =
      period.value.from && typeof period.value.from === 'object' ? period.value.from.quarter : null;
    const fromYear =
      period.value.from && typeof period.value.from === 'object' ? period.value.from.year : null;
    const toQuarter =
      period.value.to && typeof period.value.to === 'object' ? period.value.to.quarter : null;
    const toYear =
      period.value.to && typeof period.value.to === 'object' ? period.value.to.year : null;

    return {
      grouping: 'quarterly',
      start_quarter: fromQuarter ?? null,
      start_year: fromYear ?? null,
      end_quarter: toQuarter ?? null,
      end_year: toYear ?? null,
    };
  }

  return {
    grouping: period.type,
    // @ts-ignore
    start_date: period.value.from
      ? // @ts-ignore
        formatDateYMD(period.value.from)
      : null,
    end_date: period.value.to
      ? // @ts-ignore
        formatDateYMD(period.value.to)
      : null,
  };
}

function formatDateYMD(dateStr?: string): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTanggalIndo(tanggal) {
  return format(new Date(tanggal), 'd MMMM yyyy', { locale: id });
}

export function quarterToDateRange(q: 1 | 2 | 3 | 4, year: number) {
  const startMonths = { 1: 1, 2: 4, 3: 7, 4: 10 } as const;
  const endMonths = { 1: 3, 2: 6, 3: 9, 4: 12 } as const;

  const startMonth = startMonths[q];
  const endMonth = endMonths[q];

  // Hitung hari terakhir di bulan akhir quarter
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate(); // bulan 1-based

  const endDay = daysInMonth(endMonth, year);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return {
    from: `${year}-${pad(startMonth)}-01`,
    to: `${year}-${pad(endMonth)}-${pad(endDay)}`,
  };
}
