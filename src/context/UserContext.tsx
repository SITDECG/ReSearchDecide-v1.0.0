import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

interface UserContextState {
  user: firebase.User | null;
  isLoading: boolean;
  error: any;
  reload: () => Promise<void>;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

interface UserContextProviderProps {
  children: React.ReactNode;
  initialState?: UserContextState;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
                                                                          children,
                                                                          initialState = {
                                                                            user: null,
                                                                            isLoading: true,
                                                                            error: null,
                                                                            reload: () => Promise.resolve()
                                                                          },
                                                                        }) => {
  const [state, setState] = useState<UserContextState>(initialState);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setState((prevState) => ({ ...prevState, user, isLoading: false, error: null }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleReload = async () => {
    try {
      await firebase.auth().currentUser?.reload();
      const user = firebase.auth().currentUser;
      setState((prevState) => ({ ...prevState, user, isLoading: false, error: null }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, user: null, isLoading: false, error }));
    }
  };

  const value: UserContextState = {
    ...state,
    reload: handleReload,
  };

  if (typeof UserContext === 'undefined') {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextState => {
  const userContext = useContext(UserContext);

  if (typeof userContext === 'undefined') {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return userContext;
};
