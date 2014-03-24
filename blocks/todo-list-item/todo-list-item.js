modules.define(
    'todo-list-item',
    ['block', 'inherit', 'checkbox'],
    function (provide, Block, inherit, Checkbox) {

    var TodoListItem = inherit(Block, {
        __constructor: function (model, id) {
            var item = model.getItem(id);

            this.__base(null, {
                text: item.text,
                completed: item.completed
            });

            this._model = model;
            this._id = id;
            var textInput = this._findElement('edit');

            var checkbox = Checkbox.find(this.getDomNode());

            this._bindTo(this._model, 'item-update', function (item) {
                if (item.id === id) {
                    this._findElement('text').text(item.text);

                    if (textInput.val() !== item.text) {
                        this._findElement('edit').val(item.text);
                    }

                    if (item.completed) {
                        this._setState('completed');
                        checkbox.check();
                    } else {
                        this._removeState('completed');
                        checkbox.uncheck();
                    }
                }
            });

            this._bindTo(checkbox, 'change', function () {
                this._model.updateItem(this._id, {
                    completed: Checkbox.find(this).isChecked()
                });
            });

            var textInputChangeHandler = function () {
                this._model.updateItem(this._id, {
                    text: textInput.val()
                });
            }.bind(this);

            this._bindTo(textInput, 'change', textInputChangeHandler);

            this._bindTo(textInput, 'keyup', textInputChangeHandler);
        }
    }, {
        getBlockName: function () {
            return 'todo-list-item';
        },

        _liveInit: function () {
            this._liveBindToElement('text', 'dblclick', function () {
                this._setState('editing');
                this._findElement('edit').focus();
            });

            this._liveBindToElement('edit', 'focusout', function () {
                this._removeState('editing');
            });

            this._liveBindToElement('edit', 'keyup', function (e) {
                if (e.keyCode === 13) {
                    this._removeState('editing');
                }
            });

            this._liveBindToElement('delete', 'click', function () {
                this._model.removeItem(this._id);
            });
        }
    });

    provide(TodoListItem);
});
