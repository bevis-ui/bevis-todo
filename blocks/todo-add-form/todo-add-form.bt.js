module.exports = function (bt) {

    bt.match('todo-add-form', function (ctx) {
        ctx.setTag('form');

        ctx.setContent([
            {
                elem: 'title'
            },
            {
                elem: 'add-field'
            }
        ]);
    });

    bt.match('todo-add-form__title', function (ctx) {
        ctx.setContent('todos');
    });

    bt.match('todo-add-form__add-field', function (ctx) {
        ctx.setContent({
            block: 'input',
//            view: 'add',
            autocomplete: 'off',
            placeholder: 'What needs to be done?'
        });
    });

};
