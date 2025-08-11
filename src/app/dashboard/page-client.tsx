'use client';

import { useGetDashboardOverview } from '@/__generated__/api/hooks';
import { Card, CardContent } from '@/components/card/card';
import { Link, Shop, User } from '@icon-park/react';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const PackageSubsSelection = dynamic(
  () => import('@/modules/packages/components/package-subs-selection'),
  {
    loading: () => (
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-6">
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    ),
  }
);
// Define the data structure for dashboard cards
interface DashboardCardData {
  id: string;
  title: string;
  value: string;
  linkText: string;
  icon: React.ReactNode;
}

// Dashboard card skeleton component
const DashboardCardSkeleton: React.FC = () => {
  return (
    <Card className="bg-white rounded-lg shadow-sm">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col space-y-3">
          <div className="h-12 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="text-left">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-24" />
            <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32 ml-auto" />
        </div>
      </CardContent>
    </Card>
  );
};

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

const DashboardCardStats = dynamic(
  () =>
    Promise.resolve(() => {
      const { data, isLoading } = useGetDashboardOverview();
      // Show skeleton while loading
      if (isLoading) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </div>
        );
      }
      const dashboardCards: DashboardCardData[] = [
        {
          id: 'stores',
          title: 'Jumlah Toko',
          value: `${data?.store_total} Toko`,
          linkText: 'Klik untuk menuju ke List Toko',
          icon: <Shop size={52} className="h-12 w-12 text-gray-500" />,
        },
        {
          id: 'staff',
          title: 'Jumlah Staff',
          value: `${data?.employee_total} User`,
          linkText: 'Klik untuk menuju ke List User',
          icon: <User size={52} className="h-12 w-12 text-gray-500" />,
        },
        {
          id: 'devices',
          title: 'Jumlah Device Tertaut',
          value: `${data?.device_linked_total} Device`,
          linkText: 'Klik untuk menuju ke List Device Tertaut',
          icon: <Link size={52} className="h-12 w-12 text-gray-500" />,
        },
      ];
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardCards.map((cardData) => (
            <DashboardCard key={cardData.id} data={cardData} />
          ))}
        </div>
      );
    }),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        }
      >
        <PackageSubsSelection />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </div>
        }
      >
        <DashboardCardStats />
      </Suspense>
    </div>
  );
}
