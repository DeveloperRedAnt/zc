import { UploadPicture } from '@icon-park/react';

type UploadPhotoButtonProps = {
  position?: string;
  className?: string;
  onClick?: () => void;
};

export default function UploadPhotoButton({
  position = 'absolute bottom-4 right-4',
  className = '',
  onClick,
}: UploadPhotoButtonProps) {
  return (
    <div className={`bg-white rounded-md ${position} ${className}`} onClick={onClick}>
      <div className="absolute border border-[#c2c7d0] border-solid inset-0 pointer-events-none rounded-md" />
      <div className="flex items-center justify-center size-full">
        <div className="flex gap-2.5 items-center justify-center p-2">
          <UploadPicture size={16} color="#555555" strokeWidth={1.33} />
        </div>
      </div>
    </div>
  );
}
