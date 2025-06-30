'use client';

import { CircleUserRoundIcon } from 'lucide-react';
import { JSX } from 'react';

export interface DropAreaProps {
  openFileDialog: () => void;
  handleDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLElement>) => void;
  isDragging: boolean;
  finalImageUrl: string | null;
}

export function DropArea({
  openFileDialog,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  isDragging,
  finalImageUrl,
}: DropAreaProps): JSX.Element {
  // implementation
  return (
    <button
      type="button"
      className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
      onClick={openFileDialog}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-dragging={isDragging || undefined}
      aria-label={finalImageUrl ? 'Change image' : 'Upload image'}
    >
      {finalImageUrl ? (
        <img
          className="size-full object-cover"
          src={finalImageUrl}
          alt="User avatar"
          width={64}
          height={64}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div aria-hidden="true">
          <CircleUserRoundIcon className="size-4 opacity-60" />
        </div>
      )}
    </button>
  );
}
