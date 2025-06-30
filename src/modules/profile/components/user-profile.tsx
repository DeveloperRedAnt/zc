import { CropperDialog } from '@/components/cropper/cropper-modal';
import { getCroppedImg } from '@/components/cropper/getCroppedImg';
import { useTranslation } from '@/libs/i18n';
import AlertDialogAddOn from '@/modules/packages/components/alert-dialog-add-on';
import { useRef, useState } from 'react';
import TeamCard from '../card-photo/card-team';
import UserDetail from './user-detail';

function DashboardLayout() {
  const { t } = useTranslation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isOpenCropper, setIsOpenCropper] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onLogoutDialog = () => {};

  const onPasswordDialog = () => {
    setIsAlertOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setUploadedImage(objectUrl);
    setIsOpenCropper(true);
  };

  async function handleCropConfirm(
    _: number,
    cropArea: { x: number; y: number; width: number; height: number } | null,
    imageSrc: string
  ): Promise<void> {
    if (!cropArea || !imageSrc) return;

    const blob = await getCroppedImg(imageSrc, cropArea);
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      setProfileImage(objectUrl);
    }
    setIsOpenCropper(false);
  }

  return (
    <div className="flex flex-row gap-6 items-start w-full">
      {/* Input file tersembunyi */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className="w-[258px] flex-shrink-0">
        <TeamCard
          image={profileImage} // image source
          name="Paus Leo"
          onPasswordChange={onPasswordDialog}
          onLogout={onLogoutDialog}
          onUploadClick={handleUploadClick}
        />
      </div>
      {/* UserDetail Container - Constrained width */}
      <div className="flex-1">
        <UserDetail />
      </div>
      <AlertDialogAddOn
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={
          <span className="text-[18px] font-semibold" style={{ color: 'var(--dark-bg)' }}>
            {' '}
            {t('profile.userProfile.changePassword.title')}
          </span>
        }
        description={
          <div className="space-y-1 text-xs">
            {t('profile.userProfile.changePassword.description')}
          </div>
        }
        onAction={() => {}}
        cancelLabel={t('profile.userProfile.changePassword.cancel')}
        actionLabel={t('profile.userProfile.changePassword.confirm')}
        cancelButtonVariant="ghost"
        cancelButtonType="button"
        actionButtonType="submit"
        actionButtonClassName="text-white hover:text-gray-500 font-normal bg-primary"
      />
      <CropperDialog
        isOpen={isOpenCropper}
        onClose={() => {
          setIsOpenCropper(false);
          setUploadedImage(null);
        }}
        image={uploadedImage ?? profileImage}
        onCropConfirm={handleCropConfirm}
        textModal={t('profile.userProfile.cropper.title')}
        textButton={t('profile.userProfile.cropper.save')}
      />
    </div>
  );
}

function AppLayout() {
  return <DashboardLayout />;
}

export default function UserProfileDashboard() {
  return (
    <div className="bg-neutral-50 w-full h-full">
      <div className="flex flex-col items-start overflow-y-auto w-full h-full">
        <div className="flex flex-col items-start min-h-screen w-full">
          <AppLayout />
        </div>
      </div>
    </div>
  );
}
