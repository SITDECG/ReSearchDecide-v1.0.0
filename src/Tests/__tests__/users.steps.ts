import { expect } from 'chai';
import { getUser, saveNewUserDB, getDBUserByEmail, getDBUserByUid, getDBUserByDisplayName, getDBUserList, signUp, logIn, sendVerification, signOut, reload, reauthenticate, updatePassword, sendPasswordReset } from '../../api/user';
const { Given, When, Then } = require('cucumber');
import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('../../../../../SITDECG/ReSearchDecide/src/Tests/__features__/users.feature');
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";



import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    GOOGLE_APPLICATION_CREDENTIALS,
} from '@env'
import { User } from '../../model/User';

console.log('FIREBASE_API_KEY', FIREBASE_API_KEY)
console.log('FIREBASE_AUTH_DOMAIN', FIREBASE_AUTH_DOMAIN)
console.log('FIREBASE_PROJECT_ID', FIREBASE_PROJECT_ID)
console.log('FIREBASE_STORAGE_BUCKET', FIREBASE_STORAGE_BUCKET)
console.log('FIREBASE_MESSAGING_SENDER_ID', FIREBASE_MESSAGING_SENDER_ID)
console.log('FIREBASE_APP_ID', FIREBASE_APP_ID)
console.log('GOOGLE_APPLICATION_CREDENTIALS', GOOGLE_APPLICATION_CREDENTIALS)

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    google: GOOGLE_APPLICATION_CREDENTIALS,
   
}

firebase.initializeApp(firebaseConfig)
var serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const firestore = getFirestore();
async function deleteAllUsers() {
    try {
        const listUsersResult = await admin.auth().listUsers();

        listUsersResult.users.forEach(async (userRecord) => {
            await admin.auth().deleteUser(userRecord.uid);
        });

        console.log("Usuarios eliminados exitosamente.");
    } catch (error) {
        console.error("Error al eliminar usuarios:", error);
    }
}
async function deleteAllCollections() {
    try {
        const collections = await firestore.listCollections();

        for (const collection of collections) {
            await deleteCollection(collection);
        }

        console.log('Todas las colecciones eliminadas exitosamente.');
    } catch (error) {
        console.error('Error al eliminar colecciones:', error);
    }
}

async function deleteCollection(collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>) {
    const documents = await collection.listDocuments();

    for (const document of documents) {
        await document.delete();
    }
}

// deleteAllCollections();
deleteAllUsers();
defineFeature(feature, (test) => {


    beforeEach(() => {
        // Reset the user before each scenario
        // resetUser(); 


    });

    test('Save new user to the database', ({ given, when, then }) => {

        let newUser;
        given('the user is not authenticated', () => {
            // Implementation of the user authentication step
            // const user = getUser();
    

        });

        when(/^a new user with email "(.*)" and password "(.*)" signs up with username "(.*)"$/, async (arg0: string, arg1: string, arg2: string) => {
            newUser = { email: arg0, password: arg1, userName: arg2  };
            const user = signUp(newUser);
        });

        then('the user should be saved to the database', () => {
            // const user = getUser();
            // console.log('user', user);
            // expect(user).to.exist;
            const users: Promise<User[]> = getDBUserList();
            console.log('users', users);
            // const user = getDBUserByEmail(newUser.email);
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


    test('User sends verification email', ({ given, when, then }) => {
        given('the user is authenticated', () => {

        });

        when('the user sends a verification email', () => {

        });

        then('a verification email should be sent to the user', () => {

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
