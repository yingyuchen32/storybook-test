import { fn } from 'storybook/test';

import SelectComponent from './Select.svelte';

export default {
  title: 'Example/Input',
  component: SelectComponent,
  argTypes: {
    color: {
      control: 'color',
      description: 'Select label, border, and text color.',
      table: {
        defaultValue: { summary: 'var(--base-text-color, #272727)' },
        type: { summary: 'color' },
      },
    },
    props: {
      control: 'object',
      description: 'Additional attributes applied to the select element.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
    },
    style: {
      control: 'text',
      description: 'Inline CSS text appended to the select wrapper.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['before', 'after'],
      description: 'Position of the label relative to the select.',
      table: {
        defaultValue: { summary: 'before' },
        type: { summary: 'before / after' },
      },
    },
    label: {
      control: 'text',
      description: 'Select label text.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    bindFn: {
      control: false,
      description: 'Callback that receives the select DOM element.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'function' },
      },
    },
    options: {
      control: 'object',
      table: { disable: true },
    },
    onChange: {
      action: 'change',
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
      value: '郁欣',
    },
    style: '',
    labelPosition: 'before',
    label: '名字',
    bindFn: fn(),
    options: [
      { value: '郁欣', label: '郁欣' },
      { value: '家玉', label: '家玉' },
      { value: '英文', label: '英文' },
      { value: '尼爾', label: '尼爾' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          '輸入可以給顏色和事件管理。`label` 是輸入的標籤，`labelPosition` 指定標籤的位置，`bindFn` 給 input 的 DOM Element。',
      },
      source: {
        code: `<Input
  props={{ type: 'select' }}
  on:change={(evt) => {}}
>
  <option value="郁欣">郁欣</option>
  <option value="家玉">家玉</option>
  <option value="英文">英文</option>
  <option value="尼爾">尼爾</option>
  ...
</Input>`,
      },
    },
  },
};

export const Select = {};
