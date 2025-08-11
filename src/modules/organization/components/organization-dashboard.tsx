import {
  useCreateOrganization,
  useGetDashboardOrganizationsEmployee,
  useUpdateOrganization,
} from '@/__generated__/api/hooks';

import { toast } from '@/components/toast/toast';
import { useSearchParams } from '@/modules/organization/hooks/use-search-params';
import React, { useMemo, useState, useEffect } from 'react';
import { z } from 'zod';
import FilterOrganizationList from './filter-organization-list';
import OrganizationCard from './organization-card';
import OrganizationConfirmDialog from './organization-confirm-dialog';
import OrganizationDialogForm from './organization-dialog-form';
import TableOrganizationList from './table-organization-list';

const organizationFormSchema = z.object({
  name: z.string().min(3, 'Nama organisasi minimal 3 karakter'),
  phone: z.string().min(10, 'Nomor Whatsapp minimal 10 digit').max(15, 'Maksimal 15 digit'),
  email: z.string().email('Format email tidak valid'),
  nib: z.string().optional(),
  npwp: z.string().optional(),
});

export type OrganizationFormData = z.infer<typeof organizationFormSchema>;

export type Organization = {
  id: string;
  name: string;
  phone: string;
  email: string;
  nib?: string;
  npwp?: string;
};

const defaultFormData = {
  name: '',
  phone: '',
  email: '',
  nib: '',
  npwp: '',
};

function normalizeErrors(errorsObj: Record<string, string[] | string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(errorsObj).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages[0] ?? '' : messages ?? '',
    ])
  );
}

