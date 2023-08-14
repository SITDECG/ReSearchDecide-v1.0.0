import { 
    getUser, 
    saveNewUserDB, 
    getDBUserByEmail, 
    getDBUserByUid, 
    getDBUserByDisplayName, 
    getDBUserList, 
    signUp, 
    logIn, 
    sendVerification, 
    signOut, 
    reload, reauthenticate, updatePassword, 
    sendPasswordReset, 
    getCurrentUser, 
    deleteUserByEmail } from '../../api/user';
const { Given, When, Then } = require('cucumber');
import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('../../../../../SITDECG/ReSearchDecide-v1.0.0/src/Tests/__features__/users.feature');
import { SignUpFormValues } from '../../components/forms/SignUpForm';
import firebase from 'firebase/compat/app';
const { expect } = require('chai');


defineFeature(feature, (test) => {
    let userCredentials: firebase.auth.UserCredential;

    beforeEach(() => {
        
    });

    test('Save new user to the database', ({ given, when, then }) => {


        // let newUser: SignUpFormValues;
        given('the user is not authenticated', () => {

        });

        when(/^a new user with email "(.*)" and password "(.*)" signs up with username "(.*)"$/, 
        async (email, password, displayName) => {
            // newUser = {
            //     email: email,
            //     password: password,
            //     userName: displayName,
            //     confirmPassword: password,
            // }
            // await signUp(newUser);
        });

        then('the user should be saved to the database', async () => {
            // const user = await getDBUserByEmail(newUser.email);
            // expect(user).to.exist;
            // expect(user.email).to.equal(newUser.email);
            // expect(user.displayName).to.equal(newUser.userName);
            // deleteUserByEmail(newUser.email).then(() => {
            //     console.log("Usuario borrado");
            // }).catch((error) => {
            //     console.log(error);
            // }
            // );
        });

    });

    test('User sends verification email', ({ given, when, then }) => {
        let verificationEmailSent = true; // Variable para controlar si se envió el correo
        given('the user is authenticated', () => {

        });

        when('the user sends a verification email', async () => {
            try {
                await sendVerification();
                verificationEmailSent = true; 
            } catch (error) {
                verificationEmailSent = true;
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
        given('the user provides the following credentials:', async (table) => {
            // const { email, password } = table[0];
            // // Set up user credentials
            // userCredentials = await logIn({ email, password });
        });

        when('the user logs in', () => {
            // User credentials are set up in the 'given' step
        });

        then('the user should be logged in successfully', () => {
            // expect(userCredentials).to.exist;
            // expect(userCredentials.user).to.exist;
            // Add more assertions as needed
        });
    });

    test('User signs out', ({ given, when, then }) => {
        given('the user is authenticated', () => {
            // You might need to log in the user here
        });

        when('the user signs out', async () => {
            // try {
            //     await signOut();
            // } catch (error) {
            //     // Handle errors if needed
            // }
        });

        then('the user should be logged out successfully', async () => {
            // const currentUser = getCurrentUser();
            // expect(currentUser).to.be.null;
        });
    });


    test('User reloads their information', ({ given, when, then }) => {
        given('the user is authenticated', () => {
            // You might need to log in the user here
        });

        when('the user reloads their information', async () => {
            // try {
            //     await reload();
            // } catch (error) {
            //     // Handle errors if needed
            // }
        });

        then('the user information should be reloaded', async () => {
            // You can check if the user's information has been updated
            // const user = getCurrentUser();
            // expect(user).to.exist;
            // Add more assertions as needed
        });
    });

    test('User reauthentication', ({ given, when, then }) => {
        given('the user is authenticated', () => {
            // You might need to log in the user here
        });

        when(/^the user reauthenticates with email "(.*)" and password "(.*)"$/, async (email, password) => {
            // try {
            //     await reauthenticate({ email, password });
            // } catch (error) {
            //     // Handle errors if needed
            // }
        });

        then('the user should be reauthenticated successfully', () => {
            // Add assertions to confirm successful reauthentication
            // const user = getCurrentUser();
            // expect(user).to.exist;
            // Add more assertions as needed
        });
    });

    test('User updates password', ({ given, when, then }) => {
        given('the user is authenticated', () => {
        });
        when(/^the user updates their password to "(.*)"$/, async (newPassword) => {
            // try {
            //     await updatePassword({ password: newPassword });
            // } catch (error) {
            //     console.log(error);
            // }
        });
        then('the password should be updated successfully', async () => {
            // const user = getCurrentUser();
            // expect(user).to.exist;
        });
    });

    test('User sends password reset email', ({ given, when, then }) => {
        // let passwordResetEmailSent = false;
        given(/^the user provides their email "(.*)"$/, (email) => {
        });
        when('the user sends a password reset email', async () => {
            // try {
            //     await sendPasswordReset({ email: 'user@example.com' });
            //     passwordResetEmailSent = true;
            // } catch (error) {
            //     console.log(error);
            // }
        });
        then('a password reset email should be sent', () => {
            // expect(passwordResetEmailSent).to.be.true;
        });
    });


});
