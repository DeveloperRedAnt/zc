import { Card, CardContent, CardDescription } from '@/components/card/card';
import { Heading } from '@/components/heading/heading';
import { Text } from '@/components/text/text';
import DialogRevokeDevice from '@/modules/devices/components/dialog-revoke-device';

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
      {devices.map((item) => (
        <Card className="m-4" key={item.device_id}>
          <CardContent className="pt-6 flex justify-between items-center">
            <div>
              <Text weight="bold" className="text-[#0FA6C1]">
                {item.device_id}
              </Text>
              <Text>{item.name}</Text>
              <CardDescription className="mt-3">Tanggal ditautkan: {item.date}</CardDescription>
            </div>
            <div>
              <DialogRevokeDevice />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
