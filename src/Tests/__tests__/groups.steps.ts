// import { defineFeature, loadFeature } from 'jest-cucumber';
// import firebase from 'firebase/compat/app';
// import 'firebase/firestore';

// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
// } from '@env'
// import {
//   saveGroup,
//   deleteGroupById,
// } from '../../api/groups'; // Reemplaza 'your-file' con el nombre de tu archivo
// import {
//   signUp,
//   logIn,
//   signOut,
//   getDBUserList,
// } from '../../api/user';
// const feature = loadFeature('./groups.feature');

// defineFeature(feature, (test) => {
//   beforeEach(async () => {
//     // Configura cualquier configuración inicial necesaria, como iniciar sesión con un usuario de prueba


//     console.log('FIREBASE_API_KEY', FIREBASE_API_KEY)
//     console.log('FIREBASE_AUTH_DOMAIN', FIREBASE_AUTH_DOMAIN)
//     console.log('FIREBASE_PROJECT_ID', FIREBASE_PROJECT_ID)
//     console.log('FIREBASE_STORAGE_BUCKET', FIREBASE_STORAGE_BUCKET)
//     console.log('FIREBASE_MESSAGING_SENDER_ID', FIREBASE_MESSAGING_SENDER_ID)
//     console.log('FIREBASE_APP_ID', FIREBASE_APP_ID)

//     const firebaseConfig = {
//       apiKey: FIREBASE_API_KEY,
//       authDomain: FIREBASE_AUTH_DOMAIN,
//       projectId: FIREBASE_PROJECT_ID,
//       storageBucket: FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//       appId: FIREBASE_APP_ID,
//     }

//     firebase.initializeApp(firebaseConfig)
//     const email = 'danielo14ch@hotmail.com';
//     const password = '12345678';

//     await signUp({ email, password, userName: 'Test User' });
//     await logIn({ email, password });

//   });

//   afterEach(async () => {
//     // Realiza cualquier limpieza necesaria, como cerrar sesión después de cada prueba
//     await deleteGroupById('Test Group');
//     await signOut();
//   });

//   test('Create a new group', ({ given, when, then }) => {
//     given('I am logged in', async () => {
//       // Realiza la acción para iniciar sesión con un usuario de prueba
//       await signUp({ email: 'test@example.com', password: 'password', userName: 'Test User' });
//     });

//     when('I create a new group with name {string} and description {string}', async (groupName, groupDescription) => {
//       // Realiza la acción para crear un nuevo grupo con los parámetros proporcionados
//       await saveGroup({ name: groupName, description: groupDescription });
//     });

//     then('the group should be created successfully', async () => {
//       // Verifica que el grupo se haya creado correctamente
//       const userGroups = await getDBUserList(); // Obtiene la lista de grupos del usuario
//       // Realiza las aserciones necesarias para verificar que el grupo se haya creado correctamente
//       expect(userGroups.length).toBeGreaterThan(0);
//     });
//   });

//   test('Delete a group', ({ given, and, when, then }) => {
//     given('I am logged in', async () => {
//       // Realiza la acción para iniciar sesión con un usuario de prueba
//       await signUp({ email: 'test@example.com', password: 'password', userName: 'Test User' });
//     });

//     and('I have a group with name {string}', async (groupName) => {
//       // Realiza la acción para crear un grupo de prueba con el nombre proporcionado
//       await saveGroup({ name: groupName, description: 'Test Group Description' });
//     });

//     when('I delete the group with name {string}', async (groupName) => {
//       // Realiza la acción para eliminar el grupo con el nombre proporcionado
//       await deleteGroupById(groupName);
//     });

//     then('the group should be deleted successfully', async () => {
//       // Verifica que el grupo se haya eliminado correctamente
//       const userGroups = await getDBUserList(); // Obtiene la lista de grupos del usuario
//       // Realiza las aserciones necesarias para verificar que el grupo se haya eliminado correctamente
//       expect(userGroups.length).toBe(0);
//     });
//   });
// });