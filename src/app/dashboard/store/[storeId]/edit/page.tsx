'use client';

import { useGetStoreDetail, useUpdateStoreV2 } from '@/__generated__/api/hooks';
import { useBusinesModel } from '@/__generated__/api/hooks/business/business-models.hooks';
import { useCategoryStore } from '@/__generated__/api/hooks/business/business.hooks';
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
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { toast } from '@/components/toast/toast';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FormStore from '@/modules/store/form-create-store';
import { StoreFormData } from '@/modules/store/types/form-create-store.types';
import { Check } from '@icon-park/react';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type OptionType = {
  label: string;
  value: number | string;
};

function mapApiToForm(data): StoreFormData | undefined {
  if (!data) return undefined;

  // Get the type and category values
  const typeValue = data.type ? String(data.type) : '';
  const categoryValue = data.category ? String(data.category) : '';

  return {
    name: data.name ?? '',
    phone: data.phone ?? '',
    type: typeValue,
    category: categoryValue,
    address: data.address ?? '',
    lat: data.lat ? Number(data.lat) : 0,
    long: data.long ? Number(data.long) : 0,
  };
}

function normalizeErrors(errorsObj) {
  return Object.fromEntries(
    Object.entries(errorsObj).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages[0] : messages,
    ])
  );
}

function parseLatLng(lokasi: string) {
  if (!lokasi) return { lat: '', lng: '' };
  const [latStr, lngStr] = lokasi.split(',').map((s) => s.trim());
  return {
    lat: latStr || '',
    lng: lngStr || '',
  };
}

type StoreFormState = {
  name: string;
  noWhatsapp: string;
  storeType: OptionType | null;
  category: OptionType | null;
  address: string;
  location: string;
};

function EditStorePage() {
  const router = useRouter();
  const { storeId } = useParams();
  const { data, isLoading } = useGetStoreDetail({
    'x-organization-id': '1',
    'x-device-id': '1',
    body: { id: (storeId as string) || '' },
  });
  const { data: listCategory } = useCategoryStore();
  const { data: listType } = useBusinesModel();

  // Options
  const optionsTypeStore = Array.isArray(listType)
    ? listType.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const optionsCatStore = Array.isArray(listCategory)
    ? listCategory.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const [formState, setFormState] = useState<StoreFormState>({
    name: '',
    noWhatsapp: '',
    storeType: null,
    category: null,
    address: '',
    location: '',
  });

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const { getRegisteredFields, setErrors } = useFormValidationContext();
  const { validateFields } = useFormValidator();
  usePageLoading({ autoStart: false, initialDelay: 0 });

  const { mutate: updateStore } = useUpdateStoreV2({
    onSuccess: () => {
      setOpenDialogConfirm(false);
      toast.success('Tersimpan !', {
        description: 'Organisasi Anda telah berhasil diupdate',
        className: 'bg-[#75BF85]',
      });
      setTimeout(() => router.push('/dashboard/store'), 1000);
    },
    onError: (error) => {
      setOpenDialogConfirm(false);
      let errorMessage = 'Terjadi kesalahan';
      // Type guard untuk AxiosError
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
      setOpenDialogConfirm(false);
    },
  });

  const handleOpenConfirmDialog = useCallback(() => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);
    setErrors(errors);
    if (isValid) setOpenDialogConfirm(true);
  }, [getRegisteredFields, setErrors, validateFields]);

  const handleSubmit = useCallback(() => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);
    setErrors(errors);

    if (!isValid) return;

    const { lat, lng } = parseLatLng(formState.location);

    updateStore({
      store_id: (storeId as string) || '',
      body: {
        id: Number(storeId),
        name: formState.name,
        phone: formState.noWhatsapp,
        lat: lat ? parseFloat(lat) : null,
        long: lng ? parseFloat(lng) : null,
        email: null,
        address: formState.address,
        image: null,
        type: formState.storeType ? String(formState.storeType.value) : '',
        category: formState.category ? String(formState.category.value) : '',
      },
    });
  }, [formState, getRegisteredFields, setErrors, validateFields, updateStore, storeId]);

  const formData = data ? mapApiToForm(data) : undefined;

  return (
    <Card className="my-4 font-normal">
      <CardHeader className="border-b flex-row flex justify-between items-center">
        {isLoading ? (
          <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
        ) : (
          <CardTitle className="text-base">Edit Toko</CardTitle>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <SkeletonCardContent className="w-full" />
        ) : (
          <>
            <p className="pl-2 pb-2 pt-2 text-[#F08181]">Form bertanda (*) harus diisi</p>
            <FormStore
              optionsTypeStore={optionsTypeStore}
              optionsCatStore={optionsCatStore}
              initialValues={formData}
              loadingDataStore={isLoading}
              onFormChange={(formData: StoreFormData) => {
                const location =
                  formData.lat && formData.long ? `${formData.lat}, ${formData.long}` : '';
                const storeType =
                  optionsTypeStore.find((opt) => String(opt.value) === formData.type) || null;
                const category =
                  optionsCatStore.find((opt) => String(opt.value) === formData.category) || null;
                setFormState((prev) => ({
                  ...prev,
                  name: formData.name,
                  noWhatsapp: formData.phone,
                  storeType,
                  category,
                  address: formData.address,
                  location,
                }));
              }}
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
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return (
    <FormValidationProvider>
      <EditStorePage />
    </FormValidationProvider>
  );
}
