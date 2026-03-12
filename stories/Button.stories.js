import { fn } from 'storybook/test';

import { createButton } from './Button';

const figmaUrl =
  import.meta.env?.STORYBOOK_BUTTON_FIGMA_URL ??
  'https://www.figma.com/design/v1w2cEcSLTpNjMq9I7qv6M/Bulldog-UI-Style?node-id=2-90&t=tZGs67Qdi1RDN1pn-1';

export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => createButton(args),
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    tone: {
      control: { type: 'select' },
      options: ['neutral', 'danger'],
    },
    disabled: { control: 'boolean' },
    hovered: { control: 'boolean' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: figmaUrl,
    },
  },
  args: {
    label: '展開更多',
    tone: 'neutral',
    disabled: false,
    hovered: false,
    onClick: fn(),
  },
};

export const NeutralOutline = {
  args: {
    tone: 'neutral',
  },
};

export const NeutralHover = {
  args: {
    tone: 'neutral',
    hovered: true,
  },
};

export const NeutralDisabled = {
  args: {
    tone: 'neutral',
    disabled: true,
  },
};

export const DangerOutline = {
  args: {
    tone: 'danger',
  },
};

export const DangerHover = {
  args: {
    tone: 'danger',
    hovered: true,
  },
};

export const DangerDisabled = {
  args: {
    tone: 'danger',
    disabled: true,
  },
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
      { tone: 'neutral' },
      { tone: 'neutral', hovered: true },
      { tone: 'neutral', disabled: true },
      { tone: 'danger' },
      { tone: 'danger', hovered: true },
      { tone: 'danger', disabled: true },
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
