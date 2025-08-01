'use client';

import type { CreateOrganizationResponse } from '@/__generated__/api/dto/organization.dto';
import { useCreateOrganization } from '@/__generated__/api/hooks/organization.hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
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
import FormFieldError from '@/components/form-field-error/form-field-error';
import CustomInput from '@/components/input/custom-input';
import { toast } from '@/components/toast/toast';
import { useRegisterField } from '@/hooks/use-form-validator/use-register-field';
import { organizationSchema } from '@/modules/auth/constants';
import { useOrganizationStore } from '@/store/organization-store';
import { ArrowRight, Info } from '@icon-park/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';

const FIELD_MAP: Record<string, string> = {
  nib: 'siup_nib',
  phone: 'telephone',
};

const INITIAL_STATE = {
  name: 'PT. Homo Sapiens',
  telephone: '081234567890',
  email: 'home@organisasi.com',
  siupNib: '1234567890',
  npwp: '09.876.543.2-111.222',
};

function mapZodErrors(errors: z.ZodIssue[]): Record<string, string> {
  return errors.reduce(
    (acc, err) => {
      const field = typeof err.path[0] === 'string' ? err.path[0] : '';
      const uiField = FIELD_MAP[field] || field;
      if (uiField) acc[uiField] = err.message;
      return acc;
    },
    {} as Record<string, string>
  );
}

function isCreateOrganizationResponse(obj: unknown): obj is CreateOrganizationResponse {
  if (!obj || typeof obj !== 'object') return false;
  const res = obj as CreateOrganizationResponse;
  return (
    typeof res.code === 'number' &&
    typeof res.status === 'string' &&
    typeof res.name === 'string' &&
    typeof res.message === 'string' &&
    res.data &&
    typeof res.data.id === 'number' &&
    typeof res.data.name === 'string'
  );
}

