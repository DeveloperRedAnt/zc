import { useChangeEmployeePassword } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { toast } from '@/components/toast/toast';
import { useLogout } from '@/hooks/use-logout';
import { useTranslation } from '@/libs/i18n';
import AlertDialogAddOn from '@/modules/packages/components/alert-dialog-add-on';
import { useOrganizationStore } from '@/store/organization-store';
import { Check } from '@icon-park/react';
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import React from 'react';
import * as z from 'zod';

interface ChangePasswordDialogProps {
  children: React.ReactNode;
  onConfirm?: () => void;
}

interface ChangePasswordData {
  old_password: string;
  password: string;
  password_confirmation: string;
}

// Zod Schema (will be created in useEffect to access t function)
const createChangePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      old_password: z.string().min(1, t('profile.changePassword.validation.oldPasswordRequired')),

      password: z
        .string()
        .min(6, t('profile.changePassword.validation.minLength'))
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          t('profile.changePassword.validation.passwordComplexity')
        ),

      password_confirmation: z
        .string()
        .min(1, t('profile.changePassword.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t('profile.changePassword.validation.passwordsMustMatch'),
      path: ['password_confirmation'],
    });

export default function ChangePasswordDialog({ children }: ChangePasswordDialogProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const clearOrganization = useOrganizationStore((state) => state.clearOrganization);
  const logout = useLogout('/sign-in');

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const changePasswordSchema = createChangePasswordSchema(t);
  const [formData, setFormData] = useState<ChangePasswordData>({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle trigger click manually
  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  // Handle close with reset
  const handleClose = () => {
    setOpen(false);
    setFormData({
      old_password: '',
      password: '',
      password_confirmation: '',
    });
    setErrors({});
    setShowPasswords({ old: false, new: false, confirm: false });
  };

  const handleInputChange = (field: keyof ChangePasswordData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    try {
      changePasswordSchema.parse(newFormData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};

        for (const err of error.errors) {
          if (err.path.length > 0) {
            const fieldName = err.path[0] as string;
            fieldErrors[fieldName] = err.message;
          }
        }

        setErrors(fieldErrors);
      }
    }
  };

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const { mutate: changePassword } = useChangeEmployeePassword();

  const handleLogout = React.useCallback(() => {
    clearOrganization();
    Cookies.remove('flex');
    logout();
  }, [clearOrganization, logout]);

  const handleSubmit = () => {
    try {
      const validatedData = changePasswordSchema.parse(formData);

      setErrors({});

      const userIdNum = Number(userId);
      if (!userIdNum || Number.isNaN(userIdNum)) {
        toast.error('User ID tidak valid.');
        return;
      }

      changePassword(
        {
          id: userIdNum,
          body: validatedData,
        },
        {
          onSuccess: () => {
            toast.success('Berhasil diubah!', {
              description: 'Password Anda berhasil diubah. Silahkan login kembali',
            });
            handleClose();
            setTimeout(() => {
              handleLogout();
            }, 2000);
          },
          onError: (error: unknown) => {
            let message = t('profile.changePassword.error.general');
            if (
              error &&
              typeof error === 'object' &&
              'response' in error &&
              error.response &&
              typeof error.response === 'object' &&
              'data' in error.response &&
              error.response.data &&
              typeof error.response.data === 'object' &&
              'message' in error.response.data
            ) {
              message = (error.response.data as { message?: string }).message || message;
            }
            toast.error(message);
          },
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        for (const err of error.errors) {
          if (err.path.length > 0) {
            const fieldName = err.path[0] as string;
            fieldErrors[fieldName] = err.message;
          }
        }
        setErrors(fieldErrors);
      }
    }
  };

  const isFormValid = (() => {
    try {
      changePasswordSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  })();

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            onClick: handleTriggerClick,
          })
        : children}

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) handleClose(); // reset form saat dialog ditutup
        }}
      >
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-0 gap-0">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {t('profile.changePassword.title')}
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription className="sr-only">
            {t('profile.changePassword.description')}
          </DialogDescription>
          {/* Form Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Password Lama */}
            <div className="space-y-2">
              <Label htmlFor="old_password" className="text-sm font-medium text-gray-700">
                {t('profile.changePassword.oldPassword')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="old_password"
                  type={showPasswords.old ? 'text' : 'password'}
                  value={formData.old_password}
                  onChange={(e) => handleInputChange('old_password', e.target.value)}
                  className={`pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.old_password ? 'border-red-300' : ''
                  }`}
                  placeholder=""
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('old')}
                >
                  {showPasswords.old ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.old_password && <p className="text-xs text-red-500">{errors.old_password}</p>}
            </div>

            {/* Password Baru */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                {t('profile.changePassword.newPassword')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.password ? 'border-red-300' : ''
                  }`}
                  placeholder=""
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Verifikasi Password Baru */}
            <div className="space-y-2">
              <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                {t('profile.changePassword.confirmPassword')}{' '}
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password_confirmation"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.password_confirmation}
                  onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                  className={`pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.password_confirmation ? 'border-red-300' : ''
                  }`}
                  placeholder=""
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password_confirmation && (
                <p className="text-xs text-red-500">{errors.password_confirmation}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 text-right">
            <Button
              onClick={() => {
                setIsAlertOpen(true);
              }}
              disabled={!isFormValid}
              className="w-[182px] bg-[#75BF85] hover:bg-[#75BF85] text-white font-medium py-2 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('profile.changePassword.submit')}
              <Check />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialogAddOn
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={
          <span className="text-[18px] font-semibold" style={{ color: 'var(--dark-bg)' }}>
            {' '}
            {t('profile.userProfile.changePassword.title')}
          </span>
        }
        description={
          <div className="space-y-1 text-xs">
            {t('profile.userProfile.changePassword.description')}
          </div>
        }
        onAction={handleSubmit}
        cancelLabel={t('profile.userProfile.changePassword.cancel')}
        actionLabel={t('profile.userProfile.changePassword.confirm')}
        cancelButtonVariant="ghost"
        cancelButtonType="button"
        actionButtonType="submit"
        actionButtonClassName="text-white hover:text-gray-500 font-normal bg-primary"
      />
    </>
  );
}
