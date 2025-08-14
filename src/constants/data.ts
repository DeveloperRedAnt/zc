import { NavItem } from '@/types/index';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    groupTitle: '',
    title: 'Dashboard',
    id: 'dashboard',
    url: '/dashboard',
    urlActive: 'dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [], // Empty array as there are no child items for Dashboard
  },
  // {
  //   groupTitle: 'Transaksi',
  //   title: 'List Transaksi',
  //   id: 'transaction-list',
  //   url: '/dashboard/transaction-list',
  //   urlActive: 'transaction-list',
  //   icon: 'viewgriddetail',
  //   shortcut: ['e', 'e'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  {
    groupTitle: '',
    title: 'List Voucher',
    id: 'vouchers',
    url: '/dashboard/vouchers',
    urlActive: 'vouchers',
    icon: 'tagone',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Produk',
    title: 'List Produk',
    id: 'product',
    url: '/dashboard/products',
    urlActive: 'products',
    icon: 'system',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Toko',
    title: 'List Organisasi',
    id: 'organization',
    url: '/dashboard/organization',
    urlActive: 'organization',
    icon: 'buildingone',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Toko',
    title: 'List Toko',
    id: 'store',
    url: '/dashboard/store',
    urlActive: 'store',
    icon: 'shop',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'User',
    title: 'List User',
    id: 'users',
    url: '/dashboard/users',
    urlActive: 'users',
    icon: 'user',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Laporan',
    title: 'Penjualan',
    id: 'sales',
    url: '/dashboard/reports/sales',
    urlActive: 'reports',
    icon: 'viewgriddetail',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [
      {
        groupTitle: '',
        title: 'Ringkasan Penjualan',
        id: 'sales-summary',
        url: '/dashboard/reports/sales-summary',
        urlActive: 'reports/sales-summary',
        icon: undefined,
        shortcut: ['r', 's'],
        isActive: true, // Set as active to match the design
        items: [],
      },
      {
        groupTitle: '',
        title: 'Detail Penjualan',
        id: 'sales-details',
        url: '/dashboard/reports/sales-details',
        urlActive: 'reports/sales-details',
        icon: undefined,
        shortcut: ['r', 'd'],
        isActive: false,
        items: [],
      },
      {
        groupTitle: '',
        title: 'Penjualan Harian',
        id: 'sales-daily',
        url: '/dashboard/reports/sales-daily',
        urlActive: 'reports/sales-daily',
        icon: undefined,
        shortcut: ['r', 'h'],
        isActive: false,
        items: [],
      },
      {
        groupTitle: '',
        title: 'Penjualan Produk',
        id: 'sales-product',
        url: '/dashboard/reports/sales-product',
        urlActive: 'reports/sales-product',
        icon: undefined,
        shortcut: ['r', 'p'],
        isActive: false,
        items: [],
      },
      {
        groupTitle: '',
        title: 'Penjualan Varian',
        id: 'sales-variant',
        url: '/dashboard/reports/sales-variant',
        urlActive: 'reports/sales-variant',
        icon: undefined,
        shortcut: ['r', 'v'],
        isActive: false,
        items: [],
      },
      {
        groupTitle: '',
        title: 'Penjualan per Kasir',
        id: 'sales-cashier',
        url: '/dashboard/reports/sales-cashier',
        urlActive: 'reports/sales-cashier',
        icon: undefined,
        shortcut: ['r', 'k'],
        isActive: false,
        items: [],
      },
    ], // No child items
  },
  {
    groupTitle: 'Member',
    title: 'List Member',
    id: 'list-member',
    url: '/dashboard/member',
    urlActive: 'member',
    icon: 'winkingfacewithopeneyes',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Laporan',
    title: 'Laba Rugi',
    id: 'report',
    url: '/dashboard/income-statement',
    urlActive: 'income-statement',
    icon: 'datafile',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Stock',
    title: 'Stok Opname',
    id: 'stock-opname',
    url: '/dashboard/stock-opname',
    urlActive: 'stock-opname',
    icon: 'adproduct',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: '',
    title: 'Master Data',
    id: 'master-data',
    url: '/dashboard/master-data',
    urlActive: 'master-data',
    icon: 'adproduct',
    shortcut: ['msd', 'msd'],
    isActive: false,
    items: [], // No child items
  },
  // Info: need time until the designer fixing the design. if you want to use it, uncomment this code.
  // {
  //   groupTitle: '',
  //   title: 'Vouchers',
  //   url: '/dashboard/vouchers',
  //   icon: 'voucher',
  //   shortcut: ['v', 'v'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Reports',
  //   url: '/dashboard/reports',
  //   icon: 'report',
  //   shortcut: ['r', 'r'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Debts',
  //   url: '/dashboard/debts',
  //   icon: 'debt',
  //   shortcut: ['d', 'd'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Returns',
  //   url: '/dashboard/returns',
  //   icon: 'returnproduct',
  //   // shortcut: ['r', 'r'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Trash',
  //   url: '/dashboard/trash',
  //   icon: 'trash',
  //   shortcut: ['t', 't'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Expired Histories',
  //   url: '/dashboard/expired-histories',
  //   icon: 'expiredhistory',
  //   shortcut: ['e', 'e'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm'],
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login',
  //     },
  //   ],
  // },
  // {
  //   title: 'Kanban',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [], // No child items
  // },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM',
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL',
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN',
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK',
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD',
  },
];
