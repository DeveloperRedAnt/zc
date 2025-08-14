'use client';

import { useAssignPermissionEmployee } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import { PageLayout } from '@/components/page-layout/page-layout';
import { toast } from '@/components/toast/toast';
import PermissionSettings from '@/modules/user/components/permission-settings';
import { usePermissionStore } from '@/modules/user/store-permission';
import { StorePermission } from '@/modules/user/store-permission';
import { Check } from '@icon-park/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function page() {
  const router = useRouter();
  const params = useParams();
  const isSaveButtonEnabled = usePermissionStore((s) => s.isSaveButtonEnabled());
  const [employeeId, setEmployeeId] = useState<number | null>(
    params.userId ? Number(params.userId) : null
  );

  const [showAlert, setShowAlert] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [missingStores, setMissingStores] = useState<StorePermission[]>([]);

  // React Query mutations
  const { mutateAsync: assignPermissionEmployee } = useAssignPermissionEmployee();

  useEffect(() => {
    if (!employeeId) {
      router.push('/dashboard/users'); // redirect jika tidak ada ID
    } else {
      setEmployeeId(employeeId);
    }
  }, [router, employeeId]);

  const submitStep2 = async () => {
    const incompleteStores = usePermissionStore.getState().getIncompletePositionStores();

    if (incompleteStores.length > 0) {
      // Tampilkan modal
      setShowAlert(true);
      setMissingStores(incompleteStores);
      return;
    }

    if (!employeeId) {
      toast.warning('Perhatian!', {
        description: 'Employee ID belum tersedia.',
      });
      return;
    }

    try {
      const storePermissions = usePermissionStore.getState().storePermissions;

      const body = storePermissions.map((store) => ({
        store_id: Number(store.id),
        position_id: Number(store.position?.value),
        permissions: store.permissions.flatMap((group) =>
          group.permissions.filter((perm) => perm.enabled).map((perm) => perm.id)
        ),
      }));

      await assignPermissionEmployee({
        id: employeeId,
        body,
      });

      toast.success('Tersimpan!', {
        description: 'Permission User Anda telah berhasil disimpan',
      });

      router.push('/dashboard/users');
    } catch (error) {
      console.error(error);
      toast.error('Gagal!', {
        description: 'Gagal menyimpan permission user.',
      });
    }
  };

  return (
    <PageLayout title="Edit Permission">
      {/* Permission Section */}
      <div className="border-b border-slate-100 pb-6">
        <div className="space-y-8">
          <PermissionSettings isEdit={true} employeeId={employeeId} />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <>
          <Button
            variant="outline"
            className="border-[#c2c7d0] text-[#555555]"
            onClick={() => {
              router.push('/dashboard/users');
            }}
          >
            Batal
          </Button>
          <Dialog
            open={showSaveConfirmation}
            onOpenChange={(open) => setShowSaveConfirmation(open)}
          >
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="success"
                disabled={!isSaveButtonEnabled}
                className={!isSaveButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Simpan Perubahan Permission
                <Check className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle> Anda akan menyimpan Perubahan Permission </DialogTitle>
                <DialogDescription className="pt-4">
                  Apakah Anda yakin akan menyimpan perubahan permission tersebut?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Tidak</Button>
                </DialogClose>
                <Button variant="info" onClick={submitStep2}>
                  Ya, Saya Yakin
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      </div>

      {showAlert && (
        <Dialog open={showAlert} onOpenChange={(open) => setShowAlert(open)}>
          <DialogContent className="sm:max-w-sm max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-red"> Jabatan Belum Diisi! </DialogTitle>
              <DialogDescription className="pt-4">
                Jabatan wajib diisi di setiap toko. Berikut toko yang belum diisi:
              </DialogDescription>
            </DialogHeader>
            <ul className="list-disc pl-5 text-sm max-h-[50vh] overflow-y-auto">
              {missingStores.map((store) => (
                <li key={store.id}>
                  #{store.id} - {store.name}
                </li>
              ))}
            </ul>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="info" onClick={() => setShowSaveConfirmation(false)}>
                  {' '}
                  Ya, saya mengerti{' '}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
}
