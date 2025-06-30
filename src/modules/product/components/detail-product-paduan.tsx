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
import DOMPurify from 'dompurify';

interface ProductPaduan {
  product: string;
  quantity: string;
}

const columnHelperProductPaduan = createColumnHelper<ProductPaduan>();
const headerProductPaduan = [
  columnHelperProductPaduan.accessor('product', {
    header: 'Produk yang dipadukan',
    cell: (info) => info.getValue(),
  }),
  columnHelperProductPaduan.accessor('quantity', {
    header: 'Jumlah yang dibutuhkan',
    cell: (info) => info.getValue(),
  }),
];
const productPaduanData = [
  {
    product: 'Kaos Combed 34 cm (Merah - Small)',
    quantity: '1 pcs',
  },
  {
    product: 'Kopi Gato - 250ml',
    quantity: '2 botol',
  },
];

export default function Index() {
  const tableProductPaduan = useReactTable({
    data: productPaduanData,
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
            text={DOMPurify.sanitize(
              'Mengatur penggabungan beberapa produk yang dibutuhkan untuk menjadi produk ini. Jika Anda mengaktifkan Produk Paduan, maka <strong>Anda tidak dapat membuat Produk Varian.</strong>'
            )}
          />
          <div className="mt-6">
            <DataTable width="100%" table={tableProductPaduan} isLoading={false} />
            <div className="flex-1 space-y-10">
              <div className="flex flex-wrap w-full">
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Jumlah Produksi per Batch: </p>
                  <p className="font-[400] mt-1"> 5 </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Stok produk saat ini: </p>
                  <p className="font-[400] mt-1"> 100 pcs </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
