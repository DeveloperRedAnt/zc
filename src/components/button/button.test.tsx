import { render } from '@testing-library/react';
import React from 'react';
import { Button } from './button';

describe('Button', () => {
  it('renders Button component', () => {
    const { container } = render(<Button>Button Content</Button>);

    expect(container).toBeInTheDocument();
  });
});
