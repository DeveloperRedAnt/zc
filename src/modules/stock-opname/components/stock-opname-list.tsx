import { Card, CardContent, CardHeader } from '@/components/card/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/core/table';
import React from 'react';

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

interface StockOpnameListProps {
  data?: StockOpnameItem[];
}

const mockData: StockOpnameItem[] = [
  {
    no: 1,
    product: 'Papua New Guinea Organic Robusta 250 gr',
    stockSystem: '80 Zak',
    stockActual: '68 Zak',
    selisih: '2 Zak',
    alasanSelisih: {
      jumlahSelisih: '2 Zak',
      alasan: 'Rusak',
    },
  },
];

export function StockOpnameList({ data = mockData }: StockOpnameListProps) {
  const getSelisihColor = (selisih: string) => {
    if (selisih.includes('-')) return 'text-red-500';
    if (selisih === '0' || selisih.startsWith('0 ')) return 'text-gray-600';
    return 'text-red-500'; // Based on your image, it shows red for "2 Zak"
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <p className="text-sm font-medium">List Stok Opname</p>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-16 text-center font-medium text-gray-700 py-3">No</TableHead>
            <TableHead className="font-medium text-gray-700 py-3">Produk</TableHead>
            <TableHead className="text-center font-medium text-gray-700 py-3">
              Stok Sistem
            </TableHead>
            <TableHead className="text-center font-medium text-gray-700 py-3">Stok Balik</TableHead>
            <TableHead className="text-center font-medium text-gray-700 py-3">Selisih</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <React.Fragment key={item.no}>
              <TableRow className="border-b border-gray-100 hover:bg-gray-50/50">
                <TableCell className="text-center py-4 text-gray-900">{item.no}</TableCell>
                <TableCell className="py-4 text-gray-900 max-w-xs">
                  <div className="break-words">{item.product}</div>
                </TableCell>
                <TableCell className="text-center py-4 text-gray-900">{item.stockSystem}</TableCell>
                <TableCell className="text-center py-4 text-gray-900">{item.stockActual}</TableCell>
                <TableCell className="text-center py-4">
                  <span className={`font-medium ${getSelisihColor(item.selisih)}`}>
                    {item.selisih}
                  </span>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Card className="shadow-sm">
        <CardHeader className="border-b-gray-200">
          <div className="font-medium text-gray-700 mx-2">Alasan Selisih:</div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Alasan Selisih Section - Only show if there's a reason */}
          {data.some((item) => item.alasanSelisih) &&
            data.map(
              (item) =>
                item.alasanSelisih && (
                  <div key={`reason-${item.no}`} className="mb-6 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Jumlah Selisih:</div>
                        <p className="text-gray-900">{item.alasanSelisih.jumlahSelisih}</p>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Alasan:</div>
                        <p className="text-gray-900">{item.alasanSelisih.alasan}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
        </CardContent>
      </Card>
    </div>
  );
}
