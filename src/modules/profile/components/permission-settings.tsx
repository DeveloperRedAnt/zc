import { Button } from '@/components/button/button';
import { Switch } from '@/components/switch/switch';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface PermissionGroup {
  title: string;
  permissions: { id: string; label: string; enabled: boolean }[];
}

export default function PermissionSettings() {
  const [permissions, setPermissions] = useState<PermissionGroup[]>([
    {
      title: 'POS',
      permissions: [
        { id: 'pos_select_cashier', label: 'Pilih Kasir', enabled: false },
        { id: 'pos_add_member', label: 'Tambah Member', enabled: false },
        { id: 'pos_select_member', label: 'Pilih Member', enabled: false },
        { id: 'pos_delete_product', label: 'Hapus Produk', enabled: false },
      ],
    },
    {
      title: 'Riwayat Transaksi',
      permissions: [
        { id: 'history_view', label: 'Lihat Transaksi', enabled: false },
        { id: 'history_return', label: 'Return Transaksi', enabled: false },
        { id: 'history_void', label: 'Void Transaksi', enabled: false },
      ],
    },
    {
      title: 'Stok',
      permissions: [
        { id: 'stock_view', label: 'Lihat Stok', enabled: false },
        { id: 'stock_add', label: 'Tambah Stok', enabled: false },
        { id: 'stock_edit', label: 'Ubah Stok', enabled: false },
        { id: 'stock_delete', label: 'Hapus Stok', enabled: false },
      ],
    },
    {
      title: 'Produk',
      permissions: [
        { id: 'product_view', label: 'Lihat Produk', enabled: false },
        { id: 'product_add', label: 'Tambah Produk', enabled: false },
        { id: 'product_edit', label: 'Ubah Produk', enabled: false },
        { id: 'product_delete', label: 'Hapus Produk', enabled: false },
        { id: 'product_import', label: 'Import Produk', enabled: false },
      ],
    },
  ]);

  const togglePermission = (groupIndex: number, permissionIndex: number) => {
    const newPermissions = [...permissions];

    // Add safety check to ensure array indices exist before accessing them
    if (newPermissions[groupIndex]?.permissions?.[permissionIndex]) {
      newPermissions[groupIndex].permissions[permissionIndex].enabled =
        !newPermissions[groupIndex].permissions[permissionIndex].enabled;
      setPermissions(newPermissions);
    }
  };

  const enableAll = () => {
    const newPermissions = permissions.map((group) => ({
      ...group,
      permissions: group.permissions.map((p) => ({ ...p, enabled: true })),
    }));
    setPermissions(newPermissions);
  };

  return (
    <div className="space-y-8">
      {/* Organization Info */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#555555]">Organisasi:</p>
        <p className="text-sm text-[#555555]">#1155230ASA5 - PT Mencari Cinta Sejati</p>
      </div>

      {/* Store Tabs */}
      <div className="bg-neutral-50 rounded-lg p-2 flex gap-2 overflow-x-auto">
        <div className="bg-white rounded-md px-3 py-1.5 shadow-sm whitespace-nowrap">
          <span className="text-sm font-medium text-[#555555]">#1123 - Indosemar Juanda</span>
        </div>
        <div className="px-3 py-1.5 whitespace-nowrap">
          <span className="text-sm font-medium text-[#555555]">
            #1223 - Toko Grosir Patangpuluhan
          </span>
        </div>
        <div className="px-3 py-1.5 whitespace-nowrap">
          <span className="text-sm font-medium text-[#555555]">#1333 - Indosemar Godean</span>
        </div>
      </div>

      {/* Permission Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#555555]">Permission untuk Toko:</p>
          <p className="text-sm text-[#555555]">#1123 - Indosemar Juanda</p>
        </div>
        <Button variant="ghost" onClick={enableAll} className="text-[#555555]">
          <Check className="w-4 h-4 mr-2" />
          Nyalakan Semua
        </Button>
      </div>

      {/* Permission Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {permissions.map((group, groupIndex) => (
          <div
            key={group.title}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-6">
                <h3 className="text-base font-semibold text-[#555555]">{group.title}</h3>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {group.permissions.map((permission, permIndex) => (
                  <div key={permission.id} className="flex items-center gap-4">
                    <Switch
                      checked={permission.enabled}
                      onCheckedChange={() => togglePermission(groupIndex, permIndex)}
                    />
                    <span className="text-sm font-medium text-[#555555] flex-1">
                      {permission.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
