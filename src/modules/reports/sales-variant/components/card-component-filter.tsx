'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/card/card';

interface CardComponentFilterProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function CardComponentFilter({ title, subtitle, children }: CardComponentFilterProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
