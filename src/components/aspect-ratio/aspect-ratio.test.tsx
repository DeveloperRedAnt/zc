import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  it('renders AspectRatio component', () => {
    const { container } = render(<AspectRatio>AspectRatio Content</AspectRatio>);

    expect(container).toBeInTheDocument();
  });
});