export default function FormAddOrganization() {
  const router = useRouter();
  const createOrganizationMutation = useCreateOrganization();
  const { setOrganization } = useOrganizationStore();
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);
  const [zodErrors, setZodErrors] = useState<Record<string, string>>({});

  const nameField = useRegisterField('name');
  const telephoneField = useRegisterField('telephone');
  const emailField = useRegisterField('email');

  const handleInputChange = (
    field: keyof typeof form,
    value: string,
    zodShape?: z.ZodTypeAny,
    fieldError?: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (zodShape) {
      const result = zodShape.safeParse(value);
      setZodErrors((prev) => ({
        ...prev,
        [field]: result.success ? '' : result.error.errors[0]?.message || '',
      }));
    } else if (fieldError) {
      setZodErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      phone: Number(form.telephone),
      nib: form.siupNib,
      npwp: form.npwp,
      address: '',
      email: form.email,
      image: '',
    };

    const result = organizationSchema.safeParse(payload);
    if (!result.success) {
      setZodErrors(mapZodErrors(result.error.errors));
      setOpenDialogConfirm(false);
      return;
    }

    createOrganizationMutation.mutate(
      {
        'x-device-id': '1',
        body: payload,
      },
      {
        onSuccess: (organizationData) => {
          setOpenDialogConfirm(false);

          if (!isCreateOrganizationResponse(organizationData)) {
            toast.error('Gagal menambahkan organisasi', {
              style: { background: '#ef4444', color: '#fff' },
            });
            return;
          }

          const data = organizationData.data;

          setOrganization({ id: data.id, name: data.name, flex: 'add-store' });
          Cookies.set('flex', 'add-store');

          toast.success('Organisasi berhasil dibuat!', {
            style: { background: '#22c55e', color: '#fff' },
          });

          router.push('/login/add-store');
        },
        onError: (error: Error & { errors?: Record<string, string[] | string> }) => {
          setOpenDialogConfirm(false);
          const errorMsg = error.message || 'Terjadi kesalahan';
          if (error.errors && typeof error.errors === 'object') {
            const fieldErrors: Record<string, string> = {};
            for (const [key, value] of Object.entries(error.errors)) {
              const uiField = FIELD_MAP[key] || key;
              const message = Array.isArray(value) ? value[0] ?? '' : String(value ?? '');
              fieldErrors[uiField] = message;
            }
            setZodErrors(fieldErrors);
          } else {
            setZodErrors({ api: errorMsg });
          }
          toast.error(errorMsg, {
            style: { background: '#ef4444', color: '#fff' },
          });
        },
      }
    );
  };

  return (
    <div>
      {/* Header dan Logo */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src="/assets/zycas/zycas-logo.png"
            alt="Zycas Login"
            className="inline-block align-middle h-[28px] mr-[2px]"
          />
          <span className="text-[1rem] font-[400]">Zycas</span>
          <span className="text-[1rem] font-[300] -ml-1">Dashboard</span>
        </div>
      </div>
      {/* Info Box */}
      <div className="text-[#F08181] border !border-[#F08181] rounded-[6px] w-[27.5rem] p-4 bg-[#fff] mb-4 text-sm">
        <div className="flex gap-2 text-[#F08181] information-text">
          <Info size={16} className="pt-[2px]" />
          <p>Anda belum memiliki Organisasi!</p>
        </div>
        <p className="pl-[1.5rem] mt-2">
          Silahkan menambahkan data Organisasi dibawah ini untuk melanjutkan ke Dashboard
        </p>
      </div>
      {/* Card Form */}
      <Card className="text-[#555555]">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]">Buat Organisasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-0 text-[14px] font-[400]">
          <div className="w-[27.5rem] p-4">
            {/* Input Nama Organisasi */}
            <div className="mb-6">
              <CustomInput
                ref={nameField.ref as React.Ref<HTMLTextAreaElement>}
                value={form.name}
                onChange={(e) =>
                  handleInputChange('name', e.target.value, organizationSchema.shape.name)
                }
                required
                isWidthFull
                className={`border ${
                  nameField.error || zodErrors.name ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                }`}
                placeholder="cth: PT. Organisasi Sejahtera"
                label="Nama Organisasi"
              />
              <FormFieldError message={nameField.error || zodErrors.name} />
            </div>
            {/* Input No. Whatsapp */}
            <div className="mb-6">
              <CustomInput
                ref={telephoneField.ref as React.Ref<HTMLTextAreaElement>}
                value={form.telephone}
                onChange={(e) =>
                  handleInputChange('telephone', e.target.value, organizationSchema.shape.phone)
                }
                required
                isWidthFull
                className={`border ${
                  telephoneField.error || zodErrors.telephone
                    ? '!border-[#F08181]'
                    : 'border-[#C2C7D0]'
                }`}
                placeholder="cth: 0811223344556"
                label="No. Whatsapp"
                inputNumber
              />
              <FormFieldError message={telephoneField.error || zodErrors.telephone} />
            </div>
            {/* Input Email */}
            <div className="mb-6">
              <CustomInput
                ref={emailField.ref as React.Ref<HTMLTextAreaElement>}
                value={form.email}
                onChange={(e) =>
                  handleInputChange('email', e.target.value, organizationSchema.shape.email)
                }
                required
                isWidthFull
                className={`border ${
                  emailField.error || zodErrors.email ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                }`}
                placeholder="cth: email@zycas.com"
                label="Email"
              />
              <FormFieldError message={emailField.error || zodErrors.email} />
            </div>
            {/* Input SIUP/NIB */}
            <div className="mb-6">
              <CustomInput
                isWidthFull
                className={`mb-1 border ${
                  zodErrors.siup_nib ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                }`}
                placeholder="Masukkan SIUP / NIB"
                label="SIUP / NIB"
                value={form.siupNib}
                onChange={(e) => handleInputChange('siupNib', e.target.value)}
              />
              <FormFieldError message={zodErrors.siup_nib} />
            </div>
            {/* Input NPWP */}
            <div className="mb-4">
              <CustomInput
                isWidthFull
                className={`mb-1 border ${
                  zodErrors.npwp ? '!border-[#F08181]' : 'border-[#C2C7D0]'
                }`}
                placeholder="cth: 11.222.333.4-555.666"
                label="NPWP"
                value={form.npwp}
                onChange={(e) => handleInputChange('npwp', e.target.value)}
              />
              <FormFieldError message={zodErrors.npwp} />
            </div>
            {/* Tombol Simpan dan Dialog Konfirmasi */}
            <div className="mt-4 w-full">
              <Dialog open={openDialogConfirm} onOpenChange={setOpenDialogConfirm}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="info"
                    className="!w-full"
                    disabled={
                      !form.name ||
                      !form.telephone ||
                      !form.email ||
                      createOrganizationMutation.isPending
                    }
                    onClick={() => {
                      if (!form.name || !form.telephone || !form.email) {
                        setZodErrors({
                          name: !form.name ? 'Nama Organisasi wajib diisi' : '',
                          telephone: !form.telephone ? 'No. Whatsapp wajib diisi' : '',
                          email: !form.email ? 'Email wajib diisi' : '',
                        });
                        return;
                      }
                      setOpenDialogConfirm(true);
                    }}
                  >
                    {createOrganizationMutation.isPending ? 'Menyimpan...' : 'Simpan dan Buat Toko'}
                    <ArrowRight />
                  </Button>
                </DialogTrigger>
                {/* Dialog Konfirmasi */}
                <DialogContent className="max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-[1rem] font-[500]">
                      Anda akan menyimpan Organisasi
                    </DialogTitle>
                    <DialogDescription className="pt-4 text-[12px]">
                      Apakah Anda yakin akan menyimpan Organisasi Anda?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-4 pt-4">
                    <DialogClose asChild>
                      <Button variant="ghost" className="min-w-[80px]">
                        Tidak
                      </Button>
                    </DialogClose>
                    <Button variant="info" className="min-w-[120px]" onClick={handleSubmit}>
                      Ya, Saya Yakin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
