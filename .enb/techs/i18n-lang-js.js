/**
 * i18n-lang-js
 * ============
 *
 * Собирает `?.lang.<язык>.js`-файлы на основе `?.keysets.<язык>.js`-файлов.
 *
 * Исходные и конечные таргеты в данный момент не настраиваются (нет запроса).
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.lang.{lang}.js`.
 * * *String* **lang** — Язык, для которого небходимо собрать файл.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTechs([
 *   [ require('./techs/i18n-lang-js'), { lang: 'all'} ],
 *   [ require('./techs/i18n-lang-js'), { lang: '{lang}'} ],
 * ]);
 * ```
 */
var vowFs = require('vow-fs');
var Vow = require('vow');
var tanker = require('enb/exlib/tanker');

module.exports = require('enb/lib/build-flow').create()
    .name('i18n-lang-js')
    .target('target', '?.lang.{lang}.js')
    .defineOption('i18nFile', '')
    .defineRequiredOption('lang')
    .useSourceFilename('keysetsTarget', '?.keysets.{lang}.js')
    .needRebuild(function(cache) {
        this._i18nFile = this._i18nFile || __dirname + '/../lib/i18n.js';
        return cache.needRebuildFile('i18n-file', this._i18nFile);
    })
    .saveCache(function(cache) {
        cache.cacheFileInfo('i18n-file', this._i18nFile);
    })
    .builder(function(keysetsFilename) {
        this._i18nClassData = '';
        return vowFs.read(this._i18nFile, 'utf8').then(function (i18nClassData) {
            this._i18nClassData = i18nClassData;
            delete require.cache[keysetsFilename];
            var keysets = require(keysetsFilename),
                _this = this,
                lang = this._lang,
                res = [];
            Object.keys(keysets).sort().forEach(function(keysetName) {
                res.push(_this.__self.getKeysetBuildResult(keysetName, keysets[keysetName], lang));
            });
            return this.getPrependJs(lang) + '\n' + res.join('\n\n') + '\n' + this.getAppendJs(lang);
        }.bind(this));
    })
    .methods({
        getPrependJs: function(lang) {
            if (lang !== 'all') {
                return '(function(){\nfunction initKeyset(i18n) {\n' +
                    'if (!i18n || typeof i18n !== "function") {\n' +
                    'i18n = ' + this._i18nClassData + '\n' +
                    '}\n\n';
            } else {
                return '';
            }
        },
        getAppendJs: function(lang) {
            if (lang !== 'all') {
                var res = [];
                res.push('i18n.setLanguage(\'' + lang + '\');');
                res.push('return i18n;');
                res.push('}');
                res.push('if (typeof modules !== \'undefined\') {');
                res.push('    modules.define(\'i18n\', function (provide, i18n) {');
                res.push('        provide(initKeyset(i18n));');
                res.push('    });');
                res.push('} else if (typeof module !== \'undefined\') {');
                res.push('    module.exports = function() {return initKeyset();};');
                res.push('} else {');
                res.push('    window.i18n = initKeyset();');
                res.push('}');
                res.push('})();');
                return res.join('\n');
            } else {
                return '';
            }
        }
    })
    .staticMethods({
        getKeysetBuildResult: function(keysetName, keyset, lang) {
            var res = [];
            if (keysetName === '') {
                res.push(keyset);
            } else {
                res.push("i18n.add('" + keysetName + "', {");
                Object.keys(keyset).map(function(key, i, arr) {
                    tanker.xmlToJs(keyset[key], function(js) {
                        res.push('    ' + JSON.stringify(key) + ': ' + js + (i === arr.length - 1 ? '' : ','));
                    });
                });
                res.push('});');
            }
            return res.join('\n');
        }
    })
    .createTech();
