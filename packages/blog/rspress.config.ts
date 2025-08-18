import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  icon: '/rspress-icon.png',
  logo: {
    dark: '/rspress-dark-logo.png',
    light: '/rspress-light-logo.png',
  },
  root: path.join(__dirname, 'docs'),
  themeConfig: {
    socialLinks: [
      {
        content: 'https://github.com/web-infra-dev/rspress',
        icon: 'github',
        mode: 'link',
      },
    ],
  },
  title: 'My Site',
});
