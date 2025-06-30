import { render } from '@testing-library/react';
import React from 'react';
import { Select } from './select';

describe('Select', () => {
  it('renders Select component', () => {
    const { container } = render(<Select>Option</Select>);

    expect(container).toBeInTheDocument();
  });
});
