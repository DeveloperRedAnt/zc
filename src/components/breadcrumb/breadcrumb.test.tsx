import { render } from '@testing-library/react';
import React from 'react';
import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  it('renders Breadcrumb component', () => {
    const { container } = render(<Breadcrumb>Breadcrumb Content</Breadcrumb>);

    expect(container).toBeInTheDocument();
  });
});
