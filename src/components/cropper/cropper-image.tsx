'use client';

import { CropperDialog } from '@/components/cropper/cropper-modal';
import { getCroppedImg } from '@/components/cropper/getCroppedImg';
import InputFile from '@/components/input/input-file';
import { UploadPicture } from '@icon-park/react';
import { useEffect, useRef, useState } from 'react';

type CropArea = { x: number; y: number; width: number; height: number };

type AvatarCropperProps = {
  variant?: 'default' | 'profile-upload';
  onChange?: (file: File | null) => void;
  defaultImageUrl?: string;
  initialFile?: File | null;
};

export default function CropperImage({
  variant = 'default',
  onChange,
  defaultImageUrl = '/assets/zycas/default-image-user-2.png',
  initialFile,
}: AvatarCropperProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [_croppedAreaPixels, setCroppedAreaPixels] = useState<{
    zoom: number;
    area: CropArea;
  } | null>(null);
  const previousFileIdRef = useRef<string | null>(null);

  const previewUrlRef = useRef<string | null>(null);
  const croppedImageRef = useRef<string | null>(null);

  function revokeUrl(url: string | null) {
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    revokeUrl(previewUrlRef.current);
    previewUrlRef.current = preview;

    setSelectedFile(file);
    setPreviewUrl(preview);

    const newFileId = `${file.name}-${file.size}-${file.lastModified}`;
    if (newFileId !== previousFileIdRef.current) {
      setIsDialogOpen(true);
      setCroppedAreaPixels(null);
    }
    previousFileIdRef.current = newFileId;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleApply = async (_zoom: number, area: CropArea) => {
    if (!previewUrl || !area) return;

    const croppedBlob = await getCroppedImg(previewUrl, area);
    if (!croppedBlob) return;

    const newCroppedUrl = URL.createObjectURL(croppedBlob);
    revokeUrl(croppedImageRef.current);
    revokeUrl(previewUrlRef.current);

    croppedImageRef.current = newCroppedUrl;

    setCroppedImage(newCroppedUrl);
    setPreviewUrl(null);
    setIsDialogOpen(false);

    const file = new File([croppedBlob], selectedFile?.name ?? 'cropped.png', {
      type: croppedBlob.type,
    });

    onChange?.(file);
  };

  const handleCropConfirm = (zoom: number, area: CropArea | null) => {
    if (!area) return;
    setCroppedAreaPixels({ zoom, area });
    handleApply(zoom, area);
  };

  const handleReset = () => {
    revokeUrl(previewUrlRef.current);
    revokeUrl(croppedImageRef.current);

    setSelectedFile(null);
    setPreviewUrl(null);
    setCroppedImage(null);
    previousFileIdRef.current = null;
    onChange?.(null);
  };

  useEffect(() => {
    if (initialFile) {
      const preview = URL.createObjectURL(initialFile);
      revokeUrl(croppedImageRef.current);
      croppedImageRef.current = preview;
      setCroppedImage(preview);
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  return (
    <div className="flex flex-col items-center gap-2">
      {variant === 'profile-upload' ? (
        <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md">
          <img
            src={croppedImage || defaultImageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            type="button"
          >
            <UploadPicture theme="outline" size="20" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <InputFile
          label="Unggah Thumbnail"
          accept="image/png, image/jpeg, image/jpg"
          fileInfoExtension=".jpg, .jpeg, .png"
          maxSize={2 * 1024 * 1024}
          onChange={handleFileChange}
          previewUrl={croppedImage}
          onReset={handleReset}
          previewPosition="top"
          defaultImageUrl={defaultImageUrl}
        />
      )}

      {previewUrl && (
        <CropperDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          image={previewUrl}
          onCropConfirm={handleCropConfirm}
          textModal="Crop Thumbnail"
          textButton="Simpan Thumbnail"
        />
      )}
    </div>
  );
}
