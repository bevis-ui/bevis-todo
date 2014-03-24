modules.define(
    'todo-footer',
    ['block', 'inherit', 'todo-model-view', 'jquery'],
    function (provide, Block, inherit, TodoModelView, $) {

    var TodoFooter = inherit(Block, {
        setModel: function (model, listModelView) {
            this._model = model;
            this._listModelView = listModelView;

            // Completed items
            this._completeItemsModel = new TodoModelView(model, {completed: true});
            this._clearCompletedCountElement = this._findElement('clear-count');
            this._bindTo(this._completeItemsModel, 'item-add', this._onCompletedCountChange);
            this._bindTo(this._completeItemsModel, 'item-remove', this._onCompletedCountChange);
            this._onCompletedCountChange();

            this._bindTo(this._findElement('clear'), 'click', this._onClearCompletedClick);

            // Incomplete items
            this._incompleteStatCountElement = this._findElement('stat-count');
            this._incompleteStatTextElement = this._findElement('stat-text');
            this._incompleteItemsModel = new TodoModelView(model, {completed: false});
            this._bindTo(this._incompleteItemsModel, 'item-add', this._onIncompleteCountChange);
            this._bindTo(this._incompleteItemsModel, 'item-remove', this._onIncompleteCountChange);
            this._onIncompleteCountChange();

            // All items
            this._bindTo(model, 'item-add', this._onTotalItemCountChange);
            this._bindTo(model, 'item-remove', this._onTotalItemCountChange);
            this._onTotalItemCountChange();

            this._findAllElements('filter').forEach(function (filter) {
                this._bindTo(filter, 'click', this._onFilterClick);
            }, this);
        },

        _onCompletedCountChange: function () {
            var completedCount = this._completeItemsModel.getItems().length;
            this._clearCompletedCountElement.text(' (' + completedCount + ')');
            this._setState('has-completed', completedCount > 0);
        },

        _onClearCompletedClick: function () {
            this._completeItemsModel.getItems().forEach(function (item) {
                this._completeItemsModel.removeItem(item.id);
            }, this);
        },

        _onIncompleteCountChange: function () {
            var incompleteCount = this._incompleteItemsModel.getItems().length;
            this._incompleteStatCountElement.text(incompleteCount);
            this._incompleteStatTextElement.text(' item' + (incompleteCount === 1 ? '' : 's') + ' left');
        },

        _onTotalItemCountChange: function () {
            var itemCount = this._model.getItems().length;
            this._setState('has-items', itemCount > 0);
        },

        _filterConditions: {
            all: {},
            active: {completed: false},
            completed: {completed: true}
        },

        _onFilterClick: function (e) {
            var clickedFilter = $(e.target);
            this._findAllElements('filter').forEach(function (filter) {
                this._removeElementState(filter, 'active');
            }, this);
            this._setElementState(clickedFilter, 'active');

            var filterName = clickedFilter.attr('data-name');
            this._listModelView.setCondition(this._filterConditions[filterName]);
        }
    }, {
        getBlockName: function () {
            return 'todo-footer';
        }
    });
    provide(TodoFooter);
});
