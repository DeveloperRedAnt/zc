import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';

type ConfirmSaveStoreDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isFormValid: boolean;
  loading?: boolean;
};

export default function ConfirmSaveStoreDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: ConfirmSaveStoreDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle> Anda akan menyimpan Toko </DialogTitle>
          <DialogDescription className="pt-4">
            Apakah Anda yakin akan menyimpan Toko Anda?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Tidak</Button>
          </DialogClose>
          <Button variant="info" onClick={onConfirm} disabled={loading}>
            Ya, Saya Yakin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
