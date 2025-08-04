'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog/dialog';
import { Text } from '@/components/text/text';
import React from 'react';

type Member = {
  id: number;
  name: string;
  created_at: string;
  birth_date?: string;
  phone: string;
  identity_number: string;
  address: string;
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

interface DetailMemberPopupProps {
  member?: Member | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DetailMemberPopup({
  member,
  isOpen,
  onOpenChange,
}: DetailMemberPopupProps) {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[650px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-[1.125rem] font-[600] text-[#333333]">
            Detail Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">
                Terdaftar Sejak:
              </Text>
              <Text className="text-[0.875rem] text-[#666666]">
                {member.registered_formatted || '-'}
              </Text>
            </div>
            <div>
              <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">Status:</Text>
              <div
                className={`inline-block px-3 py-1 text-[0.75rem] rounded-md ${
                  member.is_active ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#DC2626]'
                }`}
              >
                {member.is_active ? 'Aktif' : 'Non-Aktif'}
              </div>
            </div>
          </div>

          <hr className="border-[#E5E7EB]" />

          <div>
            <Text className="text-[1rem] font-[600] text-[#333333] mb-4">Identitas</Text>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">Nama Member:</Text>
                <Text className="text-[0.875rem] text-[#666666]">{member.name || '-'}</Text>
              </div>

              <div>
                <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">
                  Tanggal Lahir:
                </Text>
                <Text className="text-[0.875rem] text-[#666666]">
                  {member.birth_date
                    ? new Date(member.birth_date).toLocaleDateString('id-ID')
                    : '-'}
                </Text>
              </div>

              <div>
                <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">No. KTP:</Text>
                <Text className="text-[0.875rem] text-[#666666]">
                  {member.identity_number || '-'}
                </Text>
              </div>

              <div>
                <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">No. Telp:</Text>
                <Text className="text-[0.875rem] text-[#666666]">{member.phone || '-'}</Text>
              </div>
            </div>

            <div className="mt-4">
              <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">Alamat:</Text>
              <Text className="text-[0.875rem] text-[#666666]">{member.address || '-'}</Text>
            </div>
          </div>

          <hr className="border-[#E5E7EB]" />

          <div>
            <Text className="text-[1rem] font-[600] text-[#333333] mb-4">Pembelian</Text>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">Bulanan:</Text>
                <Text className="text-[0.875rem] text-[#666666]">
                  {member.monthly_formatted || 'Rp 0'}
                </Text>
              </div>

              <div>
                <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">Tahunan:</Text>
                <Text className="text-[0.875rem] text-[#666666]">
                  {member.yearly_formatted || 'Rp 0'}
                </Text>
              </div>
            </div>

            <div className="mt-4">
              <Text className="text-[0.875rem] font-[500] text-[#333333] mb-1">Keseluruhan:</Text>
              <Text className="text-[0.875rem] text-[#666666]">
                {member.all_time_formatted || 'Rp 0'}
              </Text>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
