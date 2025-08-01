import { Info } from '@icon-park/react';
import React, { ReactNode } from 'react';
interface InformationTextProps {
  text: ReactNode;
  className?: string;
}

export const InformationText: React.FC<InformationTextProps> = ({ text, className = '' }) => {
  return (
    <div className="flex gap-2 text-gray-700 text-sm information-text">
      <Info theme="filled" size={16} fill="#555555" className="pt-[2px]" />
      {/* biome-ignore */}
      <p
        className={`text-[#555555] text-sm font-nunito ${className}`}
        dangerouslySetInnerHTML={{ __html: text as string }}
      />
    </div>
  );
};
