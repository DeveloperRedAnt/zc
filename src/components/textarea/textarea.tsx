import * as React from 'react';
import type { TextareaVariants } from './textarea.css';
import { textareaStyles } from './textarea.css';

export type TextareaProps = {} & React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaVariants;

const Textarea = ({
  ref,
  className,
  ...props
}: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => {
  return <textarea className={textareaStyles({ className })} ref={ref} {...props} />;
};

Textarea.displayName = 'Textarea';

export { Textarea };
