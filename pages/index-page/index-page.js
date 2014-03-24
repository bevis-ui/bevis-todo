modules.require(
    ['block', 'todo-app', 'todo-window'],
    function (Block, TodoApp, TodoWindow) {

    Block.initDomTree(document.body).done(function () {
        var todoApp = new TodoApp();
        todoApp.start(TodoWindow.find(document.body));
    });
});
