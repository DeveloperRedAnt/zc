import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import NotFound from './not-found';

// Mock the next/navigation module
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('NotFound', () => {
  it('renders with default props', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders with custom title and description', () => {
    render(<NotFound statusCode={403} title="Akses Ditolak" description="Tidak ada akses" />);

    expect(screen.getByText('Akses Ditolak')).toBeInTheDocument();
    expect(screen.getByText('Tidak ada akses')).toBeInTheDocument();
  });

  it('navigates home on button click', () => {
    // The push mock is already defined at the top level
    render(<NotFound />);
    fireEvent.click(screen.getByText(/go back home/i));

    expect(push).toHaveBeenCalledWith('/');
  });
});
