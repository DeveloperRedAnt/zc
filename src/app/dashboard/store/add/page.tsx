'use client';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import type { OptionType } from '@/components/dropdown/dropdown';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { Toaster, toast } from '@/components/toast/toast';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FormStore from '@/modules/store/form-create-store';
import { Check } from '@icon-park/react';
import { useEffect, useState } from 'react';

export default function Index() {
  const [loadingDataStore, setLoadingDataStore] = useState(true);

  const { isLoading, setLoading } = usePageLoading({
    autoStart: false,
    initialDelay: 0,
  });

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

  const optionsTypeStore: OptionType[] = [
    { label: 'Retail', value: 1 },
    { label: 'Grosir', value: 2 },
    { label: 'Online', value: 3 },
  ];

  const optionsCatStore: OptionType[] = [
    { label: 'Bahan Pokok', value: 1 },
    { label: 'Fashion', value: 2 },
    { label: 'Elektronik', value: 3 },
  ];

  // State untuk menyimpan form data
  type FormData = {
    namaToko: string;
    noWhatsapp: string;
    tipeToko: OptionType | null;
    lokasi: string;
    jenisToko: OptionType | null;
    alamat: string;
  };

  const [formData, setFormData] = useState<FormData>({
    namaToko: '',
    noWhatsapp: '',
    tipeToko: null,
    lokasi: '',
    jenisToko: null,
    alamat: '',
  });

  // Handler untuk mengupdate form data
  const handleFormChange = (newData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleSubmit = () => {
    // Logic untuk submit form
    <Toaster />;
    toast.success('Tersimpan!', {
      description: 'Toko Anda telah berhasil tersimpan',
    });
  };

  return (
    <>
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
                initialValues={formData}
                onFormChange={handleFormChange}
                loadingDataStore={loadingDataStore}
              />
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {isLoading ? (
            <SkeletonButton className="w-24 h-10" />
          ) : (
            <Button variant="primary" className="flex items-center gap-2" onClick={handleSubmit}>
              Simpan Toko
              <Check size={16} />
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
