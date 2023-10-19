let formDataUtil = (() => {
    let _this = {};

    _this.formToObject = form => {
        const _formData = new FormData(form);
        const obj = {};
        _formData.forEach((value, key) => (obj[key] = value));
        return obj;
    };

    return _this;
})();
