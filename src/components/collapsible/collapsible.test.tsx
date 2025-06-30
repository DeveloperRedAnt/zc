import { render } from '@testing-library/react';
import React from 'react';
import { Collapsible } from './collapsible';

describe('Collapsible', () => {
  it('renders Collapsible component', () => {
    const { container } = render(<Collapsible>Collapsible Content</Collapsible>);

    expect(container).toBeInTheDocument();
  });
});
