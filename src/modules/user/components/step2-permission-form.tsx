import PermissionSettings from './permission-settings';

export default function App() {
  return (
    <div className="p-6 space-y-8">
      {/* Description */}
      <div className="space-y-2 mt-4">
        <p className='font-semibold'> Step 2 - Permission </p>
        <p className="text-sm text-[#555555]">
          Silahkan isikan Permission dari User tersebut
        </p>
        <p className="text-sm text-[#f08181]"> Form bertanda (*) harus diisi </p>
      </div>

      {/* Permission Section */}
      <div className="border-b border-slate-100 pb-6">
        <div className="space-y-8">
          <PermissionSettings />
        </div>
      </div>
    </div>
  );
}
