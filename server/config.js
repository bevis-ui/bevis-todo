exports.get = function (name) {
    return require('../configs/development/' + name);
};
