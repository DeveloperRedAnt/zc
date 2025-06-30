import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ErrorState } from './error-state';

describe('ErrorState', () => {
  it('renders error message', () => {
    render(<ErrorState error={new Error('Test error')} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/go back to home/i)).toBeInTheDocument();
    expect(screen.getByText(/oh oh/i)).toBeInTheDocument();
  });
});
