'use client';

import { useGetEmployeeDetail } from '@/__generated__/api/hooks';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import { CropperDialog } from '@/components/cropper/cropper-modal';
import { getCroppedImg } from '@/components/cropper/getCroppedImg';
import { useTranslation } from '@/libs/i18n';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import TeamCard from '../card-photo/card-team';
import UserDetail from './user-detail';

function DashboardLayout() {
  const { data: session } = useSession();

  const userId = Number(session?.user?.id);
  const { data, isLoading } = useGetEmployeeDetail(userId, { enabled: !!userId } as Parameters<
    typeof useGetEmployeeDetail
  >[1]);

  const { t } = useTranslation();
  const translationsReady = !!t && typeof t === 'function';
  const [isOpenCropper, setIsOpenCropper] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onLogoutDialog = () => {};

  const onPasswordDialog = () => {};

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

  if (isLoading || !translationsReady || !data) {
    return <SkeletonCardContent className="w-full" />;
  }

  return (
    <>
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
            image={data?.image || profileImage} // image source
            name={data?.name || ''}
            onPasswordChange={onPasswordDialog}
            onLogout={onLogoutDialog}
            onUploadClick={handleUploadClick}
          />
        </div>
        {/* UserDetail Container - Constrained width */}
        <div className="flex-1">
          <UserDetail
            identityNumber={data?.id_number || '-'}
            phoneNumber={data?.phone || '-'}
            email={data?.email || '-'}
            organization={{ id: 0, name: '-' }}
            stores={data?.stores || []}
          />
        </div>

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
    </>
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
