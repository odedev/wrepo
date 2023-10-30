import { defineConfig } from 'vitepress'

const nav = [
  // { text: '首页', link: '/' },
  { text: '首页', link: '/', activeMatch: '^/$' },
  { text: '手册', link: '/manual/', activeMatch: '^/manual/' },
  { text: '指南', link: '/guide/' },
  { text: '参考', link: '/reference/' },
  { text: 'VitePress', link: 'https://vitepress.vuejs.org/' }
]

const sidebar = {
  '/manual/': [
    {
      text: 'Guide',
      items: [
        {text: '指南', link: '/manual/guide'},
        {text: '参考', link: '/manual/reference'},

      ]
    },
  ],
  '/guide/': [
    {
      text: '开发指南',
      collapsed: false,
      items: [
        { text: '介绍', link: '/guide/introduction' },
        { text: '开始', link: '/guide/start' },
      ]
    },
    {
      text: '文档指南',
      collapsed: false,
      items: [
        { text: 'Markdown Examples', link: '/guide/markdown-examples' },
      ]
    }
  ],
  '/reference/': [
    {
      text: 'Reference',
      items: [
        { text: 'Index', link: '/reference/' },
      ]
    },
  ],
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Doc",
  description: "A VitePress Site",
  base: '/',
  srcDir: './src',
  scrollOffset: 'header',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    docsDir: 'src',
    docsBranch: 'main',
    outDir: 'dist',
    nav: nav,
    sidebar: sidebar,
  },
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        href: 'favicon.png',
        type: 'image/x-icon'
      }
    ]
  ],
  markdown: {
    lineNumbers: false,
    toc: {
      includeLevel: [1, 2]
    },
  },
  vite: {
//    publicDir: 'resources'
  }
})
