module.exports = function (bt) {

    bt.match('todo-window', function (ctx) {
        ctx.setContent([
            {
                block: 'todo-add-form'
            },
            {
                block: 'todo-list'
            },
            {
                block: 'todo-footer'
            }
        ]);
    });

};
