import { Card, CardContent } from '@/components/card/card';
import { Heading } from '@/components/heading/heading';

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

export default function DevicesLoading() {
  return (
    <>
      <div className="p-4">
        <Heading level="h4" weight="semibold" className="text-base">
          List Device Tertaut
        </Heading>
      </div>

      {Array.from({ length: 3 }, () => (
        <DeviceCardSkeleton key={crypto.randomUUID()} />
      ))}
    </>
  );
}
