import axiosMock from 'axios';
import { LoginForm } from '../../src/login';

describe('Login Form Component', () => {
    
    const logComponent = (title = '') => {
        console.log(`******************** ${title} ****************************`);
        console.log(document.querySelector('.login-component__wrapper').innerHTML);
        console.log('************************************************');
    };
    let loginForm;

    beforeEach(() => {
        loginForm = new LoginForm();
    });
    afterEach(() => {});

    it('should be create an instance of LoginForm class', () => {
        expect(loginForm instanceof LoginForm).toBe(true);
    });

    it('should set validation error when an input is not valid', () => {
        const isValid = false;
        const targetInput = document.querySelector('input#username');
        const errorMessage = 'Please write an valid email address.';
        
        loginForm.setValidationError(isValid, targetInput, errorMessage);
        
        const errorWrapper = document.querySelector('#username ~ p');
        expect(errorWrapper.textContent).toEqual(errorMessage);
        expect(targetInput.classList.contains('validation-error')).toBe(true);
    });

    it('should remove validation error message when the input is valid', () => {
        let isValid = false;
        const targetInput = document.querySelector('input#username');
        const errorMessage = 'Please write an valid email address.';
        loginForm.setValidationError(isValid, targetInput, errorMessage);

        isValid = true;
        loginForm.setValidationError(isValid, targetInput, errorMessage);
        
        const errorWrapper = document.querySelector('#username ~ p');
        expect(errorWrapper).toBe(null);
        expect(targetInput.classList.contains('validation-error')).toBe(false);
    });


    const buildSubmitScenario = (mode = 'success') => {
        if(mode === 'error') {
            const rejectedValue = new Error();
            axiosMock.post.mockReturnValue(Promise.reject(rejectedValue));
        } else if(mode === 'success') {
            const resolvedValue = { status : 'ok' };
            axiosMock.post.mockReturnValue(Promise.resolve(resolvedValue));
        }
        return { 
            eventMock: { preventDefault: jest.fn() } 
        };
    }

    it('should call loginSuccess method on submit and prevent default submit event', async() => {
        const { eventMock } = buildSubmitScenario();
        loginForm.loginSuccess = jest.fn();

        await loginForm.onSubmit(eventMock);

        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(loginForm.loginSuccess).toHaveBeenCalled();
    });

    it('should call loginError method on submit and prevent default submit event', async() => {
        const { eventMock } = buildSubmitScenario('error');
        loginForm.loginError = jest.fn();

        await loginForm.onSubmit(eventMock);

        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(loginForm.loginError).toHaveBeenCalled();
    });
});
