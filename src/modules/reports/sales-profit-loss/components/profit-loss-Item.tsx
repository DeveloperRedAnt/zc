type ProfitLossItemProps = {
  label: string;
  value: string;
};

export default function ProfitLossItem({ label, value }: ProfitLossItemProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-sm">{value}</span>
      </div>
    </div>
  );
}
