import UploadPhotoButton from './upload-photo-button';

interface ProfileImageProps {
  src: string;
  alt?: string;
  className?: string;
  showUploadButton?: boolean;
  onUploadClick?: () => void;
}

export default function ProfileImage({
  src,
  className = '',
  showUploadButton = true,
  onUploadClick,
}: ProfileImageProps) {
  return (
    <div
      className={`aspect-square bg-center bg-cover bg-no-repeat overflow-clip relative rounded-2xl w-full ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
    >
      {showUploadButton && <UploadPhotoButton onClick={onUploadClick} />}
    </div>
  );
}
