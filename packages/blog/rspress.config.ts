import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { remarkPureContainer } from 'plugins-mdx';

const BASE_PATH = '/notes/';

export default defineConfig({
  base: BASE_PATH,
  description: '果冻怪的魔法书，基于 Rspress 构建。',
  globalStyles: path.join(__dirname, 'styles/index.css'),
  icon: '/logo/jelly-monster.jpg',
  logo: {
    dark: '/logo/jelly-monster.jpg',
    light: '/logo/jelly-monster.jpg',
  },
  logoText: '果冻怪',
  markdown: {
    remarkPlugins: [remarkPureContainer],
  },
  root: path.join(__dirname, 'docs'),
  themeConfig: {
    darkMode: true, // 是否出现暗黑模式/白天模式切换按钮
    enableAppearanceAnimation: true, // 在浅色和深色主题之间切换时是否有动画效果
    enableContentAnimation: true, // 在页面切换的时候是否显示转场动画
    enableScrollToTop: true, // 启用文档上的滚动到顶部按钮
    footer: {},
    hideNavbar: 'never', // 控制隐藏导航栏行为 "always" | "auto" | "never"
    lastUpdated: false, // 是否显示最后更新时间
    lastUpdatedText: '最后更新于', // 最后更新时间的文本
    nextPageText: '下一页', // 下一页的文本
    outline: true, // 是否显示右侧大纲
    outlineTitle: '页面大纲', // 在右侧边栏中配置大纲的标题
    overview: {
      // overview 预览页/组件的配置项
      filterNameText: '过滤',
      filterNoResultText: '未搜索到相关结果',
      filterPlaceholderText: '输入关键词',
    },
    prevPageText: '上一页', // 上一页的文本
    searchNoResultsText: '未搜索到相关结果', // 没有搜索结果时的显示文本
    searchPlaceholderText: '搜索文档', // 搜索框的占位符文本
    searchSuggestedQueryText: '可更换不同的关键字后重试', // 没有搜索结果时的建议查询提示文本
    socialLinks: [
      {
        content: path.join(BASE_PATH, 'about-me/wechat-qrcode.jpg'),
        icon: 'wechat',
        mode: 'img',
      },
    ],
  },
  title: 'Jelly Monster',
});
