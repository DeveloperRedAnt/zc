import { render } from '@testing-library/react';
import React from 'react';
import { DropdownMenu } from './dropdown-menu';

describe('DropdownMenu', () => {
  it('renders DropdownMenu component', () => {
    const { container } = render(<DropdownMenu>DropdownMenu Content</DropdownMenu>);

    expect(container).toBeInTheDocument();
  });
});
