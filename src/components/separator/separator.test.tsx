import { render } from '@testing-library/react';
import React from 'react';
import { Separator } from './separator';

describe('Separator', () => {
  it('renders Separator component', () => {
    const { container } = render(<Separator />);

    expect(container).toBeInTheDocument();
  });
});
