'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
  '/dashboard/employee': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Employee', link: '/dashboard/employee' },
  ],
  '/dashboard/products': [
    // { title: 'Dashboard', link: '/dashboard' },
    { title: 'List Produk', link: '/dashboard/products' },
  ],
  '/dashboard/users': [{ title: 'List User', link: '/dashboard/users' }],
  '/dashboard/vouchers': [{ title: 'List Voucher', link: '/dashboard/vouchers' }],
  '/dashboard/profile': [{ title: 'Profil', link: '/dashboard/profile' }],
  '/dashboard/users/form': [
    { title: 'List User', link: '/dashboard/users' },
    { title: 'Tambah User', link: '/dashboard/users/form' },
  ],
  '/dashboard/products/add': [
    { title: 'List Produk', link: '/dashboard/products' },
    { title: 'Tambah Produk', link: '/dashboard/products/add' },
  ],
  '/dashboard/products/{id}': [
    { title: 'List Produk', link: '/dashboard/products' },
    { title: 'Detail Produk', link: '/dashboard/products/{id}' },
  ],
  '/dashboard/products/{id}/edit': [
    { title: 'List Produk', link: '/dashboard/products' },
    { title: 'Edit Produk', link: '/dashboard/products/{id}/edit' },
  ],
  '/dashboard/products/add/composite': [
    { title: 'List Produk', link: '/dashboard/products' },
    { title: 'Tambah Produk', link: '/dashboard/products/add' },
    { title: 'Produk Paduan', link: '/dashboard/products/add/composite' },
  ],
  '/dashboard/products/add/variant': [
    { title: 'List Produk', link: '/dashboard/products' },
    { title: 'Tambah Produk', link: '/dashboard/products/add' },
    { title: 'Wizard Varian', link: '/dashboard/products/add/variant' },
  ],
  '/dashboard/products/add/set-first-stock': [
    { title: 'List Produk', link: '/dashboard/products' },
    { title: 'Tambah Produk', link: '/dashboard/products/add' },
    { title: 'Atur Stok Awal', link: '/dashboard/products/add/set-first-stock' },
  ],
};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // Coba matching dengan pola dinamis seperti '/dashboard/product/{id}'
    for (const [pattern, items] of Object.entries(routeMapping)) {
      const regexPattern = pattern.replace(/{[^}]+}/g, '[^/]+'); // ganti {id} menjadi wildcard regex
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(pathname)) {
        // Ganti placeholder {id} dengan nilai asli dari pathname
        const paramValue = pathname.split('/').pop();
        return items.map((item) => ({
          ...item,
          link: item.link.replace('{id}', paramValue ?? ''),
        }));
      }
    }

    // Fallback
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        link: path,
      };
    });
  }, [pathname, routeMapping[pathname]]);

  return breadcrumbs;
}
