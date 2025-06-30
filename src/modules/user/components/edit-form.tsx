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
import { Check, Refresh } from '@icon-park/react';
import { useState } from 'react';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    ktp: '',
    email: '',
    isActive: true,
  });

  const handleReset = () => {
    setFormData({
      name: '',
      whatsapp: '',
      ktp: '',
      email: '',
      isActive: true,
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValidForm = formData.name.trim() !== '' && formData.whatsapp.trim() !== '';

  return (
    <>
      <form className="text-[#555555]">
        <p> Silahkan isikan Informasi User yang akan Anda daftarkan </p>
        <p className="text-[#F08181] mt-2"> Form bertanda (*) harus diisi </p>
        <div>
          <div className="pt-6">
            <p> Identitas user </p>
          </div>
          <div className="font-nunito mt-6">
            <div className="flex items-center gap-2">
              <Switch
                id="isActiveUser"
                defaultChecked
                checked={formData.isActive}
                onCheckedChange={(val) => handleChange('isActive', val)}
              />
              <Label htmlFor="isActiveUser"> Status Aktif User </Label>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap w-full">
                <div className="text-[14px] w-1/2 mt-6 pr-4">
                  <CustomInput
                    label="Nama"
                    className="border-[#C2C7D0]"
                    placeholder="cth: John Doe"
                    isWidthFull
                    required
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange('name', e.target.value)
                    }
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
                    value={formData.whatsapp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange('whatsapp', e.target.value)
                    }
                  />
                </div>
                <div className="text-[14px] w-1/2 mt-6 pr-4">
                  <CustomInput
                    label="No. KTP"
                    className="border-[#C2C7D0]"
                    placeholder="cth: 34012233445566"
                    inputNumber
                    isWidthFull
                    value={formData.ktp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange('ktp', e.target.value)
                    }
                  />
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <CustomInput
                    label="Email"
                    className="border-[#C2C7D0]"
                    placeholder="cth: johndoe@mail.com"
                    isWidthFull
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange('email', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button type="button" variant="outline" onClick={handleReset}>
                <Refresh />
                Reset
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-4 border-[#F1F5F9]">
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="mt-2 ml-[1px] flex items-center">
              Batal
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="success"
                  className="mt-2 ml-[1px] flex items-center"
                  disabled={!isValidForm}
                >
                  Simpan Perubahan User
                  <Check />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle> Anda akan menyimpan Perubahan User </DialogTitle>
                  <DialogDescription className="pt-4">
                    Apakah Anda yakin akan menyimpan perubahan user tersebut?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Tidak</Button>
                  </DialogClose>
                  <Button
                    variant="info"
                    onClick={() => {
                      toast.success('Tersimpan!', {
                        description: 'User Anda telah berhasil disimpan',
                        className: 'bg-[#16a34a]',
                      });
                    }}
                  >
                    Ya, Saya Yakin
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </>
  );
}
