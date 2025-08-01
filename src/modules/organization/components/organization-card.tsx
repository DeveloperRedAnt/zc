import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { Plus } from '@icon-park/react';
import React from 'react';

interface OrganizationCardProps {
  isLoading: boolean;
  onAdd: () => void;
  children: React.ReactNode;
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({
  isLoading,
  onAdd,
  children,
}) => (
  <Card className="my-[1rem] font-normal">
    <CardHeader className="border-b flex-row flex justify-between items-center">
      {isLoading ? (
        <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
      ) : (
        <CardTitle className="text-[1rem]"> List Organisasi </CardTitle>
      )}
      <div className="flex items-center gap-3">
        {isLoading ? (
          <>
            <SkeletonButton className="w-[110px]" />
            <SkeletonButton className="w-[140px] mr-3.5" />
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="text-[#555555] flex items-center"
            onClick={onAdd}
          >
            <Plus />
            Tambah Organisasi
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent className="p-4">{children}</CardContent>
  </Card>
);

export default OrganizationCard;
