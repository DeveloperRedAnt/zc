import { render } from '@testing-library/react';
import React from 'react';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders Slider component', () => {
    const { container } = render(<Slider />);

    expect(container).toBeInTheDocument();
  });
});