export default function OrganizationDashboard() {
  const [dialogOrganizationOpen, setDialogOrganizationOpen] = useState(false);
  const [dialogOrganizationConfirm, setDialogOrganizationConfirm] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // Zod validation
  const validation = organizationFormSchema.safeParse(formData);
  const isValid = validation.success;
  const errors = validation.success ? {} : validation.error.flatten().fieldErrors;
  const [showErrors, setShowErrors] = useState(false);

  // API field error
  const [apiFieldErrors, setApiFieldErrors] = useState<Record<string, string[]> | undefined>(
    undefined
  );

  // Reload key for refetch
  const [reloadKey, setReloadKey] = useState(0);

  // Search params
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useSearchParams();

  const { mutate: mutationForCreateOrganization, isPending: isPendingCreateOrganization } =
    useCreateOrganization();
  const { mutate: mutationForUpdateOrganization, isPending: isPendingUpdateOrganization } =
    useUpdateOrganization();
  const allowedPageSizes = [10, 25, 50, 100];
  const queryLimit = Number(limit);

  if (queryLimit > 100) {
    setLimit(100);
  }

  const validatedLimit = allowedPageSizes.includes(queryLimit) ? queryLimit : 100;

  // Debounced search
  const [_debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch organizations
  const { data: response, isLoading } = useGetDashboardOrganizationsEmployee(
    {
      'x-device-id': '1',
      page: page,
      per_page: validatedLimit,
      search: search,
      sort_by: sortBy,
      sort_direction: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined,
    },
    {
      staleTime: 0,
      queryKey: [
        'getDashboardOrganizations',
        page,
        validatedLimit,
        search,
        sortBy,
        sortOrder,
        reloadKey,
      ],
    }
  );

  const currentPage = response?.pagination?.current_page || 1;
  const lastPage = response?.pagination?.last_page || 1;
  const perPage = validatedLimit;

  const organizations = useMemo(() => {
    if (!response || !response.data) return [];
    return response.data.map((item) => ({
      id: String(item.id),
      name: item.name,
      phone: item.phone,
      email: item.email,
      npwp: item.npwp ?? '',
      nib: item.nib ?? '',
      siup: item.siup ?? '',
    }));
  }, [response]);

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  // Add organization
  const handleAddOrganization = () => {
    setIsEditMode(false);
    setSelectedOrganization(null);
    setFormData(defaultFormData);
    setApiFieldErrors({});
    setShowErrors(false);
    setDialogOrganizationOpen(true);
  };

  // Edit organization
  const handleEditOrganization = (organization: Organization) => {
    setIsEditMode(true);
    setSelectedOrganization(organization);
    setFormData({
      name: organization.name,
      phone: organization.phone,
      email: organization.email,
      nib: organization.nib ?? '',
      npwp: organization.npwp ?? '',
    });
    setApiFieldErrors({});
    setDialogOrganizationOpen(true);
  };

  // Reset form
  const handleResetForm = () => {
    if (isEditMode && selectedOrganization) {
      setFormData({
        name: selectedOrganization.name || '',
        phone: selectedOrganization.phone || '',
        email: selectedOrganization.email || '',
        nib: selectedOrganization.nib || '',
        npwp: selectedOrganization.npwp || '',
      });
    } else {
      setFormData(defaultFormData);
    }
    setApiFieldErrors({});
  };

  // Input change
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setApiFieldErrors((prev) => {
      if (!prev) return undefined;
      const { [field]: _, ...rest } = prev;
      return Object.keys(rest).length ? rest : undefined;
    }); // clear field error on change
  };

  // Submit dialog
  const handleDialogSubmit = () => {
    const validation = organizationFormSchema.safeParse(formData);
    setShowErrors(true);
    setApiFieldErrors({});
    if (validation.success) {
      setDialogOrganizationConfirm(true);
      setDialogOrganizationOpen(false);
    }
  };

  // Confirm create/update
  const handleConfirm = () => {
    if (isEditMode) {
      mutationForUpdateOrganization(
        {
          id: selectedOrganization?.id || '',
          body: {
            name: formData.name,
            phone: Number(formData.phone),
            email: formData.email,
            nib: formData.nib ?? null,
            npwp: formData.npwp ?? null,
          },
        },
        {
          onSuccess: () => onSuccessOperation(true),
          onError: (error: Error) => {
            const rawApiErrors =
              (error as { data?: { errors?: Record<string, string[] | string> } }).data?.errors ||
              {};
            const normalizedErrors = normalizeErrors(rawApiErrors);
            const apiErrors: Record<string, string[]> = Object.fromEntries(
              Object.entries(normalizedErrors).map(([key, value]) => [key, [value]])
            );
            onErrorOperation(true, (error as Error).message, apiErrors);
          },
        }
      );
    } else {
      mutationForCreateOrganization(
        {
          'x-device-id': '1',
          body: {
            name: formData.name,
            phone: Number(formData.phone),
            email: formData.email,
            npwp: formData.npwp ?? null,
            nib: formData.nib ?? null,
          },
        },
        {
          onSuccess: () => onSuccessOperation(true),
          onError: (error: Error) => {
            const rawApiErrors =
              (error as { data?: { errors?: Record<string, string[] | string> } }).data?.errors ||
              {};
            const normalizedErrors = normalizeErrors(rawApiErrors);
            const apiErrors: Record<string, string[]> = Object.fromEntries(
              Object.entries(normalizedErrors).map(([key, value]) => [key, [value]])
            );
            onErrorOperation(true, (error as Error).message, apiErrors);
          },
        }
      );
    }
    setDialogOrganizationConfirm(false);
  };

  // Success operation
  const onSuccessOperation = (isEdit: boolean) => {
    toast.success(isEdit ? 'Terupdate!' : 'Tersimpan!', {
      description: isEdit
        ? 'Organisasi Anda telah berhasil diupdate'
        : 'Organisasi Anda telah berhasil tersimpan',
      className: 'bg-[#75BF85]',
    });
    setIsEditMode(false);
    setSelectedOrganization(null);
    setApiFieldErrors({});
    setReloadKey((prev) => prev + 1);
  };

  // Error operation
  const onErrorOperation = (
    isEdit: boolean,
    message: string,
    errors?: Record<string, string[]>
  ) => {
    toast.error(isEdit ? 'Gagal diupdate!' : 'Gagal tersimpan!', {
      description: message,
      className: 'bg-[#75BF85]',
    });
    setIsEditMode(false);
    setSelectedOrganization(null);
    setApiFieldErrors(errors || {});
    setDialogOrganizationOpen(true); // tampilkan form lagi jika error
    setDialogOrganizationConfirm(false);
  };

  // Gabungkan error Zod dan error API field
  const mergedErrors = {
    ...errors,
    ...(apiFieldErrors ?? {}),
  };

  return (
    <OrganizationCard isLoading={isLoading} onAdd={handleAddOrganization}>
      <>
        <FilterOrganizationList
          search={search}
          onSearch={setSearch}
          loadingDataOrganization={false}
        />

        <TableOrganizationList
          isLoading={isLoading}
          onEditOrganization={handleEditOrganization}
          organizations={organizations}
          setPage={(pageIndex) => setPage(pageIndex + 1)}
          setLimit={setLimit}
          defaultPage={Math.max(0, currentPage - 1)}
          defaultPageSize={perPage}
          sortBy={sortBy}
          sortOrder={sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined}
          totalPages={lastPage}
          onSortChange={(nextSortBy, nextSortOrder) => {
            setSortBy(nextSortBy);
            setSortOrder(nextSortOrder);
          }}
        />

        <OrganizationDialogForm
          isOpen={dialogOrganizationOpen}
          isEditMode={isEditMode}
          formData={formData}
          onChange={handleInputChange}
          onReset={handleResetForm}
          onSubmit={handleDialogSubmit}
          onOpenChange={setDialogOrganizationOpen}
          errors={showErrors ? mergedErrors : {}}
          isValid={isValid}
        />

        <OrganizationConfirmDialog
          isOpen={dialogOrganizationConfirm}
          isEditMode={isEditMode}
          isLoading={isPendingCreateOrganization || isPendingUpdateOrganization}
          onCancel={() => {
            setDialogOrganizationConfirm(false);
            setDialogOrganizationOpen(true);
          }}
          onConfirm={handleConfirm}
          onOpenChange={setDialogOrganizationConfirm}
        />
      </>
    </OrganizationCard>
  );
}
