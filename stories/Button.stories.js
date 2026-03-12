import { fn } from 'storybook/test';

import { createButton } from './Button';

const designParameters = (url) => ({
  design: {
    type: 'figma',
    url,
  },
});

export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => createButton(args),
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text content.',
      table: {
        defaultValue: { summary: '展開更多' },
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'onClick',
      table: { disable: true },
    },
    color: {
      control: 'color',
      description: 'Primary color source. Border and text use this value, and hover background falls back to it.',
      table: {
        defaultValue: { summary: '#d60c18' },
        type: { summary: 'color' },
      },
    },
    hoverColor: {
      control: 'color',
      description: 'Optional hover background color. Empty links to color.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'color' },
      },
    },
    bgColor: {
      control: 'color',
      description: 'Optional default background color. Empty uses white.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'color' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button interaction state.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    props: {
      control: 'object',
      description: 'Additional attributes to apply to the button element.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
    },
    style: {
      control: 'text',
      description: 'Inline CSS text appended to the button.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    hovered: {
      control: 'boolean',
      table: { disable: true },
    },
  },
  args: {
    label: '展開更多',
    color: '#d60c18',
    hoverColor: '',
    bgColor: '',
    disabled: false,
    props: {},
    style: '',
    hovered: false,
    onClick: fn(),
  },
};

export const Solid = {
  args: {
    color: '#272727',
    disabled: false,
    props: {},
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=2-90&t=tZGs67Qdi1RDN1pn-4'
  ),
};
