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
import MultiStepWizard, { Step } from '@/components/wizard-manager/multi-step-wizard';
import WizardHeader from '@/components/wizard-manager/wizard-header';
import WizardProgressBar from '@/components/wizard-manager/wizard-progress-bar';
import Step1DetailUserForm from '@/modules/user/components/step1-detail-user-form';
import Step2PermissionForm from '@/modules/user/components/step2-permission-form';
import { usePermissionStore } from '@/modules/user/store-permission';
import { StorePermission } from '@/modules/user/store-permission';
import { ArrowRight } from '@icon-park/react';
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

  const steps: Step[] = [
    { id: 1, title: 'Step 1', content: <Step1DetailUserForm employeeId={employeeId} /> },
    { id: 2, title: 'Step 2', content: <Step2PermissionForm employeeId={employeeId} /> },
  ];

  useEffect(() => {
    if (!employeeId) {
      router.push('/dashboard/users/create'); // redirect jika tidak ada ID
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
        'x-organization-id': '1',
        body,
      });

      toast.success('Tersimpan!', {
        description: 'User Anda telah berhasil disimpan',
      });

      localStorage.removeItem('employeeId');

      router.push('/dashboard/users');
    } catch (error) {
      console.error(error);
      toast.error('Gagal!', {
        description: 'Gagal menyimpan permission user.',
      });
    }
  };

  return (
    <PageLayout
      title="Tambah User"
      button={<WizardHeader currentStep={1} totalSteps={steps.length} />}
    >
      <WizardProgressBar currentStep={1} totalSteps={steps.length} />

      <MultiStepWizard steps={steps} currentStep={1} />

      <div className="flex justify-end gap-2 mt-4">
        <>
          <Button
            variant="outline"
            className="border-[#c2c7d0] text-[#555555]"
            onClick={() => router.push('/dashboard/users/create')}
          >
            Kembali ke Detail User
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
                Simpan User
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle> Anda akan menyimpan User </DialogTitle>
                <DialogDescription className="pt-4">
                  Apakah Anda yakin akan menyimpan user tersebut?
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
