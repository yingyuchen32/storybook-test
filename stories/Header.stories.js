import { fn } from 'storybook/test';

import Header from './Header.svelte';

export default {
  title: 'Example/Header',
  tags: ['autodocs'],
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut = {};
