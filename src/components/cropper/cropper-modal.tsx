'use client';

import { Button } from '@/components/button/button';
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from '@/components/cropper/cropper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import { Slider } from '@/components/slider/slider';
import { Check } from '@icon-park/react';
import { useState } from 'react';

type Area = { x: number; y: number; width: number; height: number };

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  textButton: string;
  textModal: string;
  onCropConfirm: (zoom: number, cropArea: Area | null, imageSrc: string) => void;
}

export const CropperDialog = ({
  isOpen,
  onClose,
  image,
  onCropConfirm,
  textModal,
  textButton,
}: Props) => {
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<Area | null>(null);

  const handleApply = () => onCropConfirm(zoom, cropArea, image);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="gap-0 p-0 sm:max-w-140 *:[button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogDescription className="sr-only">Crop image dialog</DialogDescription>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="flex items-center justify-between border-b p-4 text-base">
            <div className="flex items-center gap-2">
              <span>{textModal}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Cropper
            className="h-[328px] rounded-md"
            image={image}
            zoom={zoom}
            onCropChange={setCropArea}
            onZoomChange={setZoom}
          >
            <CropperDescription />
            <CropperImage />
            <CropperCropArea />
          </Cropper>
        </div>

        <DialogFooter className="border-t px-4 py-6">
          <div className="mx-auto flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
              <Slider
                defaultValue={[1]}
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(val) => typeof val[0] === 'number' && setZoom(val[0])}
              />
              <output className="block w-10 shrink-0 text-right text-sm font-medium tabular-nums">
                {parseFloat(zoom.toFixed(1))}x
              </output>
            </div>
            <div className="row-start-1 row-end-4 flex justify-end">
              <Button
                className="-my-1 bg-[#75BF85] hover:bg-[#65a973] text-white"
                onClick={handleApply}
              >
                {textButton} <Check aria-hidden="true" />
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
