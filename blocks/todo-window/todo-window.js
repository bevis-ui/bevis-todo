modules.define(
    'todo-window',
    ['block', 'inherit', 'todo-add-form', 'todo-list', 'todo-footer'],
    function (provide, Block, inherit, TodoAddForm, TodoList, TodoFooter) {

    var TodoWindow = inherit(Block, {
        __constructor: function () {
            this.__base.apply(this, arguments);
            this._todoAddForm = TodoAddForm.find(this);
            this._todoList = TodoList.find(this);
            this._todoFooter = TodoFooter.find(this);
        },

        getTodoAddForm: function () {
            return this._todoAddForm;
        },

        getTodoList: function () {
            return this._todoList;
        },

        getTodoFooter: function () {
            return this._todoFooter;
        }
    }, {
        getBlockName: function () {
            return 'todo-window';
        }
    });

    provide(TodoWindow);

});
