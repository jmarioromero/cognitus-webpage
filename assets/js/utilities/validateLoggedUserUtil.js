let validateLoggedUserUtil = ((localStorageUtil) => {
    let _this = {};

    _this.validate = (indexPath) => {

        let body = document.querySelector('div#body-container');

        body.classList.add('hidden-body');
        
        const userLogged = localStorageUtil.get('userLogged');

        if (userLogged) {
            body.classList.remove('hidden-body');
        } else {
            window.location.replace(indexPath);
        }
    };

    return _this;
})(localStorageUtil);
