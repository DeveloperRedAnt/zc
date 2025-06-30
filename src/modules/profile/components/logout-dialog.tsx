import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import { useTranslation } from '@/libs/i18n';

interface LogoutDialogProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export default function LogoutDialog({ children, onConfirm }: LogoutDialogProps) {
  const { t } = useTranslation();
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-[#F08181]">{t('profile.logout.title')}</DialogTitle>
          <DialogDescription className="pt-4">{t('profile.logout.description')}</DialogDescription>
        </DialogHeader>
        <p className="pb-4 text-[#F08181]">{t('profile.logout.warning')}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('profile.logout.cancel')}</Button>
          </DialogClose>
          <Button variant="ghost" className="text-[#F08181]" onClick={handleConfirm}>
            {t('profile.logout.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
