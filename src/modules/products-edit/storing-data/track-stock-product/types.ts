export type TrackStockProduct = {
  is_track_stock: boolean;
  minimum_stock: number | null;
  is_enable_expired_reminder: boolean;
  expired_reminder_in_days: number | null;
  expired_reminder_in_date: string | null;
};
