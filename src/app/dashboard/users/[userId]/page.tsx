'use client';

import { useGetEmployeeDetail } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [openStore, setOpenStore] = useState<number | null>(null);
  const params = useParams();
  const userId = typeof params.userId === 'string' ? parseInt(params.userId) : 1;

  const { data, isLoading, error } = useGetEmployeeDetail(userId);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;
  if (!data) return <div className="p-8">Data tidak ditemukan</div>;

  const user = {
    name: data.name,
    status: data.is_active ? 'Aktif' : 'Dicabut',
    avatar: data.image,
    id_number: data.id_number,
    phone: data.phone,
    email: data.email,
    organization: {
      id: '-',
      name: '-',
    },
    stores: data.stores.map((store) => ({
      id: store.id,
      name: store.name,
      role: store.position?.name || '-',
      permissions: store.permission_groups.map((group) => ({
        category: group.name,
        items: group.permissions.map((perm) => perm.name),
      })),
      permissionCount: store.permission_groups.reduce(
        (acc, group) => acc + group.permissions.length,
        0
      ),
    })),
  };

  return (
    <PageLayout
      title="Detail User"
      button={
        <Button variant="default" onClick={() => router.push(`/dashboard/users/${userId}/edit`)}>
          Edit User
        </Button>
      }
    >
      <div className="flex flex-col items-center py-8">
        {user.avatar && user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-[120px] h-[120px] flex items-center justify-center rounded-lg bg-gray-200">
            <User size={64} className="text-gray-400" />
          </div>
        )}
        <div className="mt-4 text-xl font-semibold">{user.name}</div>
        <div
          className={`mt-2 px-4 py-1 rounded text-sm font-medium ${
            user.status === 'Aktif' ? 'bg-[#ECFDF5] text-[#75BF85]' : 'bg-[#FAFAFA] text-[#C2C7D0]'
          }`}
        >
          {user.status}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 px-8 py-4">
        <div>
          <div className="font-semibold mb-2">KTP:</div>
          <div className="mb-4">{user.id_number}</div>
          <div className="font-semibold mb-2">Email:</div>
          <div>{user.email}</div>
        </div>
        <div>
          <div className="font-semibold mb-2">No. Whatsapp:</div>
          <div className="mb-4">{user.phone}</div>
        </div>
      </div>
      <div className="px-8 py-4">
        <div className="font-semibold mb-2">Permission</div>
        <div className="mb-2">
          <span className="font-semibold">Organisasi:</span>
          <span className="ml-2">
            #{user.organization.id} - {user.organization.name}
          </span>
        </div>

        <div className="space-y-4 mt-4">
          {user.stores.map((store) => (
            <div key={store.id} className="border rounded-lg mb-4 bg-white">
              <button
                className="w-full flex justify-between items-center p-4 focus:outline-none"
                onClick={() => setOpenStore(openStore === store.id ? null : store.id)}
                aria-expanded={openStore === store.id}
                type="button"
              >
                <div className="font-semibold flex items-center text-base">
                  <span className="mr-2 flex items-center">
                    {store.permissions ? (
                      openStore === store.id ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </span>
                  #{store.id} - {store.name}
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                  {store.permissionCount} Permission
                </span>
              </button>
              {openStore === store.id && (
                <div className="px-6 pb-6 pt-2">
                  {store.role && (
                    <div className="mb-4 text-gray-700">
                      <span className="font-semibold block mb-1">Jabatan:</span>
                      <span>{store.role}</span>
                    </div>
                  )}
                  <div className="space-y-4">
                    {store.permissions.map((perm) => (
                      <div key={perm.category} className="border rounded-lg p-4">
                        <div className="font-semibold mb-2">{perm.category}</div>
                        <div className="grid grid-cols-3 gap-2">
                          {perm.items.map((item) => (
                            <div key={item} className="text-sm flex items-center">
                              <span className="mr-1">•</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end px-8 py-4">
        <Button variant="secondary" onClick={() => router.push('/dashboard/users')}>
          &larr; Kembali ke List User
        </Button>
      </div>
    </PageLayout>
  );
}
