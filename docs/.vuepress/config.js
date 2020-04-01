const glob = require("glob");

module.exports = {
    title: "Sanjab",
    description:
        "Sanjab is an admin package for laravel framework. create admin panels quick and extendiable.",
    themeConfig: {
        sidebar: [
            "/",
            "/install",
            "/crud",
            "/setting",
            {
                path: "/widgets",
                title: "Widgets",
                children: glob
                    .sync("docs/widgets/*.md")
                    .map(f => f.replace(/^docs/, ""))
            },
            {
                path: "/cards",
                title: "Cards",
                children: glob
                    .sync("docs/cards/*.md")
                    .map(f => f.replace(/^docs/, ""))
            },
            "/localization",
            "/authorization",
            "/compile"
        ],
        repo: "sanjabteam/sanjab",
        docsRepo: "https://github.com/sanjabteam/sanjabteam.github.io",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "Help us improve this page!",
        smoothScroll: true,
        logo: '/images/logo.svg',
        footer: "Copyright © 2020 Laravel Sanjab",
        algolia: {
            apiKey: "242063787eaf1a4d203bc3526e5d430a",
            indexName: "sanjabteam"
        }
    },
    plugins: {
        sitemap: {
            hostname: "http://sanjabteam.github.io/"
        },
        "@vuepress/back-to-top": {},
        seo: {},
        "check-md": {},
        "vuepress-plugin-code-copy": {}
    },
    head: [
        ['link', { rel: 'icon', href: '/images/favicon.ico' }]
    ]
};
