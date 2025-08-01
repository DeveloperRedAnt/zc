import CropperImage from '@/components/cropper/cropper-image';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CropperImage> = {
  title: 'Basic Components/CropperImage',
  component: CropperImage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        The \`CropperImage\` component enables image selection, cropping, and previewing before final use. It is especially useful for uploading user avatars or profile pictures.

        This component is fully interactive and provides:
        - Drag-and-drop file upload
        - Zoom control with a slider
        - Real-time preview of the cropped result
        - Blob (short for Binary Large Object) generation using canvas for image manipulation
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CropperImage />,
  parameters: {
    docs: {
      description: {
        story: `
            The \`CropperImage\` component allows users to upload and crop images. A modal opens after upload for zooming and adjusting the crop area. Click "Apply" to preview the cropped image.

            Use this story to interactively test the default cropper workflow.
        `,
      },
    },
  },
};

export const ProfileUpload: Story = {
  render: () => <CropperImage variant="profile-upload" />,
};
