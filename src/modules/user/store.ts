import { create } from 'zustand';
import type { OptionType } from '@/components/dropdown/dropdown';

export type Permission = {
    id: string;
    label: string;
    enabled: boolean;
}

export type PermissionGroup = {
    title: string;
    permissions: Permission[];
}

export type OrgPermission = {
    orgId: string;
    name: string;
    position: OptionType | null;
    permissions: PermissionGroup[];
}

type UserFormState = {
    name: string;
    whatsapp: string;
    ktp: string;
    email: string;
    password: string;
    passwordConfirm: string;
    isActive: boolean;
    setField: (field: string, value: string | boolean) => void;
    reset: () => void;
    isFormValid: () => boolean;
    photo: File | null;
    setPhoto: (photo: File | null) => void;
}

type PermissionState = {
  orgPermissions: OrgPermission[];
  togglePermission: (orgIndex: number, groupIndex: number, permIndex: number) => void;
  toggleAllPermissions: (orgIndex: number) => void;
  countGranted: (permissions: PermissionGroup[]) => number;
  setOrgPermissions: (perms: OrgPermission[]) => void;
};

type Store = UserFormState & PermissionState;

const defaultPermissions = (): PermissionGroup[] => [
    {
        title: 'Kasir',
        permissions: [
        { id: 'cashier_select_cashier', label: 'Buat Transaksi', enabled: false },
        { id: 'cashier_open_cashier', label: 'Buka Kasir', enabled: false },
        { id: 'cashier_close_cashier', label: 'Tutup Kasir', enabled: false },
        { id: 'cashier_view_grid', label: 'Tampilan Grid', enabled: false },
        { id: 'cashier_view_table', label: 'Tampilan Tabel', enabled: false },
        { id: 'cashier_free_product', label: 'Produk Cuma-Cuma', enabled: false },
        { id: 'cashier_discount_transaction', label: 'Potongan Transaksi', enabled: false },
        { id: 'cashier_additional_fee', label: 'Biaya Tambahan', enabled: false },
        { id: 'cashier_convert_to_member', label: 'Jadikan Member', enabled: false },
        { id: 'cashier_save_order', label: 'Simpan Order', enabled: false },
        { id: 'cashier_edit_order', label: 'Edit Pesanan Order', enabled: false },
        { id: 'cashier_split_bill', label: 'Split Bill', enabled: false },
        { id: 'cashier_calculator', label: 'Kalkulator', enabled: false },
        ],
    },
    {
        title: 'Riwayat Transaksi',
        permissions: [
        { id: 'history_view_transaction', label: 'Lihat Riwayat Transaksi', enabled: false },
        { id: 'history_view_detail', label: 'Lihat Detail Riwayat Transaksi', enabled: false },
        { id: 'history_send_whatsapp', label: 'Kirim Ke Whatsapp', enabled: false },
        { id: 'history_return_product', label: 'Retur Produk', enabled: false },
        { id: 'history_void_transaction', label: 'Batalkan Transaksi', enabled: false },
        { id: 'history_view_debt_payment', label: 'Lihat Riwayat Pembayaran Hutang', enabled: false },
        ],
    },
    {
        title: 'Transaksi Offline',
        permissions: [
        { id: 'offline_view_history', label: 'Lihat Riwayat Transaksi Offline', enabled: false },
        { id: 'offline_view_detail', label: 'Lihat Detail Transaksi Offline', enabled: false },
        { id: 'offline_sync', label: 'Sinkronisasi Transaksi', enabled: false },
        ],
    },
    {
        title: 'Laporan Kasir',
        permissions: [
        { id: 'report_cashier_view', label: 'Lihat Laporan Kasir', enabled: false },
        { id: 'report_cashier_detail', label: 'Lihat Detail laporan Kasir', enabled: false },
        { id: 'report_cashier_print', label: 'Print Laporan Kasir', enabled: false },
        ],
    },
    {
        title: 'Laporan Hutang',
        permissions: [
        { id: 'report_debt_view', label: 'Lihat Laporan Hutang', enabled: false },
        { id: 'report_debt_transaction_detail', label: 'Lihat Detail Transaksi', enabled: false },
        { id: 'report_debt_payment', label: 'Pembayaran Hutang', enabled: false },
        { id: 'report_debt_update_estimate', label: 'Ubah Tanggal Estimasi Bayar', enabled: false },
        ],
    },
    {
        title: 'Produk',
        permissions: [
        { id: 'product_view_list', label: 'Lihat List Produk', enabled: false },
        { id: 'product_add', label: 'Tambah Produk', enabled: false },
        { id: 'product_edit', label: 'Ubah Produk', enabled: false },
        { id: 'product_view_detail', label: 'Lihat Detail Produk', enabled: false },
        ],
    },
    {
        title: 'Produk Kedaluwarsa',
        permissions: [
        { id: 'expired_product_view', label: 'Lihat Produk Kedaluwasa', enabled: false },
        { id: 'expired_product_return_to_stock', label: 'Kembalikan Produk ke Stok', enabled: false },
        ],
    },
    {
        title: 'Stok',
        permissions: [
        { id: 'stock_view_history', label: 'Lihat Riwayat Stok', enabled: false },
        { id: 'stock_add', label: 'Tambah Stok', enabled: false },
        ],
    },
    {
        title: 'Stok Opname',
        permissions: [
        { id: 'stock_opname_view_history', label: 'Lihat Riwayat Stok Opname', enabled: false },
        { id: 'stock_opname_add_adjustment', label: 'Tambah Penyesuaian Stok', enabled: false },
        { id: 'stock_opname_view_detail', label: 'Lihat Detail Stok Opname', enabled: false },
        ],
    },
    {
        title: 'Supplier',
        permissions: [
        { id: 'supplier_view', label: 'Lihat Supplier', enabled: false },
        { id: 'supplier_add', label: 'Tambah Supplier', enabled: false },
        { id: 'supplier_edit', label: 'Edit Supplier', enabled: false },
        ],
    },
    {
        title: 'Voucher',
        permissions: [
        { id: 'voucher_view', label: 'Lihat Voucher', enabled: false },
        { id: 'voucher_add', label: 'Tambah Voucher', enabled: false },
        { id: 'voucher_edit', label: 'Ubah Voucher', enabled: false },
        ],
    },
    {
        title: 'Membership',
        permissions: [
        { id: 'member_view', label: 'Lihat Member', enabled: false },
        { id: 'member_add', label: 'Tambah Member', enabled: false },
        { id: 'member_view_detail', label: 'Lihat Detail Member', enabled: false },
        ],
    },
    {
        title: 'User',
        permissions: [
        { id: 'user_view', label: 'Lihat User', enabled: false },
        { id: 'user_add', label: 'Tambah User', enabled: false },
        { id: 'user_view_detail', label: 'Lihat Detail User', enabled: false },
        { id: 'user_edit', label: 'Edit User', enabled: false },
        { id: 'user_reset_password', label: 'Reset Password', enabled: false },
        { id: 'user_reset_pin', label: 'Reset Pin', enabled: false },
        ],
    },
    {
        title: 'Master Data',
        permissions: [
        { id: 'master_tax_edit', label: 'Edit Pajak', enabled: false },
        { id: 'master_service_charge_edit', label: 'Edit Service Charge', enabled: false },
        { id: 'master_invoice_numbering', label: 'Atur No. Urut Nota', enabled: false },
        { id: 'master_unit_setting', label: 'Atur Unit Produk', enabled: false },
        { id: 'master_tag_setting', label: 'Atur Tags Produk', enabled: false },
        { id: 'master_variant_setting', label: 'Atur Varian Produk', enabled: false },
        { id: 'master_payment_method_setting', label: 'Atur Metode Pembayaran', enabled: false },
        ],
    }
];

