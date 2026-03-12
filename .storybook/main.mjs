

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(configDir, '..');

/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-designs"
  ],
  "framework": "@storybook/svelte-vite",
  async viteFinal(existingConfig) {
    return {
      ...existingConfig,
      root: projectRoot,
      server: {
        ...existingConfig.server,
        fs: {
          ...existingConfig.server?.fs,
          allow: [projectRoot, configDir],
        },
      },
    };
  }
};
export default config;
