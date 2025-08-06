interface DetailFieldProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  width?: string;
}

export default function DetailField({
  label,
  value,
  className = '',
  labelClassName = '',
  valueClassName = '',
  width = 'w-1/2',
}: DetailFieldProps) {
  return (
    <div className={`flex flex-col gap-2 text-sm ${width} ${className}`}>
      <div
        className={`font-semibold ${labelClassName}`}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {label}{' '}
      </div>
      <div className={`font-normal ${valueClassName}`}>{value} </div>
    </div>
  );
}
