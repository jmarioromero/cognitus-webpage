let indexModule = ((formDataUtil, localStorageUtil) => {
    let _this = {};

    _this.signUp = () => {
        
        const form = document.querySelector('form#signup-form');
        
        let formObj = formDataUtil.formToObject(form);

        console.log(formObj);
    };

    _this.login = () => {
        
        const form = document.querySelector('form#login-form');
        
        let formObj = formDataUtil.formToObject(form);

        console.log(formObj);
    };

    _this.loadEvents = () => {
        
        let signUpButton = document.querySelector('button#signup-button');

        signUpButton.addEventListener('click',  (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            
            _this.signUp();

            return false;
        });
        
        let loginButton = document.querySelector('button#login-button');

        loginButton.addEventListener('click',  (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            
            _this.login();

            return false;
        });
    };

    return _this;
})(formDataUtil, localStorageUtil);

document.addEventListener("DOMContentLoaded", () => {

    indexModule.loadEvents();

});