import { render } from '@testing-library/react';
import React from 'react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders Skeleton component', () => {
    const { container } = render(<Skeleton />);

    expect(container).toBeInTheDocument();
  });
});
