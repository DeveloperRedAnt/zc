import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export default function UserForm() {
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Status Toggle */}
      <div className="flex items-center gap-4">
        <Switch checked={isActive} onCheckedChange={setIsActive} />
        <span className="text-sm font-medium text-[#555555]">Status Aktif User</span>
      </div>

      {/* User Identity Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#555555]">
            Nama <span className="text-[#f08181]">*</span>
          </Label>
          <Input placeholder="cth: John Doe" className="border-[#c2c7d0]" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#555555]">
            No. Whatsapp <span className="text-[#f08181]">*</span>
          </Label>
          <Input placeholder="cth: 0899112223344" className="border-[#c2c7d0]" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#555555]">
            Jabatan <span className="text-[#f08181]">*</span>
          </Label>
          <Input placeholder="cth: Kasir" className="border-[#c2c7d0]" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#555555]">No. KTP</Label>
          <Input placeholder="cth: 34012233445566" className="border-[#c2c7d0]" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#555555]">Email</Label>
          <Input placeholder="cth: johndoe@mail.com" className="border-[#c2c7d0]" />
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-8">
        <h3 className="text-sm font-medium text-[#555555]">Set Kata Kunci Akun</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#555555]">
              Password <span className="text-[#f08181]">*</span>
            </Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} className="border-[#c2c7d0] pr-10" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <Eye className="w-4 h-4 text-[#555555]" />
              </button>
            </div>
            <p className="text-xs text-[#555555]">Minimal 6 karakter</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#555555]">
              Verifikasi Password <span className="text-[#f08181]">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                className="border-[#c2c7d0] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <Eye className="w-4 h-4 text-[#555555]" />
              </button>
            </div>
            <p className="text-xs text-[#555555]">Harus diisi sama dengan Password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
