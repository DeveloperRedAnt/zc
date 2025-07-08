'use client';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FilterMemberList from '@/modules/member/filter-member-list';
import TableMemberList from '@/modules/member/table-member-list';
import { Plus } from '@icon-park/react';
import { useEffect, useState } from 'react';

type Member = {
  id: string;
  memberName: string;
  registered: string;
  telpNumber: string;
  monthly: string;
  yearly: string;
  overall: string;
  status: string;
};

export default function Index() {
  const [loadingDataMember, setLoadingDataMember] = useState(true);

  // Form state for inputs
  const [_, setFormData] = useState({
    id: '',
    memberName: '',
    registered: '',
    telpNumber: '',
    monthly: '',
    yearly: '',
    overall: '',
    status: '',
  });

  const { isLoading, setLoading } = usePageLoading({
    autoStart: false,
    initialDelay: 0,
  });

  useEffect(() => {
    setLoading(true);
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    }).then(() => {
      setTimeout(() => {
        setLoadingDataMember(false);
      }, 2000);
    });
  }, [setLoading]);

  const handleAddMember = () => {
    setFormData({
      id: '',
      memberName: '',
      registered: '',
      telpNumber: '',
      monthly: '',
      yearly: '',
      overall: '',
      status: '',
    });
  };

  const handleEditMember = (member: Member) => {
    setFormData({
      id: member.id,
      memberName: member.memberName,
      registered: member.registered,
      telpNumber: member.telpNumber,
      monthly: member.monthly,
      yearly: member.yearly,
      overall: member.overall,
      status: member.status,
    });
  };

  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          {isLoading ? (
            <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
          ) : (
            <CardTitle className="text-[1rem]"> List Member </CardTitle>
          )}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <>
                <SkeletonButton className="w-[110px]" />
                <SkeletonButton className="w-[140px] mr-3.5" />
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#555555] flex items-center"
                  onClick={handleAddMember}
                >
                  <Plus />
                  Tambah Member
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? (
            <SkeletonCardContent className="w-full" />
          ) : (
            <>
              <FilterMemberList loadingDataMember={loadingDataMember} />
              <TableMemberList isLoading={loadingDataMember} onEditMember={handleEditMember} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
