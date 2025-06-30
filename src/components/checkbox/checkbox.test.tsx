import { render } from '@testing-library/react';
import React from 'react';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders Checkbox component', () => {
    const { container } = render(<Checkbox />);

    expect(container).toBeInTheDocument();
  });
});
