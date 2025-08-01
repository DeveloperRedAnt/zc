// Utility for safe array property access
type ArrayGuard<T> = T[] | undefined | null;

export function hasItems<T>(arr: ArrayGuard<T>): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}
