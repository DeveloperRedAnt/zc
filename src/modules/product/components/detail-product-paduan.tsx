import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { DataTable } from '@/components/table/data-table';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface ProductPaduan {
  name: string;
  quantity: string;
}

import type { CompositeComponent } from '@/modules/products/storing-data/product-composite/types';

interface CompositeData {
  components: CompositeComponent[];
  production_per_batch: number;
  current_stock: string;
}

const columnHelperProductPaduan = createColumnHelper<ProductPaduan>();
const headerProductPaduan = [
  columnHelperProductPaduan.accessor('name', {
    header: 'Produk yang dipadukan',
    cell: (info) => info.getValue(),
  }),
  columnHelperProductPaduan.accessor('quantity', {
    header: 'Jumlah yang dibutuhkan',
    cell: (info) => info.getValue(),
  }),
];

export default function Index({ data }: { data: CompositeData }) {
  const tableProductPaduan = useReactTable({
    data: data.components.map((item) => ({
      name: item.product_name ?? '-',
      quantity: String(item.quantity),
    })),
    columns: headerProductPaduan,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });
  return (
    <>
      <Card className="text-[#555555] px-2 my-[1rem]">
        <CardHeader className="border-b border-[#C2C7D0] flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]">Produk Paduan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <InformationText
            text={
              'Mengatur penggabungan beberapa produk yang dibutuhkan untuk menjadi produk ini. Jika Anda mengaktifkan Produk Paduan, maka <strong>Anda tidak dapat membuat Produk Varian.</strong>'
            }
          />
          <div className="mt-6">
            <DataTable width="100%" table={tableProductPaduan} isLoading={false} />
            <div className="flex-1 space-y-10">
              <div className="flex flex-wrap w-full">
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Jumlah Produksi per Batch: </p>
                  <p className="font-[400] mt-1"> {data.production_per_batch || '-'} </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Stok produk saat ini: </p>
                  <p className="font-[400] mt-1"> {data.current_stock || '-'} </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
