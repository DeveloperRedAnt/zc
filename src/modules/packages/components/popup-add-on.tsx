import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import { Check } from 'lucide-react';
import { ReactNode } from 'react';

interface PopUpAddOnProps {
  title: string;
  children?: ReactNode;
  total?: number | string;
  onPay?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PopUpAddOn({
  title,
  children,
  total = 0,
  onPay,
  open,
  onOpenChange,
}: PopUpAddOnProps) {
  const formattedTotal = Number(total).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter className="flex flex-col items-center gap-2 mt-6">
          <span className="text-right w-full mb-2 mt-1">Total: {formattedTotal}</span>
          <Button onClick={onPay} className="bg-[#75BF85] text-white hover:bg-[#75BF85]">
            Lanjut ke Pembayaran <Check />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
