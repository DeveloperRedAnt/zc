// utils/dateRange.ts
// Utility untuk mendapatkan tanggal 1 dan akhir bulan dari sebuah tanggal

export function getMonthRange(date: Date = new Date()): { start: string; end: string } {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: firstDay.toISOString().slice(0, 10),
    end: lastDay.toISOString().slice(0, 10),
  };
}
