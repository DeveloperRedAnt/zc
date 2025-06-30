import { Button } from '@/components/button/button';
import { useTranslation } from '@/libs/i18n';
import { Trash2, User } from 'lucide-react';

export default function ProfileUpload() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Profile Image Container */}
      <div className="w-[138px] h-[138px] bg-[#0fa6c1] rounded-md flex items-center justify-center">
        <User className="w-24 h-24 text-white" />
      </div>

      {/* Upload Section */}
      <div className="w-[335px] space-y-2">
        <label className="text-sm font-medium text-[#555555]">
          {t('profile.upload.thumbnail')}
        </label>

        <div className="relative">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".jpg,.jpeg,.png"
          />
          <div className="border border-[#c2c7d0] rounded-lg p-2.5 flex items-center gap-3">
            <span className="font-bold text-sm text-[#555555]">
              {t('profile.upload.chooseFile')}
            </span>
            <span className="font-normal text-sm text-[#c2c7d0]">
              {t('profile.upload.noImage')}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#555555] leading-4">
          <span className="font-bold">{t('profile.upload.fileType')}:</span>{' '}
          {t('profile.upload.fileTypeList')}
          <span className="font-bold"> | {t('profile.upload.maxSize')}</span>:{' '}
          {t('profile.upload.maxSizeValue')}
        </p>

        <Button variant="ghost" className="opacity-0 text-[#f08181] p-0">
          <Trash2 className="w-4 h-4 mr-2" />
          {t('profile.upload.delete')}
        </Button>
      </div>
    </div>
  );
}
