'use client';

import { Button } from '@/components/button/button';
import { XIcon } from 'lucide-react';

export const RemoveButton = ({
  handleRemoveFinalImage,
}: {
  handleRemoveFinalImage: () => void;
}) => (
  <Button
    onClick={handleRemoveFinalImage}
    size="icon"
    className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
    aria-label="Remove image"
  >
    <XIcon className="size-3.5" />
  </Button>
);
