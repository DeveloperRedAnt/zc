import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import CustomInput from '@/components/input/custom-input';
import { useUserStore } from '../store';

export default function UserForm() {
  const {
    name,
    whatsapp,
    ktp,
    email,
    password,
    passwordConfirm,
    isActive,
    setField,
  } = useUserStore();

  return (
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
            className='border-[#C2C7D0]' 
            placeholder="cth: John Doe" 
            isWidthFull
            label="Nama"
            value={name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <CustomInput 
            className='border-[#C2C7D0]' 
            placeholder="cth: 0899112223344" 
            isWidthFull
            label="No. Whatsapp"
            value={whatsapp}
            onChange={(e) =>
              setField('whatsapp', e.target.value.replace(/\D/g, ''))
            }
            onKeyDown={(e) => {
              const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
              if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                e.preventDefault();
              }
            }}
            inputMode="numeric"
            required
          />
        </div>

        <div className="space-y-2">
          <CustomInput 
            className='border-[#C2C7D0]' 
            placeholder="cth: 34012233445566" 
            isWidthFull
            label="No. KTP"
            value={ktp}
            onChange={(e) => setField('ktp', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <CustomInput 
              className='border-[#C2C7D0]' 
              placeholder="cth: johndoe@mail.com" 
              isWidthFull
              label="Email"
              value={email}
              onChange={(e) => setField('email', e.target.value)}
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
              value={passwordConfirm}
              onChange={(e) => setField('passwordConfirm', e.target.value)}
              className="pr-10 mt-2"
            />
            <p className="text-xs text-[#555555]">Harus diisi sama dengan Password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
