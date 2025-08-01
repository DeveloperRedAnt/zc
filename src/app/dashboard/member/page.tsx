'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import FilterMember from '@/modules/member/components/filter-member';
import TableMember from '@/modules/member/components/table-member';
import { useMemberSearchParams } from '@/modules/member/hooks/use-search-params';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';

type Member = {
  id: number;
  name: string;
  created_at: string;
  phone: string;
  is_active: boolean;
  purchases_summary: {
    montly: number;
    yearly: number;
    all_time: number;
  };
  monthly_formatted: string;
  yearly_formatted: string;
  all_time_formatted: string;
  registered_formatted: string;
};

export default function MemberListPage() {
  const router = useRouter();

  const {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setStatus,
    status,
  } = useMemberSearchParams();

  const handleAddMember = () => {
    // Clear any stored data and navigate to create page
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberFormData');
    router.push('/dashboard/members/create');
  };

  const handleEditMember = (member: Member) => {
    // Store member data for editing
    localStorage.setItem('memberId', member.id.toString());
    localStorage.setItem('memberFormData', JSON.stringify(member));
  };

  return (
    <PageLayout
      title="List Member"
      button={
        <Button variant="info" onClick={handleAddMember}>
          <Plus />
          Tambah Member
        </Button>
      }
    >
      <FilterMember search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      <TableMember
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onEditMember={handleEditMember}
      />
    </PageLayout>
  );
}
