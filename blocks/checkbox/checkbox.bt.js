module.exports = function (bt) {
    /**
     * @param {String} id Задает `html`-атрибут `id`.
     * @param {String} name Задает `html`-атрибут `name`.
     * @param {String} [value=''] Задает `html`-атрибут `value`.
     * @param {String} [tabindex] Задает `html`-атрибут `tabindex`.
     * @param {Boolean} [checked=false] Выставляет `html`-атрибут `checked`.
     * @param {Boolean} [disabled=false] Переводит чекбокс в неактивное состояние.
     *                                   Устанавливает атрибут `disabled` в значение `disabled`
     * @param {Boolean} [indeterminate=false] Задает свойство `indeterminate` у чекбокса
     *                                        [*](http://www.w3.org/TR/html5/selectors.html#selector-indeterminate)
     */
    bt.setDefaultView('checkbox', 'one');

    bt.match('checkbox*', function (ctx) {
        ctx.enableAutoInit();
        ctx.setTag('label');

        var id = ctx.getParam('id') || ctx.generateId();
        var checked = ctx.getParam('checked');
        var disabled = ctx.getParam('disabled');
        var content = [
            {
                elem: 'box',
                content: [
                    {
                        elem: 'control',
                        id: id,
                        name: ctx.getParam('name'),
                        value: ctx.getParam('value'),
                        tabindex: ctx.getParam('tabindex'),
                        checked: checked,
                        disabled: disabled
                    }
                ]
            }
        ];

        ctx.setContent(content);

        if (ctx.getParam('indeterminate')) {
            ctx.setState('indeterminate');
        }

        if (checked) {
            ctx.setState('checked');
        }

        if (disabled) {
            ctx.setState('disabled');
        }
    });

    bt.match('checkbox*__box', function (ctx) {
        ctx.setTag('span');
        ctx.setContent(ctx.getParam('content'));
    });

    bt.match('checkbox*__control', function (ctx) {
        ctx.setTag('input');
        ctx.setAttr('type', 'checkbox');
        ctx.setAttr('value', ctx.getParam('value') || '');
        ctx.setAttr('name', ctx.getParam('name'));
        ctx.setAttr('id', ctx.getParam('id'));
        ctx.setAttr('tabindex', ctx.getParam('tabindex'));

        if (ctx.getParam('checked')) {
            ctx.setAttr('checked', 'checked');
        }

        if (ctx.getParam('disabled')) {
            ctx.setAttr('disabled', 'disabled');
        }
    });
};
