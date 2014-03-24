module.exports = function (bt) {

    /**
     * @param {String} id Идентификатор DOM-элемента
     * @param {String} name Имя элемента формы
     * @param {String} value Значение поля
     * @param {String} type Тип поля. Например, `password`
     * @param {Number} tabindex Задает `html`-атрибут `tabindex`
     * @param {String} autocomplete Задает `html`-атрибут `autocomplete`. Включает автозаполнение текста
     * @param {Number} maxlength Задает `html`-атрибут `maxlength`. Устанавливает максимальное число символов,
     *                           которое может быть введено
     * @param {String} placeholder Задает `html`-атрибут `placeholder`.
     *                             Выводит текст внутри поля, который исчезает при заполнении поля
     * @param {Boolean} disabled Переводит кнопку в неактивное состояние.
     *                           Устанавливает атрибут `disabled` в значение `disabled`
     */

//    bt.setDefaultView('input', 'add');

    bt.match('input', function (ctx) {

        ctx.setTag('span');
        ctx.enableAutoInit();

        if (ctx.getParam('disabled')) {
            ctx.setState('disabled');
        }

        ctx.setContent([
            {
                elem: 'control',
                type: ctx.getParam('type'),
                id: ctx.getParam('id'),
                name: ctx.getParam('name'),
                value: ctx.getParam('value'),
                tabindex: ctx.getParam('tabindex'),
                disabled: ctx.getParam('disabled'),
                autocomplete: ctx.getParam('autocomplete'),
                maxlength: ctx.getParam('maxlength'),
                placeholder: ctx.getParam('placeholder')
            }
        ]);
    });

    bt.match('input__control', function (ctx) {
        ctx.setTag('input');
        ctx.setAttr('id', ctx.getParam('id') || ctx.generateId());
        ctx.setAttr('type', ctx.getParam('type'));
        ctx.setAttr('name', ctx.getParam('name'));
        ctx.setAttr('value', ctx.getParam('value'));
        ctx.setAttr('tabindex', ctx.getParam('tabindex'));
        ctx.setAttr('disabled', ctx.getParam('disabled'));
        ctx.setAttr('autocomplete', ctx.getParam('autocomplete'));
        ctx.setAttr('maxlength', ctx.getParam('maxlength'));
        ctx.setAttr('placeholder', ctx.getParam('placeholder'));
    });

};
