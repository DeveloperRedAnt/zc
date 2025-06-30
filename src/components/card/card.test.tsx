import { render } from '@testing-library/react';
import React from 'react';
import { Card } from './card';

describe('Card', () => {
  it('renders Card component', () => {
    const { container } = render(<Card>Card Content</Card>);

    expect(container).toBeInTheDocument();
  });
});
