'use client';

import { Card, CardContent } from '@/components/card/card';
import PackageSubsSelection from '@/modules/packages/components/package-subs-selection';
import { Link, Shop, User } from '@icon-park/react';
import React from 'react';
// Define the data structure for dashboard cards
interface DashboardCardData {
  id: string;
  title: string;
  value: string;
  linkText: string;
  icon: React.ReactNode;
}

// Dashboard card component
const DashboardCard: React.FC<{ data: DashboardCardData }> = ({ data }) => {
  return (
    <Card className="bg-white rounded-lg shadow-sm">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col space-y-3">
          {data.icon}
          <div className="text-left">
            <h3 className="text-sm font-normal text-gray-600 mb-1">{data.title}</h3>
            <p className="font-nunito text-md font-semibold text-gray-900 mb-3">{data.value}</p>
          </div>
          <p className="font-nunito text-xs text-gray-300 text-right">{data.linkText}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  // Dashboard cards data
  const dashboardCards: DashboardCardData[] = [
    {
      id: 'stores',
      title: 'Jumlah Toko',
      value: '10 Toko',
      linkText: 'Klik untuk menuju ke List Toko',
      icon: <Shop size={52} className="h-12 w-12 text-gray-500" />,
    },
    {
      id: 'staff',
      title: 'Jumlah Staff',
      value: '15 User',
      linkText: 'Klik untuk menuju ke List User',
      icon: <User size={52} className="h-12 w-12 text-gray-500" />,
    },
    {
      id: 'devices',
      title: 'Jumlah Device Tertaut',
      value: '5 Device',
      linkText: 'Klik untuk menuju ke List Device Tertaut',
      icon: <Link size={52} className="h-12 w-12 text-gray-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <PackageSubsSelection />
      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dashboardCards.map((cardData) => (
          <DashboardCard key={cardData.id} data={cardData} />
        ))}
      </div>
    </div>
  );
}
