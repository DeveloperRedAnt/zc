import { render } from '@testing-library/react';
import React from 'react';
import { Dialog } from './dialog';

describe('Dialog', () => {
  it('renders Dialog component', () => {
    const { container } = render(<Dialog>Dialog Content</Dialog>);

    expect(container).toBeInTheDocument();
  });
});
