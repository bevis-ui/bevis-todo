modules.define(
    'todo-model',
    ['event-emitter', 'inherit', 'extend'],
    function (provide, EventEmitter, inherit, extend) {

    var idOffset = (new Date()).getTime();
    var lastIdNumber = 0;

    var TodoModel = inherit(EventEmitter, {
        __constructor: function (initialData) {
            this._items = (initialData || []).map(function (item) {
                return extend({}, item);
            });
            this._itemIndex = this._items.reduce(function (obj, item) {
                obj[item.id] = item;
                return obj;
            }, {});
        },

        addItem: function (item) {
            item = extend({}, item);
            this._items.unshift(item);
            this._itemIndex[item.id] = item;
            this.emit('item-add', item);
            this.emit('change');
        },

        removeItem: function (id) {
            var item = this._itemIndex[id];
            if (item) {
                this._items = this._items.filter(function (item) {
                    return item.id !== id;
                });
                delete this._itemIndex[id];
                this.emit('item-remove', item);
                this.emit('change');
            } else {
                throw new Error('Item not found for id "' + id + '"');
            }
        },

        updateItem: function (id, data) {
            var item = this._itemIndex[id];
            if (item) {
                var origData = extend({}, item);
                extend(item, data);
                this.emit('item-update', item, origData);
                this.emit('change');
            } else {
                throw new Error('Item not found for id "' + id + '"');
            }
        },

        getItem: function (id) {
            var item = this._itemIndex[id];
            if (item) {
                return extend({}, item);
            } else {
                throw new Error('Item not found for id "' + id + '"');
            }
        },

        hasItem: function (id) {
            return this._itemIndex.hasOwnProperty(id);
        },

        getItems: function () {
            return this._items.map(function (item) {
                return extend({}, item);
            });
        },

        generateId: function () {
            lastIdNumber++;
            return 'id' + idOffset + '_' + lastIdNumber;
        }
    });
    provide(TodoModel);
});
