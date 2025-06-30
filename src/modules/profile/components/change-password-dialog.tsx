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
import { useTranslation } from '@/libs/i18n';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import * as z from 'zod';

interface ChangePasswordDialogProps {
  children: React.ReactNode;
  onConfirm?: (data: ChangePasswordData) => void;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Zod Schema (will be created in useEffect to access t function)
const createChangePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      oldPassword: z.string().min(1, t('profile.changePassword.validation.oldPasswordRequired')),

      newPassword: z
        .string()
        .min(6, t('profile.changePassword.validation.minLength'))
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          t('profile.changePassword.validation.passwordComplexity')
        ),

      confirmPassword: z
        .string()
        .min(1, t('profile.changePassword.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('profile.changePassword.validation.passwordsMustMatch'),
      path: ['confirmPassword'],
    });

export default function ChangePasswordDialog({ children, onConfirm }: ChangePasswordDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const changePasswordSchema = createChangePasswordSchema(t);
  const [formData, setFormData] = useState<ChangePasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
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

  const handleSubmit = () => {
    try {
      const validatedData = changePasswordSchema.parse(formData);

      setErrors({});

      onConfirm?.(validatedData);
      handleClose();
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

      <Dialog open={open} onOpenChange={setOpen}>
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
              <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                {t('profile.changePassword.oldPassword')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showPasswords.old ? 'text' : 'password'}
                  value={formData.oldPassword}
                  onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                  className={`pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.oldPassword ? 'border-red-300' : ''
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
              {errors.oldPassword && <p className="text-xs text-red-500">{errors.oldPassword}</p>}
            </div>

            {/* Password Baru */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                {t('profile.changePassword.newPassword')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className={`pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.newPassword ? 'border-red-300' : ''
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
              {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword}</p>}
            </div>

            {/* Verifikasi Password Baru */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                {t('profile.changePassword.confirmPassword')}{' '}
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-300' : ''
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
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 text-right">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-[182px] bg-[#75BF85] hover:bg-[#75BF85] text-white font-medium py-2 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('profile.changePassword.submitButton')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
