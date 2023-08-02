import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { User } from '../model/User';
import firestore = firebase.firestore;

export const getUser = (): firebase.User | null => firebase.auth().currentUser;


export const getCurrentUser = (): firebase.User | null => {
  const currentUser = firebase.auth().currentUser;
  return currentUser;
};

export const deleteDBUser = async (email: string): Promise<void> => {
  const userRef = firebase.firestore().collection('users').where('email', '==', email);
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    return Promise.reject('No user found');
  }
  snapshot.docs.forEach((doc) => doc.ref.delete());
};

export const saveNewUserDB = async (user: firebase.User | null, userName: string): Promise<void> => {
  if (user) {
    console.log('user', user)
    const { uid, email, displayName, photoURL } = user;
    const userRef = firebase.firestore().collection('users').doc(uid);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      await userRef.set({
        uid,
        email,
        displayName: userName || displayName,
        photoURL,
      });
    }
  }
};

export const getDBUserByEmail = async (email: string): Promise<User> => {
  const userRef = firebase.firestore().collection('users').where('email', '==', email);
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    return Promise.reject('No user found');
  }
  return snapshot.docs[0].data() as User;
};

export const getDBUserByUid = async (uid: string): Promise<User> => {
  const userRef = firebase.firestore().collection('users').doc(uid);
  const snapshot = await userRef.get();
  if (snapshot.exists) {
    return snapshot.data() as User;
  }
  return Promise.reject('No user found');
};

export const getDBUserByDisplayName = async (displayName: string): Promise<User> => {
  const userRef = firebase.firestore().collection('users').where('displayName', '==', displayName);
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    return Promise.reject('No user found');
  }
  return snapshot.docs[0].data() as User;
};

export const getDBUserList = async (): Promise<User[]> => {
  const userRef = firebase.firestore().collection('users');
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    return Promise.reject('No user found');
  }
  return snapshot.docs.map((doc) => doc.data() as User);
};

export const onAuthStateChanged = (args: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)): firebase.Unsubscribe =>
    firebase.auth().onAuthStateChanged(args);

export const signUp = async ({ email = '', password = '', userName = '' }: {
  email: string;
  password: string,
  userName: string
}): Promise<void> => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
          async (userCredential) => {
            await userCredential.user?.updateProfile({
              displayName: userName,
            });
            await saveNewUserDB(userCredential.user, userName);
            return userCredential;
          }
      ).catch((error) => {
        console.error('Error al registrarse:', error);
        throw error;
      });
  await sendVerification();
};

export const logIn = ({ email = '', password = '' }: {
  email: string;
  password: string;
}): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Inicio de sesión exitoso');
        return userCredential;
      })
      .catch((error) => {
        console.log('Error al iniciar sesión:', error);
        throw error;
      });
};

export const sendVerification = (): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.sendEmailVerification();
  }
  return Promise.reject('No user found');
};

export const signOut = (): Promise<void> => firebase.auth().signOut()
    .then(() => {
    }).catch((error) => {
      throw error;
    });


export const reload = (): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.reload();
  }
  return Promise.reject('No user found');
};

export const reauthenticate = ({ email = '', password = '' }: {
  email: string;
  password: string
}): Promise<firebase.auth.UserCredential> => {
  const user = getUser();
  if (user) {
    return user.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(email, password)
    );
  }
  return Promise.reject('No user found');
};

export const updatePassword = ({ password = '' }: {password: string}): Promise<void> => {
  const user = getUser();
  if (user) {
    return user.updatePassword(password);
  }
  return Promise.reject('No user found');
};

export const sendPasswordReset = ({ email = '' }: {email: string}): Promise<void> =>
    firebase.auth().sendPasswordResetEmail(email);

export const updateDisplayName = async ({ displayName }: {displayName: string}): Promise<void> => {
  const user = getUser();

  if (!user) {
    return Promise.reject('No user found');
  }

  try {
    await user.updateProfile(
        { displayName: displayName }
    );

  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Error updating profile');
  }
};





