let generalUtil = (() => {
    let _this = {};

    _this.formatPrice = value => `&#36;&nbsp;${value}`;

    _this.getDate = () => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    };

    return _this;
})();
