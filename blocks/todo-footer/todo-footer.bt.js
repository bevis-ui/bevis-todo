module.exports = function (bt) {

    bt.match('todo-footer', function (ctx) {
        ctx.setContent([
            {
                elem: 'stat',
                text: ' items left'
            },
            {
                elem: 'filters'
            },
            {
                elem: 'clear',
                text: 'Clear completed'
            }
        ]);
    });

    bt.match('todo-footer__stat', function (ctx) {
        ctx.setTag('span');
        ctx.setContent([
            {
                elem: 'stat-count',
                text: '0'
            },
            {
                elem: 'stat-text',
                text: ctx.getParam('text')
            }
        ]);
    });

    bt.match('todo-footer__clear', function (ctx) {
        ctx.setTag('button');
        ctx.setContent([
            {
                elem: 'clear-text',
                text: ctx.getParam('text')
            },
            {
                elem: 'clear-count',
                text: '101'
            }
        ]);
    });

    bt.match([
        'todo-footer__clear-text',
        'todo-footer__stat-count',
        'todo-footer__stat-text'
    ], function (ctx) {
        ctx.setTag('span');
        ctx.setContent(ctx.getParam('text'));
    });

    bt.match('todo-footer__clear-count', function (ctx) {
        ctx.setTag('span');
    });

    bt.match('todo-footer__filters', function (ctx) {
        ctx.setTag('ul');
        ctx.setContent([
            {
                elem: 'filter',
                name: 'all',
                text: 'All',
                active: true
            },
            {
                elem: 'filter',
                name: 'active',
                text: 'Active'
            },
            {
                elem: 'filter',
                name: 'completed',
                text: 'Completed'
            }
        ]);
    });

    bt.match('todo-footer__filter', function (ctx) {
        ctx.setTag('li');
        ctx.setAttr('data-name', ctx.getParam('name'));
        ctx.setContent(ctx.getParam('text'));
        ctx.setState('active', ctx.getParam('active'));
    });
};
