'use client';

import {
  useCreateVariantProductMasterData,
  useUpdateVariantProductMasterData,
} from '@/__generated__/api/hooks/master-data/variant-product.hooks';
import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import ProductVariantConfirmDialog from '@/modules/master-data/components/product-variant/confirm-dialog';
import ProductVariantFormDialog from '@/modules/master-data/components/product-variant/form-dialog';
import TableList from '@/modules/master-data/components/product-variant/table-list';
import { Variant } from '@/modules/master-data/types/variant';
import { Plus } from '@icon-park/react';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const [nameVariant, setNameVariant] = useState('');
  const [nameError, setNameError] = useState('');

  const { mutate: createVariant } = useCreateVariantProductMasterData();
  const { mutate: updateVariant } = useUpdateVariantProductMasterData();
  const queryClient = useQueryClient();

  const handleEditButton = useCallback((variant: Variant) => {
    setIsEditMode(true);
    setSelectedVariant(variant);
    setNameVariant(variant.variant_attribute_name);
    setDialogFormOpen(true);
    setNameError('');
  }, []);

  const handleAddButton = useCallback(() => {
    setIsEditMode(false);
    setSelectedVariant(null);
    setNameVariant('');
    setDialogFormOpen(true);
    setNameError('');
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    const payload = { variant_attribute_name: nameVariant };

    const onSuccess = () => {
      queryClient.invalidateQueries({
        queryKey: ['getVariantProductList'],
      });

      setDialogConfirmOpen(false);
      setDialogFormOpen(false);
      setSelectedVariant(null);
      setIsEditMode(false);

      toast.success('Tersimpan!', {
        description: 'Varian Produk Anda telah berhasil tersimpan',
      });
    };

    if (isEditMode && selectedVariant) {
      updateVariant(
        {
          id: selectedVariant.id,
          variant_attribute_name: nameVariant,
        },
        { onSuccess }
      );
    } else {
      createVariant(payload, {
        onSuccess,
        onError: (error: unknown) => {
          if (isAxiosError(error) && error.response?.status === 422) {
            const message = error.response.data?.errors?.variant_attribute_name?.[0];
            if (message === 'The variant attribute name has already been taken.') {
              setNameError('Varian sudah digunakan');
            } else {
              setNameError(message);
            }
            setDialogConfirmOpen(false);
            setDialogFormOpen(true);
          }
        },
      });
    }
  }, [isEditMode, nameVariant, selectedVariant, createVariant, updateVariant, queryClient]);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedVariant) {
      setNameVariant(selectedVariant.variant_attribute_name);
    } else {
      setNameVariant('');
    }
  }, [isEditMode, selectedVariant]);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Varian Produk </p>
            </div>
          </div>
          <div>
            <Button variant="outline" type="button" onClick={handleAddButton}>
              <Plus />
              Tambah Varian
            </Button>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Untuk mengatur pilihan varian produk" />

          <TableList handleEditButton={handleEditButton} />

          <ProductVariantFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            onConfirm={() => {
              setDialogConfirmOpen(true);
              setDialogFormOpen(false);
            }}
            handleResetForm={handleResetForm}
            nameVariant={nameVariant}
            setNameVariant={setNameVariant}
            nameError={nameError}
            setNameError={setNameError}
          />

          <ProductVariantConfirmDialog
            isOpen={dialogConfirmOpen}
            onOpenChange={setDialogConfirmOpen}
            isEditMode={isEditMode}
            onCancel={() => {
              setDialogConfirmOpen(false);
              setDialogFormOpen(true);
            }}
            onConfirm={handleConfirmSubmit}
          />
        </div>
      </div>
    </>
  );
}
