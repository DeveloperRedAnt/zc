import { render } from '@testing-library/react';
import React from 'react';
import { AlertDialog } from './alert-dialog';

describe('AlertDialog', () => {
  it('renders AlertDialog component', () => {
    const { container } = render(<AlertDialog>AlertDialog Content</AlertDialog>);

    expect(container).toBeInTheDocument();
  });
});
