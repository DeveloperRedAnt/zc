import { render } from '@testing-library/react';
import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp';

describe('InputOtp', () => {
  it('renders InputOtp component', () => {
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );

    expect(container).toBeInTheDocument();
  });
});
