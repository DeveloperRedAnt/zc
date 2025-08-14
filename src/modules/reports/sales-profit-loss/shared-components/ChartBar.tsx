import React from 'react';

type ChartBarProps = {
  label: string;
  value: string;
  percentage: number;
  color: string;
};

const ChartBar: React.FC<ChartBarProps> = ({ label, value, percentage, color }) => (
  <div className="flex items-center gap-4 text-sm relative group">
    <div className="w-48 flex-shrink-0 flex items-center gap-2">
      <span className="text-gray-700">{label}</span>
      <span className="relative cursor-pointer group">
        <span className="absolute left-1/2 top-full z-10 mt-2 w-max min-w-[120px] -translate-x-1/2 rounded bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {label} : <span className="font-semibold">{value}</span>
        </span>
      </span>
    </div>
    <div className="flex-1 bg-gray-100  h-6 relative overflow-hidden">
      <div
        className={`h-full  transition-all duration-300 ease-in-out ${color}`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  </div>
);

export default ChartBar;
