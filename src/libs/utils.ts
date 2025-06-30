import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts initials from a name
 * @param name Full name to extract initials from
 * @returns Initials (usually 2 characters)
 */
export function getInitials(name: string): string {
  if (!name) return '';

  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}
