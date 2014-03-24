(function() {

function createI18nInstance() {
    /**
     * Возвращает локализованное значение ключа для переданного кейсета.
     *
     * @param {String} keysetName
     * @param {String} keyName
     * @param {Object} [options]
     */
    var i18n = function (keysetName, keyName, options) {
        var keyset = i18n._keysets[keysetName];
        if (!keyset) {
            throw new Error('Keyset "' + keysetName + '" was not found.');
        }
        var value = keyset[keyName];
        if (value === undefined) {
            throw new Error('Key "' + keyName + '" in keyset "' + keysetName + '" was not found.');
        }
        if (typeof value === 'function') {
            return value.call(this, options);
        } else {
            return value;
        }
    };

    /**
     * Хранилище кейсетов.
     *
     * @type {Object}
     */
    i18n._keysets = {};

    /**
     * Текущий язык.
     *
     * @type {String}
     */
    i18n._language = 'ru';

    /**
     * Добавляет кейсет в хранилище.
     *
     * @param {String} keysetName
     * @param {String} keysetData
     */
    i18n.add = function (keysetName, keysetData) {
        i18n._keysets[keysetName] = keysetData;
        return i18n;
    };

    /**
     * Устанавливает текущий язык.
     *
     * @param {String} language
     */
    i18n.setLanguage = function (language) {
        this._language = language;
        return this;
    };

    /**
     * Возвращает текущий язык.
     *
     * @returns {String}
     */
    i18n.getLanguage = function () {
        return this._language;
    };

    return i18n;
}

return createI18nInstance();

})();
