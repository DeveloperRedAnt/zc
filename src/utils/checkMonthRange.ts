// utils/checkMonthRange.ts
// Utility untuk cek tanggal awal dan akhir bulan dari input string (format yyyy-mm-dd)

export function checkMonthRange(dateStr: string): { start: string; end: string } {
  const date = new Date(dateStr);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: firstDay.toISOString().slice(0, 10),
    end: lastDay.toISOString().slice(0, 10),
  };
}
