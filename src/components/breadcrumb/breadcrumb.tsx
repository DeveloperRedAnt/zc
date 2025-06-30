import * as Lucide from 'lucide-react';
import { Slot } from 'radix-ui';
import * as React from 'react';
import { breadcrumbStyles } from './breadcrumb.css';

const Breadcrumb = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'nav'> & {
  separator?: React.ReactNode;
} & { ref?: React.RefObject<HTMLElement | null> }) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
);

const BreadcrumbList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ol'> & { ref?: React.RefObject<HTMLOListElement | null> }) => {
  const styles = breadcrumbStyles();
  return <ol ref={ref} className={styles.list({ className })} {...props} />;
};

const BreadcrumbItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { ref?: React.RefObject<HTMLLIElement | null> }) => {
  const styles = breadcrumbStyles();
  return <li ref={ref} className={styles.item({ className })} {...props} />;
};

const BreadcrumbLink = ({
  ref,
  asChild,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean;
} & { ref?: React.RefObject<HTMLAnchorElement | null> }) => {
  const Comp = asChild ? Slot.Root : 'a';
  const styles = breadcrumbStyles();
  return <Comp ref={ref} className={styles.link({ className })} {...props} />;
};

const BreadcrumbPage = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'> & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
  const styles = breadcrumbStyles();
  return (
    <span
      ref={ref}
      aria-disabled="true"
      aria-current="page"
      className={styles.page({ className })}
      {...props}
    />
  );
};

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'span'>) => {
  const styles = breadcrumbStyles();
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={styles.separator({ className })}
      {...props}
    >
      {children ?? <Lucide.ChevronRight strokeWidth={2} />}
    </span>
  );
};

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => {
  const styles = breadcrumbStyles();
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={styles.ellipsis({ className })}
      {...props}
    >
      <Lucide.Ellipsis className={styles.ellipsisIcon()} strokeWidth={2} />
      <span className="sr-only">More</span>
    </span>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
BreadcrumbList.displayName = 'BreadcrumbList';
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbLink.displayName = 'BreadcrumbLink';
BreadcrumbPage.displayName = 'BreadcrumbPage';
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
