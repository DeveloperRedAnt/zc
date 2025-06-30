import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input-otp/input-otp';

interface OTPInputGroupProps {
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function OTPInputGroup({
  label,
  required = true,
  disabled = false,
  className = '',
  value,
  onChange,
}: OTPInputGroupProps) {
  return (
    <div className={className}>
      <InputOTP
        maxLength={6}
        size="lg"
        label={label}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        <InputOTPGroup>
          {['otp-slot-1', 'otp-slot-2', 'otp-slot-3', 'otp-slot-4', 'otp-slot-5', 'otp-slot-6'].map(
            (key, i) => (
              <InputOTPSlot key={key} index={i} size="lg" />
            )
          )}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
