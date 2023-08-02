import { useState } from 'react';
import { signOut } from '../api/user';

interface SignOutState {
  isLoading: boolean;
  error: string | null;
}

export const useSignOut = (): [
  () => Promise<void>,
  SignOutState
] => {
  const [state, setState] = useState<SignOutState>({
    isLoading: false,
    error: null,
  });

  const handleSignOut = async (): Promise<void> => {
    setState({ isLoading: true, error: null });

    try {
      await signOut();
      setState({ isLoading: false, error: null });
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message || 'Error al cerrar sesión' });
    }
  };

  return [handleSignOut, { ...state }];
};
