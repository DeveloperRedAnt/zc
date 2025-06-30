'use client';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import FilterProductList from '@/modules/product/components/filter-product-list';
import TableProductList from '@/modules/product/components/table-product-list';
import { DownloadOne, Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();
  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]"> List Produk </CardTitle>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" className="flex items-center">
              <DownloadOne />
              Import
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-[#555555]"
              onClick={() => router.push('/dashboard/product/add')}
            >
              <Plus />
              Tambah Produk
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <FilterProductList />
          <TableProductList />
        </CardContent>
      </Card>
    </>
  );
}
