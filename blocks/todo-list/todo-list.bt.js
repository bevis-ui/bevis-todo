module.exports = function (bt) {

    bt.match('todo-list', function (ctx) {
        ctx.setContent([
            {
                elem: 'toggle-all'
            },
            {
                elem: 'items'
            }
        ]);
    });

    bt.match('todo-list__toggle-all', function (ctx) {
        ctx.setAttr('title', 'Complete all tasks');
        ctx.setContent(                        {
            block: 'checkbox',
            view: 'all'
        });
    });

};
