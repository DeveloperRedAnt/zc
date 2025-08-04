'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import CreateMemberPopup from '@/modules/member/components/create-member-popup';
import DetailMemberPopup from '@/modules/member/components/detail-member-popup';
import FilterMember from '@/modules/member/components/filter-member';
import TableMember from '@/modules/member/components/table-member';
import { useMemberSearchParams } from '@/modules/member/hooks/use-search-params';
import { Member } from '@/modules/member/types/member';
import { Plus } from '@icon-park/react';
import { useState } from 'react';

// Using the imported Member type from '@/modules/member/types/member'

export default function MemberListPage() {
  const [isMemberPopupOpen, setIsMemberPopupOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [popupMode, setPopupMode] = useState<'create' | 'edit' | 'detail'>('create');

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
    setSelectedMember(null); // Reset for create mode
    setPopupMode('create');
    setIsMemberPopupOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member); // Set member data for edit mode
    setPopupMode('edit');
    setIsMemberPopupOpen(true);
  };

  const handleDetailMember = (member: Member) => {
    setSelectedMember(member); // Set member data for detail view
    setPopupMode('detail');
    setIsMemberPopupOpen(true);
  };

  const handleMemberAction = () => {
    setIsMemberPopupOpen(false);
    setSelectedMember(null);
  };

  const handlePopupClose = (open: boolean) => {
    setIsMemberPopupOpen(open);
    if (!open) {
      setSelectedMember(null);
    }
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
        onDetailMember={handleDetailMember}
      />

      {/* Create/Edit Member Popup - hanya tampil jika mode bukan detail */}
      {popupMode !== 'detail' && (
        <CreateMemberPopup
          isOpen={isMemberPopupOpen}
          onOpenChange={handlePopupClose}
          member={selectedMember} // Pass member data for edit mode, null for create mode
          onSuccess={handleMemberAction}
        />
      )}

      {/* Detail Member Popup - hanya tampil jika mode detail */}
      {popupMode === 'detail' && (
        <DetailMemberPopup
          isOpen={isMemberPopupOpen}
          onOpenChange={handlePopupClose}
          member={selectedMember} // Pass member data for detail view
        />
      )}
    </PageLayout>
  );
}
