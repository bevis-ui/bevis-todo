modules.define(
    'test',
    ['todo-model'],
    function (provide, TodoModel) {

    describe('todo-model', function () {
        var todoModel;
        beforeEach(function () {
            todoModel = new TodoModel();
        });
        describe('__constructor', function () {
            it('should prepare empty item list with no arguments', function () {
                todoModel.getItems().length.should.equal(0);
            });
            it('should consume initial data', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.getItem(1).text.should.equal('Hello');
                todoModel.getItem(2).text.should.equal('World');
            });
        });
        describe('addItem', function () {
            it('should add item to the list', function () {
                todoModel.addItem({id: 1, text: 'Hello'});
                todoModel.getItem(1).text.should.equal('Hello');
                todoModel.addItem({id: 2, text: 'World'});
                todoModel.getItem(2).text.should.equal('World');
            });
            it('should trigger `change` event', function (done) {
                todoModel.on('change', done);
                todoModel.addItem({id: 1, text: 'Hello'});
            });
            it('should trigger `item-add` event', function (done) {
                todoModel.on('item-add', function (item) {
                    item.id.should.equal(1);
                    item.text.should.equal('Hello');
                    done();
                });
                todoModel.addItem({id: 1, text: 'Hello'});
            });
        });
        describe('removeItem', function () {
            it('should remove item from the list', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.hasItem(2).should.be.true;
                todoModel.removeItem(2);
                todoModel.hasItem(2).should.be.false;
            });
            it('should trigger `change` event', function (done) {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.on('change', done);
                todoModel.removeItem(2);
            });
            it('should trigger `item-remove` event', function (done) {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.on('item-remove', function (item) {
                    item.id.should.equal(1);
                    item.text.should.equal('Hello');
                    done();
                });
                todoModel.removeItem(1);
            });
            it('should raise an error for non-existing item', function (done) {
                try {
                    todoModel.removeItem(1);
                } catch (e) {
                    e.message.should.equal('Item not found for id "1"');
                    done();
                }
            });
        });
        describe('updateItem', function () {
            it('should update item in the list', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'}
                ]);
                todoModel.updateItem(1, {text: 'Hello!'});
                todoModel.getItem(1).text.should.equal('Hello!');
            });
            it('should trigger `change` event', function (done) {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'}
                ]);
                todoModel.on('change', done);
                todoModel.updateItem(1, {text: 'Hello!'});
            });
            it('should trigger `item-update` event', function (done) {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.on('item-remove', function (item) {
                    item.id.should.equal(1);
                    item.text.should.equal('Hello');
                    done();
                });
                todoModel.removeItem(1);
            });
            it('should raise an error for non-existing item', function (done) {
                try {
                    todoModel.updateItem(1, {text: 'Hello'});
                } catch (e) {
                    e.message.should.equal('Item not found for id "1"');
                    done();
                }
            });
        });
        describe('getItem', function () {
            it('should return item by id', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.getItem(1).text.should.equal('Hello');
                todoModel.getItem(1).id.should.equal(1);
                todoModel.getItem(2).text.should.equal('World');
                todoModel.getItem(2).id.should.equal(2);
            });
            it('should raise an error for non-existing item', function (done) {
                try {
                    todoModel.getItem(1);
                } catch (e) {
                    e.message.should.equal('Item not found for id "1"');
                    done();
                }
            });
            it('should return different object instance', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.getItem(1).should.not.equal(todoModel.getItem(1));
            });
        });
        describe('getItems', function () {
            it('should return all items', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                var items = todoModel.getItems();
                items[0].text.should.equal('Hello');
                items[0].id.should.equal(1);
                items[1].text.should.equal('World');
                items[1].id.should.equal(2);
                items.length.should.equal(2);
            });
            it('should return different array instance', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.getItems().should.not.equal(todoModel.getItems());
            });
        });
        describe('hasItem', function () {
            it('should return `true` for existing items', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.hasItem(1).should.be.true;
                todoModel.hasItem(2).should.be.true;
            });
            it('should return `false` for non-existing items', function () {
                todoModel = new TodoModel([
                    {id: 1, text: 'Hello'},
                    {id: 2, text: 'World'}
                ]);
                todoModel.hasItem(3).should.be.false;
            });
        });
    });
    provide();
});
