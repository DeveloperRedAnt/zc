import { Card } from '@/components/card/card';
import { ReactNode } from 'react';

interface CardAddOnProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function CardAddOn({ title, description = '', children }: CardAddOnProps) {
  return (
    <Card>
      <h6 style={{ color: 'var(--text-primary)' }}>{title}</h6>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
      {children}
    </Card>
  );
}
