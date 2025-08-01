'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
export default function HomePage() {
  return (
    <Card className="my-[1rem]">
      <CardHeader>
        <CardTitle className="text-[1rem]">Produk Populer</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-[#C2C7D0] italic text-center">Data Kosong</p>
      </CardContent>
    </Card>
  );
}
