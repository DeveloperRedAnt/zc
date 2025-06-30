import { render } from '@testing-library/react';
import React from 'react';
import { RadioGroup } from './radio-group';

describe('RadioGroup', () => {
  it('renders RadioGroup component', () => {
    const { container } = render(<RadioGroup />);

    expect(container).toBeInTheDocument();
  });
});
