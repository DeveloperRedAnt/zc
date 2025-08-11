import { Card, CardContent, CardDescription } from '@/components/card/card';
import { Heading } from '@/components/heading/heading';
import { Text } from '@/components/text/text';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DialogRevokeDevice = dynamic(
  () => import('@/modules/devices/components/dialog-revoke-device'),
  {
    loading: () => <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />,
  }
);

const DeviceCardSkeleton = () => (
  <Card className="m-4">
    <CardContent className="pt-6 flex justify-between items-center">
      <div className="flex-1">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
    </CardContent>
  </Card>
);

interface Device {
  device_id: string;
  name: string;
  date: string;
}

const DeviceCard = dynamic(
  () =>
    Promise.resolve(({ device }: { device: Device }) => (
      <Card className="m-4">
        <CardContent className="pt-6 flex justify-between items-center">
          <div>
            <Text weight="bold" className="text-[#0FA6C1]">
              {device.device_id}
            </Text>
            <Text>{device.name}</Text>
            <CardDescription className="mt-3">Tanggal ditautkan: {device.date}</CardDescription>
          </div>
          <div>
            <Suspense fallback={<div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />}>
              <DialogRevokeDevice />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    )),
  {
    loading: () => <DeviceCardSkeleton />,
  }
);

export function generateMetadata() {
  return {
    title: 'Zycash Dashboard',
    description: 'Welcome to Zycash Dashboard.',
  };
}

const devices = [
  {
    device_id: '01',
    name: 'Advan C27',
    date: '08 Desember 2024',
  },
  {
    device_id: 'A2',
    name: 'Samsung S7 Tab',
    date: '15 Desember 2024',
  },
  {
    device_id: 'G5',
    name: 'Galaxy S20',
    date: '28 Desember 2024',
  },
];

export default function Index() {
  return (
    <>
      <div className="p-4">
        <Heading level="h4" weight="semibold" className="text-base">
          List Device Tertaut
        </Heading>
      </div>

      <Suspense
        fallback={
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <DeviceCardSkeleton key={`device-skeleton-${i}`} />
            ))}
          </>
        }
      >
        {devices.map((device) => (
          <DeviceCard key={device.device_id} device={device} />
        ))}
      </Suspense>
    </>
  );
}
