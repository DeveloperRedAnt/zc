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
  '/dashboard/stock-opname/{id}/adjust': [
    { title: 'List Produk', link: '/dashboard/stock-opname' },
    { title: 'Penyesuaian Stok Opname', link: '' },
  ],
  '/dashboard/stock-opname/{id}/adjust/reason': [
    { title: 'List Produk', link: '/dashboard/stock-opname' },
    { title: 'Penyesuaian Stok Opname', link: '/dashboard/stock-opname/{id}/adjust' },
    { title: 'Alasan Selish', link: '' },
  ],
};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: routeMapping is a static constant
  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // Dynamic route matching with param extraction, e.g. '/dashboard/stock-opname/{id}/adjust'
    for (const [pattern, items] of Object.entries(routeMapping)) {
      // Collect param names in order of appearance
      const paramNames: string[] = [];
      const regexSource = pattern.replace(/\{([^}]+)\}/g, (_m, p1) => {
        paramNames.push(p1);
        return '([^/]+)';
      });
      const regex = new RegExp(`^${regexSource}$`);
      const match = pathname.match(regex);
      if (match) {
        const params: Record<string, string> = {};
        paramNames.forEach((name, idx) => {
          params[name] = match[idx + 1] ?? '';
        });
        const replaceParams = (link: string) =>
          link.replace(/\{([^}]+)\}/g, (_m, p1) => params[p1] ?? '');
        return items.map((item) => ({
          ...item,
          link: replaceParams(item.link),
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
  }, [pathname]);

  return breadcrumbs;
}
