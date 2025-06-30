import { render } from '@testing-library/react';
import React from 'react';
import { ChartContainer } from './chart';

describe('Chart', () => {
  it('renders Chart component', () => {
    const { container } = render(
      <ChartContainer
        config={{ total: { theme: { light: '#000', dark: '#fff' }, label: 'Total' } }}
      >
        <div>Chart Content</div>
      </ChartContainer>
    );

    expect(container).toBeInTheDocument();
  });
});
