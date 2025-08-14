import { NextRequest, NextResponse } from 'next/server';

// Mock single device data (same as the first device in the list)
const mockSingleDeviceData = {
  data: {
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
};

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deviceId = parseInt(params.id);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Return device with the requested ID (or mock data with updated ID)
    const deviceData = {
      ...mockSingleDeviceData,
      data: {
        ...mockSingleDeviceData.data,
        id: deviceId,
      },
    };

    return NextResponse.json(deviceData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch device information',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deviceId = parseInt(params.id);
    const body = await request.json();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Update mock data with provided values
    const updatedData = {
      ...mockSingleDeviceData,
      data: {
        ...mockSingleDeviceData.data,
        id: deviceId,
        ...body,
      },
    };

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to update device information',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
