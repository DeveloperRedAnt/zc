'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { DataTable } from '@/components/table/data-table';
import { useProductCompositeStore } from '@/modules/products-edit/storing-data/product-composite/stores';
import { memo, useMemo } from 'react';

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

const FormProductComposite = memo(function FormProductComposite({
  productId = 0,
}: { productId?: number }) {
  const composite = useProductCompositeStore((state) => state.products[productId]) ?? {
    components: [],
    production_per_batch: 0,
    current_stock: 0,
  };
  // Memoize computed values to prevent unnecessary re-calculations
  // const hasComposite = useMemo(() => {
  //   return composite?.components?.length || 0;
  // }, [composite?.components?.length]);

  // Memoize table data transformation
  const tableData = useMemo(() => {
    if (!composite?.components) return [];

    return composite.components.map((c) => ({
      product: c.name || '',
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
  return (
    <>
      {/* {hasComposite > 0 && ( */}
      <Card className="text-[#555555] px-2 my-[1rem]">
        <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]">Produk Paduan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <InformationText text="Mengatur penggabungan beberapa produk yang dibutuhkan untuk menjadi produk ini. Jika Anda mengaktifkan Produk Paduan, maka <span className='font-semibold'>Anda tidak dapat membuat Produk Varian.</span>" />
          <div className="mt-4">
            <DataTable width="100%" table={table} isLoading={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Jumlah Produksi per Batch:</div>
                {composite.production_per_batch}
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Stok produk saat ini:</div>
                {composite.current_stock ?? '-'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* )} */}
    </>
  );
});

export default FormProductComposite;
