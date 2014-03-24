modules.define(
    'input',
    ['block', 'inherit', 'jquery', 'dom', 'block-event'],
    function (provide, YBlock, inherit, $, dom, YBlockEvent) {

    var Input = inherit(YBlock, {

        /**
         * Событие возникает, когда значение в поле ввода изменяется.
         * @event Input#change
         */

        /**
         * Событие возникает, когда значение пользователь отпускает кнопку на клавиатуре.
         * @event Input#keyup
         */

        __constructor: function () {
            this.__base.apply(this, arguments);

            var control = this._control = this._findElement('control');
            this._bindTo(control, 'change', this._handleChange);
            this._bindTo(control, 'keyup', this._handleChange);
            this._bindTo(control, 'input', this._handleChange);
            this._bindTo(control, 'keydown', this._handleKeyDown);
            this._bindTo(this.getDomNode(), 'click', this._handleClickOnWhitespace);

            this._closeIcon = this._findElement('close-small');
            if (this._closeIcon) {
                this._bindTo(this._closeIcon, 'click', function () {
                    this.setValue('');
                });
                if (this._control.val() !== '') {
                    this._setElementState(this._closeIcon, 'visible');
                }
            }

            this._prevValue = control.val();
        },

        /**
         * Бросает событие `change`, если значение поля поменялось.
         *
         * @protected
         */
        _handleChange: function () {
            var currentValue = this._control.val();
            if (currentValue !== this._prevValue) {
                this._prevValue = currentValue;
                if (this._closeIcon) {
                    if (currentValue !== '') {
                        this._setElementState(this._closeIcon, 'visible');
                    } else {
                        this._removeElementState(this._closeIcon, 'visible');
                    }
                }
                this.emit('change');
            }
        },

        /**
         * Бросает блочное событие `keydown`.
         *
         * @protected
         */
        _handleKeyDown: function (e) {
            var blockEvent = new YBlockEvent('keydown');
            blockEvent.stopPropagation();
            this.emit(blockEvent, e);
            if (blockEvent.isDefaultPrevented()) {
                e.preventDefault();
            }
        },

        /**
         * Обрабатывает клик вне control.
         *
         * @protected
         */
        _handleClickOnWhitespace: function (e) {
            if (e.target === this.getDomNode()[0]) {
                this.focus();
            }
        },

        /**
         * Устанавливает фокус на поле ввода.
         *
         * @returns {Input}
         */
        focus: function () {
            if (this.isEnabled()) {
                this._control.focus();
            }
            return this;
        },

        /**
         * Возвращает `true`, если поле ввода имеет фокус.
         *
         * @returns {Boolean}
         */
        hasFocus: function () {
            return dom.focus.hasFocus(this.getDomNode());
        },

        /**
         * Удаляет фокус с поля ввода.
         *
         * @returns {Input}
         */
        blur: function () {
            this._control.blur();
            return this;
        },

        /**
         * Возвращает `true`, если поле ввода активно.
         *
         * @returns {Boolean}
         */
        isEnabled: function () {
            return !this._getState('disabled');
        },

        /**
         * Деактивирует поле ввода.
         *
         * @returns {Input}
         */
        disable: function () {
            if (this.isEnabled()) {
                this.blur();
                this._control.attr('disabled', 'disabled');
                this._setState('disabled');
            }
            return this;
        },

        /**
         * Активирует поле ввода.
         *
         * @returns {Input}
         */
        enable: function () {
            if (!this.isEnabled()) {
                this._control.removeAttr('disabled');
                this._removeState('disabled');
            }
            return this;
        },

        /**
         * Возвращает значение атрибута name.
         *
         * @returns {String}
         */
        getName: function () {
            return this._control.attr('name');
        },

        /**
         * Возвращает значение поля ввода.
         *
         * @returns {String}
         */
        getValue: function () {
            return this._control.val();
        },

        /**
         * Устанавливает значение для поля ввода.
         *
         * @param {String} value
         * @returns {Input}
         */
        setValue: function (value) {
            this._control.val(value);
            this._handleChange();
            return this;
        },

        /**
         * Возвращает позицию текстового курсора.
         *
         * @returns {Number}
         */
        getCaretPosition: function () {
            return dom.selection.getInputCaretPosition(this._control);
        },

        /**
         * Отключает браузерный автокомплит.
         *
         * @returns {Input}
         */
        disableAutocomplete: function () {
            this._control.attr('autocomplete', 'off');
            return this;
        },

        /**
         * Включает браузерный автокомплит.
         *
         * @returns {Input}
         */
        enableAutocomplete: function () {
            this._control.removeAttr('autocomplete');
            return this;
        },

        /**
         * Проверяет, включен ли браузерный автокомплит.
         *
         * @returns {Boolean}
         */
        isAutocompleteEnabled: function () {
            return this._control.attr('autocomplete') !== 'off';
        }
    }, {
        getBlockName: function () {
            return 'input';
        },

        /**
         * Отложенная инициализация.
         */
        _liveInit: function () {
            this._liveBindToElement('control', 'focusin', function () {
                this._setState('focused');
                this.emit('focus');
            });
            this._liveBindToElement('control', 'focusout', function () {
                this._removeState('focused');
                this.emit('blur');
            });
        }
    });

    provide(Input);

});
