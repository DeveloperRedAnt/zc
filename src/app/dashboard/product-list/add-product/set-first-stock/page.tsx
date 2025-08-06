'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { Check } from '@icon-park/react';

export default function Index() {
  return (
    <>
      <Card className="m-[1rem] text-zycas-text px-2">
        <CardHeader className="border-b border-zycas-border-grey">
          <CardTitle className="text-[1rem] font-[600]"> Atur Stok Awal </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm font-[400]">
          <form>
            <p> Silahkan isikan Stok untuk Produk yang akan Anda tambahkan </p>
            <p className="text-zycas-text-red"> Form bertanda (*) harus diisi </p>
            <div className="mt-10 border-t-gray-200 pt-4">
              <div className="">
                <p> Supplier dan Biaya Lain-Lain (Opsional) </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-sm mt-2 ml-[1px] flex items-center"
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-sm mt-2 ml-[1px] flex items-center"
                >
                  Simpan Produk
                  <Check />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
