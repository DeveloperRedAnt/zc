// Contoh data detail stok awal produk
import { http, HttpResponse } from 'msw';

// Tipe data stok awal produk
interface StockDetail {
  id?: string | number;
  purchaseDate: string;
  supplier: {
    id: number;
    name: string;
  };
  otherCost: number;
  noteNumber: string;
  organization: {
    id: string;
    name: string;
  };
  store: {
    id: number;
    name: string;
  };
  firstStock: number;
  buyPrice: number;
  expiredDate: string;
}

// Simpan data terakhir di memory (hanya selama app berjalan)
let lastSavedStock: StockDetail | null = null;

const stockDetail: StockDetail = {
  purchaseDate: '2024-07-18',
  supplier: {
    id: 1,
    name: 'CV. Damri Sejahtera',
  },
  otherCost: 0,
  noteNumber: 'AA112233',
  organization: {
    id: '1155230ASA5',
    name: 'PT Mencari Cinta Sejati',
  },
  store: {
    id: 10,
    name: 'Toko Sejati',
  },
  firstStock: 0,
  buyPrice: 0,
  expiredDate: '2024-12-31',
};

export const stockDetailHandler = http.get('/api/stock-detail', ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  return HttpResponse.json({
    data: {
      ...(lastSavedStock || stockDetail),
      id,
    },
  });
});

export const setFirstStockHandler = http.put('/api/set-first-stock', async ({ request }) => {
  const body = (await request.json()) as StockDetail;
  lastSavedStock = body;
  return HttpResponse.json({
    success: true,
    message: 'Produk berhasil diperbarui (mock, tersimpan di memory)',
    data: body,
  });
});
