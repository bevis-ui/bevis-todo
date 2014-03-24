modules.define(
    'todo-list',
    ['block', 'inherit', 'todo-list-item', 'checkbox'],
    function (provide, Block, inherit, TodoListItem, Checkbox) {

    var TodoList = inherit(Block, {
        setModel: function (model, listModelView) {
            var container = this._findElement('items');
            var itemIndex = {};
            listModelView.getItems().forEach(function (item) {
                var todoListItem = new TodoListItem(listModelView, item.id);
                itemIndex[item.id] = todoListItem;
                container.append(todoListItem.getDomNode());
            });
            this._bindTo(listModelView, 'item-add', function (item) {
                var todoListItem = new TodoListItem(listModelView, item.id);
                itemIndex[item.id] = todoListItem;
                container.prepend(todoListItem.getDomNode());
            });
            this._bindTo(listModelView, 'item-remove', function (item) {
                var todoListItem = itemIndex[item.id];
                if (todoListItem) {
                    delete itemIndex[item.id];
                    var domNode = todoListItem.getDomNode();
                    todoListItem.destruct();
                    domNode.remove();
                }
            });

            function isListCompleted () {
                var items = model.getItems();
                return items.length > 0 && items.every(function (item) {
                    return item.completed;
                });
            }

            var toggle = Checkbox.find(this._findElement('toggle-all'));
            var _this = this;

            function onToggleChange() {
                var newCompletedState = !isListCompleted();
                model.getItems().forEach(function (item) {
                    if (item.completed !== newCompletedState) {
                        model.updateItem(item.id, {completed: newCompletedState});
                    }
                });
            }

            this._bindTo(toggle, 'change', onToggleChange);

            function updateToggleState () {
                _this._unbindFrom(toggle, 'change', onToggleChange);
                if (isListCompleted()) {
                    toggle.check();
                } else {
                    toggle.uncheck();
                }
                _this._bindTo(toggle, 'change', onToggleChange);
            }
            this._bindTo(model, 'change', updateToggleState);
            updateToggleState();
        }
    }, {
        getBlockName: function () {
            return 'todo-list';
        }
    });
    provide(TodoList);
});
