import axios from 'axios';

export class LoginForm{
    constructor(options = {}) {
        this.form = {
            isValid: false,
            usernameInput: null,
            passwordInput: null,
        };
        this.render((usernameInput, passwordInput) => {
            this.form.usernameInput = {
                element: usernameInput,
                isValid: false
            };
            this.form.passwordInput = {
                element: passwordInput,
                isValid: false
            };
        });
        this.submitUrl = options.submitUrl || 'users/login';
    }
    checkFormValidity(){
        const submitButton = document.querySelector('.login-component__wrapper form button');
        if (this.form.usernameInput.isValid && this.form.passwordInput.isValid) {
            this.form.isValid = true;
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    setValidationError(isValid, input, message) {
        let errorWrapper = input.parentNode.querySelector('p');
        if (isValid) {
            if (errorWrapper) {
                errorWrapper.parentNode.removeChild(errorWrapper);
            }
            input.classList.remove('validation-error');
        } else {
            if (!errorWrapper) {
                errorWrapper = document.createElement('p');
                errorWrapper.textContent = message;
                input.insertAdjacentElement('afterend', errorWrapper);
            }
            input.classList.add('validation-error');
        }
    }
    isEmail(email) {
        const validationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validationRegex.test(email.toLowerCase());
    }
    inputValidation(event) {
        const input = event.target;
        let errorMessage = 'error';
        let isValid = false;

        switch(input.id) {
            case 'username':
                errorMessage = 'Ingresa un correo válido.';
                isValid = input.value && this.isEmail(input.value);
                this.form.usernameInput.isValid = isValid;
                break;
            case 'password':
                errorMessage = 'El password tiene un mínimo de 6 caractéres.';
                isValid = input.value && input.value.length >= 6;
                this.form.passwordInput.isValid = isValid;
                break;
        }
        this.setValidationError(isValid, input, errorMessage);
        this.checkFormValidity();
    }
    onSubmit(event) {
        event.preventDefault();
        const loginOptions = {
            username: this.form.usernameInput,
            password: this.form.passwordInput
        };

        return axios.post(this.submitUrl, loginOptions)
            .then(this.loginSuccess)
            .catch(this.loginError);
    }
    loginSuccess(response) {
        const serializedData = JSON.stringify(response.user);
        window.localStorage.setItem('userData', serializedData);
    }
    loginError(error) {
        console.log("LOGIN ERROR", error);
    }
    render(done) {
        const loginTemplate = document.createElement('div');
        loginTemplate.classList.add('login-component__wrapper');
        loginTemplate.innerHTML = `
            <form>
                <label for="username"> 
                    <span> Usuario </span>
                    <input id="username" type="text" placeholder="Ingresa tu correo electrónico">
                </label>
                <label for="password"> 
                    <span> Contraseña </span>
                    <input id="password" type="password" placeholder="Ingresa tu contraseña">
                </label>
                <button type="submit" disabled>Ingresar</button>
            </form>
        `;
        document.body.appendChild(loginTemplate);

        const formElement = document.querySelector('.login-component__wrapper form');
        formElement.addEventListener('submit', this.onSubmit.bind(this));

        const usernameInput = document.querySelector('.login-component__wrapper form #username');
        const passwordInput = document.querySelector('.login-component__wrapper form #password');
        
        ['blur', 'keyup'].forEach(event => {
            usernameInput.addEventListener(event, this.inputValidation.bind(this));
            passwordInput.addEventListener(event, this.inputValidation.bind(this));
        });

        done(usernameInput, passwordInput);
    }
}