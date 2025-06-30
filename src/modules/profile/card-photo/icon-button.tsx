import { Button } from '@/components/button/button';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?:
    | 'outline'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'ghost-destructive'
    | 'link'
    | 'success'
    | 'delete'
    | 'info';
  className?: string;
  children: React.ReactNode;
}

export default function IconButton({
  icon,
  variant = 'outline',
  className = '',
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      className={`w-full h-11 flex items-center gap-2 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </Button>
  );
}
