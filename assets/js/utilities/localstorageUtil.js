let localStorageUtil = (function() {
    let _this = {};

    _this.delete = function (key) {
        localStorage.removeItem(key);
    };

    _this.get = function (key) {
        let data = localStorage.getItem(key);
        return data ? JSON.parse(data) : false;
    };

    _this.save = function (key, value) {
        valueStr = JSON.stringify(value);
        localStorage.setItem(key, valueStr);
    };

    return _this;
})();
