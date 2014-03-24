module.exports = function (config) {
    config.setLanguages(['ru', 'en']);

    config.nodes('build/*');

    config.nodeMask(/^build\/.*$/, function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/file-provider'), {target: '?.bemdecl.js'}],
            [require('enb/techs/levels'), {levels: getLevels()}],
            require('enb-modules/techs/deps-with-modules'),
            require('enb/techs/files'),
            require('enb-stylus/techs/css-stylus-with-autoprefixer'),
            [require('enb/techs/browser-js'), {target: '?.pre.js'}],
            require('enb-bt/techs/bt-server'),
            [require('enb-bt/techs/bt-client-module'), {target: '?.client.bt.js'}],
            [require('enb/techs/pub-js-i18n') , {
                target: '?.pre.{lang}.js',
                jsTarget: '?.pre.js',
                bemhtmlTarget: '?.client.bt.js',
                lang: '{lang}'
            }],
            [require('enb-modules/techs/prepend-modules'), {source : '?.pre.{lang}.js', target: '?.{lang}.js'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'all'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: '{lang}'}],
            [require('./techs/i18n-lang-js'), {lang: 'all' }],
            [require('./techs/i18n-lang-js'), {lang: '{lang}'}],
            [require('./techs/page')]
        ]);
        nodeConfig.addTargets(['_?.{lang}.js', '_?.css']);

        nodeConfig.mode('development', function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/file-copy'), {sourceTarget: '?.{lang}.js', destTarget: '_?.{lang}.js'}],
                [require('enb/techs/file-copy'), {sourceTarget: '?.css', destTarget: '_?.css'}]
           ]);
       });
        nodeConfig.mode('production', function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/borschik'), {sourceTarget: '?.{lang}.js', destTarget: '_?.{lang}.js'}],
                [require('enb/techs/borschik'), {sourceTarget: '?.css', destTarget: '_?.css', freeze: 'yes'}]
           ]);
        });
    });

    config.node('test', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/files')],
            [require('enb/techs/levels'), {levels: getLevels()}],
            [require('enb/techs/bemdecl-test'), {target: 'test.bemdecl.js'}],
            [require('enb/techs/js-test'), {fileMask: getTestFileMask()}],
            require('enb-modules/techs/deps-with-modules'),
            [require('enb/techs/i18n-merge-keysets'), {lang: 'all'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'ru'}],
            [require('./techs/i18n-lang-js'), {lang: 'all' }],
            [require('./techs/i18n-lang-js'), {lang: 'ru'}],
            [require('enb/techs/js'), {target: '?.source.js'}],
            [require('enb-bt/techs/bt-client-module'), {target: '?.bt.client.js'}],
            [require('enb/techs/pub-js-i18n'), {
                target: '?.pre.js',
                jsTarget: '?.source.js',
                bemhtmlTarget: '?.bt.client.js',
                lang: 'ru'
            }],
            [require('enb-modules/techs/prepend-modules'), {source: '?.pre.js', target: '?.js'}],
            [require('enb/techs/file-provider'), {target: 'test.html'}],
            [require('enb/techs/file-provider'), {target: 'mocha.js'}],
            [require('enb/techs/file-provider'), {target: 'mocha.css'}],
            [require('enb/techs/file-provider'), {target: 'chai.js'}],
            [require('enb/techs/file-provider'), {target: 'sinon.js'}]
        ]);

        nodeConfig.addTargets([
            '?.js',
            '?.test.js'
        ]);
    });

    function getLevels() {
        return [
            'core',
            'blocks',
            'pages'
        ].map(config.resolvePath.bind(config));
    }

    function getTestFileMask() {
        var tests = process.env.TEST_CASES;
        if (tests) {
            var filesForMask = tests.split(' ')
                .map(function (test) {
                    return test
                        .replace(/\//g, '\\/')
                        .replace(/\./g, '\\.') +
                        '$';
                })
                .join('|');
            var fileMask = new RegExp(filesForMask);
        }
        return fileMask || /^((?!vendors).)*$/;
    }
};
