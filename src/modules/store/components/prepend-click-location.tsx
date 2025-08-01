import { Input } from '@/components/input/input';
import { LocalTwo } from '@icon-park/react';
import React from 'react';

type CustomLocationInputProps = {
  label?: string;
  value: string;
  placeholder?: string;
  onAppendClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
};

const CustomLocationInput: React.FC<CustomLocationInputProps> = ({
  label,
  value,
  placeholder,
  onAppendClick,
  onChange,
  readOnly = false,
  className = '',
}) => (
  <div className={'relative w-full'}>
    {label && <label className="block mb-2 font-medium text-sm">{label}</label>}
    <Input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`pr-10 h-12  w-full ${className}`}
      onChange={onChange}
    />
    <button
      type="button"
      className="absolute right-3 top-[69%] -translate-y-1/2 flex items-center text-gray-400 hover:text-blue-500 transition"
      onClick={onAppendClick}
      tabIndex={-1}
      aria-label="Pilih Lokasi"
      style={{
        padding: 0,
        background: 'none',
        border: 'none',
        lineHeight: 0,
      }}
    >
      <LocalTwo theme="outline" size="13" />
    </button>
  </div>
);

export default CustomLocationInput;
