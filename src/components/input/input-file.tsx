'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { Button } from '../button/button';
import { Label } from '../label/label';

type InputFileProps = {
  label?: string;
  onChange?: (file: File | null) => void;
  accept?: string;
  fileInfoExtension?: string;
  maxSize?: number;
  previewUrl?: string | null;
  onReset?: () => void;
  previewPosition?: 'left' | 'top' | 'top-start';
  defaultImageUrl?: string;
};

export default function InputFile({
  label = 'Unggah Thumbnail',
  onChange,
  accept = 'image/*',
  fileInfoExtension = '.jpg, .jpeg, .png',
  maxSize = 2 * 1024 * 1024,
  previewUrl: externalPreviewUrl, // ubah nama agar tidak bentrok
  onReset,
  previewPosition = 'left', // default
  defaultImageUrl,
}: InputFileProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalPreview, setInternalPreview] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        alert(`Ukuran file maksimal ${(maxSize / (1024 * 1024)).toFixed(2)} MB`);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setInternalPreview(null);
        onChange?.(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setInternalPreview(reader.result as string); // fallback preview
      };
      reader.readAsDataURL(file);

      onChange?.(file);
    } else {
      setInternalPreview(null);
      onChange?.(null);
    }
  };

  const handleReset = () => {
    if (inputRef.current) inputRef.current.value = '';
    setInternalPreview(null);
    onReset?.();
  };

  const effectivePreview = externalPreviewUrl ?? internalPreview;

  return (
    <div
      className={`gap-4 text-[#555555] text-[0.9rem] ${
        previewPosition === 'top'
          ? 'flex flex-col items-center'
          : previewPosition === 'top-start'
            ? 'flex flex-col items-start'
            : 'flex flex-row items-start'
      }`}
    >
      {/* Preview */}
      <div className="w-[138px] h-[138px] rounded-md border overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
        <img
          src={effectivePreview || defaultImageUrl || '/assets/zycas/default-image-product.png'}
          alt="Preview"
          className="object-cover w-full h-full block"
          style={{ width: '138px', height: '138px' }}
        />
      </div>

      {/* Input */}
      <div className="flex-1">
        <Label className="block font-medium text-[#555555] text-sm mb-2">{label}</Label>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
          className="block w-full text-sm border rounded-[8px] border-[#C2C7D0]
            file:mr-1 file:py-2 file:px-4
            file:rounded-[8px] file:border-0
            file:text-sm
            hover:file:bg-gray-100"
        />

        <p className="text-xs mt-1">
          <span className="font-bold text-[#555555] font-nunito">Tipe file:</span>{' '}
          <span className="font-normal text-[#555555] font-nunito">
            {fileInfoExtension} {' | '}
          </span>
          <span className="font-bold text-[#555555] font-nunito">Ukuran maks.:</span>{' '}
          <span className="font-normal text-[#555555] font-nunito">
            {(maxSize / (1024 * 1024)).toFixed(0)} MB
          </span>
        </p>

        {effectivePreview && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="mt-2 ml-2 flex items-center text-sm text-[#F08181] hover:underline font-[500] cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Hapus
          </Button>
        )}
      </div>
    </div>
  );
}
