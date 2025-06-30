import { render } from '@testing-library/react';
import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

describe('Resizable', () => {
  it('renders Resizable component', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <div>Sidebar</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div>Content</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );

    expect(container).toBeInTheDocument();
  });
});
