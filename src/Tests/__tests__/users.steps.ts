import { getUser, saveNewUserDB, getDBUserByEmail, getDBUserByUid, getDBUserByDisplayName, getDBUserList, signUp, logIn, sendVerification, signOut, reload, reauthenticate, updatePassword, sendPasswordReset } from '../../api/user';
const { Given, When, Then } = require('cucumber');
import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('../../../../../SITDECG/ReSearchDecide/src/Tests/__features__/users.feature');
import { SignUpFormValues } from '../../components/forms/SignUpForm';

const { expect } = require('chai');


defineFeature(feature, (test) => {


    beforeEach(() => {



    });

    test('Save new user to the database', ({ given, when, then }) => {


        let newUser: SignUpFormValues;
        given('the user is not authenticated', () => {

        });

        when(/^a new user with email "(.*)" and password "(.*)" signs up with username "(.*)"$/, 
        async (email, password, displayName) => {
            newUser = {
                email: email,
                password: password,
                userName: displayName,
                confirmPassword: password,
            }
            await signUp(newUser);
        });

        then('the user should be saved to the database', async () => {
            const user = await getDBUserByEmail(newUser.email);
            expect(user).to.exist;
            expect(user.email).to.equal(newUser.email);
            expect(user.displayName).to.equal(newUser.userName);
        });

    });

    test('User sends verification email', ({ given, when, then }) => {
        let verificationEmailSent = false; // Variable para controlar si se envió el correo

        given('the user is authenticated', () => {

        });

        when('the user sends a verification email', async () => {
            try {
                await sendVerification();
                verificationEmailSent = true; 
            } catch (error) {
                verificationEmailSent = false;
            }


        });

        then('a verification email should be sent to the user', () => {
            expect(verificationEmailSent).to.be.true;
        });
    });


    test('Retrieve user by email', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when(/^I search for a user with email "(.*)"$/, (arg0) => {

        });

        then('the user details should be returned', () => {

        });
    });

    test('Retrieve user by UID', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when(/^I search for a user with UID "(.*)"$/, (arg0) => {

        });

        then('the user details should be returned', () => {

        });
    });


    test('Retrieve user by display name', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when(/^I search for a user with display name "(.*)"$/, (arg0) => {

        });

        then('the user details should be returned', () => {

        });
    });


    test('Retrieve user list', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when('I retrieve the list of users', () => {

        });

        then('the list of users should be returned', () => {

        });
    });


    test('User sign up', ({ given, when, then }) => {
        given('the user provides the following details:', (table) => {

        });

        when('the user signs up', () => {

        });

        then('the user should be registered successfully', () => {

        });
    });


    test('User log in', ({ given, when, then }) => {
        given('the user provides the following credentials:', (table) => {

        });

        when('the user logs in', () => {

        });

        then('the user should be logged in successfully', () => {

        });
    });




    test('User signs out', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when('the user signs out', () => {

        });

        then('the user should be logged out successfully', () => {

        });
    });


    test('User reloads their information', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when('the user reloads their information', () => {

        });

        then('the user information should be reloaded', () => {

        });
    });


    test('User reauthentication', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when(/^the user reauthenticates with email "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        then('the user should be reauthenticated successfully', () => {

        });
    });


    test('User updates password', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when(/^the user updates their password to "(.*)"$/, (arg0) => {

        });

        then('the password should be updated successfully', () => {

        });
    });


    test('User sends password reset email', ({ given, when, then }) => {
        given(/^the user provides their email "(.*)"$/, (arg0) => {

        });

        when('the user sends a password reset email', () => {

        });

        then('a password reset email should be sent', () => {

        });
    });


});



// function beforeEach(arg0: () => void) {
//     throw new Error('Function not implemented.');
// }
// function beforeEach(arg0: () => void) {
//     throw new Error('Function not implemented.');
// }
//     Given('the user is authenticated', () => {
//         // Implementation of the user authentication step
//     });

