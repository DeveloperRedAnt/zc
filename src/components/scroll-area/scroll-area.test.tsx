import { render } from '@testing-library/react';
import React from 'react';
import { ScrollArea } from './scroll-area';

describe('ScrollArea', () => {
  it('renders ScrollArea component', () => {
    const { container } = render(<ScrollArea>ScrollArea Content</ScrollArea>);

    expect(container).toBeInTheDocument();
  });
});
