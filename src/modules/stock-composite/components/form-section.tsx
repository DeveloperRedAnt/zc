import { ReactNode } from 'react';

type FormSectionProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function FormSection({ title, children, className }: FormSectionProps) {
  return (
    <div className={className}>
      {title && <div className="font-medium mb-2">{title}</div>}
      {children}
    </div>
  );
}
