import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { ChevronDown } from 'lucide-react';

type Organization = {
  value: string;
  label: string;
};

type OrganizationSelectProps = {
  value: string;
  onChange: (value: string) => void;
  organizations: Organization[];
};

export default function OrganizationSelect({
  value,
  onChange,
  organizations,
}: OrganizationSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full" icon={<ChevronDown className="h-4 w-4" />}>
        <SelectValue placeholder="Pilih Organisasi" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((org) => (
          <SelectItem key={org.value} value={org.value}>
            {org.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
