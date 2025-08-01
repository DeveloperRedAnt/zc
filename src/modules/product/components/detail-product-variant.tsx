'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { Edit, Plus, Right } from '@icon-park/react';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type ProductVariant = {
  id: number;
  is_active: boolean;
  gtin?: string;
  sku_code?: string;
  thumbnail?: string;
  attributes?: { value: string }[];
  variant_units?: {
    unit_name: string;
    conversion_value: number;
    price?: number;
  }[];
  package?: string;
};

export default function Index({
  isEdit = false,
  data,
}: { isEdit?: boolean; data: ProductVariant[] }) {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Card className="text-[#555555] px-2 my-[1rem]">
        <CardHeader className="border-b border-[#C2C7D0] flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]">Varian Produk</CardTitle>
          {isEdit && (
            <div className="flex">
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
          )}
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <InformationText
            text={
              'Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka <strong>Barcode, Kode SKU,</strong> dan <strong>Harga Multi Satuan</strong> akan ditentukan dari varian Anda'
            }
          />
          <div className="mt-4">
            {data?.map((variant, idx) => (
              <Card className="text-[#555555] px-2 my-[1rem]">
                <CardHeader className="border-b border-[#C2C7D0] flex-row flex justify-between items-center">
                  <CardTitle className="text-[1rem]">
                    {Array.isArray(variant.attributes) && variant.attributes.length > 0
                      ? variant.attributes.map((a) => `${a.value}`).join(' - ')
                      : `Varian #${idx + 1}`}
                  </CardTitle>
                  {isEdit ? (
                    <div className="flex">
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
                  ) : (
                    <div
                      className={`text-center py-[0.2rem] text-[0.75rem] rounded w-[5rem]
                        ${
                          variant?.is_active
                            ? 'bg-[#ECFDF5] text-[#75BF85]'
                            : 'bg-[#FAFAFA] text-[#C2C7D0]'
                        }`}
                    >
                      {variant?.is_active ? 'Aktif' : 'Non-Aktif'}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4 text-sm">
                  <div className="flex items-start gap-8">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpen(open === variant.id ? null : variant.id)}
                      className="my-auto hover:bg-[none]"
                    >
                      <div
                        className={`transform transition-transform duration-500 ${
                          open === variant.id ? 'rotate-90' : ''
                        }`}
                      >
                        <Right />
                      </div>
                    </Button>
                    <img
                      src={variant.thumbnail ?? '/assets/zycas/example-product.png'}
                      alt="Product"
                      className={`rounded object-cover ${
                        isEdit ? 'w-[6.7rem] h-[6.7rem]' : 'w-[3.2rem] h-[3.2rem]'
                      }`}
                    />
                    <div className="flex-1 space-y-10 my-auto">
                      <div className="flex w-full gap-4">
                        <div className="text-[14px] w-1/2">
                          <p className="font-semibold">Barcode:</p>
                          <p className="font-[400] mt-1">{variant.gtin || '-'}</p>
                        </div>
                        <div className="text-[14px] w-1/2">
                          <p className="font-semibold">Kode SKU:</p>
                          <p className="font-[400] mt-1">{variant.sku_code || '-'}</p>
                        </div>
                      </div>
                      {isEdit && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`isActiveVariant-${variant.id}`}
                                defaultChecked={variant.is_active}
                              />
                              <Label htmlFor={`isActiveVariant-${variant.id}`}>Varian Aktif</Label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {open === variant.id && (
                    <>
                      <div className="mt-4 pl-[5rem] py-4 space-y-2 border-b border-[#C2C7D0]">
                        <p className="mb-1"> Harga Multi Satuan </p>
                        <div className="flex-1 space-y-10">
                          <div className="flex flex-wrap w-full">
                            {Array.isArray(variant.variant_units) &&
                            variant.variant_units.length > 0 ? (
                              variant.variant_units.map((unit) => (
                                <div key={unit.unit_name} className="text-[14px] w-1/2 mt-6">
                                  <p className="font-semibold">
                                    {unit.unit_name} - {unit.conversion_value} {variant.package}:
                                  </p>
                                  <p className="font-[400] mt-1">{unit.price || '-'}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400">Tidak ada data satuan</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 pl-[5rem] py-4 space-y-2 border-b border-[#C2C7D0]">
                        <p className="mb-1">Stok Produk</p>
                        <div className="flex-1 space-y-10">
                          <div className="flex flex-wrap w-full">
                            <div className="text-[14px] w-1/2 mt-6">
                              <p className="font-semibold">Peringatan Stok Minimum:</p>
                              <p className="font-[400] mt-1">0 Produk</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pl-[5rem] pb-4 space-y-2 border-b border-[#C2C7D0]">
                        <div className="flex-1 space-y-10">
                          <div className="flex flex-wrap w-full">
                            <div className="text-[14px] w-1/2 mt-6">
                              <p className="font-semibold">Stok untuk Toko:</p>
                              <p className="font-[400] mt-1">#001190 - Toko Hujarat</p>
                            </div>
                            <div className="text-[14px] w-1/2 mt-6">
                              <p className="font-semibold">Stok produk saat ini:</p>
                              <p className="font-[400] mt-1">100 plastik</p>
                            </div>
                            <div className="text-[14px] w-1/2 mt-6">
                              <p className="font-semibold">Tanggal Kedaluwarsa:</p>
                              <p className="font-[400] mt-1">12/12/2024</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
