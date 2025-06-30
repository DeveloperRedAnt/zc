import { render } from '@testing-library/react';
import React from 'react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders Badge component', () => {
    const { container } = render(<Badge>Badge Content</Badge>);

    expect(container).toBeInTheDocument();
  });
});
