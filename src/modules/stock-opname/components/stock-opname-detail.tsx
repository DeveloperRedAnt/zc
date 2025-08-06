import React from 'react';

import { Button } from '@/components/button/button';

import { ArrowLeft } from '@icon-park/react';
import router from 'next/router';
import { StockOpnameList } from './stock-opname-list';

interface StockOpnameItem {
  no: number;
  product: string;
  stockSystem: string;
  stockActual: string;
  selisih: string;
  alasanSelisih?: {
    jumlahSelisih: string;
    alasan: string;
  };
}

interface StockOpnameDetailProps {
  data?: {
    tanggalOpname: string;
    keperluan: string;
    untukToko: string;
    penanggungJawab: string;
    listStokOpname: StockOpnameItem[];
  };
}

const mockData = {
  tanggalOpname: '30/12/2024',
  keperluan: 'Opname Desember',
  untukToko: 'FT Echo Soetta',
  penanggungJawab: 'Prasanto Sudarto',
  listStokOpname: [
    {
      no: 1,
      product: 'Papua New Guinea Organic Mokusita 250 gr',
      stockSystem: '80 Zak',
      stockActual: '68 Zak',
      selisih: '2 Zak',
      alasanSelisih: {
        jumlahSelisih: '2 Zak',
        alasan: 'Rusak',
      },
    },
    {
      no: 2,
      product: 'Kopi kayu model karu 34 m',
      stockSystem: '80 Pcs',
      stockActual: '80 Pcs',
      selisih: '0 Pcs',
    },
    {
      no: 3,
      product: 'Kaos Combed 34 cm (Merah - Large)',
      stockSystem: '80 Plastik',
      stockActual: '68 Plastik',
      selisih: '- 12 Plastik',
      alasanSelisih: {
        jumlahSelisih: '12 Pcs',
        alasan: 'Kadaluwarsa',
      },
    },
    {
      no: 4,
      product: 'Kaos Combed 34 cm (Merah - Medium)',
      stockSystem: '5 Plastik',
      stockActual: '5 Plastik',
      selisih: '0 Plastik',
    },
    {
      no: 5,
      product: 'Kaos Combed 34 cm (Merah - Small)',
      stockSystem: '1 Plastik',
      stockActual: '1 Plastik',
      selisih: '0 Plastik',
    },
    {
      no: 6,
      product: 'Kaos Combed 34 cm (Hitam - Large)',
      stockSystem: '20 Plastik',
      stockActual: '10 Plastik',
      selisih: '- 10 Plastik',
      alasanSelisih: {
        jumlahSelisih: '5 Plastik',
        alasan: 'Kadaluwarsa',
      },
    },
    {
      no: 7,
      product: 'Kaos Combed 34 cm (Hitam - Medium)',
      stockSystem: '15 Plastik',
      stockActual: '15 Plastik',
      selisih: '0 Plastik',
    },
    {
      no: 8,
      product: 'Kaos Combed 34 cm (Hitam - Small)',
      stockSystem: '15 Plastik',
      stockActual: '15 Plastik',
      selisih: '0 Plastik',
    },
  ],
};

export function StockOpnameDetail({ data = mockData }: StockOpnameDetailProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-4 pt-1 px-6">
          <p className="text-sm font-medium">Detail Produk</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-semibold mb-1">Tanggal Opname:</div>
              <div className="font-regular">{data.tanggalOpname}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Keperluan Opname:</div>
              <div className="font-regular">{data.keperluan}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Untuk Toko:</div>
              <div className="font-regular">{data.untukToko}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Penanggung Jawab Opname:</div>
              <div className="font-regular">{data.penanggungJawab}</div>
            </div>
          </div>
        </div>
        <div className="border-b-gray-200 my-2 w-full h-[1px]" />
        <div className="p-6">
          <StockOpnameList />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => router.push('/dashboard/store/add')}>
            <ArrowLeft />
            Kembali ke List Stock Opname
          </Button>
        </div>
      </div>
    </div>
  );
}
