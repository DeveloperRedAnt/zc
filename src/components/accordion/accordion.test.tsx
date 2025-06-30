import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

describe('Accordion', () => {
  it('renders Accordion component', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section Title</AccordionTrigger>
          <AccordionContent>Accordion Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    fireEvent.click(screen.getByText('Section Title'));

    expect(screen.getByText('Accordion Content')).toBeInTheDocument();
  });
});
