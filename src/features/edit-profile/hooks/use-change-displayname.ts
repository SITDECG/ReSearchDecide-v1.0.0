import { useState } from 'react';
import { updateDisplayName } from '../../../api/user';

export const useUpdateDisplayName = (): [
  (displayName: string) => Promise<void>,
  boolean,
      string | null
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateDisplayName = async (displayName: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await updateDisplayName({ displayName });
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred while updating display name. Please try again later.');
    }
  };

  return [handleUpdateDisplayName, isLoading, error];
};
