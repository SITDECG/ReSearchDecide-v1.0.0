import { useState } from 'react';
import { signOut } from '../api/user';
import { useGroupsContext } from "../context/GroupContext";

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

  const { setGroups, groups } = useGroupsContext();

  const handleSignOut = async (): Promise<void> => {
    setState({ isLoading: true, error: null });


    try {
      await signOut();
      setGroups(prev => {
        return [];
      });
      groups.splice(0, groups.length);

      setState({ isLoading: false, error: null });
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message || 'Error al cerrar sesión' });
    }
  };

  return [handleSignOut, { ...state }];
};
