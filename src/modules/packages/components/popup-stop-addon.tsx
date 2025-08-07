import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import { Label } from '@/components/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { Textarea } from '@/components/textarea/textarea';

interface StopAddOnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StopAddOnModal({ open, onOpenChange }: StopAddOnModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[578px] max-h-[auto] overflow-y-auto gap-4">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg text-[#F08181] font-semibold">
            Anda akan menghentikan Add On
          </DialogTitle>
        </DialogHeader>
        <div>
          Apakah Anda yakin menghentikan Add On{' '}
          <span className="font-semibold">Tambah Organisasi</span> Anda? Penghentian Add On sebelum
          waktu habis tidak mengembalikan dana yang telah dibayarkan.
        </div>
        <span className="font-semibold text-sm text-gray-600">
          Tolong beritahu kami alasan Anda membatalkan layanan agar dapat menjadi bahan evaluasi
          kami:
        </span>
        <RadioGroup defaultValue="option-1" className="gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-1" value="option-1" />
            <Label htmlFor="option-1">Saya tidak lagi membutuhkan layanan ini</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-2" value="option-2" />
            <Label htmlFor="option-2">Saya mengalami masalah teknis</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-3" value="option-3" />
            <Label htmlFor="option-3">Saya hanya mencoba layanan untuk sementara</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-4" value="option-4" />
            <Label htmlFor="option-4">Lainnya (harap jelaskan)</Label>
          </div>
          <Textarea
            placeholder="cth: hal yang saya harap dapat diperbaiki oleh tim Zycas..."
            disabled
          />
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-5" value="option-5" />
            <Label htmlFor="option-5">Saya memilih untuk tidak menyebutkan</Label>
          </div>
        </RadioGroup>
        <span className="text-xs text-[#F08181]">
          Add On tersebut akan langsung dihentikan setelah masa aktif berhenti
        </span>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Tidak
            </Button>
          </DialogClose>
          <Button
            variant="ghost"
            className="text-[#F08181]"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Ya, Saya Yakin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
