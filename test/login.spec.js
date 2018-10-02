import { LoginForm } from '../src/login';

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

    it('should call loginSuccess method onSubmit and prevent default submit event', () => {
        const testRunner = process.env.TEST_RUNNER;
        const event = {
            preventDefault: testRunner === 'karma' 
                ? sinon.spy()
                : jest.fn()
        };
        loginForm.loginSuccess = testRunner === 'karma' 
            ? sinon.spy()
            : jest.fn();

        loginForm.onSubmit(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(loginForm.loginSuccess).toHaveBeenCalled();
    });
});
