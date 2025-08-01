'use client';

import { useSelectOrganization } from '@/__generated__/api/hooks/organization.hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DatePicker } from '@/components/datepicker/date-picker';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { DialogFirstStock } from '@/modules/products/components/dialog-first-stock';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type ProductMix = {
  name: string;
  qty: string;
};

const schema = z.object({
  batchStock: z.string().min(1, 'Jumlah batch wajib diisi'),
  otherCost: z.string().optional(),
  supplier: z.string().min(1, 'Toko wajib dipilih'),
  expiredDate: z.date({ required_error: 'Tanggal kedaluwarsa wajib diisi' }),
});

type FormValues = z.infer<typeof schema>;
const productMixes: ProductMix[] = [
  { name: 'Kaos Combed 34 cm (Merah - Small)', qty: '10 pcs' },
  { name: 'Kopi Gato - 250ml', qty: '20 botol' },
];

export default function Index() {
  return <SetCompositeStockForm />;
}

function SetCompositeStockForm() {
  const [openSaveDialogComposite, setOpenSaveDialogComposite] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [org] = useState<string>('#1155230ASA5 - PT Mencari Cinta Sejati');
  const [_selectedStore, _setSelectedStore] = useState('');
  const [selectedOrg, _setSelectedOrg] = useState('');

  const productionPerBatch = 5;
  const DEVICE_ID = '1';
  const ORGANIZATION_ID = '1';

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      batchStock: '',
      otherCost: '',
      supplier: '',
      expiredDate: undefined,
    },
  });

  // fetch data org
  const { data, isLoading } = useSelectOrganization(
    {
      'x-device-id': DEVICE_ID,
      'x-organization-id': ORGANIZATION_ID,
      'x-store-id': '1',
      body: {
        id: Number(selectedOrg),
        name: selectedOrg,
      },
    },
    {
      retry: false,
      queryKey: [DEVICE_ID, ORGANIZATION_ID, selectedOrg],
    }
  );

  const batchStock = watch('batchStock');
  const totalInitialStock = batchStock ? Number(batchStock) * productionPerBatch : 0;
  const organizationOptions = Array.isArray(data)
    ? data.map((org) => ({ value: String(org.id), label: org.name }))
    : data
      ? [{ value: String(data.id), label: data.name }]
      : [];

  const popUpClikSaveDialogComposite = (data: FormValues) => {
    setFormData(data);
    setOpenSaveDialogComposite(true);
  };

  const handleCancel = () => setOpenSaveDialogComposite(false);

  const saveFirstStock = () => {
    if (!formData) return;
    // Lakukan proses simpan di sini
    // console.log("Saving first stock with data:", formData);
    setOpenSaveDialogComposite(false);
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(popUpClikSaveDialogComposite)}>
        <Card>
          <CardHeader>
            <CardTitle>Atur Stok Awal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-muted-foreground">
              Silahkan isikan Stok untuk Produk yang akan Anda tambahkan
              <br />
              <span className="text-destructive">Form bertanda (*) harus diisi</span>
              <div className="text-muted-foreground mt-3">
                Tanggal Stok dan Biaya Lain-Lain (Opsional)
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Kolom 1: Tanggal Stok */}
              <div className="flex flex-col gap-1">
                <label className="font-medium mb-1">Tanggal Stok</label>
                <Controller
                  control={control}
                  name="expiredDate"
                  render={({ field }) => (
                    <DatePicker
                      mode="single"
                      label=""
                      value={field.value}
                      placeholder="dd/mm/yyyy"
                      onChange={field.onChange}
                      mandatory="true"
                      closeOnSelect={true}
                      className="h-11 w-full"
                    />
                  )}
                />
                {errors.expiredDate && (
                  <span className="text-destructive text-xs">{errors.expiredDate.message}</span>
                )}
              </div>
              {/* Kolom 2: Biaya Lain-lain */}
              <div className="flex flex-col gap-1">
                <label className="font-medium mb-1">Biaya Lain-lain</label>
                <Controller
                  control={control}
                  name="otherCost"
                  render={({ field }) => (
                    <CustomInput
                      currency
                      placeholder="0"
                      prependText="Rp"
                      label=""
                      min={1}
                      className="w-full h-11 text-sm"
                      {...field}
                    />
                  )}
                />
                {errors.otherCost && (
                  <span className="text-destructive text-xs">{errors.otherCost.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">Tujuan Pengisian Stok</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="fon-weight-bold">Organisasi</span>
                <div>{org}</div>
              </div>
              <div>
                {typeof window !== 'undefined' && (
                  <Controller
                    control={control}
                    name="supplier"
                    render={({ field }) => (
                      <Dropdown
                        label="Toko"
                        options={organizationOptions}
                        value={
                          organizationOptions.find(
                            (opt) => String(opt.value) === String(field.value)
                          ) || null
                        }
                        onChange={(option) => field.onChange(option ? String(option.value) : '')}
                        placeholder={isLoading ? 'Memuat...' : 'Pilih Toko'}
                        required
                        className="mt-2 h-10"
                        isLoading={isLoading}
                      />
                    )}
                  />
                )}
                {errors.supplier && (
                  <span className="text-destructive text-xs">{errors.supplier.message}</span>
                )}
              </div>
            </div>
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stok Awal Produk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 font-semibold">Produk Paduan</div>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left">Produk yang dipadukan</th>
                          <th className="px-4 py-2 text-left">Jumlah yang dibutuhkan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productMixes.map((mix) => (
                          <tr key={mix.name} className="border-t">
                            <td className="px-4 py-2">{mix.name}</td>
                            <td className="px-4 py-2">{mix.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex flex-row gap-8">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Jumlah Produksi per Batch
                      </span>
                      <div className="font-semibold">{productionPerBatch}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Harga Beli</span>
                      <div className="font-semibold">Rp. 12.000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 min-w-0">
              <div>
                {/* Sudah di atas */}
                <Controller
                  control={control}
                  name="batchStock"
                  render={({ field }) => (
                    <CustomInput
                      label="Jumlah Batch"
                      inputNumber
                      min={1}
                      required
                      className="w-full h-11 text-sm"
                      {...field}
                    />
                  )}
                />
                {errors.batchStock && (
                  <span className="text-destructive text-xs">{errors.batchStock.message}</span>
                )}
              </div>
              <div>
                <Controller
                  control={control}
                  name="expiredDate"
                  render={({ field }) => (
                    <DatePicker
                      mode="single"
                      label="Tanggal Kedaluwarsa"
                      value={field.value}
                      placeholder="dd/mm/yyyy"
                      onChange={field.onChange}
                      mandatory="true"
                      closeOnSelect={true}
                      className="h-11"
                    />
                  )}
                />
                {errors.expiredDate && (
                  <span className="text-destructive text-xs">{errors.expiredDate.message}</span>
                )}
              </div>
            </div>
            <div className="mb-6">
              <div>
                Jumlah Stok Awal Produk:{' '}
                <span className="font-semibold">{totalInitialStock} pcs</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCancel} className="h-11">
                Kembali ke Tambah Produk
              </Button>
              <Button type="submit" className="h-11">
                Simpan Produk
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <DialogFirstStock
        openClose={openSaveDialogComposite}
        title="Konfirmasi Stok Awal"
        description="Apakah Anda yakin ingin menyimpan stok awal ini?"
        cancelText="Batal"
        confirmText="Ya Saya Yakin"
        onConfirm={saveFirstStock}
        onCancel={handleCancel}
      />
    </>
  );
}
