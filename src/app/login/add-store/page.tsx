'use client';

import type { CreateStoreRequestSchema as StoreRequest } from '@/__generated__/api/dto/store.dto';
import { useCreateStore } from '@/__generated__/api/hooks/store.hooks';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card/card';
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
import { toast } from '@/components/toast/toast';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import FormStore from '@/modules/store/form-create-store';
import { useOrganizationStore } from '@/store/organization-store';
import { Check, Info } from '@icon-park/react';
import type { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { optionsCatStore, optionsTypeStore } from './constants/type-store';

function normalizeErrors(errorsObj: Record<string, string[] | string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(errorsObj).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages[0] ?? '' : messages ?? '',
    ])
  );
}

type CreateStoreRequestSchema = {
  name: string;
  address: string;
  location: string;
  phone: string; // Change to string to match StoreFormData
  type: string;
  category: string;
  lat: number;
  long: number;
};

function PageContent() {
  const router = useRouter();
  const [loadingDataStore, _setLoadingDataStore] = useState<boolean>(false);
  const setOrganization = useOrganizationStore((state) => state.setOrganization);

  const [formData, setFormData] = useState<CreateStoreRequestSchema>({
    name: '',
    address: '',
    location: '',
    phone: '', // Change to string to match StoreFormData
    type: '',
    category: '',
    lat: 0,
    long: 0,
  });

  const { getRegisteredFields, setErrors } = useFormValidationContext();
  const { validateFields } = useFormValidator();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);

  const handleFormChange = (newData: Partial<CreateStoreRequestSchema>): void => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const { mutate } = useCreateStore({
    onSuccess: () => {
      const prevOrg = useOrganizationStore.getState().organization;
      setOrganization({
        ...(prevOrg ?? { id: 0, name: '', flex: '' }),
        flex: 'select-organization',
      });
      Cookies.set('flex', 'select-organization');

      toast.success('Tersimpan!', {
        description: 'Toko Anda berhasil tersimpan',
      });
      setOpenDialogConfirm(false);
      setTimeout(() => {
        router.push('/login/select-organization');
      }, 2000);
    },
    onError: (error) => {
      setIsLoading(false);
      setOpenDialogConfirm(false);
      let errorMessage = 'Terjadi kesalahan';

      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        const axiosError = error as AxiosError<{
          errors?: Record<string, string[] | string>;
          message?: string;
        }>;
        const responseData = axiosError.response?.data;
        if (responseData?.errors) {
          const normalized = normalizeErrors(responseData.errors);
          setErrors(normalized);
          const firstError = Object.values(normalized)[0];
          errorMessage = typeof firstError === 'string' ? firstError : '';
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        }
      } else if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (): void => {
    setIsLoading(true);
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);
    setErrors(errors);

    if (!isValid) {
      setOpenDialogConfirm(false);
      setIsLoading(false);
      toast.error('Harap lengkapi data toko terlebih dahulu!');
      return;
    }

    // Ensure all required fields are present and not undefined
    const payload: StoreRequest = {
      name: formData.name ?? '',
      address: formData.address ?? '',
      phone: Number(formData.phone) || 0,
      type: formData.type ?? '',
      category: formData.category ?? '',
      lat: formData.lat ?? 0,
      long: formData.long ?? 0,
    };

    mutate({
      'x-organization-id': '1',
      'x-device-id': '1',
      body: payload,
    });
  };

  return (
    <div>
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src="/assets/zycas/zycas-logo.png"
            alt="Zycas Login"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              height: 28,
              marginRight: 2,
            }}
          />
          <span className="text-[1rem] font-[400]">Zycas</span>
          <span className="text-[1rem] font-[300] -ml-1">Dashboard</span>
        </div>
      </div>

      <div className="text-[#F08181] border !border-[#F08181] rounded-[6px] h-auto w-[56.9rem] p-4 bg-[#ffffff] mb-4 text-sm">
        <div className="flex gap-2 text-[#F08181] information-text">
          <Info size={16} className="pt-[2px]" />
          <p>Anda belum memiliki Toko!</p>
        </div>
        <p className="pl-[1.5rem] mt-2">
          Silahkan menambahkan data Toko dibawah ini untuk melanjutkan ke Dashboard
        </p>
      </div>

      <Card className="text-[#555555]">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]">Buat Toko</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-0 text-[14px] font-[400]">
          <div className="h-auto w-[56.9rem] p-4">
            <FormStore
              optionsTypeStore={optionsTypeStore}
              optionsCatStore={optionsCatStore}
              initialValues={formData}
              onFormChange={handleFormChange}
              loadingDataStore={loadingDataStore}
            />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          {loadingDataStore ? (
            <SkeletonButton className="w-full h-10" />
          ) : (
            <Dialog open={openDialogConfirm} onOpenChange={setOpenDialogConfirm}>
              <DialogTrigger asChild>
                <Button
                  variant="success"
                  className="flex items-center gap-2 w-full"
                  disabled={isLoading}
                  onClick={() => setOpenDialogConfirm(true)}
                >
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      Simpan Toko
                      <Check size={16} />
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Anda akan menyimpan Toko</DialogTitle>
                  <DialogDescription className="pt-4">
                    Apakah Anda yakin akan menyimpan Toko Anda?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Tidak</Button>
                  </DialogClose>
                  <Button variant="info" onClick={handleSubmit}>
                    Ya, Saya Yakin
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <FormValidationProvider>
      <PageContent />
    </FormValidationProvider>
  );
}
