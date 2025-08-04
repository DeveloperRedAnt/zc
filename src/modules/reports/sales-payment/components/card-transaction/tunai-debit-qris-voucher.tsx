import { LucideIcon } from 'lucide-react';

export interface TransactionStatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export function TransactionStatCard({
  icon: Icon,
  title,
  value,
  iconBgColor = '',
  iconColor = '',
  className = '',
}: TransactionStatCardProps) {
  return (
    <div
      className={`rounded-xl bg-white shadow-sm border border-gray-100 p-6 flex flex-col min-h-[140px] ${className}`}
    >
      <div
        className={`p-3 ${iconBgColor} rounded-lg flex items-center justify-center w-fit mb-4`}
        style={{ marginLeft: '-25px' }}
      >
        <Icon className={`w-20 h-10 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-lg font-semibold text-gray-900">
          {typeof value === 'number' ? `${value} Transaksi` : value}
        </p>
      </div>
    </div>
  );
}
