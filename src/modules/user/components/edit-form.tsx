'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { updateEmployee } from '@/__generated__/api/client';
// TODO: Implement the correct mutation hook for updating employees. See user.hooks.ts for available hooks.
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
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { toast } from '@/components/toast/toast';
import { useRefreshUserListStore } from '@/modules/user/store';
import { useUserEditStore } from '@/modules/user/user-edit-store';
import { Check, Refresh } from '@icon-park/react';

export default function EditForm() {
  // TODO: Add mutation hook for updating employees here when available.
  // const { mutateAsync: updateEmployee } = useUpdateEmployee();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, name, whatsapp, ktp, email, isActive, setUserData, resetToOriginal } =
    useUserEditStore();

  const handleChange = (field: string, value: string | boolean) => {
    setUserData({
      name,
      whatsapp,
      ktp,
      email,
      isActive,
      [field]: value,
    });
  };

  const isValidForm = name.trim() !== '' && whatsapp.trim() !== '';

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const basePayload = {
        name,
        phone: whatsapp,
        id_number: ktp,
        email,
        password: '', // kosongkan jika tidak diedit
        password_confirmation: '',
        is_active: isActive,
      };

      await updateEmployee({
        id: id as number,
        'x-organization-id': '1',
        body: basePayload,
      });

      toast.success('Tersimpan!', {
        description: 'User Anda telah berhasil disimpan',
        className: 'bg-[#16a34a]',
      });

      useRefreshUserListStore.getState().triggerRefresh();
      router.push('/dashboard/users');
    } catch (error) {
      toast.error('Gagal menyimpan user');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="text-[#555555]">
      <p>Silahkan isikan Informasi User yang akan Anda daftarkan</p>
      <p className="text-[#F08181] mt-2">Form bertanda (*) harus diisi</p>

      <div className="pt-6">
        <p>Identitas user</p>
      </div>

      <div className="font-nunito mt-6">
        <div className="flex items-center gap-2">
          <Switch
            id="isActiveUser"
            defaultChecked
            checked={isActive}
            onCheckedChange={(val) => handleChange('isActive', val)}
          />
          <Label htmlFor="isActiveUser">Status Aktif User</Label>
        </div>

        <div className="flex flex-wrap w-full">
          <div className="text-[14px] w-1/2 mt-6 pr-4">
            <CustomInput
              label="Nama"
              className="border-[#C2C7D0]"
              placeholder="cth: John Doe"
              isWidthFull
              required
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="text-[14px] w-1/2 mt-6">
            <CustomInput
              label="No. Whatsapp"
              className="border-[#C2C7D0]"
              placeholder="cth: 0899112223344"
              isWidthFull
              inputNumber
              required
              value={whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
            />
          </div>
          <div className="text-[14px] w-1/2 mt-6 pr-4">
            <CustomInput
              label="No. KTP"
              className="border-[#C2C7D0]"
              placeholder="cth: 34012233445566"
              inputNumber
              isWidthFull
              value={ktp}
              onChange={(e) => handleChange('ktp', e.target.value)}
            />
          </div>
          <div className="text-[14px] w-1/2 mt-6">
            <CustomInput
              label="Email"
              className="border-[#C2C7D0]"
              placeholder="cth: johndoe@mail.com"
              isWidthFull
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" onClick={resetToOriginal}>
            <Refresh />
            Reset
          </Button>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 border-[#F1F5F9]">
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" className="mt-2 ml-[1px]">
            Batal
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="success"
                className="mt-2 ml-[1px] flex items-center"
                disabled={!isValidForm || isSubmitting}
              >
                Simpan Perubahan User
                <Check />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Anda akan menyimpan Perubahan User</DialogTitle>
                <DialogDescription className="pt-4">
                  Apakah Anda yakin akan menyimpan perubahan user tersebut?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Tidak</Button>
                </DialogClose>
                <Button variant="info" disabled={isSubmitting} onClick={handleSubmit}>
                  Ya, Saya Yakin
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </form>
  );
}
