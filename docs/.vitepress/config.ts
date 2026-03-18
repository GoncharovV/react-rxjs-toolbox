import { defineConfig } from 'vitepress';


const apiLinks = [
  { text: 'useSubscription', link: '/api/use-subscription' },
  { text: 'useObservable', link: '/api/use-observable' },
  { text: 'useDerivedValue', link: '/api/use-derived-value' },
  { text: 'useDistinctDerivedValue', link: '/api/use-distinct-derived-value' },
  { text: 'useObservableState', link: '/api/use-observable-state' },
];

export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'react-rxjs-toolbox',
      description: 'Set of hooks for using RxJS in React',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/introduction/getting-started' },
          { text: 'API', link: '/en/api/use-subscription' },
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Getting Started', link: '/en/introduction/getting-started' },
              { text: 'Overview', link: '/en/introduction/overview' },
              // { text: 'Motivation', link: '/en/introduction/motivation' },
            ],
          },
          {
            text: 'API',
            items: apiLinks.map((item) => ({
              ...item,
              link: `/en${item.link}`,
            })),
          },
        ],
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      title: 'react-rxjs-toolbox',
      description: 'Набор хуков для использования RxJS в React',
      themeConfig: {
        nav: [
          { text: 'Руководство', link: '/ru/introduction/getting-started' },
          { text: 'API', link: '/ru/api/use-subscription' },
        ],
        sidebar: [
          {
            text: 'Введение',
            items: [
              { text: 'Начало работы', link: '/ru/introduction/getting-started' },
              { text: 'Обзор', link: '/ru/introduction/overview' },
              // { text: 'Мотивация', link: '/ru/introduction/motivation' },
            ],
          },
          {
            text: 'API',
            items: apiLinks.map((item) => ({
              ...item,
              link: `/ru${item.link}`,
            })),
          },
        ],
      },
    },
  },
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/GoncharovV/react-rxjs-toolbox' }],
  },
});
