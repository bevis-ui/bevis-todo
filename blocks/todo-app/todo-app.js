modules.define(
    'todo-app',
    ['inherit', 'todo-model', 'todo-model-view', 'user-data-storage'],
    function (provide, inherit, TodoModel, TodoModelView, UserDataStorage) {

    var TodoApp = inherit({
        start: function (todoWindow) {
            var dataStorage = new UserDataStorage();
            var todoModel = new TodoModel(dataStorage.getValue('todo-items') || []);

            var listModelView = new TodoModelView(todoModel, {});
            todoWindow.getTodoList().setModel(todoModel, listModelView);
            todoWindow.getTodoAddForm().setModel(todoModel);
            todoWindow.getTodoFooter().setModel(todoModel, listModelView);

            todoModel.on('change', function () {
                dataStorage.setValue('todo-items', todoModel.getItems());
            });
        },

        stop: function () {

        }
    });

    provide(TodoApp);
});
