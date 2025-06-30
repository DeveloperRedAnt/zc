import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input-otp/input-otp';
import { useTranslation } from '@/libs/i18n';

interface ChangePinDialogProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export default function ChangePinDialog({ children, onConfirm }: ChangePinDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{t('profile.changePin.title')}</DialogTitle>
        </DialogHeader>
        <div>
          <InputOTP maxLength={6} size="lg" label={t('profile.changePin.oldPin')} required>
            <InputOTPGroup>
              {['A', 'B', 'C', 'D', 'E', 'F'].map((char, i) => (
                <InputOTPSlot key={char} index={i} size="lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <hr className="mt-6" />

          <div className="my-6">
            <InputOTP maxLength={6} size="lg" label={t('profile.changePin.newPin')} required>
              <InputOTPGroup>
                {['A', 'B', 'C', 'D', 'E', 'F'].map((char, i) => (
                  <InputOTPSlot key={char} index={i} size="lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="my-6">
            <InputOTP maxLength={6} size="lg" label={t('profile.changePin.confirmPin')} required>
              <InputOTPGroup>
                {['G', 'H', 'I', 'J', 'K', 'L'].map((char, i) => (
                  <InputOTPSlot key={char} index={i} size="lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onConfirm}>
            {t('profile.changePin.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
