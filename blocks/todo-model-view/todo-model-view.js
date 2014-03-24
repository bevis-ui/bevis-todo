modules.define(
    'todo-model-view',
    ['inherit', 'event-emitter', 'extend'],
    function (provide, inherit, EventEmitter, extend) {

    var TodoModelView = inherit(EventEmitter, {
        __constructor: function (model, condition) {
            this._model = model;
            this._condition = condition;
            this._model.on('item-add', function (item) {
                if (this._itemMatches(item)) {
                    this.emit('item-add', item);
                    this.emit('change');
                }
            }, this);
            this._model.on('item-remove', function (item) {
                if (this._itemMatches(item)) {
                    this.emit('item-remove', item);
                    this.emit('change');
                }
            }, this);
            this._model.on('item-update', function (item, origData) {
                var matchesAfter = this._itemMatches(item);
                var matchesBefore = this._itemMatches(origData);
                if (matchesBefore && matchesAfter) {
                    this.emit('item-update', item, origData);
                    this.emit('change');
                } else if (matchesBefore && !matchesAfter) {
                    this.emit('item-remove', item);
                    this.emit('change');
                } else if (!matchesBefore && matchesAfter) {
                    this.emit('item-add', item);
                    this.emit('change');
                }
            }, this);
        },

        _itemMatches: function (item) {
            var condition = this._condition;
            return Object.keys(condition).every(function (key) {
                return condition[key] === item[key];
            });
        },

        getCondition: function () {
            return extend({}, this._condition);
        },

        setCondition: function (condition) {
            this.getItems().forEach(function (item) {
                this.emit('item-remove', item);
            }, this);
            this._condition = extend({}, condition);
            this.getItems().reverse().forEach(function (item) {
                this.emit('item-add', item);
            }, this);
            this.emit('change');
        },

        addItem: function (item) {
            this._model.addItem(item);
        },

        removeItem: function (id) {
            if (this.hasItem(id)) {
                this._model.removeItem(id);
            } else {
                throw new Error('Item not found for id "' + id + '"');
            }
        },

        updateItem: function (id, data) {
            if (this.hasItem(id)) {
                this._model.updateItem(id, data);
            } else {
                throw new Error('Item not found for id "' + id + '"');
            }
        },

        getItems: function () {
            return this._model.getItems().filter(this._itemMatches, this);
        },

        getItem: function (id) {
            var item = this._model.getItem(id);
            if (this._itemMatches(item)) {
                return item;
            } else {
                throw new Error('Item not found for id "' + id + '"');
            }
        },

        hasItem: function (id) {
            if (this._model.hasItem(id)) {
                return this._itemMatches(this._model.getItem(id));
            } else {
                return false;
            }
        }
    });
    provide(TodoModelView);
});
