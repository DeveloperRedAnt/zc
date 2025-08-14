import { NextResponse } from 'next/server';

// Mock devices data array
const mockDevicesData = {
  data: [
    {
      id: 109,
      name: "Wandy's MacBook Pro",
      model: 'MacBookPro17,1',
      serial_number: 'wwzEyxPmUF1NbfHOhRpERrjeKxvEOLYL',
      code: 'A2',
      store: {
        id: 69,
        name: 'wrqrwh',
        address: 'wrhwrhwr',
        lat: 0,
        long: 0,
        phone: '42624624',
        type: 'food & beverage (f&b)',
        category: 'fashion',
      },
      organization: {
        id: 82,
        name: 'wgg',
        phone: '652624',
        nib: null,
        npwp: null,
        address: 'wrhwhwr',
        email: 'wrhwr@wrhwr.wrj',
        image: null,
        owner: {
          id: 117,
          name: 'wrlgjrwig',
          email: 'gjir@wrhwr.wrh',
          phone: '1122',
          org_count: 1,
        },
      },
    },
    {
      id: 110,
      name: 'Office iPad Pro',
      model: 'iPad13,1',
      serial_number: 'ABC123DEF456GHI789JKL012',
      code: 'B1',
      store: {
        id: 70,
        name: 'Main Store',
        address: 'Jl. Sudirman No. 123',
        lat: -6.2088,
        long: 106.8456,
        phone: '021123456',
        type: 'retail',
        category: 'technology',
      },
      organization: {
        id: 82,
        name: 'wgg',
        phone: '652624',
        nib: null,
        npwp: null,
        address: 'wrhwhwr',
        email: 'wrhwr@wrhwr.wrj',
        image: null,
        owner: {
          id: 117,
          name: 'wrlgjrwig',
          email: 'gjir@wrhwr.wrh',
          phone: '1122',
          org_count: 1,
        },
      },
    },
    {
      id: 111,
      name: 'Cashier Terminal',
      model: 'HP Elite 8300',
      serial_number: 'HP987654321CASHIER',
      code: 'C3',
      store: {
        id: 71,
        name: 'Branch Store',
        address: 'Jl. Thamrin No. 456',
        lat: -6.1944,
        long: 106.8229,
        phone: '021654321',
        type: 'food & beverage (f&b)',
        category: 'restaurant',
      },
      organization: {
        id: 83,
        name: 'Food Corp',
        phone: '021888999',
        nib: '1234567890123',
        npwp: '12.345.678.9-012.000',
        address: 'Jl. Business District No. 789',
        email: 'admin@foodcorp.com',
        image: 'https://example.com/logo.png',
        owner: {
          id: 118,
          name: 'John Doe',
          email: 'john@foodcorp.com',
          phone: '081234567890',
          org_count: 2,
        },
      },
    },
  ],
};

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(mockDevicesData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch devices list',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
