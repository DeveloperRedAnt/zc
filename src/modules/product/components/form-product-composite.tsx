'use client';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
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
import { InformationText } from '@/components/information-text/information-text';
import { DataTable } from '@/components/table/data-table';
import { useProductCompositeStore } from '@/modules/products/storing-data/product-composite/stores';
import { Delete, Edit, SettingConfig } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface ProductData {
  product: string;
  quantity: string;
}

const columnHelper = createColumnHelper<ProductData>();
const baseColumns = [
  columnHelper.accessor('product', {
    header: 'Produk yang dipadukan',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('quantity', {
    header: 'Jumlah yang dibutuhkan',
    cell: (info) => info.getValue(),
  }),
];

const FormProductComposite = memo(function FormProductComposite() {
  const router = useRouter();
  const composite = useProductCompositeStore((state) => state.data);

  // Memoize computed values to prevent unnecessary re-calculations
  const hasComposite = useMemo(() => {
    return composite?.components?.length || 0;
  }, [composite?.components?.length]);

  // Memoize table data transformation
  const tableData = useMemo(() => {
    if (!composite?.components) return [];

    return composite.components.map((c) => ({
      product: c.product_name || '',
      quantity: `${c.quantity} pcs`,
    }));
  }, [composite?.components]);

  // Memoize table configuration
  const table = useReactTable({
    data: tableData,
    columns: baseColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });

  // Memoize navigation handlers
  const handleNavigateToComposite = useCallback(() => {
    router.push('/dashboard/products/add/composite');
  }, [router]);

  const handleDeleteComposite = useCallback(() => {
    toast.success('Terhapus!', {
      description: 'Produk Paduan telah berhasil dihapus',
      className: 'bg-[#16a34a]',
    });
    useProductCompositeStore.getState().resetComposite();
    router.refresh();
  }, [router]);

  return (
    <>
      <Card className="text-[#555555] px-2 my-[1rem]">
        {hasComposite === 0 && (
          <>
            <CardHeader className="border-b-gray-200">
              <CardTitle className="text-[1rem]"> Produk Paduan </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-sm">
              <InformationText
                text="Mengatur penggabungan beberapa produk yang dibutuhkan untuk menjadi produk ini. 
                            Jika Anda mengaktifkan Produk Paduan, maka Anda tidak dapat membuat Produk Varian."
              />
              <Button
                type="button"
                variant="outline"
                className="text-[#555555] mt-4"
                onClick={handleNavigateToComposite}
              >
                <SettingConfig theme="filled" size="24" fill="#555555" />
                Atur Produk Paduan
              </Button>
            </CardContent>
          </>
        )}
        {hasComposite > 0 && (
          <>
            <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
              <CardTitle className="text-[1rem]">Produk Paduan</CardTitle>
              <div className="flex items-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-[#F08181] flex items-center"
                    >
                      <Delete />
                      Hapus
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle> Anda akan menghapus Paduan </DialogTitle>
                      <DialogDescription className="pt-4">
                        Apakah Anda yakin akan menghapus Paduan yang telah tersimpan tersebut?
                        <p className="text-[#F08181] mt-4">
                          Aksi tidak dapat dikembalikan dan Form Produk akan kembali ke semula
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Tidak</Button>
                      </DialogClose>
                      <Button
                        variant="ghost"
                        className="text-[#F08181]"
                        onClick={handleDeleteComposite}
                      >
                        Ya, Saya Yakin
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#555555]"
                  onClick={handleNavigateToComposite}
                >
                  <Edit />
                  Edit Paduan
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 text-sm">
              <InformationText text="Mengatur penggabungan beberapa produk yang dibutuhkan untuk menjadi produk ini. Jika Anda mengaktifkan Produk Paduan, maka Anda tidak dapat membuat Produk Varian." />
              <div className="mt-4">
                <DataTable width="100%" table={table} isLoading={false} />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8">
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">Jumlah Produksi per Batch:</div>
                    {composite.production_per_batch}
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
});

export default FormProductComposite;
