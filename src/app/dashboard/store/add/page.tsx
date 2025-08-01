'use client';

import { useCreateStore } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import type { OptionType } from '@/components/dropdown/dropdown';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { toast } from '@/components/toast/toast';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FormStore from '@/modules/store/components/form-create-store';
import { StoreFormData } from '@/modules/store/types/form-create-store.types';
import { Check } from '@icon-park/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const optionsTypeStore: OptionType[] = [
  { label: 'Retail', value: 1 },
  { label: 'Grosir', value: 2 },
  { label: 'Online', value: 3 },
];

const mapFormDataToFormStore = (form: FormData): StoreFormData => ({
  name: form.name,
  phone: String(form.phone),
  type: form.type,
  category: form.category,
  address: form.address,
  lat: form.lat,
  long: form.lng, // Use long instead of lng to match the expected type
});

const optionsCatStore: OptionType[] = [
  { label: 'Bahan Pokok', value: 1 },
  { label: 'Fashion', value: 2 },
  { label: 'Elektronik', value: 3 },
];

type FormData = {
  name: string;
  code: string | null;
  address: string;
  phone: number; // ubah ke number
  type: string;
  category: string;
  lat: number; // hanya number
  lng: number; // hanya number
  email: string;
  image: string;
};

type ApiPayload = {
  name: string;
  code: string | null;
  address: string;
  phone: number; // ubah ke number
  type: string;
  category: string;
  lat: number; // hanya number
  long: number; // changed from lng to long to match API schema
  email: string;
  image: string;
};

function PageContent() {
  const router = useRouter();
  const [loadingDataStore, setLoadingDataStore] = useState(true);

  const { isLoading, setLoading } = usePageLoading({
    autoStart: false,
    initialDelay: 0,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: null,
    address: '',
    phone: 0,
    type: '',
    category: '',
    lat: 0,
    lng: 0,
    email: '',
    image: '',
  });

  const { getRegisteredFields, setErrors } = useFormValidationContext();
  const { validateFields } = useFormValidator();

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  useEffect(() => {
    setLoading(true);
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    }).then(() => {
      setTimeout(() => {
        setLoadingDataStore(false);
      }, 2000);
    });
  }, [setLoading]);

  const handleFormStoreChange = (formData: StoreFormData) => {
    // Convert from StoreFormData to our internal FormData structure
    setFormData((prev) => ({
      ...prev,
      name: formData.name,
      phone: Number(formData.phone),
      type: formData.type,
      category: formData.category,
      address: formData.address,
      lat: formData.lat,
      lng: formData.long, // Map from long to lng
      // Keep existing values for fields not in StoreFormData
      email: prev.email,
      image: prev.image,
      code: prev.code,
    }));
  };

  const handleOpenConfirmDialog = () => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);
    setErrors(errors);

    if (!isValid) {
      return;
    }
    setOpenDialogConfirm(true);
  };

  function normalizeErrors(errorsObj: Record<string, string[] | string>) {
    return Object.fromEntries(
      Object.entries(errorsObj).map(([field, messages]) => [
        field,
        Array.isArray(messages)
          ? messages[0] ?? '' // Ensure string, fallback to ''
          : messages ?? '', // Ensure string, fallback to ''
      ])
    );
  }

  const { mutate: createStore } = useCreateStore({
    onSuccess: (_data) => {
      toast.success('Tersimpan!', {
        description: 'Toko Anda berhasil tersimpan',
      });
      setOpenDialogConfirm(false);
      setTimeout(() => {
        router.push('/dashboard/store');
      }, 2000);
    },
    onError: (error) => {
      setOpenDialogConfirm(false);
      let errorMessage = 'Terjadi kesalahan';

      if ((error as AxiosError).isAxiosError && (error as AxiosError).response) {
        const axiosError = error as AxiosError<{
          errors?: Record<string, string[]>;
          message?: string;
        }>;
        const responseData = axiosError.response?.data;
        if (responseData?.errors) {
          setErrors(normalizeErrors(responseData.errors));
          const firstError = Object.values(responseData.errors).flat()[0];
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

  const mapFormToApi = (form: FormData): ApiPayload => {
    return {
      name: form.name,
      code: null,
      address: form.address,
      phone: form.phone,
      type: form.type,
      category: form.category,
      lat: form.lat,
      long: form.lng, // Using form.lng but mapping to long field for API schema
      email: form.email,
      image: form.image,
    };
  };

  const handleSubmit = () => {
    const apiPayload = mapFormToApi(formData);
    createStore({
      'x-organization-id': '1',
      'x-device-id': '1',
      body: apiPayload,
    });
  };

  return (
    <Card className="my-[1rem] font-normal">
      <CardHeader className="border-b flex-row flex justify-between items-center">
        {isLoading ? (
          <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
        ) : (
          <CardTitle className="text-[1rem]"> Tambah Toko </CardTitle>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <SkeletonCardContent className="w-full" />
        ) : (
          <>
            <p className="pl-[10px] pb-[10px] pt-[10px] text-[#F08181]">
              {' '}
              Form bertanda (*) harus diisi{' '}
            </p>
            <FormStore
              optionsTypeStore={optionsTypeStore}
              optionsCatStore={optionsCatStore}
              initialValues={mapFormDataToFormStore(formData)}
              onFormChange={handleFormStoreChange}
              loadingDataStore={loadingDataStore}
            />
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {isLoading ? (
          <>
            <SkeletonButton className="w-24 h-10 mr-2" />
            <SkeletonButton className="w-24 h-10" />
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              className="mr-2 flex items-center"
              onClick={() => router.push('/dashboard/store')}
            >
              Kembali ke List Toko
            </Button>
            <Button
              variant="primary"
              className="flex items-center gap-2"
              onClick={handleOpenConfirmDialog}
            >
              Simpan Toko
              <Check size={16} />
            </Button>

            <Dialog open={openDialogConfirm} onOpenChange={setOpenDialogConfirm}>
              <DialogContent className="w-[500px]">
                <DialogHeader>
                  <DialogTitle> Anda akan menyimpan Toko </DialogTitle>
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
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return (
    <FormValidationProvider>
      <PageContent />
    </FormValidationProvider>
  );
}
