'use client';

import { useCheckEditVariant } from '@/__generated__/api/hooks/variant-options.hooks';
import { Button } from '@/components/button/button';
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
import { Text } from '@/components/text/text';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import { useFormSubmit } from '@/modules/products-edit/components/options/hooks/use-form-submit';
import { Right } from '@icon-park/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import FormAddVariant from './form-add-variant';
import { useVariantOptionsStore } from './stores';

const FormOptions = () => {
  const params = useParams();
  const productId = Number(params?.id);

  const { data: checkEditVariant, isLoading } = useCheckEditVariant({
    id: productId,
  });

  const { setCheckEditVariant, updateVariantOptionsData, getDuplicateCombinationName } =
    useVariantOptionsStore();
  const {
    handleSubmit,
    isSubmitting,
    generalError,
    isOpenVariant,
    onOpenChangeVariant,
    handleSave,
    isOpenConfirm,
    onOpenChangeConfirm,
  } = useFormSubmit();

  useEffect(() => {
    if (checkEditVariant) {
      setCheckEditVariant(checkEditVariant.data);
      updateVariantOptionsData('product_id', productId);
    }
  }, [checkEditVariant, productId, setCheckEditVariant, updateVariantOptionsData]);

  const duplicateCombinationName = getDuplicateCombinationName();

  // Pastikan data sudah ada
  if (isLoading || !checkEditVariant) {
    return <SkeletonCardContent />;
  }

  return (
    <FormValidationProvider>
      <div className="p-[10px] flex flex-col gap-2">
        <div className="flex flex-row justify-between w-full gap-2">
          <div>
            <Text size="sm" className="mb-2">
              Silahkan isikan Detail untuk Varian yang akan Anda tambahkan
            </Text>
            <Text size="sm" className="text-red">
              Form bertanda (*) harus diisi
            </Text>
            {generalError && (
              <Text size="sm" className="text-red mt-2">
                {generalError}
              </Text>
            )}
          </div>
        </div>
      </div>
      <FormAddVariant checkEditVariant={checkEditVariant} />
      <div className="mt-4 flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Kembali ke Edit Produk
          </Button>
          <Button type="button" variant="info" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan dan Input Stok Awal'} <Right />
          </Button>
        </div>
      </div>
      <Dialog open={isOpenVariant} onOpenChange={onOpenChangeVariant}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#F08181]"> Opsi Varian Sudah Ada! </DialogTitle>
            <DialogDescription className="pt-4">
              Anda tidak dapat menambahkan Opsi Varian:
              <div className="mt-4"> {duplicateCombinationName || 'Kombinasi yang dipilih'} </div>
              <div className="mt-4">
                {' '}
                karena sudah ada di list varian. Silahkan pilih opsi varian lain atau buat opsi baru{' '}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" className="text-[#F08181]">
                {' '}
                Ok, Saya Mengerti{' '}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenConfirm} onOpenChange={onOpenChangeConfirm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle> Anda akan menyimpan Opsi Varian Produk </DialogTitle>
            <DialogDescription className="pt-4">
              Apakah Anda yakin akan menyimpan data Opsi Varian tersebut?
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
    </FormValidationProvider>
  );
};

export default FormOptions;
