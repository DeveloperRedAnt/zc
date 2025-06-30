import { render } from '@testing-library/react';
import React from 'react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders Avatar component', () => {
    const { container } = render(<Avatar />);

    expect(container).toBeInTheDocument();
  });
});
