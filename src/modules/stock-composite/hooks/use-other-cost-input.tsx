import { usePostCompositeStock } from '@/__generated__/api/hooks/composite.hooks';
import { useSelectOrganization } from '@/__generated__/api/hooks/organization.hooks';
import { useOrganizationStore } from '@/store/organization-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  batchStock: z.string().min(1, 'Jumlah batch wajib diisi'),
  otherCost: z.string().optional(),
  toko: z.string().min(1, 'Toko wajib dipilih'),
  expiredDate: z.date({ required_error: 'Tanggal kedaluwarsa wajib diisi' }),
});

export type FormValues = z.infer<typeof schema>;

export function useCompositeStockForm() {
  const [openSaveDialogComposite, setOpenSaveDialogComposite] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const org = useOrganizationStore((state) => state.organization);
  const [_selectedStore, _setSelectedStore] = useState('');
  const [selectedOrg, _setSelectedOrg] = useState('');

  const productionPerBatch = 5;
  const DEVICE_ID = '1';
  const ORGANIZATION_ID = '1';

  const {
    mutate: saveCompositeStock,
    isPending: isSaving,
    data: saveResult,
    error: saveError,
  } = usePostCompositeStock();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      batchStock: '',
      otherCost: '',
      toko: '',
      expiredDate: undefined,
    },
  });

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
    setOpenSaveDialogComposite(false);
  };

  return {
    org,
    control,
    errors,
    handleSubmit,
    getValues,
    popUpClikSaveDialogComposite,
    setOpenSaveDialogComposite,
    handleCancel,
    saveFirstStock,
    openSaveDialogComposite,
    totalInitialStock,
    organizationOptions,
    isLoading,
    productionPerBatch,
    productMixes: [
      { name: 'Kaos Combed 34 cm (Merah - Small)', qty: '10 pcs' },
      { name: 'Kopi Gato - 250ml', qty: '20 botol' },
    ],
    // tanstack
    saveCompositeStock,
    isSaving,
    saveResult,
    saveError,
  };
}
