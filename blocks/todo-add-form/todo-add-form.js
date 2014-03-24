modules.define(
    'todo-add-form',
    ['block', 'inherit', 'input'],
    function (provide, Block, inherit, Input) {

    var TodoAddForm = inherit(Block, {
        setModel: function (model) {
            var newTaskInput = Input.find(this);
            this._bindTo(this.getDomNode(), 'submit', function (e) {
                e.preventDefault();
                var newTaskText = newTaskInput.getValue().trim();
                if (newTaskText) {
                    model.addItem({
                        id: model.generateId(),
                        text: newTaskText,
                        completed: false
                    });
                    newTaskInput.setValue('');
                }
            });
        }
    }, {
        getBlockName: function () {
            return 'todo-add-form';
        }
    });
    provide(TodoAddForm);
});
