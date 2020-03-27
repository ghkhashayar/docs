const glob = require('glob');

module.exports = {
    title: 'Sanjab',
    description: 'Sanjab is an admin package for laravel framework. create admin panels quick and extendiable.',
    themeConfig: {
        sidebar: [
          '/',
          '/install',
          '/crud',
          '/setting',
          {
            path: '/widgets',
            title: 'Widgets',
            children: glob.sync('docs/widgets/*.md').map((f) => f.replace(/^docs/, ''))
          },
          {
            path: '/cards',
            title: 'Cards',
            children: glob.sync('docs/cards/*.md').map((f) => f.replace(/^docs/, ''))
          },
          '/localization',
          '/authorization',
          '/compile',
        ],
        repo: 'sanjabteam/sanjab',
        docsRepo: 'https://github.com/sanjabteam/sanjabteam.github.io',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        smoothScroll: true,
        footer: 'Copyright © 2020 Laravel Sanjab'
    },
    plugins: {
      'sitemap': {
        hostname: 'http://sanjabteam.github.io/'
      },
      '@vuepress/back-to-top': {},
      'seo': {},
      'check-md': {},
      'vuepress-plugin-code-copy': {}
    }
};
