// useUpdatePassword.ts
import { useState } from 'react';
import { updatePassword } from '../api/user';

export const useUpdatePassword = (): [(
    password: string
) => Promise<void>, boolean, string | null, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const handleUpdatePassword = async (password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await updatePassword({ password });
      setIsPasswordUpdated(true);
      setError(null);
    } catch (error: Error | any) {
      setError(error?.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return [handleUpdatePassword, isLoading, error, isPasswordUpdated];
};
