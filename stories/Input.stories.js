import { fn } from 'storybook/test';

import Input from './Input.svelte';

export default {
  title: 'Example/Input',
  tags: ['autodocs'],
  component: Input,
  argTypes: {
    color: {
      control: 'color',
      description: 'Input label, border, and text color.',
      table: {
        defaultValue: { summary: 'var(--base-text-color, #272727)' },
        type: { summary: 'color' },
      },
    },
    props: {
      control: 'object',
      description: 'Additional attributes applied to the input element.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
    },
    style: {
      control: 'text',
      description: 'Inline CSS text appended to the input wrapper.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['before', 'after'],
      description: 'Position of the label relative to the input.',
      table: {
        defaultValue: { summary: 'before' },
        type: { summary: 'before / after' },
      },
    },
    label: {
      control: 'text',
      description: 'Input label text.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown inside the input.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    bindFn: {
      control: false,
      description: 'Callback that receives the input DOM element.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'function' },
      },
    },
    onChange: {
      action: 'change',
      table: { disable: true },
    },
    onInput: {
      action: 'input',
      table: { disable: true },
    },
    onFocus: {
      action: 'focus',
      table: { disable: true },
    },
    onBlur: {
      action: 'blur',
      table: { disable: true },
    },
  },
  args: {
    color: '#272727',
    props: {
      type: 'text',
    },
    style: '',
    labelPosition: 'before',
    label: '名字',
    placeholder: '輸入元件',
    bindFn: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          '輸入可以給顏色和事件管理。`label` 是輸入的標籤，`labelPosition` 指定標籤的位置，`placeholder` 可以直接修改提示文字，`bindFn` 給 input 的 DOM Element。',
      },
      source: {
        code: `<Input
  props={{ type: 'text' }}
  on:change={(evt) => {}}
/>`,
      },
    },
  },
};

export const Basic = {};
