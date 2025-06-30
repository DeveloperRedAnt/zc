import { render } from '@testing-library/react';
import React from 'react';
import { LoadingSpinner } from './spinner';

describe('Spinner', () => {
  it('renders Spinner component', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container).toBeInTheDocument();
  });
});