export const useUserStore  = create<Store>((set, get) => ({
    name: '',
    whatsapp: '',
    ktp: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isActive: true,
    photo: null,

    setPhoto: (photo) => set({ photo }),

    setField: (field, value) => set({ [field]: value }),

    reset: () =>
        set({
        name: '',
        whatsapp: '',
        ktp: '',
        email: '',
        password: '',
        passwordConfirm: '',
        isActive: true,
        photo: null,
    }),

    isFormValid: () => {
        const { name, whatsapp, password, passwordConfirm } = get();
        return (
            name.trim() !== '' &&
            whatsapp.trim() !== '' &&
            password.length >= 6 &&
            password === passwordConfirm
        );
    },

    orgPermissions: [
        { orgId: '#1123', name: 'Indosemar Juanda', position: null, permissions: defaultPermissions() },
        { orgId: '#1223', name: 'Toko Grosir Patangpuluhan', position: null, permissions: defaultPermissions() },
        { orgId: '#1333', name: 'Indosemar Godean', position: null, permissions: defaultPermissions() },
    ],

    setOrgPermissions: (perms) => set({ orgPermissions: perms }),

    togglePermission: (orgIndex, groupIndex, permIndex) => {
        const orgPermissions = [...get().orgPermissions];
        const target = orgPermissions[orgIndex]?.permissions[groupIndex]?.permissions[permIndex];
        if (!target) return;
        target.enabled = !target.enabled;
        set({ orgPermissions });
    },

    toggleAllPermissions: (orgIndex) => {
    const orgs = [...get().orgPermissions];
    const current = orgs[orgIndex];
    if (!current) return;

    const allEnabled = current.permissions.every((group) =>
      group.permissions.every((perm) => perm.enabled)
    );

    const updatedPermissions = current.permissions.map((group) => ({
      ...group,
      permissions: group.permissions.map((perm) => ({
        ...perm,
        enabled: !allEnabled,
      })),
    }));

    orgs[orgIndex] = { ...current, permissions: updatedPermissions };
    set({ orgPermissions: orgs });
  },

  countGranted: (permissions) =>
    permissions.reduce(
      (total, group) => total + group.permissions.filter((p) => p.enabled).length,
      0
    ),
}));