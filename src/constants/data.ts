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
    url: '/dashboard',
    urlActive: 'dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    groupTitle: 'Transaksi',
    title: 'List Transaksi',
    url: '/dashboard/transaction-list',
    urlActive: 'transaction-list',
    icon: 'viewgriddetail',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Produk',
    title: 'List Produk',
    url: '/dashboard/product',
    urlActive: 'product',
    icon: 'system',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Toko',
    title: 'List Toko',
    url: '/dashboard/store-list',
    urlActive: 'store-list',
    icon: 'shop',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'User',
    title: 'List User',
    url: '/dashboard/users',
    urlActive: 'users',
    icon: 'user',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Member',
    title: 'List Member',
    url: '/dashboard/user-list',
    urlActive: 'user-list',
    icon: 'winkingfacewithopeneyes',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Laporan',
    title: 'Laba Rugi',
    url: '/dashboard/income-statement',
    urlActive: 'income-statement',
    icon: 'datafile',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [], // No child items
  },
  {
    groupTitle: 'Stock',
    title: 'Bulk Stock',
    url: '/dashboard/bulk-stock',
    urlActive: 'bulk-stock',
    icon: 'adproduct',
    shortcut: ['m', 'm'],
    isActive: false,
    items: [], // No child items
  },
  // Info: need time until the designer fixing the design. if you want to use it, uncomment this code.
  // {
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
