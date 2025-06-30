import type { OTPInputProps } from 'input-otp';
import { OTPInput, OTPInputContext } from 'input-otp';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import type { InputOtpVariants } from './input-otp.css';
import { inputOtpStyles } from './input-otp.css';

export type InputOTPProps = {
  size?: InputOtpVariants['size'];
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  render?: never;
} & Omit<OTPInputProps, 'children' | 'render' | 'size'>;

const InputOTP = ({
  ref,
  className,
  containerClassName,
  size,
  label,
  required,
  ...props
}: InputOTPProps & { ref?: React.RefObject<React.ComponentRef<typeof OTPInput> | null> }) => {
  const styles = inputOtpStyles({ size });
  return (
    <div className="space-y-2">
      {label && (
        <div className="mb-1">
          <label className="text-[0.9rem] font-[500]">
            {label} {required && <span className="text-[#F08181]">*</span>}
          </label>
        </div>
      )}
      <OTPInput
        ref={ref}
        containerClassName={styles.root({ className: containerClassName })}
        className={styles.input({ className })}
        {...props}
      />
    </div>
  );
};

const InputOTPGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  ref?: React.RefObject<React.ComponentRef<'div'> | null>;
}) => {
  const styles = inputOtpStyles();
  return <div ref={ref} className={styles.group({ className })} {...props} />;
};

type InputOTPSlotProps = {
  index: number;
  size?: InputOtpVariants['size'];
} & React.ComponentPropsWithoutRef<'div'>;

const InputOTPSlot = ({
  ref,
  index,
  className,
  size,
  ...props
}: InputOTPSlotProps & { ref?: React.RefObject<React.ComponentRef<'div'> | null> }) => {
  const inputOTPContext = React.use(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] || {};
  const styles = inputOtpStyles({ size });

  return (
    <div
      ref={ref}
      className={styles.slot({ className: [isActive && styles.slotActive(), className] })}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={styles.caret()}>
          <div className={styles.caretBlink()} />
        </div>
      )}
    </div>
  );
};

type InputOTPSeparatorProps = {
  size?: InputOtpVariants['size'];
} & React.ComponentPropsWithoutRef<'div'>;

const InputOTPSeparator = ({
  ref,
  className,
  size,
  ...props
}: InputOTPSeparatorProps & { ref?: React.RefObject<React.ComponentRef<'div'> | null> }) => {
  const styles = inputOtpStyles({ size });
  return (
    <div ref={ref} className={styles.separator({ className })} {...props}>
      <Lucide.Minus strokeWidth={2} />
    </div>
  );
};

InputOTP.displayName = 'InputOTP';
InputOTPGroup.displayName = 'InputOTPGroup';
InputOTPSlot.displayName = 'InputOTPSlot';
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
