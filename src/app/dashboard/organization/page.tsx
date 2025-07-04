'use client';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import CustomInput from '@/components/input/custom-input';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { toast } from '@/components/toast/toast';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FilterOrganizationList from '@/modules/organization/filter-organization-list';
import TableOrganizationList from '@/modules/organization/table-organization-list';
import { Check, Plus, Refresh } from '@icon-park/react';
import { useEffect, useState } from 'react';

type Organization = {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  siup: string;
  npwp: string;
};

export default function Index() {
  const [dialogOrganizationOpen, setDialogOrganizationOpen] = useState(false);
  const [dialogOrganizationConfirm, setDialogOrganizationConfirm] = useState(false);
  const [loadingDataProduct, setLoadingDataProduct] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form state for inputs
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    siup: '',
    npwp: '',
  });

  const { isLoading, setLoading } = usePageLoading({
    autoStart: false,
    initialDelay: 0,
  });

  useEffect(() => {
    setLoading(true);
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    }).then(() => {
      setTimeout(() => {
        setLoadingDataProduct(false);
      }, 2000);
    });
  }, [setLoading]);

  const handleAddOrganization = () => {
    setIsEditMode(false);
    setSelectedOrganization(null);
    setFormData({
      name: '',
      whatsapp: '',
      email: '',
      siup: '',
      npwp: '',
    });
    setDialogOrganizationOpen(true);
  };

  const handleEditOrganization = (organization: Organization) => {
    setIsEditMode(true);
    setSelectedOrganization(organization);
    setFormData({
      name: organization.name,
      whatsapp: organization.whatsapp,
      email: organization.email,
      siup: organization.siup,
      npwp: organization.npwp,
    });
    setDialogOrganizationOpen(true);
  };

  const handleResetForm = () => {
    if (isEditMode && selectedOrganization) {
      setFormData({
        name: selectedOrganization.name,
        whatsapp: selectedOrganization.whatsapp,
        email: selectedOrganization.email,
        siup: selectedOrganization.siup,
        npwp: selectedOrganization.npwp,
      });
    } else {
      setFormData({
        name: '',
        whatsapp: '',
        email: '',
        siup: '',
        npwp: '',
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          {isLoading ? (
            <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
          ) : (
            <CardTitle className="text-[1rem]"> List Organisasi </CardTitle>
          )}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <>
                <SkeletonButton className="w-[110px]" />
                <SkeletonButton className="w-[140px] mr-3.5" />
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#555555] flex items-center"
                  onClick={handleAddOrganization}
                >
                  <Plus />
                  Tambah Organisasi
                </Button>
                <Dialog open={dialogOrganizationOpen} onOpenChange={setDialogOrganizationOpen}>
                  <DialogContent className="sm:max-w-sm gap-6">
                    <DialogHeader>
                      <DialogTitle>Organisasi</DialogTitle>
                    </DialogHeader>
                    <CustomInput
                      required
                      isWidthFull
                      className="mb-2"
                      placeholder="cth: PT. Organisasi Sejahtera"
                      label="Nama Organisasi"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <CustomInput
                      required
                      isWidthFull
                      className="mb-2"
                      placeholder="cth: 0811223344556"
                      label="No. Whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    />
                    <CustomInput
                      required
                      isWidthFull
                      className="mb-2"
                      placeholder="cth: email@zycas.com"
                      label="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <CustomInput
                      required
                      isWidthFull
                      className="mb-2"
                      placeholder="Masukkan SIUP / NIB"
                      label="SIUP / NIB"
                      value={formData.siup}
                      onChange={(e) => handleInputChange('siup', e.target.value)}
                    />
                    <CustomInput
                      required
                      isWidthFull
                      className="mb-2"
                      placeholder="cth: 11.222.333.4-555.666"
                      label="NPWP"
                      value={formData.npwp}
                      onChange={(e) => handleInputChange('npwp', e.target.value)}
                    />
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        className={isEditMode ? '' : 'hidden'}
                        onClick={handleResetForm}
                      >
                        <Refresh size={14} />
                        Reset
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          setDialogOrganizationConfirm(true);
                          setDialogOrganizationOpen(false);
                        }}
                      >
                        {isEditMode ? 'Update Organisasi' : 'Simpan Organisasi'} <Check size={14} />
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={dialogOrganizationConfirm}
                  onOpenChange={setDialogOrganizationConfirm}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {isEditMode
                          ? 'Anda akan mengupdate Organisasi'
                          : 'Anda akan menyimpan Organisasi'}
                      </DialogTitle>
                      <DialogDescription>
                        {isEditMode
                          ? 'Apakah Anda yakin akan mengupdate organisasi tersebut?'
                          : 'Apakah Anda yakin akan menyimpan organisasi tersebut?'}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setDialogOrganizationConfirm(false);
                            setDialogOrganizationOpen(true);
                          }}
                        >
                          Tidak
                        </Button>
                      </DialogClose>
                      <Button
                        variant="info"
                        onClick={() => {
                          toast.success(isEditMode ? 'Terupdate!' : 'Tersimpan!', {
                            description: isEditMode
                              ? 'Organisasi Anda telah berhasil diupdate'
                              : 'Organisasi Anda telah berhasil tersimpan',
                            className: 'bg-[#75BF85]',
                          });
                          setDialogOrganizationConfirm(false);
                          setIsEditMode(false);
                          setSelectedOrganization(null);
                        }}
                      >
                        Ya, Saya Yakin
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? (
            <SkeletonCardContent className="w-full" />
          ) : (
            <>
              <FilterOrganizationList loadingDataProduct={loadingDataProduct} />
              <TableOrganizationList
                isLoading={loadingDataProduct}
                onEditOrganization={handleEditOrganization}
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
