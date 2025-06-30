'use client';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { SettingConfig } from '@icon-park/react';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from '@/components/dialog/dialog';
// import { toast } from '@/components/toast/toast';
// import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
// import { Switch } from '@/components/switch/switch';
// import { Label } from '@/components/label/label';
import React from 'react';

export default function Index() {
  const router = useRouter();
  //   const [toggleVariantTableAccordion, setToggleVariantTableAccordion] = useState(false);

  return (
    <>
      <Card className="text-[#555555] px-2 my-[1rem]">
        <CardHeader className="border-b border-[#C2C7D0]">
          <CardTitle className="text-[1rem]"> Varian Produk </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <InformationText
            text="Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka Barcode, Kode SKU, 
                dan Harga Multi Satuan akan ditentukan dari varian Anda"
          />
          <Button
            type="button"
            variant="outline"
            className="text-[#555555] mt-4"
            onClick={() => router.push('/dashboard/product/add/variant')}
          >
            <SettingConfig theme="filled" size="24" fill="#555555" />
            Atur Varian
          </Button>
        </CardContent>

        {/* TAMPILAN JIKA MENGISI PRODUK VARIAN -- JANGAN DIHAPUS */}
        {/* <CardHeader className='border-b border-[#C2C7D0] flex-row flex justify-between items-center'>
            <CardTitle className='text-[1rem]'> Varian Produk </CardTitle>
            <div className="flex items-center gap-3">
                <Dialog>
                    <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        className="text-[#F08181] flex items-center"
                    >
                        <Delete />
                        Hapus Semua Varian
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle> Anda akan menghapus Varian Produk </DialogTitle>
                        <DialogDescription className="pt-4">
                            Apakah Anda yakin akan menghapus Varian yang telah tersimpan tersebut?

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
                                description: 'Produk Varian telah berhasil dihapus',
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
                    onClick={() => router.push('/dashboard/product/add/product-variant')}
                >
                    <Plus />
                    Tambah Opsi Varian
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 text-sm">
            <InformationText text={DOMPurify.sanitize('Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka <strong>Barcode, Kode SKU,</strong> dan <strong>Harga Multi Satuan</strong> akan ditentukan dari varian Anda')} />
            <div className="mt-4">
                <Card className='text-[#555555] px-2 my-[1rem]'>
                    <CardHeader className='border-b border-[#C2C7D0] flex-row flex justify-between items-center'>
                        <CardTitle className='text-[1rem]'> Merah - Small </CardTitle>
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
                                    <DialogTitle> Anda akan menghapus Opsi Varian </DialogTitle>
                                    <DialogDescription className="pt-4">
                                        Apakah Anda yakin akan menghapus Opsi Varian yang telah tersimpan tersebut?

                                        <p className='text-[#F08181] mt-4'> Aksi tidak dapat dikembalikan </p>
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
                                            description: 'Opsi Varian Anda telah berhasil dihapus',
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
                                onClick={() => router.push('/dashboard/product/add/product-variant')}
                            >
                                <Edit />
                                Edit Opsi Varian
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 text-sm">
                        <div className="flex items-start gap-8">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setToggleVariantTableAccordion(!toggleVariantTableAccordion)}
                                className="my-auto hover:bg-[none]"
                            >
                                <div
                                    className={`transform transition-transform duration-500 ${
                                        toggleVariantTableAccordion ? 'rotate-90' : ''
                                    }`}
                                >
                                    <Right />
                                </div>
                            </Button>
                            <img
                                src={'/assets/zycas/example-product.png'}
                                alt="Product"
                                className="rounded object-cover w-[6.7rem] h-[6.7rem]"
                            />
                            <div className="flex-1 space-y-10">
                                <div className="flex w-full gap-4">
                                    <div className="text-[14px] w-1/2">
                                        <p className="font-semibold"> Barcode: </p>
                                        <p className="font-[400] mt-1"> 78882271827781 </p>
                                    </div>
                                    <div className="text-[14px] w-1/2">
                                        <p className="font-semibold"> Kode SKU: </p>
                                        <p className="font-[400] mt-1"> 557781235 </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-2">
                                            <Switch id="isActiveVariant" defaultChecked />
                                            <Label htmlFor="isActiveVariant"> Varian Aktif </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {toggleVariantTableAccordion && (
                        <div className="mt-4 pl-[5rem] pt-4 space-y-2">
                            <p className="mb-1"> Harga Multi Satuan </p>
                            <div className="flex-1 space-y-10">
                                <div className="flex flex-wrap w-full">
                                    <div className="text-[14px] w-1/2 mt-4">
                                        <p className="font-semibold"> Eceran - 1 plastik: </p>
                                        <p className="font-[400] mt-1"> Rp 35.000 </p>
                                    </div>
                                    <div className="text-[14px] w-1/2 mt-4">
                                        <p className="font-semibold"> Dus - 24 plastik: </p>
                                        <p className="font-[400] mt-1"> Rp 840.000 </p>
                                    </div>
                                    <div className="text-[14px] w-1/2 mt-4">
                                        <p className="font-semibold"> Dozen - 288 plastik: </p>
                                        <p className="font-[400] mt-1"> Rp 10.200.000 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </CardContent> */}
      </Card>
    </>
  );
}
