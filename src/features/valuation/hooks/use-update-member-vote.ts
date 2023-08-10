import { useState } from 'react';
import { updateMemberVote } from '../../../api/user';

export const useUpdateMemberVote = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateVote = async (memberId: string, newVote: boolean) => {
    setIsLoading(true);
    try {
      await updateMemberVote(memberId, newVote);
    } catch (error) {
      console.log('Error updating member vote:', error);
    }
    setIsLoading(false);
  };

  return { updateVote };
};
