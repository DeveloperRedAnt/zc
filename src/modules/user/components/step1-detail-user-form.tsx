import UserForm from './user-form';

export default function App({ employeeId }: { employeeId?: number | null }) {
  return (
    <div className="p-6 space-y-8">
      {/* Description */}
      <div className="space-y-2 mt-4">
        <p className="font-semibold"> Step 1 - Detail User </p>
        <p className="text-sm text-[#555555]">
          Silahkan isikan Informasi User yang akan Anda daftarkan
        </p>
        <p className="text-sm text-[#f08181]">Form bertanda (*) harus diisi</p>
      </div>

      {/* Identity Section */}
      <div className="border-b border-slate-100 pb-6">
        <div className="space-y-8">
          <h2 className="text-sm font-medium text-[#555555]">Identitas User</h2>

          <UserForm employeeId={employeeId} />
        </div>
      </div>
    </div>
  );
}
