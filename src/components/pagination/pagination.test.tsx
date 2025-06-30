import { render } from '@testing-library/react';
import React from 'react';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('renders Pagination component', () => {
    const { container } = render(<Pagination />);

    expect(container).toBeInTheDocument();
  });
});
