modules.define(
    'checkbox',
    ['block', 'inherit', 'dom'],
    function (provide, YBlock, inherit, dom) {

        var Checkbox = inherit(YBlock, {
            /**
             * Конструктор.
             */
            __constructor: function () {
                this.__base.apply(this, arguments);

                this._control = this._findElement('control');

                if (this.isIndeterminate()) {
                    this._control.prop('indeterminate', true);
                }
            },

            /**
             * Возвращает `true`, если чекбокс выбран, `false` - не выбран.
             *
             * @returns {Boolean}
             */
            isChecked: function () {
                return this._control.prop('checked');
            },

            /**
             * Установка состояния `checked` у чекбокса.
             *
             * @returns {Checkbox}
             */
            check: function () {
                if (this.isEnabled()) {
                    if (!this._control.prop('checked')) {
                        this._setState('checked');
                        this._control.prop('checked', true);
                        this._removeIndeterminateState();
                        this.emit('change');
                    } else {
                        this._removeIndeterminateState();
                    }
                }
                return this;
            },

            /**
             * Снятие состояния `checked` у чекбокса.
             *
             * @returns {Checkbox}
             */
            uncheck: function () {
                if (this.isEnabled()) {
                    if (this._control.prop('checked')) {
                        this._removeState('checked');
                        this._control.prop('checked', false);
                        this._removeIndeterminateState();
                        this.emit('change');
                    } else {
                        this._removeIndeterminateState();
                    }
                }
                return this;
            },

            /**
             * Возвращает `true`, если чекбокс в неопределенном состоянии (indeterminate),
             * `false` - если чекбокс выбран или не выбран.
             *
             * @returns {Boolean}
             */
            isIndeterminate: function () {
                return this._getState('indeterminate');
            },

            /**
             * Установка чекбокса в неопределенное состояние.
             *
             * @returns {Checkbox}
             */
            setIndeterminate: function () {
                if (this.isEnabled()) {
                    this._setState('indeterminate');
                    this._control.prop('indeterminate', true);
                    this.emit('indeterminate');
                }
                return this;
            },

            /**
             * Снятие у чекбокса неопределенного состояния.
             *
             * @returns {Checkbox}
             */
            setDeterminate: function () {
                if (this.isEnabled()) {
                    this._removeState('indeterminate');
                    this._control.prop('indeterminate', false);
                    this.emit('determinate');
                }
                return this;
            },

            /**
             * Возвращает `true`, если чекбокс доступен,
             * `false` - не доступен.
             *
             * @returns {Boolean}
             */
            isEnabled: function () {
                return !this._getState('disabled');
            },

            /**
             * Делает чекбокс доступным (разрешены пользовательские действия).
             *
             * @returns {Checkbox}
             */
            enable: function () {
                if (!this.isEnabled()) {
                    this._control.removeAttr('disabled');
                    this._removeState('disabled');
                    this.emit('enable');
                }
                return this;
            },

            /**
             * Делает чекбокс недоступным (запрещены пользовательские действия).
             *
             * @returns {Checkbox}
             */
            disable: function () {
                if (this.isEnabled()) {
                    this.blur();
                    this._control.attr('disabled', 'disabled');
                    this._setState('disabled');
                    this.emit('disable');
                }
                return this;
            },

            /**
             * Возвращает `true`, если чекбокс имеет фокус,
             * `false`, если чекбокс не в фокусе.
             *
             * @returns {Boolean}
             */
            isFocused: function () {
                return dom.focus.hasFocus(this._control);
            },

            /**
             * Устанавливает фокус на чекбокс.
             *
             * @returns {Checkbox}
             */
            focus: function () {
                if (this.isEnabled() && !this.isFocused()) {
                    this._control.focus();
                }
                return this;
            },

            /**
             * Удаляет фокус с чекбокса.
             *
             * @returns {Checkbox}
             */
            blur: function () {
                if (this.isFocused()) {
                    this._control.blur();
                }
                return this;
            },

            /**
             * Обработка изменения свойства `checked` у чекбокса.
             */
            _onChange: function () {
                if (this._control.prop('checked')) {
                    this._setState('checked');
                } else {
                    this._removeState('checked');
                }
                this._removeIndeterminateState();
                this.emit('change');
            },

            /**
             * Снятие неопределенного состояния у чекбокса, если оно есть.
             */
            _removeIndeterminateState: function () {
                if (!this._getState('indeterminate')) {
                    return;
                }
                this._removeState('indeterminate');
                this.emit('determinate');
            }
        }, {
            getBlockName: function () {
                return 'checkbox';
            },

            /**
             * Отложенная инициализация.
             */
            _liveInit: function () {
                this._liveBind('mousedown', function () {});
                this._liveBindToElement('control', 'change', function () {
                    this._onChange();
                });
                this._liveBind('focusin', function () {
                    this._setState('focused');
                    this.emit('focus');
                });
                this._liveBind('focusout', function () {
                    this._removeState('focused');
                    this.emit('blur');
                });
            }
        });

        provide(Checkbox);
});
