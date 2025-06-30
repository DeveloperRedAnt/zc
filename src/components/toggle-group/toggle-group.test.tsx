import { render } from '@testing-library/react';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

describe('ToggleGroup', () => {
  it('renders ToggleGroup component', () => {
    const { container } = render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );

    expect(container).toBeInTheDocument();
  });
});
