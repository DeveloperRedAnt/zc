import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'Basic Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create a proper React component for the form with hooks
const CardWithForm = () => {
  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Card Form</p>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export const Default: Story = {
  render: () => <CardWithForm />,
};
