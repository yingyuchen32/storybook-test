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
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    tone: {
      control: { type: 'select' },
      options: ['black', 'red'],
    },
    disabled: { control: 'boolean' },
    hovered: { control: 'boolean' },
  },
  args: {
    label: '展開更多',
    tone: 'black',
    disabled: false,
    hovered: false,
    onClick: fn(),
  },
};

export const BlackOutline = {
  args: {
    tone: 'black',
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=2-90&t=tZGs67Qdi1RDN1pn-4'
  ),
};

export const BlackHover = {
  args: {
    tone: 'black',
    hovered: true,
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=1320-1174&t=tZGs67Qdi1RDN1pn-4'
  ),
};

export const BlackDisabled = {
  args: {
    tone: 'black',
    disabled: true,
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=4437-9949&t=tZGs67Qdi1RDN1pn-4'
  ),
};

export const RedOutline = {
  args: {
    tone: 'red',
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=36-103&t=tZGs67Qdi1RDN1pn-4'
  ),
};

export const RedHover = {
  args: {
    tone: 'red',
    hovered: true,
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=1320-1176&t=tZGs67Qdi1RDN1pn-4'
  ),
};

export const RedDisabled = {
  args: {
    tone: 'red',
    disabled: true,
  },
  parameters: designParameters(
    'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=4437-9953&t=tZGs67Qdi1RDN1pn-4'
  ),
};

export const ReferenceRow = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '40px';
    container.style.alignItems = 'center';
    container.style.padding = '24px 0';

    [
      { tone: 'black' },
      { tone: 'black', hovered: true },
      { tone: 'black', disabled: true },
      { tone: 'red' },
      { tone: 'red', hovered: true },
      { tone: 'red', disabled: true },
    ].forEach((args) => {
      container.appendChild(
        createButton({
          label: '展開更多',
          onClick: fn(),
          ...args,
        })
      );
    });

    return container;
  },
};
