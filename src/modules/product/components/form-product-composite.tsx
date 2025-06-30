'use client';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { SettingConfig } from '@icon-park/react';
import { useRouter } from 'next/navigation';

// import {
//   createColumnHelper,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// interface ProductData {
//   product: string;
//   quantity: string;
// }

// const columnHelper = createColumnHelper<ProductData>();
// const baseColumns = [
//   columnHelper.accessor('product', {
//     header: 'Produk yang dipadukan',
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor('quantity', {
//     header: 'Jumlah yang dibutuhkan',
//     cell: (info) => info.getValue(),
//   }),
// ];
// const PaduanProductData = [
//   {
//     product: 'ParKaos Combed 34 cm (Merah - Small)acetamol',
//     quantity: '0 pcs',
//   },
//   {
//     product: 'Kopi Gato - 250ml',
//     quantity: '0 botol',
//   },
// ];

export default function Index() {
  const router = useRouter();

  // const table = useReactTable({
  //     data: PaduanProductData,
  //     columns: baseColumns,
  //     getCoreRowModel: getCoreRowModel(),
  //     getFilteredRowModel: getFilteredRowModel(),
  //     getPaginationRowModel: getPaginationRowModel(),
  //     getSortedRowModel: getSortedRowModel(),
  //     state: {},
  // });
  return (
    <>
      <Card className="text-[#555555] px-2 my-[1rem]">
        <CardHeader className="border-b border-[#C2C7D0]">
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
            onClick={() => router.push('/dashboard/product/add/product-composite')}
          >
            <SettingConfig theme="filled" size="24" fill="#555555" />
            Atur Produk Paduan
          </Button>
        </CardContent>

        {/* TAMPILAN JIKA MENGISI PRODUK PADUAN -- JANGAN DIHAPUS */}
        {/* <CardHeader className='border-b border-[#C2C7D0] flex-row flex justify-between items-center'>
            <CardTitle className='text-[1rem]'>Produk Paduan</CardTitle>
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

                            <p className='text-[#F08181] mt-4'> Aksi tidak dapat dikembalikan dan Form Produk akan kembali ke semula </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="ghost">
                            Tidak
                        </Button>
                        </DialogClose>
                        <Button
                        variant="ghost"
                        className="text-[#F08181]"
                        onClick={() => {
                            toast.success('Terhapus!', {
                                description: 'Produk Paduan telah berhasil dihapus',
                                className: 'bg-[#16a34a]',
                            });
                        }}
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
                    onClick={() => router.push('/dashboard/product/add/product-composite')}
                >
                    <Edit />
                    Edit Paduan
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 text-sm">
            <InformationText text={DOMPurify.sanitize('Mengatur penggabungan beberapa produk yang dibutuhkan untuk menjadi produk ini. Jika Anda mengaktifkan Produk Paduan, maka <strong>Anda tidak dapat membuat Produk Varian.</strong>')} />
            <div className="mt-4">
                <DataTable width="100%" table={table} isLoading={false} />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8">
                    <div className="flex flex-col gap-2">
                        <div className='font-semibold'> Jumlah Produksi per Batch: </div> 5
                    </div>
                </div>
            </div>
        </CardContent> */}
      </Card>
    </>
  );
}
