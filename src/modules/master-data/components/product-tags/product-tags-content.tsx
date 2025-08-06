'use client';

import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { toast } from '@/components/toast/toast';
import ProductTagConfirmDialog from '@/modules/master-data/components/product-tags/confirm-dialog';
import ProductTagFormDialog from '@/modules/master-data/components/product-tags/form-dialog';
import TableList from '@/modules/master-data/components/product-tags/table-list';
import { Tag } from '@/modules/master-data/types/tag';
import { Plus } from '@icon-park/react';
import { useCallback, useState } from 'react';

export default function Index() {
  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const [nameTag, setNameTag] = useState('');

  const handleEditButton = useCallback((tag: Tag) => {
    setIsEditMode(true);
    setSelectedTag(tag);
    setNameTag(tag.name);
    setDialogFormOpen(true);
  }, []);

  const handleAddButton = useCallback(() => {
    setIsEditMode(false);
    setSelectedTag(null);
    setNameTag('');
    setDialogFormOpen(true);
  }, []);

  const handleConfirmSubmit = useCallback(async () => {
    toast.success('Tersimpan!', {
      description: 'Tag Produk Anda telah berhasil tersimpan',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedTag) {
      setNameTag(selectedTag.name);
    } else {
      setNameTag('');
    }
  }, [isEditMode, selectedTag]);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-black">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-black text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Tags Produk </p>
            </div>
          </div>
          <div>
            <Button variant="outline" type="button" onClick={handleAddButton}>
              <Plus />
              Tambah Tag
            </Button>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Untuk mengatur kata kunci pengelompokan produk" />

          <TableList handleEditButton={handleEditButton} />

          <ProductTagFormDialog
            isOpen={dialogFormOpen}
            onOpenChange={setDialogFormOpen}
            isEditMode={isEditMode}
            onConfirm={() => {
              setDialogConfirmOpen(true);
              setDialogFormOpen(false);
            }}
            handleResetForm={handleResetForm}
            nameTag={nameTag}
            setNameTag={setNameTag}
          />

          <ProductTagConfirmDialog
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
