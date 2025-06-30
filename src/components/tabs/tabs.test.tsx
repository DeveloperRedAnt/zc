import { render } from '@testing-library/react';
import React from 'react';
import { Tabs } from './tabs';

describe('Tabs', () => {
  it('renders Tabs component', () => {
    const { container } = render(<Tabs>Tabs Content</Tabs>);

    expect(container).toBeInTheDocument();
  });
});
