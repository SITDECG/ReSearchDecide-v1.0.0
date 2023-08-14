import { useState } from 'react';
import { updateMemberVote } from '../../../api/user';

export const useUpdateMemberVote = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateVote = async (memberId: string, newVote: boolean, groupId: string) => {
    setIsLoading(true);
    console.log(memberId, newVote)
    try {
      await updateMemberVote(memberId, newVote, groupId);
    } catch (error) {
      console.log('Error updating member vote:', error);
    }
    setIsLoading(false);
  };

  return { updateVote };
};