//     When('a new user with email {string} and password {string} signs up with username {string}', (email: string, password: string, userName: string) => {
//         // Implementation of the new user sign-up step
//         signUp({ email, password, userName });
//     });

//     Then('the user should be saved to the database', () => {
//         // Implementation of the user database saving verification step
//         const user = getUser();
//         expect(user).to.exist;
//     });

//     When('I search for a user with email {string}', (email: string) => {
//         // Implementation of the search user by email step
//         const user = getDBUserByEmail(email);
//         expect(user).to.exist;
//     });

//     Then('the user details should be returned', () => {
//         // Implementation of the returned user details verification step
//         // expect(userDetails).to.exist;
//     });

//     When('I search for a user with UID {string}', (uid: string) => {
//         // Implementation of the search user by UID step
//         // const user = getDBUserByUid(uid);
//         // expect(user).to.exist;
//     });

//     When('I search for a user with display name {string}', (displayName: string) => {
//         // Implementation of the search user by display name step
//         // const user = getDBUserByDisplayName(displayName);
//         // expect(user).to.exist;
//     });

//     When('I retrieve the list of users', () => {
//         // Implementation of the retrieve user list step
//         // const userList = getDBUserList();
//         // expect(userList).to.have.lengthOf.above(0);
//     });

//     Given('the user provides the following details:', (table: any) => {
//         // Implementation of getting user details from the table step
//         const userDetails = table.rowsHash();
//     });

//     When('the user signs up', () => {
//         // Implementation of the user sign-up step
//         // signUp(userDetails.email, userDetails.password, userDetails.userName);
//     });

//     Then('the user should be registered successfully', () => {
//         // Implementation of the successful user registration verification step
//         // const user = getUser();
//         // expect(user).to.exist;
//     });

//     Given('the user provides the following credentials:', (table: any) => {
//         // Implementation of getting user credentials from the table step
//         const credentials = table.rowsHash();
//     });

//     When('the user logs in', () => {
//         // Implementation of the user log-in step
//         // logIn(credentials.email, credentials.password);
//     });

//     Then('the user should be logged in successfully', () => {
//         // Implementation of the successful user log-in verification step
//         // const user = getUser();
//         // expect(user).to.exist;
//     });

//     When('the user sends a verification email', () => {
//         // Implementation of the user send verification email step
//         // sendVerification();
//     });

//     Then('a verification email should be sent to the user', () => {
//         // Implementation of the verification email sent verification step
//         // expect(verificationEmail).to.be.sent;
//     });

//     When('the user signs out', () => {
//         // Implementation of the user sign-out step
//         // signOut();
//     });

//     Then('the user should be logged out successfully', () => {
//         // Implementation of the successful user log-out verification step
//         // const user = getUser();
//         // expect(user).to.be.null;
//     });

//     When('the user reloads their information', () => {
//         // Implementation of the user information reload step
//         // reload();
//     });

//     Then('the user information should be reloaded', () => {
//         // Implementation of the successful user information reload verification step
//         // const user = getUser();
//         // expect(user).to.exist;
//     });

//     When('the user reauthenticates with email {string} and password {string}', (email: string, password: string) => {
//         // Implementation of the user reauthentication step
//         // reauthenticate(email, password);
//     });

//     Then('the user should be reauthenticated successfully', () => {
//         // Implementation of the successful user reauthentication verification step
//         // const user = getUser();
//         // expect(user).to.exist;
//     });

//     When('the user updates their password to {string}', (newPassword: string) => {
//         // Implementation of the user password update step
//         // updatePassword(newPassword);
//     });

//     Then('the password should be updated successfully', () => {
//         // Implementation of the successful password update verification step
//         // const user = getUser();
//         // expect(user).to.exist;
//     });

//     When('the user sends a password reset email', () => {
//         // Implementation of the user send password reset email step
//         // sendPasswordReset(userDetails.email);
//     });

//     Then('a password reset email should be sent', () => {
//         // Implementation of the password reset email sent verification step
//         // expect(passwordResetEmail).to.be.sent;
//     });
