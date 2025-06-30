'use client';

import { useTranslation } from '@/libs/i18n';
import { Eyes } from '@icon-park/react';
import clsx from 'clsx';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { Button } from '../button/button';
import { TranslatedText } from '../i18n';
import { toast } from '../toast/toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/tooltip';
import { inputStyles } from './input.css';

export type InputProps = {
  onCopy?: () => void;
  showCopyButton?: boolean;
  showExternalCopyButton?: boolean;
  isWidthFull?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

// Password toggle component outside the main component
const PasswordToggle = ({
  showPassword,
  togglePassword,
  toggleButtonStyle,
}: { showPassword: boolean; togglePassword: () => void; toggleButtonStyle: string }) => (
  <TooltipProvider>
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button type="button" onClick={togglePassword} className={toggleButtonStyle}>
          {showPassword ? (
            <Lucide.EyeOff className="size-4" strokeWidth={2} />
          ) : (
            <Eyes className="size-4" strokeWidth={2} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>
          {showPassword ? (
            <TranslatedText id="input.password.hide">Hide password</TranslatedText>
          ) : (
            <TranslatedText id="input.password.show">Show password</TranslatedText>
          )}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Copy button component outside the main component
const CopyButton = ({
  handleCopy,
  copyButtonStyle,
}: { handleCopy: () => void; copyButtonStyle: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" onClick={handleCopy} className={copyButtonStyle}>
          <Lucide.Copy className="size-4" strokeWidth={2} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>
          <TranslatedText id="input.copy">Copy to clipboard</TranslatedText>
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// External copy button component outside the main component
const ExternalCopyButton = ({ handleCopy }: { handleCopy: () => void }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="shrink-0"
        >
          <Lucide.Copy className="size-4" strokeWidth={2} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>
          <TranslatedText id="input.copy">Copy to clipboard</TranslatedText>
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, showCopyButton, showExternalCopyButton, isWidthFull, onCopy, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { t } = useTranslation();
    const styles = inputStyles({
      hasPasswordToggle: type === 'password',
      hasCopyButton: showCopyButton && !type,
    });

    const togglePassword = () => setShowPassword(!showPassword);

    const handleCopy = () => {
      if (!props.value) {
        toast.error(t('input.copy.error'));
        return;
      }
      // Check if navigator is available (client-side only)
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(props.value.toString());
        toast.success(t('input.copy.success'));
        onCopy?.();
      }
    };

    if (showExternalCopyButton) {
      return (
        <div className={styles.wrapperWithCopy()}>
          <div className={clsx(styles.wrapper(), isWidthFull && 'w-full')}>
            <input
              type={showPassword ? 'text' : type}
              className={styles.input({ className })}
              ref={ref}
              {...props}
            />
            {type === 'password' && (
              <PasswordToggle
                showPassword={showPassword}
                togglePassword={togglePassword}
                toggleButtonStyle={styles.toggleButton()}
              />
            )}
          </div>
          <ExternalCopyButton handleCopy={handleCopy} />
        </div>
      );
    }

    return (
      <div className={clsx(styles.wrapper(), isWidthFull && 'w-full')}>
        <input
          type={showPassword ? 'text' : type}
          className={styles.input({ className })}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <PasswordToggle
            showPassword={showPassword}
            togglePassword={togglePassword}
            toggleButtonStyle={styles.toggleButton()}
          />
        )}
        {showCopyButton && !type && (
          <CopyButton handleCopy={handleCopy} copyButtonStyle={styles.copyButton()} />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
