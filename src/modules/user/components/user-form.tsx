import CropperImage from '@/components/cropper/cropper-image';
import CustomInput from '@/components/input/custom-input';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { useUserStore } from '@/modules/user/store';

type UserFormProps = {
  employeeId?: number | null;
};

export default function UserForm({ employeeId }: UserFormProps) {
  const { name, phone, id_number, email, password, password_confirmation, isActive, setField } =
    useUserStore();
  const { photo, setPhoto } = useUserStore();

  return (
    <>
      {!employeeId && <CropperImage onChange={(file) => setPhoto(file)} initialFile={photo} />}
      <div className="space-y-8">
        {/* Status Toggle */}
        <div className="flex items-center gap-4">
          <Switch checked={isActive} onCheckedChange={(val) => setField('isActive', val)} />
          <span className="text-sm font-medium text-[#555555]">Status Aktif User</span>
        </div>

        {/* Identity Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <CustomInput
              className="border-[#C2C7D0]"
              placeholder="cth: John Doe"
              isWidthFull
              label="Nama"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setField('name', e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <CustomInput
              className="border-[#C2C7D0]"
              placeholder="cth: 0899112223344"
              isWidthFull
              label="No. Whatsapp"
              value={phone}
              onChange={(e) => setField('phone', e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => {
                const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              inputMode="numeric"
              required
            />
            {phone && (phone.length < 10 || phone.length > 16) && (
              <p className="text-xs text-[#f08181]">No. Whatsapp harus 10-16 digit</p>
            )}
          </div>

          <div className="space-y-2">
            <CustomInput
              className="border-[#C2C7D0]"
              placeholder="cth: 34012233445566"
              isWidthFull
              label="No. KTP"
              value={id_number}
              onChange={(e) => setField('id_number', e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => {
                const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              inputMode="numeric"
            />
            {id_number && id_number.length !== 16 && (
              <p className="text-xs text-[#f08181]">No. KTP harus 16 digit</p>
            )}
          </div>

          <div className="space-y-2">
            <CustomInput
              className="border-[#C2C7D0]"
              placeholder="cth: johndoe@mail.com"
              isWidthFull
              label="Email"
              value={email}
              onChange={(e) => setField('email', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-8">
          <h3 className="text-sm font-medium text-[#555555]">Set Kata Kunci Akun</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#555555]">
                Password <span className="text-[#f08181]">*</span>
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setField('password', e.target.value)}
                className="pr-10 mt-2"
              />
              <p className="text-xs text-[#555555]">Minimal 6 karakter</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#555555]">
                Verifikasi Password <span className="text-[#f08181]">*</span>
              </Label>
              <Input
                type="password"
                value={password_confirmation}
                onChange={(e) => setField('password_confirmation', e.target.value)}
                className="pr-10 mt-2"
              />
              <p className="text-xs text-[#555555]">Harus diisi sama dengan Password</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
