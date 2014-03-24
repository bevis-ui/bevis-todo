module.exports = function (pages) {
    pages.declare('index-page', function (params) {
        var options = params.options;
        return {
            block: 'page',
            title: 'Index page',
            styles: [
                {url: options.assetsPath + '.css'}
            ],
            scripts: [
                {url: [options.assetsPath, params.lang, 'js'].join('.')}
            ],
            body: [
                {
                    block: 'layout',
                    content: {
                        block: 'todo-window'
                    },
                    aside: [
                        {
                            block: 'sidebar',

                            title: 'BEViS application',
                            about: [
                                {
                                    text: 'Source',
                                    url: 'https://github.com/bevis-ui/bevis-todo'
                                }
                            ],
                            quote: {
                                author: 'BEViS',
                                text: 'BEViS - это не только соглашения об именовании тегов и CSS-классов.<br><br>' +
                                    'Это ещё и готовые инструменты, ' +
                                    'с которыми сверстать полноценный динамический сайт может даже подросток.'
                            },
                            resources: [
                                {
                                    text: 'Documentation',
                                    url: 'https://github.com/bevis-ui/docs'
                                },
                                {
                                    text: 'BEViS on Github',
                                    url: 'https://github.com/bevis-ui'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    });
};
