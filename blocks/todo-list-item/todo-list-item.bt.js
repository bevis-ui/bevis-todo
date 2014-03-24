module.exports = function (bt) {

    /**
     * @param {String} text Item text.
     * @param {Boolean} completed Item completed.
     */

    bt.match('todo-list-item', function (ctx) {
        if (ctx.getParam('completed')) {
            ctx.setState('completed', ctx.getParam('completed'));
        }

        ctx.setContent([
            {
                elem: 'display',
                text: ctx.getParam('text'),
                completed: ctx.getParam('completed')
            },
            {
                elem: 'edit',
                text: ctx.getParam('text'),
                completed: ctx.getParam('completed')
            }
        ]);
    });

    bt.match('todo-list-item__display', function (ctx) {
        ctx.setContent([
            {
                block: 'checkbox',
                checked: ctx.getParam('completed')
            },
            {
                elem: 'text',
                text: ctx.getParam('text')
            },
            {
                elem: 'delete'
            }
        ]);
    });

    bt.match('todo-list-item__text', function (ctx) {
        ctx.setTag('span');
        ctx.setContent(ctx.escape(ctx.getParam('text')));
    });

    bt.match('todo-list-item__check', function (ctx) {
        ctx.setTag('input');
        ctx.setAttr('type', 'checkbox');
        ctx.setAttr('title', 'Complete this task');
        if (ctx.getParam('completed')) {
            ctx.setAttr('checked', 'checked');
        }
    });

    bt.match('todo-list-item__delete', function (ctx) {
        ctx.setAttr('title', 'Remove task from list');
        ctx.setContent('✖');
    });

    bt.match('todo-list-item__edit', function (ctx) {
        ctx.setTag('input');
        ctx.setAttr('value', ctx.getParam('text'));
    });

};
