import { fn } from 'storybook/test';

import { createButton } from './Button';

const designParameters = (...designs) => ({
  design: designs,
});

export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => createButton(args),
  argTypes: {
    label: {
      control: 'text',
      table: { disable: true },
    },
    onClick: {
      action: 'onClick',
      table: { disable: true },
    },
    color: {
      control: 'color',
      description: 'Primary color source. Text and border use this value, and other colors fall back from it.',
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
      description: 'Optional background color. Empty links to an auto black/white surface derived from color.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'color' },
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
    props: {},
    style: '',
    hovered: false,
    onClick: fn(),
  },
};

export const Outline = {
  args: {
    color: '#272727',
    props: {},
  },
  parameters: designParameters(
    {
      name: 'Black',
      type: 'figma',
      url: 'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=2-90&t=tZGs67Qdi1RDN1pn-4',
    },
    {
      name: 'Red',
      type: 'figma',
      url: 'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=36-103&t=tZGs67Qdi1RDN1pn-4',
    }
  ),
};

export const Hover = {
  args: {
    color: '#272727',
    hovered: true,
    props: {},
  },
  parameters: designParameters(
    {
      name: 'Black',
      type: 'figma',
      url: 'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=1320-1174&t=tZGs67Qdi1RDN1pn-4',
    },
    {
      name: 'Red',
      type: 'figma',
      url: 'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=1320-1176&t=tZGs67Qdi1RDN1pn-4',
    }
  ),
};

export const Disabled = {
  args: {
    color: '#272727',
    props: { disabled: true },
  },
  parameters: designParameters(
    {
      name: 'Black',
      type: 'figma',
      url: 'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=4437-9949&t=tZGs67Qdi1RDN1pn-4',
    },
    {
      name: 'Red',
      type: 'figma',
      url: 'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=4437-9953&t=tZGs67Qdi1RDN1pn-4',
    }
  ),
};
