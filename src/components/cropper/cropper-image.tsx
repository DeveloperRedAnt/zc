'use client';

import { CropperDialog } from '@/components/cropper/cropper-modal';
import { DropArea } from '@/components/cropper/drop-area';
import { getCroppedImg } from '@/components/cropper/getCroppedImg';
import { RemoveButton } from '@/components/cropper/remove-button';
import { useFileUpload } from '@/hooks/use-file-upload/use-file-upload';
import { useEffect, useRef, useState } from 'react';

type CropArea = { x: number; y: number; width: number; height: number };

export default function AvatarCropper() {
  const [
    { files, isDragging },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({ accept: 'image/*' });

  const previewUrl = files[0]?.preview || null;
  const fileId = files[0]?.id;
  const previousFileIdRef = useRef<string | undefined | null>(null);

  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setCroppedAreaPixels] = useState<{
    zoom: number;
    area: CropArea;
  } | null>(null);

  const handleCropConfirm = (zoom: number, area: CropArea | null) => {
    if (!area) return;
    setCroppedAreaPixels({ zoom, area });
    handleApply(zoom, area);
  };

  const handleApply = async (_zoom: number, area: CropArea) => {
    if (!previewUrl || !fileId || !area) return;
    const croppedBlob = await getCroppedImg(previewUrl, area);
    if (!croppedBlob) return;

    const newUrl = URL.createObjectURL(croppedBlob);
    if (finalImageUrl) URL.revokeObjectURL(finalImageUrl);
    setFinalImageUrl(newUrl);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    return () => {
      if (finalImageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(finalImageUrl);
      }
    };
  }, [finalImageUrl]);

  useEffect(() => {
    if (fileId && fileId !== previousFileIdRef.current) {
      setIsDialogOpen(true);
      setCroppedAreaPixels(null);
    }
    previousFileIdRef.current = fileId;
  }, [fileId]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <DropArea
          openFileDialog={openFileDialog}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          isDragging={isDragging}
          finalImageUrl={finalImageUrl}
        />
        {finalImageUrl && (
          <RemoveButton
            handleRemoveFinalImage={() => {
              URL.revokeObjectURL(finalImageUrl);
              setFinalImageUrl(null);
            }}
          />
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
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
