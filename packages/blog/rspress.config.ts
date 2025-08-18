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
    enableAppearanceAnimation: true, // 在浅色和深色主题之间切换时是否有动画效果
    enableContentAnimation: true, // 在页面切换的时候是否显示转场动画
    enableScrollToTop: true, // 启用文档上的滚动到顶部按钮
  },
  title: 'Jelly Monster',
});
