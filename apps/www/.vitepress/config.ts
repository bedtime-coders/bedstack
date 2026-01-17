import { defineConfig } from 'vitepress';
import pkg from '../../../package.json';
const { description, title } = pkg;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title,
  description,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon-dark.svg' }],
    // Fallback for browsers that don't support SVG favicons
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }],
  ],
  appearance: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      dark: 'icon-dark.svg',
      light: 'icon-light.svg',
      width: 24,
      height: 24,
    },
    nav: [
      { text: 'Guide', link: '/what-is-bedstack' },
      { text: 'RealWorld apps', link: 'https://realworld-docs.netlify.app/' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'What is Bedstack?',
            link: '/what-is-bedstack',
          },
          { text: 'Getting Started', link: '/getting-started' },
        ],
        collapsed: false,
      },

      {
        text: "Developer's Guide",
        link: 'https://github.com/bedtime-coders/bedstack/blob/main/CONTRIBUTING.md',
      },
      {
        text: 'Support',
        link: 'https://github.com/bedtime-coders/bedstack/blob/main/SUPPORT.md',
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/bedtime-coders/bedstack',
      },
      {
        icon: 'discord',
        link: 'https://discord.gg/8UcP9QB5AV',
      },
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },
    editLink: {
      pattern:
        'https://github.com/bedtime-coders/bedstack/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-'),
      },
    },
  },
});
