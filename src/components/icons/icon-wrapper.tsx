'use client';

import dynamic from 'next/dynamic';

// Wrapper component untuk icon dari @icon-park/react
export const createIconWrapper = (iconName: string) => {
  return dynamic(
    () =>
      import('@icon-park/react').then((mod) => {
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic icon import requires any type
        const IconComponent = (mod as any)[iconName];
        if (!IconComponent) {
          // Fallback jika icon tidak ditemukan
          return {
            default: () => (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            ),
          };
        }
        return { default: IconComponent };
      }),
    {
      ssr: false,
      loading: () => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        </svg>
      ),
    }
  );
};

// Export beberapa icon yang sering digunakan
export const Plus = createIconWrapper('Plus');
export const Edit = createIconWrapper('Edit');
export const Delete = createIconWrapper('Delete');
export const Check = createIconWrapper('Check');
export const Close = createIconWrapper('Close');
export const Search = createIconWrapper('Search');
export const Filter = createIconWrapper('Filter');
export const Download = createIconWrapper('Download');
export const Upload = createIconWrapper('Upload');
export const Settings = createIconWrapper('Settings');
