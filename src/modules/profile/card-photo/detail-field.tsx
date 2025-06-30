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
    <div
      className={`flex flex-col gap-2 text-dark text-sm ${width} ${className}`}
      style={{ fontFamily: 'var(--font-poppins)' }}
    >
      <p className={`font-semibold ${labelClassName}`}>{label}</p>
      <p className={`font-normal ${valueClassName}`}>{value}</p>
    </div>
  );
}
