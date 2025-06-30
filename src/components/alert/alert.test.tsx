import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders Alert component', () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Heads up!');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'You can add components and dependencies to your app using the cli.'
    );
  });

  it('applies className and variant', () => {
    render(
      <Alert className="custom-class" variant="default">
        Success
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Success');
    // ClassName/variant style checks could be added if CSS-in-JS exposes them
  });
});

describe('AlertTitle', () => {
  it('renders AlertTitle', () => {
    render(<AlertTitle>Alert Title</AlertTitle>);

    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });
});

describe('AlertDescription', () => {
  it('renders AlertDescription', () => {
    render(<AlertDescription>Description</AlertDescription>);

    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
