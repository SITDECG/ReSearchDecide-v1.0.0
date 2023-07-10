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
      console.log('Cierre de sesión exitoso');
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message || 'Error al cerrar sesión' });
      console.log('Error al cerrar sesión:', error);
      // Maneja el error de cierre de sesión
      // Por ejemplo, muestra un mensaje de error al usuario
      alert('Error al cerrar sesión');
    }
  };

  return [handleSignOut, { ...state }];
};
