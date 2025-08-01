import { http, HttpResponse } from 'msw';
import { setFirstStockHandler, stockDetailHandler } from './set_first_stock';

// Menggunakan API URL dari environment variable atau fallback ke default URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-zycas.eling.my.id';

export const handlers = [
  http.get(`${API_URL}/api/v2/products`, () => {
    return HttpResponse.json({
      response_code: '00',
      response_message: 'success',
      data: [
        {
          id: 'x123',
          title: 'Hadiah 1',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
        {
          id: 'zonk',
          title: 'Belum Beruntung',
          bg_color: '#FF4848',
          'font-color': '#000000',
        },
        {
          id: 'x456',
          title: 'Hadiah 2',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
      ],
    });
  }),
  // Mock GET /api/users
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Ridho', email: 'ridho@example.com' },
      { id: 2, name: 'Budi', email: 'budi@example.com' },
      { id: 3, name: 'Siti', email: 'siti@example.com' },
    ]);
  }),
  stockDetailHandler,
  setFirstStockHandler,
];
