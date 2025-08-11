'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useMemberSearchParams } from '@/modules/member/hooks/use-search-params';
import { Member } from '@/modules/member/types/member';
import { Plus } from '@icon-park/react';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

const CreateMemberPopup = dynamic(() => import('@/modules/member/components/create-member-popup'), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`create-form-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="flex gap-3 justify-end">
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

const DetailMemberPopup = dynamic(() => import('@/modules/member/components/detail-member-popup'), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`detail-field-${i}`} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

const FilterMember = dynamic(() => import('@/modules/member/components/filter-member'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`filter-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    </div>
  ),
});

const TableMember = dynamic(() => import('@/modules/member/components/table-member'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={`header-${i}`} className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={`row-${i}`} className="border-b">
                {Array.from({ length: 6 }).map((_, j) => (
                  <td key={`cell-${j}`} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`pagination-${i}`} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});

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
      <Suspense
        fallback={
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`filter-fallback-${i}`}
                  className="h-10 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        }
      >
        <FilterMember search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      </Suspense>

      <Suspense
        fallback={
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <th key={`fallback-header-${i}`} className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <tr key={`fallback-row-${i}`} className="border-b">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={`fallback-cell-${j}`} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`fallback-pagination-${i}`}
                      className="h-8 w-8 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
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
      </Suspense>

      {/* Create/Edit Member Popup - hanya tampil jika mode bukan detail */}
      {popupMode !== 'detail' && (
        <Suspense fallback={null}>
          <CreateMemberPopup
            isOpen={isMemberPopupOpen}
            onOpenChange={handlePopupClose}
            member={selectedMember} // Pass member data for edit mode, null for create mode
            onSuccess={handleMemberAction}
          />
        </Suspense>
      )}

      {/* Detail Member Popup - hanya tampil jika mode detail */}
      {popupMode === 'detail' && (
        <Suspense fallback={null}>
          <DetailMemberPopup
            isOpen={isMemberPopupOpen}
            onOpenChange={handlePopupClose}
            member={selectedMember} // Pass member data for detail view
          />
        </Suspense>
      )}
    </PageLayout>
  );
}
