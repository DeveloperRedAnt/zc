import { Button } from '@/components/button/button';
import { Check } from 'lucide-react';
import PermissionSettings from './permission-settings';
import ProfileUpload from './profile-upload';
import UserForm from './user-form';

export default function App() {
  return (
    <div className="p-6 space-y-8">
      {/* Description */}
      <div className="space-y-2">
        <p className="text-sm text-[#555555]">
          Silahkan isikan Informasi User yang akan Anda daftarkan
        </p>
        <p className="text-sm text-[#f08181]">Form bertanda (*) harus diisi</p>
      </div>

      {/* Identity Section */}
      <div className="border-b border-slate-100 pb-6">
        <div className="space-y-8">
          <h2 className="text-sm font-medium text-[#555555]">Identitas User</h2>
          <ProfileUpload />
          <UserForm />
        </div>
      </div>

      {/* Permission Section */}
      <div className="border-b border-slate-100 pb-6">
        <div className="space-y-8">
          <h2 className="text-sm font-medium text-[#555555]">Permission</h2>
          <PermissionSettings />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="border-[#c2c7d0] text-[#555555]">
          Batal
        </Button>
        <Button className="bg-[#75bf85] hover:bg-[#65a075] text-white">
          Tambah User
          <Check className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
