import { useChangeEmployeePin } from '@/__generated__/api/hooks';
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
import { toast } from '@/components/toast/toast';
import { useTranslation } from '@/libs/i18n';
import AlertDialogAddOn from '@/modules/packages/components/alert-dialog-add-on';
import { Check } from '@icon-park/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import * as z from 'zod';

interface ChangePinDialogProps {
  children: React.ReactNode;
  onConfirm?: () => void;
}

const createChangePinSchema = (t: (key: string) => string) =>
  z
    .object({
      old_pin: z
        .string()
        .length(6, t('profile.changePin.validation.oldPinLength'))
        .regex(/^\d+$/, t('profile.changePin.validation.onlyNumber')),

      pin: z
        .string()
        .length(6, t('profile.changePin.validation.newPinLength'))
        .regex(/^\d+$/, t('profile.changePin.validation.onlyNumber')),

      pin_confirmation: z
        .string()
        .length(6, t('profile.changePin.validation.confirmPinLength'))
        .regex(/^\d+$/, t('profile.changePin.validation.onlyNumber')),
    })
    .refine((data) => data.pin === data.pin_confirmation, {
      message: t('profile.changePin.validation.confirmMismatch'),
      path: ['pin_confirmation'],
    });

interface ChangePinData {
  old_pin: string;
  pin: string;
  pin_confirmation: string;
}

export default function ChangePinDialog({ children }: ChangePinDialogProps) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const changePinSchema = createChangePinSchema(t);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [formData, setFormData] = useState<ChangePinData>({
    old_pin: '',
    pin: '',
    pin_confirmation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: changePin } = useChangeEmployeePin();

  const handlePinChange = (field: keyof ChangePinData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    try {
      changePinSchema.parse(updated);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        for (const err of error.errors) {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        }
        setErrors(fieldErrors);
      }
    }
  };

  const handleSubmit = () => {
    try {
      const validated = changePinSchema.parse(formData);
      setErrors({});
      if (!userId) {
        toast.error('User tidak ditemukan');
        return;
      }

      const userIdNum = Number(userId);
      if (!userIdNum || Number.isNaN(userIdNum)) {
        toast.error('User ID tidak valid.');
        return;
      }

      changePin(
        {
          id: userIdNum,
          body: validated,
        },
        {
          onSuccess: () => {
            toast.success('Berhasil diubah!', {
              description: 'PIN Anda berhasil diubah',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            const message = err?.response?.data?.message ?? 'Gagal mengubah PIN';
            toast.error(message);
          },
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        for (const err of error.errors) {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        }
        setErrors(fieldErrors);
        toast.error('PIN tidak valid');
      }
    }
  };

  const isFormValid = (() => {
    try {
      changePinSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  })();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{t('profile.changePin.title')}</DialogTitle>
          </DialogHeader>
          <div>
            <InputOTP
              maxLength={6}
              size="lg"
              label={t('profile.changePin.oldPin')}
              required
              onChange={(val) => handlePinChange('old_pin', val)}
            >
              <InputOTPGroup>
                {['A', 'B', 'C', 'D', 'E', 'F'].map((char, i) => (
                  <InputOTPSlot key={char} index={i} size="lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {errors.old_pin && <p className="text-xs text-red-500 mt-1">{errors.old_pin}</p>}

            <hr className="mt-6" />

            <div className="my-6">
              <InputOTP
                maxLength={6}
                size="lg"
                label={t('profile.changePin.newPin')}
                required
                onChange={(val) => handlePinChange('pin', val)}
              >
                <InputOTPGroup>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((char, i) => (
                    <InputOTPSlot key={char} index={i} size="lg" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
            </div>

            <div className="my-6">
              <InputOTP
                maxLength={6}
                size="lg"
                label={t('profile.changePin.confirmPin')}
                required
                onChange={(val) => handlePinChange('pin_confirmation', val)}
              >
                <InputOTPGroup>
                  {['G', 'H', 'I', 'J', 'K', 'L'].map((char, i) => (
                    <InputOTPSlot key={char} index={i} size="lg" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {errors.pin_confirmation && (
                <p className="text-xs text-red-500 mt-1">{errors.pin_confirmation}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="success"
              onClick={() => {
                setIsAlertOpen(true);
              }}
              disabled={!isFormValid}
            >
              {t('profile.changePin.submit')}
              <Check />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialogAddOn
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={
          <span className="text-[18px] font-semibold" style={{ color: 'var(--dark-bg)' }}>
            {' '}
            Anda akan merubah PIN
          </span>
        }
        description={
          <div className="space-y-1 text-xs">Apakah Anda yakin akan merubah PIN Anda?</div>
        }
        onAction={handleSubmit}
        cancelLabel="Tidak"
        actionLabel="Ya, Saya Yakin"
        cancelButtonVariant="ghost"
        cancelButtonType="button"
        actionButtonType="submit"
        actionButtonClassName="text-white hover:text-gray-500 font-normal bg-primary"
      />
    </>
  );
}
