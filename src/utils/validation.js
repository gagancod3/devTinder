import validate from 'validator';

export const ValidateSignUp = (request) => {

    const {firstName, lastName, emailId, password} = request; // destructuring request body

    if (!firstName || !lastName) {
        throw new Error('Please enter the name');
    }
    else if (!validate.isEmail(emailId)) {
        throw new Error('Please enter a valid email address');
    }
    else if (!validate.isStrongPassword(password)){
        throw new Error('Please enter a strong password');
    }
}